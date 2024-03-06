import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import homeIcon from "../images/home.svg";
import userIcon from "../images/userCircle.svg";
import logoutIcon from "../images/logout.svg";

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
    <nav className="flex flex-grow flex-col justify-center gap-2">
      <Link to="/homepage">
        <div className="h-13 flex w-full cursor-pointer items-center gap-3 rounded-2xl bg-gray-700 p-3 text-white transition-transform duration-300 hover:-translate-x-1 hover:-translate-y-1 hover:bg-gray-600">
          <img className="h-7" src={homeIcon} />
          <span className="text-sm font-bold">HOME</span>
        </div>
      </Link>
      <Link to="/mypage">
        <div className="h-13 flex w-full cursor-pointer items-center gap-3 rounded-2xl bg-gray-700 p-3 text-white transition-transform duration-300 hover:-translate-x-1 hover:-translate-y-1 hover:bg-gray-600">
          <img className="h-7" src={userIcon} />
          <span className="text-sm font-bold ">MY PAGE</span>
        </div>
      </Link>
      <div
        onClick={onSignOut}
        className="h-13 flex w-full cursor-pointer items-center gap-3 rounded-2xl bg-gray-700 p-3 text-white transition-transform duration-300 hover:-translate-x-1 hover:-translate-y-1 hover:bg-gray-600"
      >
        <img className="h-7" src={logoutIcon} />
        <span className="text-sm font-bold ">LOG OUT</span>
      </div>
    </nav>
  );
}
