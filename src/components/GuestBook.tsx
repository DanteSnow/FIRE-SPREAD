import { useEffect, useState } from "react";
import { IGuestBook } from "./GuestBookList";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { UserProfile } from "./HomeTodayTodoList";
import defaultIcon from "../images/user.svg";
import { Link } from "react-router-dom";

export default function GuestBook({
  guestBook,
  createdAt,
  username,
  userId,
}: IGuestBook) {
  const [userProfiles, setUserProfiles] = useState<UserProfile>({});
  const createdAtDate = new Date(createdAt);
  const createdAtString =
    createdAtDate.getFullYear() +
    "." +
    (createdAtDate.getMonth() + 1) +
    "." +
    createdAtDate.getDate() +
    " " +
    createdAtDate.getHours() +
    ":" +
    ("0" + createdAtDate.getMinutes()).slice(-2);

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

  return (
    <>
      <div className="mb-2">
        <Link to={`/userpage/${userId}`}>
          <div className="flex items-center gap-2">
            <img
              src={userProfiles[userId] ? userProfiles[userId] : defaultIcon}
              alt={userId}
              className="h-8 w-8 overflow-hidden rounded-full"
            />
            <span className="text-sm font-bold">{username}</span>
          </div>
        </Link>
      </div>
      <div className="mb-8 flex w-64 flex-col gap-2 whitespace-pre-wrap break-all rounded-lg border-none bg-gray-700 p-3 pl-4 text-sm scrollbar-hide">
        <div>{guestBook}</div>
        <span className="text-xs text-gray-400">{createdAtString}</span>
      </div>
    </>
  );
}
