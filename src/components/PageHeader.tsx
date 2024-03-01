import { useRecoilValue } from "recoil";
import { userNameState } from "../atoms/userState";

export default function PageHeader() {
  const userName = useRecoilValue(userNameState);

  return (
    <header className="rounded-tr-3xl bg-gray-500 py-16 pl-10">
      <h1 className="text-xl font-bold">{userName}</h1>
    </header>
  );
}
