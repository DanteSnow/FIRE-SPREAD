import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";

export default function Navigation() {
  const navigate = useNavigate();
  const onSignOut = async () => {
    const ok = confirm("로그아웃 하시겠습니까?");
    if (ok) {
      await auth.signOut();
      navigate("/");
    }
  };
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
      <span
        className="inline-block w-40 cursor-pointer rounded-xl bg-black p-3 text-white"
        onClick={onSignOut}
      >
        로그아웃
      </span>
    </nav>
  );
}
