import CompletedTodoList from "../components/CompletedTodoList";
import CompletedTodoListSection from "../components/CompletedTodoListSection";
import GuestBookList from "../components/GuestBookList";
import PostTodoForm from "../components/PostTodoForm";
import TodayTodoList from "../components/TodayTodoList";

export default function MyPage() {
  return (
    <div className="mt-32 flex flex-col gap-32">
      <section className="mx-auto flex flex-col">
        <article className="flex flex-col items-center">
          <div>사진</div>
          <span>이름</span>
          <p>상태메시지</p>
        </article>
      </section>

      <section className="flex flex-col items-center justify-center gap-12">
        <h1 className="mb-5 text-center text-3xl font-bold">오늘의 할일은?</h1>
        <div className="flex flex-row items-center gap-12">
          <article>
            <TodayTodoList />
          </article>
          <article>
            <PostTodoForm />
          </article>
          <article>
            <CompletedTodoList />
          </article>
        </div>
      </section>

      <section>
        <h1 className="mb-5 text-center text-3xl font-bold">완료한 일정들</h1>
        <div className="mx-auto flex w-1/2 justify-center gap-10 rounded-xl border-2 border-black p-5">
          <CompletedTodoListSection />
        </div>
      </section>

      <section className="mx-auto mb-20 flex w-1/2 flex-col">
        <h1 className="mb-5 text-center text-3xl font-bold">방명록</h1>
        <GuestBookList />
      </section>
    </div>
  );
}
