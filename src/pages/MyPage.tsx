import { useSetRecoilState } from "recoil";
import CompletedTodoList from "../components/CompletedTodoList";
import CompletedTodoListSection from "../components/CompletedTodoListSection";
import GuestBookList from "../components/GuestBookList";
import TodayTodoList from "../components/TodayTodoList";
import { userNameState } from "../atoms/userState";
import { useEffect } from "react";
import fireIcon from "../images/fire.svg";

export default function MyPage() {
  const setUserName = useSetRecoilState(userNameState);

  useEffect(() => {
    setUserName("MyPage");
  }, [setUserName]);

  return (
    <section>
      <section className="mx-auto w-full">
        <div className="m-9 flex w-3/4 items-center gap-2 rounded-xl border-none bg-gray-500 p-4">
          <img className="w-8" src={fireIcon} />
          <h1 className="text-lg font-bold">TO-DO LIST</h1>
        </div>
        <article className="scrollbar-hide flex overflow-x-auto py-2 pl-10">
          <TodayTodoList />
        </article>

        <div className="m-9 flex w-3/4 items-center gap-2 rounded-xl border-none bg-gray-500 p-4">
          <img className="w-8" src={fireIcon} />
          <h1 className="text-lg font-bold">COMPLETED LIST</h1>
        </div>
        <article className="scrollbar-hide flex overflow-x-auto py-2 pl-10">
          <CompletedTodoList />
        </article>
      </section>
      <section className="mx-auto w-full">
        <div className="m-9 flex w-3/4 items-center gap-2 rounded-xl border-none bg-gray-500 p-4">
          <img className="w-8" src={fireIcon} />
          <h1 className="text-lg font-bold">COMPLETED LIST</h1>
          <span className="text-sm">by date</span>
        </div>
        <article className="scrollbar-hide flex gap-6 overflow-x-auto px-10">
          <CompletedTodoListSection />
        </article>
      </section>
      <section>
        <div className="m-9 flex w-3/4 items-center gap-2 rounded-xl border-none bg-gray-500 p-4">
          <img className="w-8" src={fireIcon} />
          <h1 className="text-lg font-bold">GUESTBOOK</h1>
        </div>
        <article className="m-9">
          <GuestBookList />
        </article>
      </section>
    </section>
  );
}
