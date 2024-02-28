import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
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
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      setCurrentUserId(user ? user.uid : null);
    });
    return () => {
      unsubscribeAuth && unsubscribeAuth();
    };
  }, []);

  useEffect(() => {
    if (currentUserId) {
      const guestBookQuery = query(
        collection(db, "guestBook"),
        where("receivedUserId", "==", currentUserId),
        orderBy("createdAt", "desc"),
      );
      const unsubscribeFirestore = onSnapshot(guestBookQuery, (snapshot) => {
        const fetchedGuestBooks = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as IGuestBook[];
        setGuestBooks(fetchedGuestBooks);
      });

      return () => unsubscribeFirestore();
    }
  }, [currentUserId]);

  return (
    <div className="flex w-full flex-col rounded-xl border-2 border-black p-5">
      {guestBooks.map((guestBook) => (
        <GuestBook key={guestBook.id} {...guestBook} />
      ))}
    </div>
  );
}
