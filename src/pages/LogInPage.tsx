import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";

export default function LogInPage() {
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
    <div className="absolute h-full w-full bg-black">
      <div className="absolute left-1/2 top-1/2 m-auto w-80 -translate-x-1/2 -translate-y-1/2 transform items-center text-white">
        <div className="flex flex-col items-center justify-center">
          <Link to="/">
            <div className="bg-logo h-64 w-64 bg-cover" />
          </Link>
          <h1 className="pt-3 text-3xl text-white">LogIn</h1>
        </div>
        <div className="mb-3 flex flex-col items-center p-2">
          <span>
            Don't have an account?
            <Link to="/signup">
              <span className="font-bold hover:text-orange-500"> Sign Up</span>
            </Link>
          </span>
          <span> {error !== "" ? <span>{error}</span> : null}</span>
        </div>
        <div>
          <form onSubmit={onSubmit} className="flex flex-col gap-2">
            <input
              className="focus:border-teal rounded-xl border-2 bg-black p-3 hover:border-orange-400 focus:border-orange-500 focus:outline-none focus:ring-0"
              onChange={onChange}
              name="email"
              placeholder="email"
              type="email"
              required
              value={email}
            />
            <input
              className="rounded-xl border-2 bg-black p-3 hover:border-orange-400 focus:border-orange-500 focus:outline-none focus:ring-0"
              onChange={onChange}
              name="password"
              placeholder="password"
              type="password"
              required
              value={password}
            />
            <button className="card mt-2 w-24 rounded-xl p-2">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}
