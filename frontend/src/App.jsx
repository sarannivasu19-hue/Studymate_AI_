import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";

import AITutor from "./pages/AITutor";
import PDFLearning from "./pages/PDFLearning";
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

      {/* Redirect */}

      <Route
        path="/"
        element={
          <Navigate
            to={isAuthed() ? "/dashboard" : "/login"}
            replace
          />
        }
      />

      {/* Authentication */}

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/signup"
        element={<Signup />}
      />

      {/* Student Dashboard */}

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* AI Tutor */}

      <Route
        path="/ai-tutor"
        element={
          <ProtectedRoute>
            <AITutor />
          </ProtectedRoute>
        }
      />

      {/* PDF Learning */}

      <Route
        path="/pdf-learning"
        element={
          <ProtectedRoute>
            <PDFLearning />
          </ProtectedRoute>
        }
      />

      {/* AI Notes */}

      <Route
        path="/ai-notes"
        element={
          <ProtectedRoute>
            <AINotes />
          </ProtectedRoute>
        }
      />

      {/* Adaptive Quiz */}

      <Route
        path="/adaptive-quiz"
        element={
          <ProtectedRoute>
            <AdaptiveQuiz />
          </ProtectedRoute>
        }
      />

      {/* Flashcards */}

      <Route
        path="/flashcards"
        element={
          <ProtectedRoute>
            <Flashcards />
          </ProtectedRoute>
        }
      />

      {/* Voice Learning */}

      <Route
        path="/voice-learning"
        element={
          <ProtectedRoute>
            <VoiceLearning />
          </ProtectedRoute>
        }
      />

      {/* Multi Language */}

      <Route
        path="/multi-language"
        element={
          <ProtectedRoute>
            <MultiLanguage />
          </ProtectedRoute>
        }
      />

      {/* ---------------- ADMIN ---------------- */}

      <Route
        path="/admin"
        element={<AdminLogin />}
      />

      <Route
        path="/admin/dashboard"
        element={<AdminDashboard />}
      />

      <Route
        path="/admin/users"
        element={<Users />}
      />

      {/* 404 */}

      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />

    </Routes>
  );
}