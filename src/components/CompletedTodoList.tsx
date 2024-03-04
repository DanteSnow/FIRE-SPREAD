import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import CompletedTodo from "./CompletedTodo";
import { onAuthStateChanged } from "firebase/auth";

export interface ITodo {
  id: string;
  createdAt: string;
  todo: string;
  userId: string;
  username: string;
  complete: boolean;
  completedAt: string;
}

export default function CompletedTodoList() {
  const [todos, setTodos] = useState<ITodo[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const todoQuery = query(
          collection(db, "todo"),
          where("userId", "==", user.uid),
          orderBy("completedAt", "desc"),
        );
        return onSnapshot(todoQuery, (snapshot) => {
          const fetchedTodos = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          })) as ITodo[];
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

  return (
    <div className="flex h-52 w-full flex-col gap-2 whitespace-pre-wrap">
      {todos.map((todo) => (
        <CompletedTodo key={todo.id} {...todo} />
      ))}
    </div>
  );
}
