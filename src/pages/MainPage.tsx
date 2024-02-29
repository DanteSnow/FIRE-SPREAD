import { Link } from "react-router-dom";
import "../style/style.css";

export default function MainPage() {
  return (
    <div className="flex h-screen w-full">
      <section className="bg-main w-1/2 bg-cover" />
      <section className="relative w-1/2 bg-black">
        <div className=" absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 transform flex-col items-center gap-2">
          <div className="bg-logo h-64 w-64 bg-cover " />
          <h1 className="text-center text-3xl font-bold text-white">
            FIRE SPREAD
          </h1>
          <span className="mt-2 text-center text-lg text-white">
            Share your TO-DO list
            <br />
            to stimulate and motivate each other
          </span>
          <div className="mt-8 flex items-center gap-8">
            <Link to="/login">
              <button className="card w-24 rounded-xl p-2">LogIn</button>
            </Link>
            <Link to="/signup">
              <button className="card w-24 rounded-xl p-2">SignUp</button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
