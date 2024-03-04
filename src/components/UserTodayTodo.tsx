import { ITodo } from "./TodayTodoList";

export default function UserTodayTodo({ todo, complete, createdAt }: ITodo) {
  if (!complete) {
    return (
      <div className="flex items-end gap-2">
        <div className="flex w-1/2 items-center gap-3 rounded-2xl border-none bg-gray-700 px-7 py-2">
          <div className="h-2 w-2 rounded-full border-none bg-green-500" />
          <span className="text-lg font-bold">{todo}</span>
        </div>
        <span className="text-xs">{createdAt}</span>
      </div>
    );
  }
}
