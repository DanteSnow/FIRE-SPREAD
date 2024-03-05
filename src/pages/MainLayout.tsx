import { Outlet } from "react-router-dom";
import Navigation from "../components/Navigation";
import MyProfile from "../components/MyProfile";
import PageHeader from "../components/PageHeader";
import PostTodoForm from "../components/PostTodoForm";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import TodoCounts from "../components/TodoCounts";
import { User } from "firebase/auth";
import AllTodoCounts from "../components/AllTodoCounts";

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
        <div className="flex h-3/4 w-3/4 rounded-3xl text-white shadow-2xl">
          <div className="flex flex-1 flex-col justify-between gap-2 rounded-l-3xl bg-gray-800 p-10">
            <MyProfile />
            <section className="flex justify-center">
              {currentUser && <TodoCounts userId={currentUser.uid} />}
            </section>
            <div className="border-b-2 border-gray-500" />
            <section className="flex-grow">
              <PostTodoForm />
            </section>
            <section className="scrollbar-hide flex flex-grow overflow-auto">
              <AllTodoCounts />
            </section>
            <Navigation />
          </div>
          <div className="flex w-3/4 flex-col text-white">
            <PageHeader />
            <main className="gap-12 overflow-auto rounded-br-3xl bg-gray-600">
              {<Outlet />}
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
