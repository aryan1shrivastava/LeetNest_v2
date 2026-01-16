import React, { useEffect, useState } from "react";
import { axiosInstance } from "../lib/axios";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { toast } from "react-hot-toast";

const ProblemSolvedByUser = () => {
  const [solvedProblems, setSolvedProblems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSolvedProblems = async () => {
      try {
        const solvedRes = await axiosInstance.get(
          "/problems/get-solved-problems"
        );
        if (solvedRes.data?.data) {
          setSolvedProblems(solvedRes.data.data);
        }
      } catch (error) {
        console.error("Error fetching solved problems:", error);
        toast.error("Failed to load solved problems");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSolvedProblems();
  }, []);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "text-success";
      case "medium":
        return "text-warning";
      case "hard":
        return "text-error";
      default:
        return "text-base-content";
    }
  };

  const getDifficultyBgColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "bg-success/10";
      case "medium":
        return "bg-warning/10";
      case "hard":
        return "bg-error/10";
      default:
        return "bg-base-300";
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="card bg-base-100 shadow-xl mt-8">
      <div className="card-body">
        <h2 className="card-title">Solved Problems</h2>
        <div className="space-y-4">
          {solvedProblems.length === 0 ? (
            <p className="text-base-content/70">No problems solved yet</p>
          ) : (
            solvedProblems.slice(0, 5).map((problem) => (
              <Link
                key={problem.id}
                to={`/problem/${problem.id}`}
                className="flex items-center justify-between p-4 bg-base-200 rounded-xl hover:bg-base-300 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`px-2 py-1 rounded text-sm font-medium ${getDifficultyColor(
                      problem.difficulty
                    )} ${getDifficultyBgColor(problem.difficulty)}`}
                  >
                    {problem.difficulty}
                  </span>
                  <span className="font-medium">{problem.title}</span>
                </div>
                <ChevronRight className="w-5 h-5 text-base-content/70" />
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ProblemSolvedByUser;
