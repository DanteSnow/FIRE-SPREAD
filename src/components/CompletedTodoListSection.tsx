import { useEffect, useState } from "react";
import { ITodo } from "./TodayTodoList";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "../firebase";

export default function CompletedTodoListSection() {
  const [todos, setTodos] = useState<ITodo[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const todoQuery = query(
          collection(db, "todo"),
          where("userId", "==", user.uid),
          orderBy("createdAt", "desc"),
          limit(10),
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
          <h3>{date}</h3>
          {todosForDate.map((todo) => (
            <div key={todo.id}>{todo.todo}</div>
          ))}
        </div>
      ))}
    </>
  );
}
