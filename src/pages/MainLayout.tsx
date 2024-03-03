import { Outlet } from "react-router-dom";
import Navigation from "../components/Navigation";
import MyProfile from "../components/MyProfile";
import PageHeader from "../components/PageHeader";
import SignOut from "../components/SignOut";
import PostTodoForm from "../components/PostTodoForm";
import { auth } from "../firebase";
import TodoCounts from "../components/TodoCounts";

export default function MainLayout(): JSX.Element {
  const currentUserId = auth.currentUser?.uid;

  return (
    <>
      <div className="flex h-screen w-screen items-center justify-center bg-gray-400">
        <div className="flex h-3/4 w-3/4 rounded-3xl bg-black text-white">
          <div className="flex flex-1 flex-col rounded-l-3xl bg-gray-700 p-4">
            <MyProfile />
            <section>
              <h1>내 진행상황은?</h1>
              <TodoCounts userId={currentUserId} />
            </section>
            <PostTodoForm />
            <section>
              <h1>다른 사람들의 진행상황은?</h1>
              <TodoCounts />
            </section>
            <Navigation />
            <div>
              <SignOut />
            </div>
          </div>
          <div className="flex w-3/4 flex-col text-white">
            <PageHeader />
            <main className="gap-12 overflow-auto">{<Outlet />}</main>
          </div>
        </div>
      </div>
    </>
  );
}
