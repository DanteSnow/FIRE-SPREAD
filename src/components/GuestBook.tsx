import { useEffect, useState } from "react";
import { IGuestBook } from "./GuestBookList";
import {
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import { UserProfile } from "./HomeTodayTodoList";
import defaultIcon from "../images/user.svg";
import { Link } from "react-router-dom";

export interface IReply {
  userId: string;
  replyText: string;
  createdAt: number;
  id: string;
  username: string;
  photoURL: string;
}

export default function GuestBook({
  guestBook,
  createdAt,
  username,
  userId,
  id,
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

  const [replyText, setReplyText] = useState("");
  const [replies, setReplies] = useState<IReply[]>([]);

  useEffect(() => {
    const q = query(
      collection(db, "guestBook", id, "replies"),
      orderBy("createdAt", "asc"),
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const repliesData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as IReply[];
      setReplies(repliesData);
    });
    return () => unsubscribe();
  }, [id]);

  const submitReply = async () => {
    const repliesRef = collection(db, "guestBook", id, "replies");
    await addDoc(repliesRef, {
      userId: auth.currentUser?.uid,
      replyText: replyText,
      createdAt: Date.now(),
      username: auth.currentUser?.displayName,
      photoURL: auth.currentUser?.photoURL,
    });
    setReplyText("");
  };

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
      <div className="mb-2 mt-9">
        <Link to={`/userpage/${userId}`}>
          <div className="flex items-center gap-2">
            <img
              src={userProfiles[userId] ? userProfiles[userId] : defaultIcon}
              alt={userId}
              className="h-8 w-8 rounded-full"
            />
            <span className="text-sm font-bold">{username}</span>
          </div>
        </Link>
      </div>
      <div>
        <div className="mb-4 flex w-64 flex-col gap-2 whitespace-pre-wrap break-all rounded-lg border-none bg-gray-700 p-3 pl-4 text-sm scrollbar-hide">
          <div>{guestBook}</div>
          <span className="text-xs text-gray-400">{createdAtString}</span>
        </div>
        {/* 여기에 Reply 렌더링 */}
        {replies.map((reply) => (
          <div className="ml-6 flex flex-col gap-2" key={reply.id}>
            <div className="flex items-center gap-2">
              <img
                src={
                  userProfiles[reply.userId]
                    ? userProfiles[reply.userId]
                    : defaultIcon
                }
                alt={reply.username}
                className="h-8 w-8 rounded-full"
              />
              <span className="text-sm font-bold">{reply.username}</span>
            </div>
            <p className="mb-4 flex w-64 flex-col gap-2 whitespace-pre-wrap break-all rounded-lg border-none bg-gray-500 p-3 pl-4 text-sm scrollbar-hide">
              {reply.replyText}
              <span className="text-xs text-gray-400">
                {new Date(reply.createdAt).getFullYear()}.
                {new Date(reply.createdAt).getMonth() + 1}.
                {new Date(reply.createdAt).getDate()}{" "}
                {new Date(reply.createdAt).getHours()}:
                {("0" + new Date(reply.createdAt).getMinutes()).slice(-2)}
              </span>
            </p>
          </div>
        ))}
      </div>
      {/* 여기에 ReplyForm */}
      <form
        className="flex items-center gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          submitReply();
        }}
      >
        <input
          className="h-10 w-64 rounded-xl bg-gray-800"
          type="text"
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
        />
        <button type="submit" className="rounded-xl bg-gray-700 p-2 text-xs">
          Submit
        </button>
      </form>
    </>
  );
}
