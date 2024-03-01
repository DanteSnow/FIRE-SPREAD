import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

export default function SignOut() {
  const navigate = useNavigate();
  const onSignOut = async () => {
    const ok = confirm("로그아웃 하시겠습니까?");
    if (ok) {
      await auth.signOut();
      navigate("/");
    }
  };
  return (
    <span
      className="inline-block w-40 cursor-pointer rounded-xl bg-black p-3 text-white"
      onClick={onSignOut}
    >
      로그아웃
    </span>
  );
}
