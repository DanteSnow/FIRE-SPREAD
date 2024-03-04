import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { ITodo } from "./TodayTodoList";

export default function CompletedTodo({
  todo,
  complete,
  userId,
  id,
  completedAt,
}: ITodo) {
  const user = auth.currentUser;

  const onCompleteCancel = async () => {
    if (user?.uid !== userId) return;
    try {
      await updateDoc(doc(db, "todo", id), {
        complete: false,
        completedAt: null,
      });
    } catch (error) {
      console.error(error);
    } finally {
      //
    }
  };

  if (complete) {
    return (
      <div className="flex items-end gap-2">
        <div
          onClick={onCompleteCancel}
          className="flex w-1/2 cursor-pointer items-center gap-3 rounded-2xl border-none bg-gray-700 px-7 py-2 transition-transform duration-300 hover:-translate-x-1 hover:-translate-y-1"
        >
          <div className="h-2 w-2 flex-shrink-0 rounded-full border-none bg-orange-500" />
          <span className="text-lg font-bold">{todo}</span>
        </div>
        <span className="text-xs">{completedAt}</span>
      </div>
    );
  }
}
