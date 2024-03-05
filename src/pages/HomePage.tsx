import { useSetRecoilState } from "recoil";
import HomeCompletedTodoListSection from "../components/HomeCompletedTodoListSection";
import HomeTodayTodoList from "../components/HomeTodayTodoList";
import { userNameState } from "../atoms/userState";
import { useEffect } from "react";
import fireIcon from "../images/fire.svg";

export default function HomePage() {
  const setUserName = useSetRecoilState(userNameState);

  useEffect(() => {
    setUserName("Home");
  }, [setUserName]);

  return (
    <section>
      <article className="mx-auto w-full">
        <div className="ml-9 mt-9 flex w-3/4 items-center gap-2 rounded-xl border-none bg-gray-500 p-4">
          <img className="w-8" src={fireIcon} />
          <h1 className="text-lg font-bold">EVERYONE's TO-DO LIST</h1>
        </div>
        <div className="scrollbar-hide flex gap-6 overflow-x-auto p-10">
          <HomeTodayTodoList />
        </div>
      </article>
      <article className="mx-auto w-full">
        <div className="ml-9 mt-9 flex w-3/4 items-center gap-2 rounded-xl border-none bg-gray-500 p-4">
          <img className="w-8" src={fireIcon} />
          <h1 className="text-lg font-bold">EVERYONE's COMPLETED LIST</h1>
        </div>
        <div className="scrollbar-hide mb-10 flex gap-6 overflow-x-auto p-10">
          <HomeCompletedTodoListSection />
        </div>
      </article>
    </section>
  );
}
