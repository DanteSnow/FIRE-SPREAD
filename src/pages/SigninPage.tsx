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
      navigate("/");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <header>
        <Link to="/">
          <h1>🔥FIRE SPREAD🔥</h1>
        </Link>
        <span>당신의 열정을 퍼뜨려보세요</span>
        <span>
          계정이 없으신가요?
          <Link to="/signup">
            <span>회원가입</span>
          </Link>
        </span>
      </header>
      <section>
        <form onSubmit={onSubmit}>
          <input
            onChange={onChange}
            name="email"
            placeholder="email"
            type="email"
            required
            value={email}
          />
          <input
            onChange={onChange}
            name="password"
            placeholder="password"
            type="password"
            required
            value={password}
          />
          <input type="submit" value={isLoading ? "로딩중.." : "로그인"} />
        </form>
        {error !== "" ? <span>{error}</span> : null}
      </section>
    </>
  );
}
