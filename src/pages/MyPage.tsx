import { useSetRecoilState } from "recoil";
import CompletedTodoList from "../components/CompletedTodoList";
import CompletedTodoListSection from "../components/CompletedTodoListSection";
import GuestBookList from "../components/GuestBookList";
import TodayTodoList from "../components/TodayTodoList";
import { userNameState } from "../atoms/userState";
import React, { useEffect, useState } from "react";
import fireIcon from "../images/fire.svg";

export default function MyPage() {
  const setUserName = useSetRecoilState(userNameState);

  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [isDrag, setIsDrag] = useState(false);
  const [startX, setStartX] = useState(0);
  const [initialScrollLeft, setinitialScrollLeft] = useState(0);

  const OnDragStart = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDrag(true);
    setStartX(e.pageX);
    setinitialScrollLeft(scrollRef.current?.scrollLeft || 0);
  };

  const OnDragEnd = () => {
    setIsDrag(false);
  };

  const OnDragMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDrag || !scrollRef.current) return;
    const diff = e.pageX - startX;
    scrollRef.current.scrollLeft = initialScrollLeft - diff;
  };

  useEffect(() => {
    setUserName("MyPage");
  }, [setUserName]);

  return (
    <section>
      <section className="mx-auto w-full">
        <div className="m-9 flex w-3/4 items-center gap-2 rounded-xl border-none bg-gray-500 p-4">
          <img className="w-8" src={fireIcon} />
          <h1 className="text-lg font-bold">TO-DO LIST</h1>
        </div>
        <article className="flex overflow-x-auto py-2 pl-10 scrollbar-hide">
          <TodayTodoList />
        </article>

        <div className="m-9 flex w-3/4 items-center gap-2 rounded-xl border-none bg-gray-500 p-4">
          <img className="w-8" src={fireIcon} />
          <h1 className="text-lg font-bold">COMPLETED LIST</h1>
        </div>
        <article className="flex overflow-x-auto py-2 pl-10 scrollbar-hide">
          <CompletedTodoList />
        </article>
      </section>
      <section className="mx-auto w-full">
        <div className="m-9 flex w-3/4 items-center gap-2 rounded-xl border-none bg-gray-500 p-4">
          <img className="w-8" src={fireIcon} />
          <h1 className="text-lg font-bold">COMPLETED LIST</h1>
          <span className="text-sm">by date</span>
        </div>
        <article
          ref={scrollRef}
          onMouseDown={OnDragStart}
          onMouseUp={OnDragEnd}
          onMouseLeave={OnDragEnd}
          onMouseMove={OnDragMove}
          className="flex gap-6 overflow-x-auto px-10 scrollbar-hide"
        >
          <CompletedTodoListSection />
        </article>
      </section>
      <section>
        <div className="m-9 flex w-3/4 items-center gap-2 rounded-xl border-none bg-gray-500 p-4">
          <img className="w-8" src={fireIcon} />
          <h1 className="text-lg font-bold">GUESTBOOK</h1>
        </div>
        <article className="m-9">
          <GuestBookList />
        </article>
      </section>
    </section>
  );
}
