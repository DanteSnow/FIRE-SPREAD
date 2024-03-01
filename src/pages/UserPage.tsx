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
    <section>
      <section className="mx-auto w-full">
        <h1 className="m-9 flex w-52 rounded-3xl border-2 p-4 text-center text-lg font-bold">
          {userName} TODO
        </h1>
        <article className="flex overflow-x-auto pl-10">
          <div className="h-52">
            {todos.map((todo) => (
              <UserTodayTodo key={todo.id} {...todo} />
            ))}
          </div>
        </article>
      </section>
      <section className="mx-auto w-full">
        <h1 className="m-9 flex w-52 rounded-3xl border-2 p-4 text-center text-lg font-bold">
          {userName} COMPLETED
        </h1>
        <article className="flex gap-6 overflow-x-auto px-10">
          {Object.entries(groupedTodos).map(([date, todosForDate]) => (
            <div key={date}>
              <h3 className="pb-2 pl-4 text-xl font-bold">{date}</h3>
              <div className="flex h-64 w-52 flex-col overflow-x-auto rounded-3xl border-2 p-6">
                {todosForDate.map((todo) => (
                  <div key={todo.id} className="mb-2 flex text-nowrap">
                    {todo.todo}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </article>
      </section>
      <section className="mx-auto w-full">
        <h1 className="m-9 flex w-52 rounded-3xl border-2 p-4 text-center text-lg font-bold">
          GUESTBOOK
        </h1>
        <article className="m-9">
          <UserGuestBookList userId={userId as string} />
        </article>
      </section>
    </section>
  );
}
