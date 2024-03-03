import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import LoadingSpinner from "./LoadingSpinner";
import { useRecoilState } from "recoil";
import { pageMoveLoadingState } from "../atoms/pageMoveLoadingState";

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
    <nav className="flex flex-col">
      {loading && <LoadingSpinner />}
      <div
        onClick={() => handleClick("/homepage")}
        className="w-40 cursor-pointer rounded-xl bg-black p-3 text-white"
      >
        홈
      </div>
      <div
        onClick={() => handleClick("/mypage")}
        className="w-40 cursor-pointer rounded-xl bg-black p-3 text-white"
      >
        마이페이지
      </div>
      <span
        className="inline-block w-40 cursor-pointer rounded-xl bg-black p-3 text-white"
        onClick={onSignOut}
      >
        로그아웃
      </span>
    </nav>
  );
}
