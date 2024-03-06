import { useEffect, useState } from "react";
import { ITodo } from "./TodayTodoList";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import fireIcon from "../images/fire.svg";

export default function CompletedTodoListSection() {
  const [todos, setTodos] = useState<ITodo[]>([]);

  const onCompleteCancel = async (id: string) => {
    if (!id) return;
    const ok = confirm("완료 일정을 취소하시겠습니까?");
    if (ok) {
      try {
        await updateDoc(doc(db, "todo", id), {
          complete: false,
          completedAt: null,
        });
      } catch (error) {
        console.error(error);
      } finally {
        //
      }
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const todoQuery = query(
          collection(db, "todo"),
          where("userId", "==", user.uid),
          orderBy("createdAt", "desc"),
        );
        return onSnapshot(todoQuery, (snapshot) => {
          const fetchedTodos = snapshot.docs
            .map((doc) => {
              const {
                createdAt,
                todo,
                userId,
                username,
                complete,
                completedAt,
              } = doc.data();
              return {
                createdAt,
                todo,
                userId,
                username,
                complete,
                completedAt,
                id: doc.id,
              };
            })
            .filter((todo) => todo.completedAt !== null);
          setTodos(fetchedTodos);
        });
      } else {
        setTodos([]);
      }
    });

    return () => {
      unsubscribe && unsubscribe();
    };
  }, []);

  const groupedTodos = todos.reduce(
    (acc: Record<string, ITodo[]>, todo) => {
      if (todo.completedAt) {
        if (!acc[todo.completedAt]) {
          acc[todo.completedAt] = [];
        }
        acc[todo.completedAt].push(todo);
      }
      return acc;
    },
    {} as Record<string, ITodo[]>,
  );

  return (
    <>
      {Object.entries(groupedTodos).map(([date, todosForDate]) => (
        <div key={date}>
          <h3 className="pb-2 pl-4 text-xl font-bold">{date}</h3>
          <div className="flex h-64 w-64 flex-col gap-2 overflow-x-auto whitespace-pre-wrap rounded-3xl border-none bg-gray-700 p-6 scrollbar-hide">
            {todosForDate.map((todo) => (
              <div
                onClick={() => onCompleteCancel(todo.id)}
                key={todo.id}
                className="mb-2 flex cursor-pointer gap-3 transition-transform duration-300 hover:-translate-x-1 hover:-translate-y-1 hover:text-orange-300"
              >
                <img className="w-4" src={fireIcon} />
                <span className="text-sm">{todo.todo}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}
