import { Link } from "react-router-dom";

export default function SigninPage() {
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
        <form>
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
