import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { ITodo } from "./TodayTodoList";

export default function TodayTodo({
  todo,
  complete,
  userId,
  id,
  createdAt,
}: ITodo) {
  const user = auth.currentUser;

  const onCompleted = async () => {
    const nowDate = Date.now();
    const now = new Date(nowDate);
    const date = now.toLocaleDateString("ko-KR");
    if (user?.uid !== userId) return;
    try {
      await updateDoc(doc(db, "todo", id), {
        complete: true,
        completedAt: date,
      });
    } catch (error) {
      console.error(error);
    } finally {
      //
    }
  };

  if (!complete) {
    return (
      <div className="flex items-end gap-2">
        <div
          onClick={onCompleted}
          className="flex w-1/2 cursor-pointer gap-2 rounded-2xl border-2 px-7 py-2 transition-transform duration-300 hover:-translate-x-1 hover:-translate-y-1"
        >
          <span className="text-lg font-bold">{todo}</span>
        </div>
        <span className="text-xs">{createdAt}</span>
      </div>
    );
  }
}
