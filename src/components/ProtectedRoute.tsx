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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLogin(true);
      }
      setIsLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (!isLogin && !isLoading) {
    return <Navigate to="/login" />;
  }

  return children;
}
