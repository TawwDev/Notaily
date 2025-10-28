import { Routes, Route } from "react-router-dom";
import IndexLayout from "./components/layout/IndexLayout"
import HomePage from './pages/HomePage';
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import EditProfilePage from "./pages/ProfilePage/EditProfilePage";
import ProjectPlansPage from "./pages/NoteBooksPage/ProjectPlansPage";
import RoutineNotesPage from "./pages/NoteBooksPage/RoutineNotesPage";
import PlanningPage from "./pages/NoteBooksPage/PlanningPage";
import ReminderPage from "./pages/ReminderPage/ReminderPage";
import BinPage from "./pages/BinPage/BinPage";

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<IndexLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="user-profile" element={<ProfilePage/>} />
          <Route path="edit-profile" element={<EditProfilePage/>} />
          {/* <Route path="/" element={<HomePage />} /> */}
          <Route path="project-plans" element={<ProjectPlansPage/>} />
          <Route path="routine-notes" element={<RoutineNotesPage />} />
          <Route path="planning" element={<PlanningPage />} />
          <Route path="reminder" element={<ReminderPage />} />
          <Route path="bin" element={<BinPage />} />
        </Route>
      </Routes>

    </>
  )
}

export default App
