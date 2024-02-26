import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import TodayTodo from "./TodayTodo";
import { Unsubscribe } from "firebase/auth";

export interface ITodo {
  id: string;
  createdAt: string;
  todo: string;
  userId: string;
  username: string;
  complete: boolean;
  completedAt: string;
}

export default function HomeTodayTodoList() {
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
          const { createdAt, todo, userId, username, complete, completedAt } =
            doc.data();
          return {
            createdAt,
            todo,
            userId,
            username,
            complete,
            completedAt,
            id: doc.id,
          };
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
    <div>
      {todos.map((todo) => (
        <TodayTodo key={todo.id} {...todo} />
      ))}
    </div>
  );
}
