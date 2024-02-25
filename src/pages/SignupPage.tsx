import { Link } from "react-router-dom";

export default function SignupPage() {
  return (
    <>
      <header>
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
      </header>
      <section>
        <form>
          <input name="name" placeholder="name" type="text" required />
          <input name="email" placeholder="email" type="email" required />
          <input
            name="password"
            placeholder="password"
            type="password"
            required
          />
        </form>
      </section>
    </>
  );
}
