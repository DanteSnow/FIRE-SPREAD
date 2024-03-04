import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { auth, db } from "../firebase";

export default function PostGuestBookForm({ userId }: { userId: string }) {
  const [guestBook, setGuestBook] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setGuestBook(e.target.value);
  };

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user || isLoading || guestBook === "") return;
    try {
      setIsLoading(true);
      await addDoc(collection(db, "guestBook"), {
        guestBook,
        createdAt: Date.now(),
        username: user.displayName,
        userId: user.uid,
        receivedUserId: userId,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setGuestBook("");
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="relative flex flex-col gap-5 pt-10">
      <textarea
        className="resize-none rounded-2xl border-none bg-gray-500 p-5"
        placeholder="따뜻한 응원 한 마디 해주세요"
        value={guestBook}
        onChange={onChange}
        onKeyDown={(e: React.KeyboardEvent) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            onSubmit(e);
          }
        }}
      />
      <input
        type="submit"
        value="Submit"
        className="absolute bottom-3 right-5 cursor-pointer rounded-xl bg-gray-700 p-3 text-xs text-white"
      />
    </form>
  );
}
