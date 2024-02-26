import { ITodo } from "./TodayTodoList";

export default function ReadOnlyCompletedTodo({ todo, complete }: ITodo) {
  if (complete) {
    return (
      <>
        <div>{todo}</div>
      </>
    );
  }
}
