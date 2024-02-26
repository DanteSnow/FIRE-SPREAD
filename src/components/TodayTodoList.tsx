import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import TodayTodo from "./TodayTodo";

export interface ITodo {
  id: string;
  createdAt: number;
  todo: string;
  userId: string;
  username: string;
  complete: boolean;
}

export default function TodayTodoList() {
  const [todos, setTodo] = useState<ITodo[]>([]);

  const fetchTodo = async () => {
    const todoQuery = query(
      collection(db, "todo"),
      orderBy("createdAt", "desc"),
    );
    const snapshot = await getDocs(todoQuery);
    const todos = snapshot.docs.map((doc) => {
      const { createdAt, todo, userId, username, complete } = doc.data();
      return { createdAt, todo, userId, username, complete, id: doc.id };
    });
    setTodo(todos);
  };

  useEffect(() => {
    fetchTodo();
  }, []);

  return (
    <h1>
      {todos.map((todo) => (
        <TodayTodo key={todo.id} {...todo} />
      ))}
    </h1>
  );
}
