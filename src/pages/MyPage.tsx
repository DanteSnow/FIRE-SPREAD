import CompletedTodoList from "../components/CompletedTodoList";
import CompletedTodoListSection from "../components/CompletedTodoListSection";
import GuestBookList from "../components/GuestBookList";
import TodayTodoList from "../components/TodayTodoList";

export default function MyPage() {
  return (
    <section>
      <article className="mx-auto w-full">
        <header>
          <h1 className="m-9 flex w-52 rounded-3xl border-2 p-4 text-center text-lg font-bold">
            TODO
          </h1>
        </header>
        <div className="flex overflow-x-auto pl-10">
          <TodayTodoList />
        </div>

        <h1 className="m-9 flex w-52 rounded-3xl border-2 p-4 text-center text-lg font-bold">
          COMPLETED
        </h1>
        <div className="flex overflow-x-auto pl-10">
          <CompletedTodoList />
        </div>
      </article>
      <article className="mx-auto w-full">
        <h1 className="m-9 flex w-52 rounded-3xl border-2 p-4 text-center text-lg font-bold">
          DAY BY DAY
        </h1>
        <div className="flex gap-6 overflow-x-auto pl-10">
          <CompletedTodoListSection />
        </div>
      </article>
      <article className="mx-auto w-full">
        <h1 className="m-9 flex w-52 rounded-3xl border-2 p-4 text-center text-lg font-bold">
          GuestBook
        </h1>
        <div className="m-9">
          <GuestBookList />
        </div>
      </article>
    </section>
  );
}
