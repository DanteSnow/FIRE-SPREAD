import { useNavigate, useParams } from "react-router-dom";
import { auth, db } from "../firebase";
import { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { ITodo } from "../components/HomeCompletedTodoListSection";
import UserTodayTodo from "../components/UserTodayTodo";
import UserGuestBookList from "../components/UserGuestBookList";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userNameState } from "../atoms/userState";
import fireIcon from "../images/fire.svg";

export default function UserPage() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [todos, setTodos] = useState<ITodo[]>([]);
  const setUserName = useSetRecoilState(userNameState);
  const userName = useRecoilValue(userNameState);

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
      if (fetchedTodos.length > 0) {
        setUserName(fetchedTodos[0]?.username);
      }
      setTodos(fetchedTodos);
    });

    return () => {
      unsubscribe && unsubscribe();
      unsubscribeFirestore && unsubscribeFirestore();
    };
  }, [setUserName, userId, navigate]);

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
        <div className="m-9 flex w-3/4 items-center gap-2 rounded-xl border-none bg-gray-500 p-4">
          <img className="w-8" src={fireIcon} />
          <h1 className="text-lg font-bold"> {userName}'s TO-DO LIST</h1>
        </div>
        <article className="flex overflow-x-auto pl-10">
          <div className="flex h-72 w-full flex-col gap-2 whitespace-pre-wrap">
            {todos.map((todo) => (
              <UserTodayTodo key={todo.id} {...todo} />
            ))}
          </div>
        </article>
      </section>
      <section className="mx-auto w-full">
        <div className="m-9 flex w-3/4 items-center gap-2 rounded-xl border-none bg-gray-500 p-4">
          <img className="w-8" src={fireIcon} />
          <h1 className="text-lg font-bold"> {userName}'s COMPLETED LIST</h1>
        </div>
        <article className="flex gap-6 overflow-x-auto px-10">
          {Object.entries(groupedTodos).map(([date, todosForDate]) => (
            <div key={date}>
              <h3 className="pb-2 pl-4 text-xl font-bold">{date}</h3>
              <div className="flex h-64 w-52 flex-col overflow-x-auto whitespace-pre-wrap rounded-2xl border-none bg-gray-700 p-6">
                {todosForDate.map((todo) => (
                  <div key={todo.id} className="mb-2 flex items-center gap-3">
                    <img className="w-4" src={fireIcon} />
                    <div className="flex">{todo.todo}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </article>
      </section>
      <section className="mx-auto w-full">
        <div className="m-9 flex w-3/4 items-center gap-2 rounded-xl border-none bg-gray-500 p-4">
          <img className="w-8" src={fireIcon} />
          <h1 className="text-lg font-bold"> {userName}'s GUESTBOOK</h1>
        </div>
        <article className="m-9">
          <UserGuestBookList userId={userId as string} />
        </article>
      </section>
    </section>
  );
}
