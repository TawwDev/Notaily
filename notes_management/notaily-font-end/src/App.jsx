import { Routes, Route } from "react-router-dom";
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

function App() {
  return (
    <>
      <Routes>
        {/* ====================== AUTHENTICATION ====================== */}
        <Route path="login" element={<LoginPage />} />
        <Route path="forgot-password" element={<ForgotPassWordPage />} />
        <Route path="sign-up" element={<SignUpPage />} />

        {/* ====================== IndexLayout ====================== */}
        <Route path="/" element={<IndexLayout />}>
          <Route index element={<HomePage />} />
          {/* <Route path="create-note" element={<CreateNote />} /> */}
          <Route path="project-plans" element={<ProjectPlansPage />} />
          <Route path="routine-notes" element={<RoutineNotesPage />} />
          <Route path="planning" element={<PlanningPage />} />
          <Route path="reminder" element={<ReminderPage />} />
          <Route path="bin" element={<BinPage />} />
        </Route>

        {/* ====================== ProfileLayout ====================== */}
        <Route path="/profile" element={<ProfileLayout />}>
          <Route index element={<ProfilePage />} />
          <Route path="edit-profile" element={<EditProfilePage />} />
        </Route>
      </Routes>

    </>
  )
}

export default App
