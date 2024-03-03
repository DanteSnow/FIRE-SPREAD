import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
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
    const fetchTodos = async () => {
      try {
        const q = query(collection(db, "todo"), where("userId", "==", userId));
        const querySnapshot = await getDocs(q);
        const todosData: Todo[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Todo, "id">),
        }));
        setTodos(todosData);
      } catch (error) {
        console.error("Error fetching todos: ", error);
      }
    };

    fetchTodos();
  }, [userId]);

  const completedTodos = todos.filter((todo) => todo.complete).length;
  const inProgressTodos = todos.length - completedTodos;

  return (
    <div className="flex justify-between">
      <div>
        <p>In Progress</p>
        <p>Completed</p>
      </div>
      <div>
        <p>{inProgressTodos}</p>
        <p>{completedTodos}</p>
      </div>
    </div>
  );
}
