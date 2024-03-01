import { Outlet } from "react-router-dom";

export default function MainLayout(): JSX.Element {
  return (
    <>
      <div className="flex h-screen w-screen items-center justify-center bg-gray-400">
        <div className="flex w-3/4 rounded-3xl bg-black text-white">
          <div className="flex-1 rounded-l-3xl bg-gray-700 p-4">
            <h1 className="text-center">메뉴바 내용</h1>
          </div>
          <main className="flex w-3/4 flex-col gap-12 text-white">
            <header className="rounded-tr-3xl bg-gray-500 py-16 pl-10">
              <h1 className="text-xl font-bold">여기에 로고랑 간단한 설명</h1>
            </header>
            {<Outlet />}
          </main>
        </div>
      </div>
    </>
  );
}
