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
    <form
      onSubmit={onSubmit}
      className="relative mt-5 flex w-full flex-col gap-3"
    >
      <textarea
        className="relative rounded-lg border-2 border-none bg-black p-3"
        placeholder="오늘의 할일은?"
        value={todo}
        onChange={onChange}
      />
      <input
        className="absolute right-4 top-1/2 -translate-y-1/2 transform cursor-pointer rounded-lg border-2 bg-black p-2 text-sm"
        type="submit"
        value="Submit"
      />
    </form>
  );
}
