import { useNavigate, useParams } from "react-router-dom";
import { auth, db } from "../firebase";
import { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { ITodo } from "../components/HomeCompletedTodoListSection";
import UserTodayTodo from "../components/UserTodayTodo";
import PostGuestBookForm from "../components/PostGuestBookForm";
import UserGuestBookList from "../components/UserGuestBookList";

export interface IUserProps {
  userId: string;
}

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
  }, []);

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
    <>
      <div>-</div>
      <div>
        <div>{userName}님의 페이지 입니다.</div>
      </div>
      <div>-</div>
      <br />
      <div>-</div>
      {todos.map((todo) => (
        <UserTodayTodo key={todo.id} {...todo} />
      ))}
      <div>-</div>
      {Object.entries(groupedTodos).map(([date, todosForDate]) => (
        <div key={date}>
          <h3>{date}</h3>
          {todosForDate.map((todo) => (
            <div key={todo.id}>{todo.todo}</div>
          ))}
        </div>
      ))}
      <div>-</div>
      <UserGuestBookList userId={userId as string} />
      <PostGuestBookForm userId={userId as string} />
    </>
  );
}
