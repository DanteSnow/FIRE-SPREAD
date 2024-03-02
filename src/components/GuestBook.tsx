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
      <div className="mb-5 flex items-center">
        <img
          src={userProfiles[userId] ? userProfiles[userId] : defaultIcon}
          alt={userId}
          className="h-9 w-9 overflow-hidden rounded-full"
        />
        <span className="pb-2 pl-4 text-sm">{username}</span>
      </div>
      <div className="mb-12 h-64 rounded-xl border-2 border-white p-10 ">
        <span>{guestBook}</span>
      </div>
    </>
  );
}
