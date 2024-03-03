import { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase";

interface Todo {
  id: string;
  userId: string;
  content: string;
  complete: boolean;
}

interface TodoCountsProps {
  userId: string;
}

export default function TodoCounts({ userId }: TodoCountsProps) {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const q = query(collection(db, "todo"), where("userId", "==", userId));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const todosData: Todo[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Todo, "id">),
      }));
      setTodos(todosData);
    });

    return () => {
      unsubscribe();
    };
  }, [userId]);

  const completedTodos = todos.filter((todo) => todo.complete).length;
  const inProgressTodos = todos.length - completedTodos;

  return (
    <div className="flex w-3/4 justify-between">
      <div className="flex flex-col justify-between">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full border-none bg-green-400" />
          <p>In Progress</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full border-none bg-orange-400" />
          <p>Completed</p>
        </div>
      </div>
      <div>
        <p>{inProgressTodos}</p>
        <p>{completedTodos}</p>
      </div>
    </div>
  );
}
