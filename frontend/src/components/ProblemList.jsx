import React from "react";
import { Link } from "react-router-dom";
import { Code2, Users, Plus } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

const ProblemList = ({ problems, onAddToPlaylist }) => {
  const { authUser } = useAuthStore();
  const difficultyColors = {
    EASY: "text-emerald-400",
    MEDIUM: "text-yellow-400",
    HARD: "text-red-500",
  };

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-left border-b border-gray-700/50">
            <th className="pb-4 text-gray-400 font-medium">Status</th>
            <th className="pb-4 text-gray-400 font-medium">Title</th>
            <th className="pb-4 text-gray-400 font-medium">Difficulty</th>
            <th className="pb-4 text-gray-400 font-medium">Tags</th>
            <th className="pb-4 text-gray-400 font-medium">Stats</th>
            <th className="pb-4 text-gray-400 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {problems.map((problem) => {
            const isSolved = problem.solvedBy?.some(
              (user) => user.userId === authUser?.id
            );

            return (
              <tr
                key={problem.id}
                className="border-b border-gray-700/50 hover:bg-gray-800/50 transition-colors duration-200"
              >
                <td className="py-4">
                  <input
                    type="checkbox"
                    checked={isSolved}
                    readOnly
                    className="checkbox checkbox-sm checkbox-success"
                  />
                </td>
                <td className="py-4">
                  <Link
                    to={`/problem/${problem.id}`}
                    className="text-white hover:text-green-400 transition-colors duration-200"
                  >
                    {problem.title}
                  </Link>
                </td>
                <td className="py-4">
                  <span
                    className={`text-sm font-semibold ${
                      difficultyColors[problem.difficulty]
                    }`}
                  >
                    {problem.difficulty}
                  </span>
                </td>
                <td className="py-4">
                  <div className="flex flex-wrap gap-2">
                    {(problem.tags || []).map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 text-xs font-medium bg-gray-700/50 text-gray-300 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="py-4">
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <div className="flex items-center gap-1">
                      <Code2 className="w-4 h-4" />
                      <span>{problem.submissions || 0}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{problem.solvedBy?.length || 0}</span>
                    </div>
                  </div>
                </td>
                <td className="py-4">
                  <button
                    onClick={() => onAddToPlaylist(problem.id)}
                    className="btn btn-ghost btn-sm btn-circle relative hover:bg-gray-700/50 transition-colors duration-200"
                  >
                    <div className="w-6 h-6 rounded-full border border-gray-600 flex items-center justify-center hover:border-green-500/50 transition-colors duration-200 group">
                      <Plus className="w-3.5 h-3.5 text-gray-400 group-hover:text-green-400 transition-colors duration-200" />
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-gray-200 px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap pointer-events-none shadow-lg border border-gray-700/50">
                        Add to playlist
                      </div>
                    </div>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ProblemList;
