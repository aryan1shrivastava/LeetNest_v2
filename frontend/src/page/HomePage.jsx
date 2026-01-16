import React, { useEffect } from "react";

import { useProblemStore } from "../store/useProblemStore";
import { Loader } from "lucide-react";
import ProblemTable from "../components/ProblemTable";

const HomePage = () => {
  const { getAllProblems, problems, isProblemsLoading } = useProblemStore();

  useEffect(() => {
    getAllProblems();
  }, [getAllProblems]);

  if (isProblemsLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin text-green-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center mt-14 px-4">
      {/* Background effects */}
      <div className="absolute top-16 left-0 w-1/3 h-1/3 bg-green-500/10 blur-3xl rounded-full animate-pulse"></div>
      <div className="absolute bottom-16 right-0 w-1/3 h-1/3 bg-green-500/10 blur-3xl rounded-full animate-pulse delay-1000"></div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center bg-gradient-to-r from-green-400 to-green-500 bg-clip-text text-transparent">
          Welcome to <span className="text-green-400">LeetNest</span>
        </h1>

        <p className="mt-4 text-center text-lg font-medium text-gray-300 max-w-2xl mx-auto">
          A Platform Inspired by Leetcode which helps you to prepare for coding
          interviews and helps you to improve your coding skills by solving
          coding problems
        </p>

        {problems.length > 0 ? (
          <div className="mt-10">
            <ProblemTable problems={problems} />
          </div>
        ) : (
          <div className="mt-10 text-center">
            <p className="text-lg font-medium text-gray-300 border border-green-500/20 px-6 py-3 rounded-lg bg-gray-800/50 backdrop-blur-sm">
              No problems found
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
