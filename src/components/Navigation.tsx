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
    <>
      <nav className="mb-10 flex justify-center gap-10 border-2 p-6">
        <Link to="/">
          <div>
            <span className="cursor-pointer rounded-xl bg-black p-3 text-white">
              {" "}
              홈{" "}
            </span>
          </div>
        </Link>
        <Link to="/mypage">
          <div>
            <span className="cursor-pointer rounded-xl bg-black p-3 text-white">
              {" "}
              마이페이지{" "}
            </span>
          </div>
        </Link>
        {isLogin ? (
          <div>
            <SignOut />
          </div>
        ) : (
          <Link to="/signin">
            <div>
              <span className="cursor-pointer rounded-xl bg-black p-3 text-white">
                로그인
              </span>
            </div>
          </Link>
        )}
      </nav>
      <Outlet />
    </>
  );
}
