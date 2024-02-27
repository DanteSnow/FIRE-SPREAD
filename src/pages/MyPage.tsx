import CompletedTodoList from "../components/CompletedTodoList";
import CompletedTodoListSection from "../components/CompletedTodoListSection";
import GuestBookList from "../components/GuestBookList";
import PostTodoForm from "../components/PostTodoForm";
import TodayTodoList from "../components/TodayTodoList";

export default function MyPage() {
  return (
    <div>
      <div>-</div>
      <div>
        <h1>프로필 섹션입니다</h1>
      </div>
      <div>-</div>

      <div>
        <h1>투두 관리 섹션입니다</h1>
        <div>
          <TodayTodoList />
        </div>
        <div>
          <PostTodoForm />
        </div>
        <div>
          <CompletedTodoList />
        </div>
      </div>
      <CompletedTodoListSection />
      <div>
        <GuestBookList />
      </div>
    </div>
  );
}
