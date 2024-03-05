import { useEffect, useState } from "react";
import { IGuestBook } from "./GuestBookList";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { UserProfile } from "./HomeTodayTodoList";
import defaultIcon from "../images/user.svg";

export default function GuestBook({ guestBook, username, userId }: IGuestBook) {
  const [userProfiles, setUserProfiles] = useState<UserProfile>({});

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
      <div className="mb-4 flex items-center gap-3">
        <img
          src={userProfiles[userId] ? userProfiles[userId] : defaultIcon}
          alt={userId}
          className="h-9 w-9 overflow-hidden rounded-full"
        />
        <span className="text-sm">{username}</span>
      </div>
      <div className="mb-8 whitespace-pre-wrap break-all rounded-3xl border-none bg-gray-700 p-10 scrollbar-hide">
        <div>{guestBook}</div>
      </div>
    </>
  );
}
