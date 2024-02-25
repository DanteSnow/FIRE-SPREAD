import { Link, Outlet } from "react-router-dom";

export default function Navigation() {
  return (
    <nav>
      <Link to="/">
        <span>홈</span>
      </Link>
      <Link to="/mypage">
        <span>마이페이지</span>
      </Link>
      <Link to="/signin">
        <span>로그인</span>
      </Link>
      <Outlet />
    </nav>
  );
}
