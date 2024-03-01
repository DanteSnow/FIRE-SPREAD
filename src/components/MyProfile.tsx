import { useRecoilValue } from "recoil";
import { myNameState } from "../atoms/myNameState";

export default function MyProfile() {
  const myName = useRecoilValue(myNameState);

  return (
    <div className="flex-2 mt-28">
      <div>로그인 유저 사진</div>
      <h1>{myName}</h1>
    </div>
  );
}
