import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { auth, db } from "../firebase";

export default function PostTodoForm() {
  const [todo, setTodo] = useState("");
  const [loading, setLoading] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTodo(e.target.value);
  };

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const user = auth.currentUser;
    const nowDate = Date.now();
    const now = new Date(nowDate);
    const date = now.toLocaleDateString("ko-KR");
    if (!user || loading || todo === "") return;
    setLoading(true);
    try {
      await addDoc(collection(db, "todo"), {
        todo,
        complete: false,
        createdAt: date,
        username: user.displayName,
        userId: user.uid,
      });
      setTodo("");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="relative mt-5 flex w-full flex-col gap-3"
    >
      <textarea
        className="relative resize-none rounded-2xl border-2 border-gray-500 bg-gray-700 p-3 focus:border-orange-400 focus:outline-none"
        placeholder="오늘의 할일은?"
        value={todo}
        onChange={onChange}
        onKeyDown={(e: React.KeyboardEvent) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            onSubmit(e);
          }
        }}
      />
      <input
        className="absolute bottom-2 right-4 cursor-pointer rounded-lg bg-gray-800 p-2 text-xs"
        type="submit"
        value="Submit"
      />
    </form>
  );
}
