import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import CompletedTodo from "./CompletedTodo";
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

export default function CompletedTodoList() {
  const [todos, setTodos] = useState<ITodo[]>([]);

  useEffect(() => {
    let unsubscribe: Unsubscribe | null = null;
    const user = auth.currentUser;
    if (user) {
      const fetchTodo = async () => {
        const todoQuery = query(
          collection(db, "todo"),
          where("userId", "==", user.uid),
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
    }

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
