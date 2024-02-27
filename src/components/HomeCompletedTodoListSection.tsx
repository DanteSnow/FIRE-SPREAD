import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { Unsubscribe } from "firebase/auth";
import { Link } from "react-router-dom";

export interface ITodo {
  id: string;
  createdAt: string;
  todo: string;
  userId: string;
  username: string;
  complete: boolean;
  completedAt: string;
}

export default function HomeCompletedTodoList() {
  const [todos, setTodos] = useState<ITodo[]>([]);

  useEffect(() => {
    let unsubscribe: Unsubscribe | null = null;
    const fetchTodo = async () => {
      const todoQuery = query(
        collection(db, "todo"),
        where("complete", "==", true),
        orderBy("completedAt", "desc"),
      );
      unsubscribe = onSnapshot(todoQuery, (snapshot) => {
        const fetchedTodos = snapshot.docs.map((doc) => {
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
        setTodos(fetchedTodos);
      });
    };
    fetchTodo();
    return () => {
      unsubscribe && unsubscribe();
    };
  }, []);

  const groupedTodos = todos.reduce(
    (acc: Record<string, ITodo[]>, todo) => {
      if (todo.username) {
        if (!acc[todo.username]) {
          acc[todo.username] = [];
        }
        acc[todo.username].push(todo);
      }
      return acc;
    },
    {} as Record<string, ITodo[]>,
  );

  return (
    <>
      {Object.entries(groupedTodos).map(([name, todosForName]) => (
        <Link to={`/userpage/${todosForName[0].userId}`} key={name}>
          <div key={name}>
            <h3>{name}</h3>
            {todosForName.map((todo) => (
              <div key={todo.id}>{todo.todo}</div>
            ))}
          </div>
        </Link>
      ))}
    </>
  );
}
