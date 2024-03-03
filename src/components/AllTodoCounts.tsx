import { useEffect, useState } from "react";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../firebase";
import defaultIcon from "../images/user.svg";

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
    <div className="h-500 flex flex-col gap-3 overflow-auto border-2 p-3">
      {userTodoCounts.map((userCount) => (
        <div
          key={userCount.username}
          className="flex items-center justify-between"
        >
          <img
            className="h-9 w-9 rounded-full"
            src={userCount.photoURL || defaultIcon}
            alt={userCount.username}
          />
          <div>
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
            <p>{userCount.inProgress}</p>
            <p>{userCount.completed}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
