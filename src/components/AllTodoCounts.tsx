import { useEffect, useState } from "react";
import { collection, getDocs, query } from "firebase/firestore";
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

export default function AllTodos() {
  const [userTodoCounts, setUserTodoCounts] = useState<UserTodoCounts[]>([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const userProfilesSnapshot = await getDocs(
          collection(db, "userProfiles"),
        );
        const userProfiles: { [key: string]: UserProfile } = {};
        userProfilesSnapshot.docs.forEach((doc) => {
          const data = doc.data() as Omit<UserProfile, "userId">;
          userProfiles[doc.id] = { userId: doc.id, ...data };
        });

        const q = query(collection(db, "todo"));
        const querySnapshot = await getDocs(q);
        const todosData: Todo[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Todo, "id">),
        }));

        const counts: { [key: string]: UserTodoCounts } = {};
        todosData.forEach((todo) => {
          if (!counts[todo.userId]) {
            counts[todo.userId] = {
              ...userProfiles[todo.userId],
              username: todo.username, // Add this line
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
      } catch (error) {
        console.error("Error fetching todos: ", error);
      }
    };

    fetchTodos();
  }, []);

  return (
    <>
      {userTodoCounts.map((userCount) => (
        <div key={userCount.username} className="flex items-center">
          <div className="flex items-center">
            <img
              className="h-9 w-9 rounded-full"
              src={userCount.photoURL || defaultIcon}
              alt={userCount.username}
            />
            <div>
              <p>In Progress</p>
              <p>Completed</p>
            </div>
            <div>
              <p>{userCount.inProgress}</p>
              <p>{userCount.completed}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
