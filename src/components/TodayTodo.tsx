import { deleteDoc, doc, updateDoc } from "firebase/firestore";
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

  const onDelete = async () => {
    if (user?.uid !== userId) return;
    try {
      await deleteDoc(doc(db, "todo", id));
    } catch (error) {
      console.error(error);
    } finally {
      //
    }
  };

  if (!complete) {
    return (
      <div className="flex gap-2">
        <div
          onClick={onCompleted}
          className="flex w-1/2 cursor-pointer items-center gap-3 rounded-2xl border-none bg-gray-700 px-7 py-2 transition-transform duration-300 hover:-translate-x-1 hover:-translate-y-1"
        >
          <div className="h-2 w-2 flex-shrink-0 rounded-full border-none bg-green-500" />
          <span className="text-lg font-bold">{todo}</span>
        </div>
        <span className="flex items-end text-xs">{createdAt}</span>
        <button onClick={onDelete} className="flex items-end text-red-600">
          x
        </button>
      </div>
    );
  }
}
