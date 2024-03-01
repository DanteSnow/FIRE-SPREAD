import { Outlet } from "react-router-dom";
import Navigation from "../components/Navigation";
import UserProfile from "../components/UserProfile";
import PageHeader from "../components/PageHeader";
import SignOut from "../components/SignOut";

export default function MainLayout(): JSX.Element {
  return (
    <>
      <div className="flex h-screen w-screen items-center justify-center bg-gray-400">
        <div className="flex w-3/4 rounded-3xl bg-black text-white">
          <div className="flex flex-1 flex-col items-center rounded-l-3xl bg-gray-700 p-4">
            <UserProfile />
            <Navigation />
            <div className="mt-auto">
              <SignOut />
            </div>
          </div>
          <main className="flex w-3/4 flex-col gap-12 text-white">
            <PageHeader />
            {<Outlet />}
          </main>
        </div>
      </div>
    </>
  );
}
