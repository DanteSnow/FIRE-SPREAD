import { useNavigate } from "react-router-dom";
import "../style/style.css";
import LoadingSpinner from "../components/LoadingSpinner";
import { useState } from "react";

export default function MainPage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleClick = async (path: string) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);
    navigate(path);
  };

  return (
    <div className="flex h-screen w-full">
      {loading && <LoadingSpinner />}
      <section className="w-1/2 bg-main bg-cover" />
      <section className="relative w-1/2 bg-black">
        <div className=" absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 transform flex-col items-center gap-2">
          <div className="h-64 w-64 bg-logo bg-cover " />
          <h1 className="text-center text-3xl font-bold text-white">
            FIRE SPREAD
          </h1>
          <span className="mt-2 text-center text-lg text-white">
            Share your TO-DO list
            <br />
            to stimulate and motivate each other
          </span>
          <div className="mt-8 flex items-center gap-8">
            <button
              onClick={() => handleClick("/login")}
              className="card w-24 rounded-xl p-2"
            >
              LogIn
            </button>
            <button
              onClick={() => handleClick("/signup")}
              className="card w-24 rounded-xl p-2"
            >
              SignUp
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
