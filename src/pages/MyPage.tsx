import CompleteTodoList from "../components/CompleteTodoList";
import PostTodoForm from "../components/PostTodoForm";
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
          <CompleteTodoList />
        </div>
      </div>

      <div>-</div>
      <div>
        <h1>투두 완료 리스트 섹션입니다</h1>
      </div>
      <div>-</div>
      <div>
        <h1>읽기 전용 방명록 섹션입니다</h1>
      </div>
    </div>
  );
}
