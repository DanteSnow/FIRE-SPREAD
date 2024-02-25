import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import MyPage from "./pages/MyPage";
import UserPage from "./pages/UserPage";
import Navigation from "./components/Navigation";
import ProtectedRoute from "./components/ProtectedRoute";
import ConfirmAuthRoute from "./components/ConfirmAuthRoute";

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
        <Route
          path="/signin"
          element={
            <ConfirmAuthRoute>
              <SignInPage />
            </ConfirmAuthRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <ConfirmAuthRoute>
              <SignUpPage />
            </ConfirmAuthRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
