import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppNavbar from "./components/Navbar"; // ✅ Match the export name
import ProtectedRoute from "./components/ProtectedRoute";
import Contest from "./pages/Contest";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Subjects from "./pages/Subjects";
import ContestType from "./pages/ContestType";
import History from "./pages/History";
import ContestDetails from "./pages/ContestDetails";
import HistoryDetails from "./pages/HistoryDetails";
import ContestPage from "./pages/ContestPage";

export default function App() {
  return (
    <Router>
      <AppNavbar />
      <Routes>
        <Route path="/" element={<h1 className="text-center mt-5">Welcome to QuizApp</h1>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route
          path="/contest"
          element={
            <ProtectedRoute>
              <h2 className="text-center mt-5">{<Contest />}</h2>
            </ProtectedRoute>
          }
        />
        {/* <Route
          path="/history"
          element={
            <ProtectedRoute>
              <h2 className="text-center mt-5">History Page</h2>
            </ProtectedRoute>
          }
        /> */}

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <h2 className="text-center mt-5">Profile Page</h2>
            </ProtectedRoute>
          }
        />
        <Route path="/contest/subjects" element={<ProtectedRoute><Subjects /></ProtectedRoute>} />
        <Route path="/contest/type" element={<ProtectedRoute><ContestType /></ProtectedRoute>} />
        <Route path="/history" element={<ProtectedRoute><History /></ProtectedRoute>} />
        <Route path="/history/:id" element={<ProtectedRoute><HistoryDetails /></ProtectedRoute>} />
        {/* <Route path="/history/:id" element={<ContestDetails />} /> */}
        <Route path="/contest/contest-page" element={<ContestPage />} />
      </Routes>
    </Router>
  );
}
