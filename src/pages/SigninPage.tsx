import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";

export default function SignInPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (isLoading || email === "" || password === "") {
      return;
    }
    try {
      setIsLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/homepage");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-center gap-2   ">
      <div className="flex flex-col items-center justify-center">
        <Link to="/">
          <h1>🔥FIRE SPREAD🔥</h1>
        </Link>
        <span>당신의 열정을 퍼뜨려보세요</span>
      </div>

      <div>
        <form onSubmit={onSubmit} className="flex flex-col gap-2">
          <input
            className="rounded-xl border-2 bg-gray-100 p-3"
            onChange={onChange}
            name="email"
            placeholder="email"
            type="email"
            required
            value={email}
          />
          <input
            className="rounded-xl border-2 bg-gray-100 p-3"
            onChange={onChange}
            name="password"
            placeholder="password"
            type="password"
            required
            value={password}
          />
          <input
            className="cursor-pointer rounded-xl border-2 bg-gray-200 px-3 text-gray-600"
            type="submit"
            value={isLoading ? "로딩중.." : "로그인"}
          />
        </form>
        <div className="flex flex-col items-center p-2">
          <span>
            계정이 없으신가요?
            <Link to="/signup">
              <span className="font-bold"> 회원가입</span>
            </Link>
          </span>
          <span> {error !== "" ? <span>{error}</span> : null}</span>
        </div>
      </div>
    </div>
  );
}
