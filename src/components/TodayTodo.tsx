import { ITodo } from "./TodayTodoList";

export default function TodayTodo({ todo, complete }: ITodo) {
  if (!complete) {
    return <div>{todo}</div>;
  }
}
