import { ITodo } from "./TodayTodoList";

export default function UserTodayTodo({ todo, complete, createdAt }: ITodo) {
  if (!complete) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-lg font-bold">{todo}</span>
        <span className="text-xs">{createdAt}</span>
      </div>
    );
  }
}
