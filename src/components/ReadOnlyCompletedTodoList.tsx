import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { Unsubscribe } from "firebase/auth";
import ReadOnlyCompletedTodo from "./ReadOnlyCompletedTodo";

export interface ITodo {
  id: string;
  createdAt: string;
  todo: string;
  userId: string;
  username: string;
  complete: boolean;
}

export default function ReadOnlyCompletedTodoList() {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const nowDate = Date.now();
  const now = new Date(nowDate);
  const date = now.toLocaleDateString("ko-KR");

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
      {date}
      {todos.map((todo) => (
        <ReadOnlyCompletedTodo key={todo.id} {...todo} />
      ))}
    </h1>
  );
}
