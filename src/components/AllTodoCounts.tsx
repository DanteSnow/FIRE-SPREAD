import { useEffect, useState } from "react";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../firebase";
import defaultIcon from "../images/user.svg";
import { Link } from "react-router-dom";

interface UserProfile {
  userId: string;
  username: string;
  photoURL: string;
}

interface UserTodoCounts extends UserProfile {
  completed: number;
  inProgress: number;
}

interface Todo {
  id: string;
  userId: string;
  username: string;
  complete: boolean;
}

export default function AllTodoCounts() {
  const [userTodoCounts, setUserTodoCounts] = useState<UserTodoCounts[]>([]);

  useEffect(() => {
    const fetchTodos = () => {
      const userProfiles: { [key: string]: UserProfile } = {};

      onSnapshot(collection(db, "userProfiles"), (userProfilesSnapshot) => {
        userProfilesSnapshot.docs.forEach((doc) => {
          const data = doc.data() as Omit<UserProfile, "userId">;
          userProfiles[doc.id] = { userId: doc.id, ...data };
        });
      });

      onSnapshot(query(collection(db, "todo")), (querySnapshot) => {
        const todosData: Todo[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Todo, "id">),
        }));

        const counts: { [key: string]: UserTodoCounts } = {};
        todosData.forEach((todo) => {
          if (!counts[todo.userId]) {
            counts[todo.userId] = {
              ...userProfiles[todo.userId],
              username: todo.username,
              completed: 0,
              inProgress: 0,
            };
          }

          if (todo.complete) {
            counts[todo.userId].completed++;
          } else {
            counts[todo.userId].inProgress++;
          }
        });

        setUserTodoCounts(Object.values(counts));
      });
    };

    fetchTodos();
  }, []);

  return (
    <div className="flex w-full flex-col gap-6 overflow-auto rounded-2xl border-none bg-gray-700 p-5 scrollbar-hide">
      {userTodoCounts.map((userCount) => (
        <div
          key={userCount.username}
          className="flex items-center justify-between"
        >
          <Link to={`/userpage/${userCount.userId}`}>
            <div className="flex flex-col items-center gap-1">
              <img
                className="h-9 w-9 rounded-full"
                src={userCount.photoURL || defaultIcon}
                alt={userCount.username}
              />
              <span className="max-w-9 overflow-hidden text-ellipsis whitespace-nowrap text-xs">
                {userCount.username}
              </span>
            </div>
          </Link>
          <div className="text-xs">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full border-none bg-green-400" />
              <p>In Progress</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full border-none bg-red-500" />
              <p>Completed</p>
            </div>
          </div>
          <div className="text-xs">
            <p>{userCount.inProgress}</p>
            <p>{userCount.completed}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
