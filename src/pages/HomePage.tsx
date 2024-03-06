import { useSetRecoilState } from "recoil";
import HomeCompletedTodoListSection from "../components/HomeCompletedTodoListSection";
import HomeTodayTodoList from "../components/HomeTodayTodoList";
import { userNameState } from "../atoms/userState";
import React, { useEffect, useState } from "react";
import fireIcon from "../images/fire.svg";

export default function HomePage() {
  const setUserName = useSetRecoilState(userNameState);

  const TodoScrollRef = React.useRef<HTMLDivElement>(null);
  const [TodoIsDrag, setTodoIsDrag] = useState(false);
  const [TodoStartX, setTodoStartX] = useState(0);
  const [TodoInitialScrollLeft, setTodoInitialScrollLeft] = useState(0);

  const CompletedScrollRef = React.useRef<HTMLDivElement>(null);
  const [CompletedIsDrag, setCompletedIsDrag] = useState(false);
  const [CompletedStartX, setCompletedStartX] = useState(0);
  const [CompletedInitialScrollLeft, setCompletedInitialScrollLeft] =
    useState(0);

  const TodoOnDragStart = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setTodoIsDrag(true);
    setTodoStartX(e.pageX);
    setTodoInitialScrollLeft(TodoScrollRef.current?.scrollLeft || 0);
  };

  const TodoOnDragEnd = () => {
    setTodoIsDrag(false);
  };

  const TodoOnDragMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!TodoIsDrag || !TodoScrollRef.current) return;
    const diff = e.pageX - TodoStartX;
    TodoScrollRef.current.scrollLeft = TodoInitialScrollLeft - diff;
  };

  const CompletedOnDragStart = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setCompletedIsDrag(true);
    setCompletedStartX(e.pageX);
    setCompletedInitialScrollLeft(CompletedScrollRef.current?.scrollLeft || 0);
  };

  const CompletedOnDragEnd = () => {
    setCompletedIsDrag(false);
  };

  const CompletedOnDragMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!CompletedIsDrag || !CompletedScrollRef.current) return;
    const diff = e.pageX - CompletedStartX;
    CompletedScrollRef.current.scrollLeft = CompletedInitialScrollLeft - diff;
  };

  useEffect(() => {
    setUserName("Home");
  }, [setUserName]);

  return (
    <section>
      <article className="mx-auto w-full">
        <div className="ml-9 mt-9 flex w-3/4 items-center gap-2 rounded-xl border-none bg-gray-500 p-4">
          <img className="w-8" src={fireIcon} />
          <h1 className="text-lg font-bold">EVERYONE's TO-DO LIST</h1>
        </div>
        <div
          ref={TodoScrollRef}
          onMouseDown={TodoOnDragStart}
          onMouseUp={TodoOnDragEnd}
          onMouseLeave={TodoOnDragEnd}
          onMouseMove={TodoOnDragMove}
          className="flex gap-6 overflow-x-auto p-10 scrollbar-hide"
        >
          <HomeTodayTodoList />
        </div>
      </article>
      <article className="mx-auto w-full">
        <div className="ml-9 mt-9 flex w-3/4 items-center gap-2 rounded-xl border-none bg-gray-500 p-4">
          <img className="w-8" src={fireIcon} />
          <h1 className="text-lg font-bold">EVERYONE's COMPLETED LIST</h1>
        </div>
        <div
          ref={CompletedScrollRef}
          onMouseDown={CompletedOnDragStart}
          onMouseUp={CompletedOnDragEnd}
          onMouseLeave={CompletedOnDragEnd}
          onMouseMove={CompletedOnDragMove}
          className="mb-10 flex gap-6 overflow-x-auto p-10 scrollbar-hide"
        >
          <HomeCompletedTodoListSection />
        </div>
      </article>
    </section>
  );
}
