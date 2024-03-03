import {
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { Unsubscribe } from "firebase/auth";
import { Link } from "react-router-dom";
import defaultIcon from "../images/user.svg";

export interface ITodo {
  id: string;
  createdAt: string;
  todo: string;
  userId: string;
  username: string;
  complete: boolean;
  completedAt: string;
}

export interface UserProfile {
  [key: string]: string;
}

export default function HomeTodayTodoList() {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [userProfiles, setUserProfiles] = useState<UserProfile>({});

  useEffect(() => {
    let unsubscribe: Unsubscribe | null = null;
    const fetchTodo = async () => {
      const todoQuery = query(
        collection(db, "todo"),
        where("complete", "==", false),
        orderBy("createdAt", "desc"),
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

  useEffect(() => {
    const fetchUserProfiles = async () => {
      const querySnapshot = await getDocs(collection(db, "userProfiles"));
      const profiles: UserProfile = {};
      querySnapshot.forEach((doc) => {
        profiles[doc.id] = doc.data().photoURL;
      });
      setUserProfiles(profiles);
    };
    fetchUserProfiles();
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
          <div className="flex flex-col items-center gap-2">
            <img
              className="h-9 w-9 cursor-pointer overflow-hidden rounded-full"
              src={userProfiles[todosForName[0].userId] || defaultIcon}
              alt={name}
            />
            <h3 className="mb-3 text-center text-sm">{name}</h3>
          </div>
          <div className="flex h-64 w-52 flex-col overflow-x-auto whitespace-pre-wrap rounded-3xl border-2 p-6">
            {todosForName.map((todo) => (
              <div className="mb-2 flex text-nowrap" key={todo.id}>
                {todo.todo}
              </div>
            ))}
          </div>
        </Link>
      ))}
    </>
  );
}
