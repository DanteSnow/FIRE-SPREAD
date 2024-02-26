import { useEffect, useState } from "react";
import { ITodo } from "./TodayTodoList";
import { Unsubscribe } from "firebase/auth";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";

export default function HomeCompletedTodoListSection() {
  const [todos, setTodos] = useState<ITodo[]>([]);

  useEffect(() => {
    let unsubscribe: Unsubscribe | null = null;
    unsubscribe = onSnapshot(
      query(collection(db, "todo"), orderBy("createdAt", "desc")),
      (snapshot) => {
        const fetchedTodos = snapshot.docs
          .map((doc) => {
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
          })
          .filter((todo) => todo.completedAt !== null);
        setTodos(fetchedTodos);
      },
    );

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
