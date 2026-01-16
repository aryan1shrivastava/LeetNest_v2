import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Mail,
  User,
  Shield,
  Image,
  Trophy,
  Target,
  BarChart2,
  Calendar,
  Award,
  TrendingUp,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ChevronRight,
  Medal,
  Zap,
  Flame,
  Crown,
} from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import ProfileSubmission from "../components/ProfileSubmission.jsx";
import ProblemSolvedByUser from "../components/ProblemSolvedByUser.jsx";
import ProfileStats from "../components/ProfileStats.jsx";

const Profile = () => {
  const { authUser } = useAuthStore();

  return (
    <div className="min-h-screen bg-[#0A0F0D] relative">
      {/* Header with back button */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-row justify-between items-center w-full mb-6">
          <div className="flex items-center gap-3">
            <Link to={"/"} className="btn btn-circle btn-ghost">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-3xl font-bold text-white">Profile</h1>
          </div>
        </div>

        {/* Mesh Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/mesh.svg')] bg-center opacity-10"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0F0D]/50 via-[#0A0F0D]/80 to-[#0A0F0D]"></div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {/* Profile Card - Spans 2 columns */}
          <div className="md:col-span-2 bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="flex-shrink-0">
                <div className="w-24 h-24 rounded-xl overflow-hidden ring-2 ring-[#4ADE80]">
                  <img
                    src={
                      authUser?.image ||
                      "https://api.dicebear.com/7.x/avataaars/svg?seed=" +
                        authUser?.email
                    }
                    alt={authUser?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-2">
                  <h1 className="text-2xl font-bold text-white">
                    {authUser?.name}
                  </h1>
                  <div className="badge badge-success">{authUser?.role}</div>
                </div>
                <p className="text-gray-400 mb-4">{authUser?.email}</p>
                <ProfileStats />
              </div>
            </div>
          </div>

          {/* Difficulty Distribution Card */}
          <div className="md:col-span-2 bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <h2 className="text-xl font-bold text-white mb-6">
              Problem Solving Distribution
            </h2>
            <div className="space-y-4">
              {["easy", "medium", "hard"].map((difficulty) => (
                <div key={difficulty} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="capitalize font-medium text-gray-300">
                      {difficulty}
                    </span>
                    <span className="text-gray-400">0 solved</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${
                        difficulty === "easy"
                          ? "bg-[#4ADE80]/20"
                          : difficulty === "medium"
                          ? "bg-[#FBBF24]/20"
                          : "bg-[#F87171]/20"
                      }`}
                      style={{ width: "0%" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity Card */}
          <div className="md:col-span-2 bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <h2 className="text-xl font-bold text-white mb-6">
              Recent Activity
            </h2>
            <div className="space-y-4">
              <ProfileSubmission />
            </div>
          </div>

          {/* Achievements Card */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <h2 className="text-xl font-bold text-white mb-6">Achievements</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl">
                <div className="p-2 bg-[#4ADE80]/10 rounded-lg">
                  <Medal className="w-6 h-6 text-[#4ADE80]" />
                </div>
                <div>
                  <p className="font-medium text-gray-300">
                    First Problem Solved
                  </p>
                  <p className="text-sm text-gray-400">Not yet achieved</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl">
                <div className="p-2 bg-[#4ADE80]/10 rounded-lg">
                  <Zap className="w-6 h-6 text-[#4ADE80]" />
                </div>
                <div>
                  <p className="font-medium text-gray-300">
                    10 Problems Solved
                  </p>
                  <p className="text-sm text-gray-400">Not yet achieved</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl">
                <div className="p-2 bg-[#4ADE80]/10 rounded-lg">
                  <Flame className="w-6 h-6 text-[#4ADE80]" />
                </div>
                <div>
                  <p className="font-medium text-gray-300">50 Submissions</p>
                  <p className="text-sm text-gray-400">Not yet achieved</p>
                </div>
              </div>
            </div>
          </div>

          {/* Solved Problems Card */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <h2 className="text-xl font-bold text-white mb-6">
              Solved Problems
            </h2>
            <div className="h-[300px] overflow-y-auto pr-2 space-y-4 custom-scrollbar">
              <ProblemSolvedByUser />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
