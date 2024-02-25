import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import MyPage from "./pages/MyPage";
import UserPage from "./pages/UserPage";
import Navigation from "./components/Navigation";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Navigation />}>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/mypage"
            element={
              <ProtectedRoute>
                <MyPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/userpage"
            element={
              <ProtectedRoute>
                <UserPage />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </BrowserRouter>
  );
}
