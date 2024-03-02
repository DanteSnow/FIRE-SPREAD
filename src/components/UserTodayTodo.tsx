import { ITodo } from "./TodayTodoList";

export default function UserTodayTodo({ todo, complete, createdAt }: ITodo) {
  if (!complete) {
    return (
      <div className="flex items-end gap-2">
        <div className="flex w-1/2 gap-2 rounded-2xl border-2 px-7 py-2">
          <span className="text-lg font-bold">{todo}</span>
        </div>
        <span className="text-xs">{createdAt}</span>
      </div>
    );
  }
}
