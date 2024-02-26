import CompletedTodoList from "../components/CompletedTodoList";
import PostTodoForm from "../components/PostTodoForm";
import ReadOnlyCompletedTodoList from "../components/ReadOnlyCompletedTodoList";
import TodayTodoList from "../components/TodayTodoList";

export default function MyPage() {
  return (
    <div>
      <div>
        <h1>마이페이지 입니다</h1>
      </div>
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

      <div>-</div>
      <div>
        <ReadOnlyCompletedTodoList />
      </div>
      <div>-</div>
      <div>
        <h1>읽기 전용 방명록 섹션입니다</h1>
      </div>
    </div>
  );
}
