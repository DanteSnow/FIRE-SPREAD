import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import MyPage from "./pages/MyPage";
import UserPage from "./pages/UserPage";
import ProtectedRoute from "./components/ProtectedRoute";
import ConfirmAuthRoute from "./components/ConfirmAuthRoute";
import MainPage from "./pages/MainPage";
import LogInPage from "./pages/LogInPage";
import MainLayout from "./pages/MainLayout";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/userpage/:userId" element={<UserPage />} />
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
