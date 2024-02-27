import { useNavigate, useParams } from "react-router-dom";
import { auth } from "../firebase";
import { useEffect } from "react";

export default function UserPage() {
  const { userId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        if (user.uid === userId) {
          navigate("/mypage");
        }
      }
    });
    return () => {
      unsubscribe && unsubscribe();
    };
  });

  return <h1>{userId} 님의 페이지입니다</h1>;
}
