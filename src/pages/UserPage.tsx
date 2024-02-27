import { useParams } from "react-router-dom";

export default function UserPage() {
  const { userId } = useParams();
  return <h1>{userId} 님의 페이지입니다</h1>;
}
