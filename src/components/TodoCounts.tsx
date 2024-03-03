import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";

interface Todo {
  id: string;
  complete: boolean;
  userId: string;
  username: string;
  createdAt: string;
  todo: string;
}

interface TodoCountsProps {
  userId?: string | null | undefined;
}

export default function TodoCounts({ userId }: TodoCountsProps) {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const fetchTodos = async () => {
      let q;
      if (userId) {
        q = query(collection(db, "todos"), where("userId", "==", userId));
      } else {
        q = query(collection(db, "todos"));
      }

      const querySnapshot = await getDocs(q);
      const todosData: Todo[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Todo, "id">),
      }));

      setTodos(todosData);
    };

    fetchTodos();
  }, [userId]);

  const completedTodos = todos.filter((todo) => todo.complete).length;
  const inProgressTodos = todos.length - completedTodos;

  return (
    <div>
      <p>Completed: {completedTodos}</p>
      <p>In Progress: {inProgressTodos}</p>
    </div>
  );
}
