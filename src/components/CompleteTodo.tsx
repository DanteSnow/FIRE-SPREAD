import { ITodo } from "./TodayTodoList";

export default function CompleteTodo({ todo, complete }: ITodo) {
  if (complete) {
    return <div>{todo}</div>;
  }
}
