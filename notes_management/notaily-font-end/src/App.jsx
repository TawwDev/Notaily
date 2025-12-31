import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import IndexLayout from "./components/layout/HomeLayout/IndexLayout"
import HomePage from './pages/HomePage';
import ProfilePage from "./pages/ProfilePage/ProfilePage/ProfilePage";
import EditProfilePage from "./pages/ProfilePage/EditProfile/EditProfilePage";
import ProjectPlansPage from "./pages/NoteBooksPage/ProjectPlansPage";
import RoutineNotesPage from "./pages/NoteBooksPage/RoutineNotesPage";
import PlanningPage from "./pages/NoteBooksPage/PlanningPage";
import ReminderPage from "./pages/ReminderPage/ReminderPage";
import BinPage from "./pages/BinPage/BinPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import ForgotPassWordPage from "./pages/ForgotPasswordPage/ForgotPasswordPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import ProfileLayout from "./components/layout/ProfileLayout/ProfileLayout";
import PrivateRoutes from "./components/PrivateRoutes/PrivateRoutes";
import GuessLayout from "./components/layout/GuessLayout/GuessLayout";
import GuessPage from "./pages/GuessPage/GuessPage";
import NotebookPage from "./pages/HomePage/NotebookPage";
import { useEffect, useState } from "react";
import { apiAuth } from "./api/AuthenticationApi";
import nprogress from "nprogress";
import "nprogress/nprogress.css";

nprogress.configure({ showSpinner: false });
function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const checkLogin = async () => {
      nprogress.start();
      const introspect = await apiAuth.introspect();
      introspect.result.valid ? setIsLogin(true) : setIsLogin(false);
      setIsLoading(false);
    }
    checkLogin();
  }, [])

  useEffect(() => {
    nprogress.start();

    const timer = setTimeout(() => {
      nprogress.done();
    }, 300);

    return () => {
      clearTimeout(timer);
      nprogress.done();
    };
  }, [location.pathname]);
  if (isLoading) {
    return null;
  }
  return (
    <>
      <Routes>
        {/* ====================== AUTHENTICATION ====================== */}
        <Route path="login" element={!isLogin ? <LoginPage setIsLogin={setIsLogin} /> : <Navigate to="/home-page" />} />
        <Route path="sign-up" element={!isLogin ? <SignUpPage /> : <Navigate to="/home-page" />} />
        <Route path="forgot-password" element={<ForgotPassWordPage />} />

        {/* ====================== IndexLayout ====================== */}
        <Route path="/" element={!isLogin ? <GuessLayout /> : <Navigate to="/home-page" />}>
          <Route index element={<GuessPage />} />
        </Route>

        {/* ====================== IndexLayout ====================== */}
        <Route path="/home-page"
          element={isLogin ? <IndexLayout setIsLogin={setIsLogin} /> : <Navigate to="/login" />}
        >
          <Route index element={<HomePage />} />
          {/* <Route path="create-note" element={<CreateNote />} /> */}
          <Route path="project-plans" element={<ProjectPlansPage />} />
          <Route path="routine-notes" element={<RoutineNotesPage />} />
          <Route path="planning" element={<PlanningPage />} />
          <Route path="reminder" element={<ReminderPage />} />
          <Route path="bin" element={<BinPage />} />
          <Route path="notebook" element={<NotebookPage />} />
        </Route>

        {/* ====================== ProfileLayout ====================== */}
        <Route path="/profile"
          element={isLogin ? <ProfileLayout /> : <Navigate to="/login" />}
        >
          <Route index element={<ProfilePage />} />
          <Route path="edit-profile" element={<EditProfilePage />} />
        </Route>
        <Route path="*" element={<Navigate to={isLogin ? "/home-page" : "/"} />} />
      </Routes>
    </>
  )
}

export default App
