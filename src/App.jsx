
import { useState } from "react";
import { Navigate, Route, Routes } from "react-router";
import Navbar from "./components/Navbar";
import SignupPage from "./pages/SignupPage";
import Homepage from "./pages/Homepage";
import SignInPage from "./pages/SigninPage";
import Dashboard from "./pages/Dashboard";
import MySessions from "./pages/MySessions";
import { logout } from "./services/authService";
import ExploreSkills from "./pages/ExploreSkills";
import AddSkill from "./pages/AddSkill";
import SkillDetails from "./pages/SkillDetails";
import EditSkill from "./pages/EditSkill";
import SessionRequest from "./pages/SessionRequest"
import Chat from "./pages/Chat";
import Messages from "./pages/Messages";

function App() {
  function getUserFromToken() {
    const token = localStorage.getItem("token");

    if (!token) return null;

    return JSON.parse(atob(token.split(".")[1]));
  }

  const [user, setUser] = useState(getUserFromToken());

  function handleLogout() {
    logout();
    setUser(null);
  }

  return (
    <div>
      <Navbar user={user} handleLogout={handleLogout} />

      <Routes>
        <Route path="/" element={<Homepage />} />

        <Route path="/sign-up" element={<SignupPage />} />
        <Route
          path="/sign-in"
          element={<SignInPage setUser={setUser} />}
        />

        <Route
          path="/profile"
          element={
            user ? <Dashboard user={user} /> : <Navigate to="/sign-in" />
          }
        />

        <Route
          path="/dashboard"
          element={
            user ? <Dashboard user={user} /> : <Navigate to="/sign-in" />
          }
        />

        <Route path="/my-sessions" element={user ? <MySessions user={user} /> : <Navigate to="/sign-in" />} />


        <Route path="/skills" element={<ExploreSkills />} />
        <Route
          path="/skills/new"
          element={user ? <AddSkill /> : <Navigate to="/sign-in" />}
        />
        <Route path="/skills/:id" element={<SkillDetails user={user} />} />
        <Route
          path="/skills/:id/edit"
          element={user ? <EditSkill /> : <Navigate to="/sign-in" />}
        />

        <Route path="/sessions/create/:skillId" element={<SessionRequest />} />
        <Route
  path="/chat/:userId"
  element={user ? <Chat /> : <Navigate to="/sign-in" />}
/>
<Route
  path="/messages"
  element={user ? <Messages /> : <Navigate to="/sign-in" />}
/>
      </Routes>
    
    </div>
  );
}

export default App;
