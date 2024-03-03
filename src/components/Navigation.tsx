import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <nav className="flex flex-col">
      <Link to="/homepage">
        <div className="w-40 cursor-pointer rounded-xl bg-black p-3 text-white">
          홈
        </div>
      </Link>
      <Link to="/mypage">
        <div className="w-40 cursor-pointer rounded-xl bg-black p-3 text-white">
          마이페이지
        </div>
      </Link>
    </nav>
  );
}
