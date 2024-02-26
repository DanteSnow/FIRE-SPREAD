import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { auth, db } from "../firebase";

export default function PostGuestBookForm() {
  const [guestBook, setGuestBook] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setGuestBook(e.target.value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
      });
    } catch (error) {
      console.error(error);
    } finally {
      setGuestBook("");
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <textarea
        placeholder="따뜻한 응원 한 마디 해주세요"
        value={guestBook}
        onChange={onChange}
      />
      <input type="submit" value="방명록 등록" />
    </form>
  );
}
