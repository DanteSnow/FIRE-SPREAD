import { useSetRecoilState } from "recoil";
import HomeCompletedTodoListSection from "../components/HomeCompletedTodoListSection";
import HomeTodayTodoList from "../components/HomeTodayTodoList";
import { userNameState } from "../atoms/userState";
import { useEffect } from "react";
import { myNameState } from "../atoms/myNameState";
import { auth } from "../firebase";

export default function HomePage() {
  const setUserName = useSetRecoilState(userNameState);
  const setMyName = useSetRecoilState(myNameState);

  useEffect(() => {
    setUserName("Home");
  }, [setUserName]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setMyName(user.displayName || "");
      } else {
        setMyName("");
      }
    });
    return () => {
      unsubscribe && unsubscribe();
    };
  }, [setMyName]);

  return (
    <section>
      <article className="mx-auto w-full">
        <header>
          <h1 className="ml-9 mt-9 flex w-52 rounded-3xl border-2 p-4 text-center text-lg font-bold">
            TODO
          </h1>
        </header>
        <div className="flex gap-6 overflow-x-auto p-10">
          <HomeTodayTodoList />
        </div>
      </article>
      <article className="mx-auto w-full">
        <h1 className="ml-9 flex w-52 rounded-3xl border-2 p-4 text-center text-lg font-bold">
          COMPLETED
        </h1>
        <div className="mb-10 flex gap-6 overflow-x-auto p-10">
          <HomeCompletedTodoListSection />
        </div>
      </article>
    </section>
  );
}
