import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { auth } from "../firebase";
import SignOut from "./SignOut";

export default function Navigation() {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user !== null) {
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <nav>
      <Link to="/">
        <span> 홈 </span>
      </Link>
      <Link to="/mypage">
        <span> 마이페이지 </span>
      </Link>
      {isLogin ? (
        <SignOut />
      ) : (
        <Link to="/signin">
          <span>로그인</span>
        </Link>
      )}

      <Outlet />
    </nav>
  );
}
