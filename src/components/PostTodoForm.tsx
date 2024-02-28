import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { auth, db } from "../firebase";

export default function PostTodoForm() {
  const [todo, setTodo] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTodo(e.target.value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = auth.currentUser;
    const nowDate = Date.now();
    const now = new Date(nowDate);
    const date = now.toLocaleDateString("ko-KR");
    if (!user || isLoading || todo === "") return;
    try {
      setIsLoading(true);
      await addDoc(collection(db, "todo"), {
        todo,
        complete: false,
        createdAt: date,
        username: user.displayName,
        userId: user.uid,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setTodo("");
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      <textarea
        className="rounded-xl border-2 border-black p-3"
        placeholder="오늘의 할일은?"
        value={todo}
        onChange={onChange}
      />
      <input
        className="rounded-xl border-2 border-black"
        type="submit"
        value="할일 등록하기"
      />
    </form>
  );
}
