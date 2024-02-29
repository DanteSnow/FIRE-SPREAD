import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import MyPage from "./pages/MyPage";
import UserPage from "./pages/UserPage";
import Navigation from "./components/Navigation";
import ProtectedRoute from "./components/ProtectedRoute";
import ConfirmAuthRoute from "./components/ConfirmAuthRoute";
import MainPage from "./pages/MainPage";
import LogInPage from "./pages/LogInPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route element={<Navigation />}>
          <Route
            path="/homepage"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mypage"
            element={
              <ProtectedRoute>
                <MyPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/userpage/:userId"
            element={
              <ProtectedRoute>
                <UserPage />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route
          path="/login"
          element={
            <ConfirmAuthRoute>
              <LogInPage />
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
