import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import LoadingSpinner from "./LoadingSpinner";
import { useRecoilState } from "recoil";
import { pageMoveLoadingState } from "../atoms/pageMoveLoadingState";
import homeIcon from "../images/home.svg";
import userIcon from "../images/userCircle.svg";
import logoutIcon from "../images/logout.svg";

export default function Navigation() {
  const [loading, setLoading] = useRecoilState(pageMoveLoadingState);
  const navigate = useNavigate();

  const onSignOut = async () => {
    const ok = confirm("로그아웃 하시겠습니까?");
    if (ok) {
      await auth.signOut();
      setLoading(true);
      navigate("/");
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setLoading(false);
    }
  };

  const handleClick = async (path: string) => {
    setLoading(true);
    navigate(path);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);
  };

  return (
    <nav className="flex flex-col justify-center gap-2">
      {loading && <LoadingSpinner />}
      <div
        onClick={() => handleClick("/homepage")}
        className="h-13 flex w-full cursor-pointer items-center gap-3 rounded-2xl bg-gray-700 p-3 text-white transition-transform duration-300 hover:-translate-x-1 hover:-translate-y-1"
      >
        <img className="h-7" src={homeIcon} />
        <span className="text-sm font-bold">HOME</span>
      </div>
      <div
        onClick={() => handleClick("/mypage")}
        className="h-13 flex w-full cursor-pointer items-center gap-3 rounded-2xl bg-gray-700 p-3 text-white transition-transform duration-300 hover:-translate-x-1 hover:-translate-y-1"
      >
        <img className="h-7" src={userIcon} />
        <span className="text-sm font-bold ">MY PAGE</span>
      </div>
      <div
        onClick={onSignOut}
        className="h-13 flex w-full cursor-pointer items-center gap-3 rounded-2xl bg-gray-700 p-3 text-white transition-transform duration-300 hover:-translate-x-1 hover:-translate-y-1"
      >
        <img className="h-7" src={logoutIcon} />
        <span className="text-sm font-bold ">LOG OUT</span>
      </div>
    </nav>
  );
}
