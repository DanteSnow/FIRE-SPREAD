import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user !== null) {
        setIsLogin(true);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  if (!isLogin) {
    return <Navigate to="/signin" />;
  }

  return children;
}
