import React from "react";
import {
  User,
  Code,
  LogOut,
  BookOpen,
  Timer,
  MessageSquare,
  BarChart2,
  Calendar,
} from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { Link, useLocation } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import logo from "../assets/leetsnest.svg";

const Navbar = () => {
  const { authUser } = useAuthStore();
  const location = useLocation();

  const isProfileActive = location.pathname === "/profile";
  const isProblemsActive = location.pathname === "/problems";
  const isChallengeActive = location.pathname === "/challenge";
  const isDiscussActive = location.pathname === "/discuss";
  const isLeaderboardActive = location.pathname === "/leaderboard";

  return (
    <nav className="sticky top-0 z-50 w-full py-4 px-4">
      <div className="flex w-full justify-between items-center mx-auto max-w-7xl bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 p-4 rounded-2xl">
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center group-hover:bg-green-500/20 transition-colors">
            <img src={logo} alt="LeetNest Logo" className="w-6 h-6" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white group-hover:text-green-400 transition-colors">
            LeetNest
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            to="/problems"
            className={`text-base font-medium px-4 py-2 rounded-lg transition-all duration-200 ${
              isProblemsActive
                ? "bg-green-500/20 text-green-400"
                : "text-gray-300 hover:bg-gray-700/50 hover:text-white"
            }`}
          >
            Problems
          </Link>
          <Link
            to="/challenge"
            className={`text-base font-medium px-4 py-2 rounded-lg transition-all duration-200 ${
              isChallengeActive
                ? "bg-green-500/20 text-green-400"
                : "text-gray-300 hover:bg-gray-700/50 hover:text-white"
            }`}
          >
            Challenge
          </Link>
          <Link
            to="/discuss"
            className={`text-base font-medium px-4 py-2 rounded-lg transition-all duration-200 ${
              isDiscussActive
                ? "bg-green-500/20 text-green-400"
                : "text-gray-300 hover:bg-gray-700/50 hover:text-white"
            }`}
          >
            Discuss
          </Link>
          <Link
            to="/leaderboard"
            className={`text-base font-medium px-4 py-2 rounded-lg transition-all duration-200 ${
              isLeaderboardActive
                ? "bg-green-500/20 text-green-400"
                : "text-gray-300 hover:bg-gray-700/50 hover:text-white"
            }`}
          >
            Leaderboard
          </Link>
        </div>

        {/* User Profile and Dropdown */}
        <div className="flex items-center gap-4">
          <div className="dropdown dropdown-end">
            <button
              tabIndex={0}
              className="flex items-center gap-3 px-4 py-2 rounded-lg bg-gray-700/50 hover:bg-gray-700/80 transition-all duration-200"
            >
              <div className="w-8 h-8 rounded-lg overflow-hidden">
                <img
                  src={
                    authUser?.image ||
                    "https://api.dicebear.com/7.x/avataaars/svg?seed=" +
                      authUser?.email
                  }
                  alt="User Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-sm font-medium text-gray-200 hidden md:block">
                {authUser?.name}
              </span>
            </button>

            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 mt-2 bg-gray-800/95 backdrop-blur-sm border border-gray-700/50 rounded-xl shadow-lg w-64"
            >
              {/* User Info Section */}
              <div className="px-3 py-2 border-b border-gray-700/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg overflow-hidden">
                    <img
                      src={
                        authUser?.image ||
                        "https://api.dicebear.com/7.x/avataaars/svg?seed=" +
                          authUser?.email
                      }
                      alt="User Avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-white">
                      {authUser?.name}
                    </span>
                    <span className="text-xs text-gray-400">
                      {authUser?.email}
                    </span>
                  </div>
                </div>
              </div>

              {/* Navigation Links */}
              <div className="py-1">
                {/* Profile Link */}
                <li>
                  <Link
                    to="/profile"
                    className={`flex items-center gap-2 p-3 rounded-lg transition-all duration-200 ${
                      isProfileActive
                        ? "bg-green-500/20 text-green-400"
                        : "text-gray-300 hover:bg-gray-700/50 hover:text-white"
                    }`}
                  >
                    <User className="w-4 h-4" />
                    <span className="font-medium">Profile</span>
                  </Link>
                </li>

                {/* Problems Link */}
                <li>
                  <Link
                    to="/problems"
                    className={`flex items-center gap-2 p-3 rounded-lg transition-all duration-200 ${
                      isProblemsActive
                        ? "bg-green-500/20 text-green-400"
                        : "text-gray-300 hover:bg-gray-700/50 hover:text-white"
                    }`}
                  >
                    <BookOpen className="w-4 h-4" />
                    <span className="font-medium">Problems</span>
                  </Link>
                </li>

                {/* Challenge Link */}
                <li>
                  <Link
                    to="/challenge"
                    className={`flex items-center gap-2 p-3 rounded-lg transition-all duration-200 ${
                      isChallengeActive
                        ? "bg-green-500/20 text-green-400"
                        : "text-gray-300 hover:bg-gray-700/50 hover:text-white"
                    }`}
                  >
                    <Timer className="w-4 h-4" />
                    <span className="font-medium">Challenge</span>
                  </Link>
                </li>

                {/* Discuss Link */}
                <li>
                  <Link
                    to="/discuss"
                    className={`flex items-center gap-2 p-3 rounded-lg transition-all duration-200 ${
                      isDiscussActive
                        ? "bg-green-500/20 text-green-400"
                        : "text-gray-300 hover:bg-gray-700/50 hover:text-white"
                    }`}
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span className="font-medium">Discuss</span>
                  </Link>
                </li>

                {/* Leaderboard Link */}
                <li>
                  <Link
                    to="/leaderboard"
                    className={`flex items-center gap-2 p-3 rounded-lg transition-all duration-200 ${
                      isLeaderboardActive
                        ? "bg-green-500/20 text-green-400"
                        : "text-gray-300 hover:bg-gray-700/50 hover:text-white"
                    }`}
                  >
                    <BarChart2 className="w-4 h-4" />
                    <span className="font-medium">Leaderboard</span>
                  </Link>
                </li>

                {/* Admin Option */}
                {authUser?.role === "ADMIN" && (
                  <li>
                    <Link
                      to="/add-problem"
                      className="flex items-center gap-2 p-3 rounded-lg text-gray-300 hover:bg-gray-700/50 hover:text-white transition-all duration-200"
                    >
                      <Code className="w-4 h-4" />
                      <span className="font-medium">Add Problem</span>
                    </Link>
                  </li>
                )}
              </div>

              {/* Logout Button */}
              <div className="pt-1 border-t border-gray-700/50">
                <li>
                  <LogoutButton className="flex items-center gap-2 p-3 rounded-lg text-gray-300 hover:bg-gray-700/50 hover:text-white transition-all duration-200 w-full">
                    <LogOut className="w-4 h-4" />
                    <span className="font-medium">Logout</span>
                  </LogoutButton>
                </li>
              </div>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
