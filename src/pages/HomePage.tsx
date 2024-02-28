import HomeCompletedTodoListSection from "../components/HomeCompletedTodoListSection";
import HomeTodayTodoList from "../components/HomeTodayTodoList";

export default function HomePage() {
  return (
    <section className="flex flex-col gap-12">
      <article className="mx-auto w-1/2">
        <h1 className="mb-3 flex justify-center text-xl font-bold">
          모두의 투두리스트 현황
        </h1>
        <div className="flex justify-center gap-2 border-2 border-solid p-5">
          <HomeTodayTodoList />
        </div>
      </article>
      <article className="mx-auto w-1/2">
        <h1 className="mb-3 flex justify-center text-xl font-bold">
          모두의 투두 완료 현황
        </h1>
        <div className="flex justify-center gap-2 border-2 border-solid p-2">
          <HomeCompletedTodoListSection />
        </div>
      </article>
    </section>
  );
}
