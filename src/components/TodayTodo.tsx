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
      <>
        {user?.uid === userId ? (
          <button onClick={onCompleted}>-일정완료버튼-</button>
        ) : null}
        <div>{todo}</div>
        <div>
          <span>생성날짜</span>
          {createdAt}
        </div>
      </>
    );
  }
}
