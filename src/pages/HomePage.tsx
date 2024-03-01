import HomeCompletedTodoListSection from "../components/HomeCompletedTodoListSection";
import HomeTodayTodoList from "../components/HomeTodayTodoList";

export default function HomePage() {
  return (
    <section className="flex flex-col gap-12 bg-black p-10 text-white">
      <article>
        <h1 className="mb-3 flex justify-center text-xl font-bold">
          여기에 로고랑 간단한 설명
        </h1>
      </article>
      <article className="mx-auto w-4/5">
        <h1 className="mb-3 flex justify-center text-xl font-bold">
          모두의 투두리스트 현황
        </h1>
        <div className="flex gap-6 overflow-x-auto rounded-3xl border-2 border-solid p-10">
          <HomeTodayTodoList />
        </div>
      </article>
      <article className="mx-auto w-4/5">
        <h1 className="mb-3 flex justify-center text-xl font-bold">
          모두의 투두 완료 현황
        </h1>
        <div className="flex gap-6 overflow-x-auto rounded-3xl border-2 border-solid p-10">
          <HomeCompletedTodoListSection />
        </div>
      </article>
    </section>
  );
}
