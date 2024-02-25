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
  return <h1 onClick={onSignOut}>로그아웃</h1>;
}
