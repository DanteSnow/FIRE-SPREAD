import { useRecoilValue } from "recoil";
import { userNameState } from "../atoms/userState";

export default function PageHeader() {
  const userName = useRecoilValue(userNameState);

  return (
    <header className="rounded-tr-3xl bg-gray-500 py-4 pl-10">
      <h1 className="text-2xl font-bold text-gray-700">{userName}</h1>
    </header>
  );
}
