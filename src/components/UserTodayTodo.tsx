import { ITodo } from "./TodayTodoList";

export default function UserTodayTodo({ todo, complete, createdAt }: ITodo) {
  if (!complete) {
    return (
      <>
        <div>{todo}</div>
        <div>
          <span>생성날짜</span>
          {createdAt}
        </div>
      </>
    );
  }
}
