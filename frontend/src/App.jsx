import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";

import AITutor from "./pages/AITutor";
import PDFLearning from "./pages/PDFLearning";
import PDFLibrary from "./pages/PDFLibrary";
import AdaptiveQuiz from "./pages/AdaptiveQuiz";
import AINotes from "./pages/AINotes";
import MultiLanguage from "./pages/MultiLanguage";
import Flashcards from "./pages/Flashcards";
import VoiceLearning from "./pages/VoiceLearning";

import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import Users from "./pages/admin/Users";

function isAuthed() {
  return Boolean(localStorage.getItem("studymate_token"));
}

function ProtectedRoute({ children }) {
  return isAuthed() ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <Routes>
      {/* Root Redirect */}
      <Route
        path="/"
        element={<Navigate to={isAuthed() ? "/dashboard" : "/login"} replace />}
      />

      {/* Authentication */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Student Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/ai-tutor"
        element={
          <ProtectedRoute>
            <AITutor />
          </ProtectedRoute>
        }
      />

      <Route
        path="/pdf-learning"
        element={
          <ProtectedRoute>
            <PDFLearning />
          </ProtectedRoute>
        }
      />

      <Route
        path="/pdf-library"
        element={
          <ProtectedRoute>
            <PDFLibrary />
          </ProtectedRoute>
        }
      />

      <Route
        path="/ai-notes"
        element={
          <ProtectedRoute>
            <AINotes />
          </ProtectedRoute>
        }
      />

      <Route
        path="/adaptive-quiz"
        element={
          <ProtectedRoute>
            <AdaptiveQuiz />
          </ProtectedRoute>
        }
      />

      <Route
        path="/flashcards"
        element={
          <ProtectedRoute>
            <Flashcards />
          </ProtectedRoute>
        }
      />

      <Route
        path="/voice-learning"
        element={
          <ProtectedRoute>
            <VoiceLearning />
          </ProtectedRoute>
        }
      />

      <Route
        path="/multi-language"
        element={
          <ProtectedRoute>
            <MultiLanguage />
          </ProtectedRoute>
        }
      />

      {/* ---------------- ADMIN ---------------- */}
      <Route path="/admin" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/users" element={<Users />} />

      {/* 404 Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}