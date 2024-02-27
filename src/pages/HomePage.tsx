import HomeCompletedTodoListSection from "../components/HomeCompletedTodoListSection";
import HomeTodayTodoList from "../components/HomeTodayTodoList";

export default function HomePage() {
  return (
    <>
      <br />
      <div>-</div>
      <h1>모두의 투두리스트 현황</h1>
      <HomeTodayTodoList />
      <div>-</div>
      <br />
      <div>-</div>
      <h1>모두의 투두 완료 현황</h1>
      <HomeCompletedTodoListSection />
      <div>-</div>
    </>
  );
}
