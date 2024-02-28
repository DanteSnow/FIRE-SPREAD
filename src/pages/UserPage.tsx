import { useNavigate, useParams } from "react-router-dom";
import { auth, db } from "../firebase";
import { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { ITodo } from "../components/HomeCompletedTodoListSection";
import UserTodayTodo from "../components/UserTodayTodo";
import UserGuestBookList from "../components/UserGuestBookList";

export default function UserPage() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user?.uid === userId) {
        navigate("/mypage");
      }
    });

    const todoQuery = query(
      collection(db, "todo"),
      where("userId", "==", userId),
    );
    const unsubscribeFirestore = onSnapshot(todoQuery, (snapshot) => {
      const fetchedTodos = snapshot.docs.map((doc) => {
        const { createdAt, todo, userId, username, complete, completedAt } =
          doc.data();
        return {
          createdAt,
          todo,
          userId,
          username,
          complete,
          completedAt,
          id: doc.id,
        };
      });
      setTodos(fetchedTodos);
      setUserName(fetchedTodos[0]?.username);
    });

    return () => {
      unsubscribe && unsubscribe();
      unsubscribeFirestore && unsubscribeFirestore();
    };
  }, [navigate, userId]);

  const groupedTodos = todos.reduce(
    (acc: Record<string, ITodo[]>, todo) => {
      if (todo.completedAt) {
        if (!acc[todo.completedAt]) {
          acc[todo.completedAt] = [];
        }
        acc[todo.completedAt].push(todo);
      }
      return acc;
    },
    {} as Record<string, ITodo[]>,
  );

  return (
    <div className="flex flex-col gap-40">
      <section>
        <div>{userName}님의 페이지 입니다.</div>
      </section>

      <section>
        <h1 className="mb-5 text-center text-3xl font-bold">
          {userName}님의 오늘 할일
        </h1>
        <div className="mx-auto flex w-1/2 items-center justify-center rounded-xl border-2 border-black p-5">
          <article>
            {todos.map((todo) => (
              <UserTodayTodo key={todo.id} {...todo} />
            ))}
          </article>
        </div>
      </section>

      <section className="flex flex-col justify-center">
        <h1 className="mb-5 text-center text-3xl font-bold">
          {userName}님의 오늘 완료한 일정들
        </h1>
        <article className="mx-auto flex w-1/2 justify-center gap-10 rounded-xl border-2 border-black p-10">
          {Object.entries(groupedTodos).map(([date, todosForDate]) => (
            <div className="flex flex-col">
              <h3 className="pb-2 pl-2 text-xl font-bold">{date}</h3>
              <div className="flex flex-col rounded-xl border-2 border-black p-5">
                {todosForDate.map((todo) => (
                  <span key={todo.id}>{todo.todo}</span>
                ))}
              </div>
            </div>
          ))}
        </article>
      </section>

      <section className="mx-auto mb-20 flex w-1/2 flex-col">
        <h1 className="mb-5 text-center text-3xl font-bold">방명록</h1>
        <UserGuestBookList userId={userId as string} />
      </section>
    </div>
  );
}
