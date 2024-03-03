import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { Unsubscribe } from "firebase/auth";
import GuestBook from "./GuestBook";
import PostGuestBookForm from "./PostGuestBookForm";

export interface IGuestBook {
  id: string;
  guestBook: string;
  createdAt: number;
  username: string;
  userId: string;
  receivedUserId: string;
}

export default function UserGuestBookList({ userId }: { userId: string }) {
  const [guestBooks, setGuestBooks] = useState<IGuestBook[]>([]);
  const [receivedUserId, setReceivedUserId] = useState<string>("");

  useEffect(() => {
    let unsubscribe: Unsubscribe | null = null;
    const fetchTodo = async () => {
      const guestBookQuery = query(
        collection(db, "guestBook"),
        orderBy("createdAt", "desc"),
      );
      unsubscribe = onSnapshot(guestBookQuery, (snapshot) => {
        const guestBooks = snapshot.docs.map((doc) => {
          const { createdAt, guestBook, userId, username, receivedUserId } =
            doc.data();
          return {
            createdAt,
            guestBook,
            userId,
            username,
            id: doc.id,
            receivedUserId,
          };
        });
        setGuestBooks(guestBooks);
        setReceivedUserId(receivedUserId);
      });
    };
    fetchTodo();
    return () => {
      unsubscribe && unsubscribe();
    };
  }, [receivedUserId]);

  return (
    <div className="flex w-full flex-col whitespace-pre-wrap rounded-xl border-2 border-black">
      {guestBooks
        .filter((guestBook) => guestBook.receivedUserId === userId)
        .map((filteredGuestBook) => (
          <GuestBook key={filteredGuestBook.id} {...filteredGuestBook} />
        ))}
      <h1 className="font-white text-center">여기 구분할 이미지 넣기</h1>
      <PostGuestBookForm userId={userId as string} />
    </div>
  );
}
