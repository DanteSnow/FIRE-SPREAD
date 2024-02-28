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
      <div className="flex flex-row-reverse items-center gap-2">
        {user?.uid === userId ? (
          <button onClick={onCompleteCancel}>x</button>
        ) : null}{" "}
        <span className="text-lg font-bold">{todo}</span>
        <span className="text-xs">{completedAt}</span>
      </div>
    );
  }
}
