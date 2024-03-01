import CompletedTodoList from "../components/CompletedTodoList";
import CompletedTodoListSection from "../components/CompletedTodoListSection";
import GuestBookList from "../components/GuestBookList";
import TodayTodoList from "../components/TodayTodoList";

export default function MyPage() {
  return (
    <section>
      <article className="mx-auto w-full">
        <header>
          <h1 className="ml-9 flex w-52 rounded-3xl border-2 p-4 text-center text-lg font-bold">
            TODO
          </h1>
        </header>
        <div className="flex gap-6 overflow-x-auto p-10">
          <TodayTodoList />
        </div>

        <div className="flex gap-6 overflow-x-auto p-10">
          <CompletedTodoList />
        </div>
      </article>
      <article className="mx-auto w-full">
        <h1 className="ml-9 flex w-52 rounded-3xl border-2 p-4 text-center text-lg font-bold">
          COMPLETED
        </h1>
        <div className="mb-10 flex gap-6 overflow-x-auto p-10">
          <CompletedTodoListSection />
        </div>
      </article>
      <article className="mx-auto w-full">
        <h1 className="ml-9 flex w-52 rounded-3xl border-2 p-4 text-center text-lg font-bold">
          GuestBook
        </h1>
        <div className="mb-10 flex gap-6 overflow-x-auto p-10">
          <GuestBookList />
        </div>
      </article>
    </section>
  );
}
