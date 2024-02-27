import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { Unsubscribe } from "firebase/auth";
import GuestBook from "./GuestBook";

export interface IGuestBook {
  id: string;
  guestBook: string;
  createdAt: number;
  username: string;
  userId: string;
  receivedUserId: string;
}

export default function GuestBookList() {
  const [guestBooks, setGuestBooks] = useState<IGuestBook[]>([]);

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
      });
    };
    fetchTodo();
    return () => {
      unsubscribe && unsubscribe();
    };
  }, []);

  return (
    <div>
      {guestBooks.map((guestBook) => (
        <GuestBook key={guestBook.id} {...guestBook} />
      ))}
    </div>
  );
}
