import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import CompletedTodo from "./CompletedTodo";
import { Unsubscribe } from "firebase/auth";

export interface ITodo {
  id: string;
  createdAt: string;
  todo: string;
  userId: string;
  username: string;
  complete: boolean;
}

export default function CompletedTodoList() {
  const [todos, setTodos] = useState<ITodo[]>([]);

  useEffect(() => {
    let unsubscribe: Unsubscribe | null = null;
    const fetchTodo = async () => {
      const todoQuery = query(
        collection(db, "todo"),
        orderBy("createdAt", "desc"),
        limit(10),
      );
      unsubscribe = await onSnapshot(todoQuery, (snapshot) => {
        const todos = snapshot.docs.map((doc) => {
          const { createdAt, todo, userId, username, complete } = doc.data();
          return { createdAt, todo, userId, username, complete, id: doc.id };
        });
        setTodos(todos);
      });
    };
    fetchTodo();
    return () => {
      unsubscribe && unsubscribe();
    };
  }, []);

  return (
    <h1>
      {todos.map((todo) => (
        <CompletedTodo key={todo.id} {...todo} />
      ))}
    </h1>
  );
}
