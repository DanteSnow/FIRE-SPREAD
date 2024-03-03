import { useSetRecoilState } from "recoil";
import CompletedTodoList from "../components/CompletedTodoList";
import CompletedTodoListSection from "../components/CompletedTodoListSection";
import GuestBookList from "../components/GuestBookList";
import TodayTodoList from "../components/TodayTodoList";
import { userNameState } from "../atoms/userState";
import { useEffect } from "react";

export default function MyPage() {
  const setUserName = useSetRecoilState(userNameState);

  useEffect(() => {
    setUserName("MyPage");
  }, [setUserName]);

  return (
    <section>
      <section className="mx-auto w-full">
        <h1 className="m-9 flex w-52 rounded-3xl border-2 p-4 text-center text-lg font-bold">
          TODO
        </h1>
        <article className="flex overflow-x-auto py-2 pl-10">
          <TodayTodoList />
        </article>

        <h1 className="m-9 flex w-52 rounded-3xl border-2 p-4 text-center text-lg font-bold">
          COMPLETED
        </h1>
        <article className="flex overflow-x-auto py-2 pl-10">
          <CompletedTodoList />
        </article>
      </section>
      <section className="mx-auto w-full">
        <h1 className="m-9 flex w-52 rounded-3xl border-2 p-4 text-center text-lg font-bold">
          DAY BY DAY
        </h1>
        <article className="flex gap-6 overflow-x-auto px-10">
          <CompletedTodoListSection />
        </article>
      </section>
      <section>
        <h1 className="m-9 flex w-52 rounded-3xl border-2 p-4 text-center text-lg font-bold">
          GuestBook
        </h1>
        <article className="m-9">
          <GuestBookList />
        </article>
      </section>
    </section>
  );
}
