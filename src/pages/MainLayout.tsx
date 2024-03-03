import { Outlet } from "react-router-dom";
import Navigation from "../components/Navigation";
import MyProfile from "../components/MyProfile";
import PageHeader from "../components/PageHeader";
import SignOut from "../components/SignOut";
import PostTodoForm from "../components/PostTodoForm";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import TodoCounts from "../components/TodoCounts";
import { User } from "firebase/auth";
import AllTodos from "../components/AllTodoCounts";

export default function MainLayout(): JSX.Element {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => {
      unsubscribe();
    };
  });

  return (
    <>
      <div className="flex h-screen w-screen items-center justify-center bg-gray-400">
        <div className="flex h-3/4 w-3/4 rounded-3xl text-white">
          <div className="flex flex-1 flex-col rounded-l-3xl bg-gray-700 p-4">
            <MyProfile />
            <section>
              {currentUser && <TodoCounts userId={currentUser.uid} />}
            </section>
            <section>
              <PostTodoForm />
            </section>
            <section>
              <AllTodos />
            </section>
            <Navigation />
            <div>
              <SignOut />
            </div>
          </div>
          <div className="flex w-3/4 flex-col text-white">
            <PageHeader />
            <main className="gap-12 overflow-auto rounded-br-3xl bg-black">
              {<Outlet />}
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
