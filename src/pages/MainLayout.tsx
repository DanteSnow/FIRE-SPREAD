import { Outlet } from "react-router-dom";

export default function MainLayout(): JSX.Element {
  return (
    <>
      <div className="flex h-screen w-screen items-center justify-center bg-gray-400">
        <div className="absolute">왼쪽에 고정 네비게이션 바 만들 예정</div>
        <div className="w-3/4 p-10">{<Outlet />}</div>
      </div>
    </>
  );
}
