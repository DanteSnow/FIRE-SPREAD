import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";

export default function SignUpPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === "name") {
      setName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (isLoading || name === "" || email === "" || password === "") {
      return;
    }
    try {
      setIsLoading(true);
      const credentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      console.log(credentials.user);
      await updateProfile(credentials.user, { displayName: name });
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
      <div>
        <Link to="/">
          <h1>🔥FIRE SPREAD🔥</h1>
        </Link>
        <span>당신의 열정을 퍼뜨려보세요</span>
        <span>
          이미 계정이 있으신가요?
          <Link to="/signin">
            <span>로그인</span>
          </Link>
        </span>
      </div>
      <div>
        <form onSubmit={onSubmit}>
          <input
            onChange={onChange}
            name="name"
            placeholder="name"
            type="text"
            required
            value={name}
          />
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
          <input type="submit" value={isLoading ? "로딩중.." : "회원가입"} />
        </form>
        {error !== "" ? <span>{error}</span> : null}
      </div>
    </>
  );
}
