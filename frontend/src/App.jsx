import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Layout from "./layout/Layout";
import HomePage from "./page/HomePage";
import ProblemPage from "./page/ProblemPage";
import LoginPage from "./page/LoginPage";
import SignUpPage from "./page/SignUpPage";
import ProfilePage from "./page/ProfilePage";
import LandingPage from "./page/LandingPage";
import { useAuthStore } from "./store/useAuthStore";
import { Loader } from "lucide-react";
import AdminRoute from "./components/AdminRoute";
import AddProblem from "./page/AddProblem";
import ChallengePage from "./page/ChallengePage";
import DiscussPage from "./page/DiscussPage";
import LeaderboardPage from "./page/LeaderboardPage";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen bg-base-100">
        <Loader className="size-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100 text-base-content">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          className:
            "!bg-base-200 !text-base-content !rounded-lg !shadow-lg !border !border-base-300",
          style: {
            background: "hsl(var(--b2))",
            color: "hsl(var(--bc))",
            padding: "1rem",
            borderRadius: "0.5rem",
            boxShadow:
              "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
          },
          success: {
            className: "!bg-success/10 !text-success !border-success/20",
            icon: "🎉",
          },
          error: {
            className: "!bg-error/10 !text-error !border-error/20",
            icon: "❌",
          },
          loading: {
            className: "!bg-info/10 !text-info !border-info/20",
            icon: "⏳",
          },
        }}
      />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to={"/problems"} />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignUpPage /> : <Navigate to={"/problems"} />}
        />

        {/* Protected Routes with Layout */}
        <Route element={<Layout />}>
          {/* Regular User Routes */}
          <Route
            path="problems"
            element={authUser ? <HomePage /> : <Navigate to={"/login"} />}
          />
          <Route
            path="profile"
            element={authUser ? <ProfilePage /> : <Navigate to={"/login"} />}
          />
          <Route
            path="problem/:id"
            element={authUser ? <ProblemPage /> : <Navigate to={"/login"} />}
          />
          <Route
            path="challenge"
            element={authUser ? <ChallengePage /> : <Navigate to={"/login"} />}
          />
          <Route
            path="discuss"
            element={authUser ? <DiscussPage /> : <Navigate to={"/login"} />}
          />
          <Route
            path="leaderboard"
            element={authUser ? <LeaderboardPage /> : <Navigate to={"/login"} />}
          />

          {/* Admin Routes */}
          <Route element={<AdminRoute />}>
            <Route
              path="add-problem"
              element={authUser ? <AddProblem /> : <Navigate to="/login" />}
            />
          </Route>
        </Route>

        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

export default App;
