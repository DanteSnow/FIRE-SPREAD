import CompleteButton from "./CompleteButton";
import { ITodo } from "./TodayTodoList";

export default function TodayTodo({ todo, complete }: ITodo) {
  if (!complete) {
    return (
      <>
        <CompleteButton />
        <div>{todo}</div>
      </>
    );
  }
}
