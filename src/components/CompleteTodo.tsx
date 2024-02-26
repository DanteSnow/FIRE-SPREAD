import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { ITodo } from "./TodayTodoList";

export default function ComoleteTodo({ todo, complete, userId, id }: ITodo) {
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
      <>
        {user?.uid === userId ? (
          <button onClick={onCompleteCancel}>-버튼-</button>
        ) : null}
        <div>{todo}</div>
      </>
    );
  }
}
