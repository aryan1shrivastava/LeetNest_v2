import React, { useState, useMemo } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import {
  Bookmark,
  PencilIcon,
  Trash,
  TrashIcon,
  Plus,
  Code2,
  Clock,
  Users,
  LayoutGrid,
  List,
} from "lucide-react";
import { useActions } from "../store/useAction";
import AddToPlaylistModal from "./AddToPlaylist";
import CreatePlaylistModal from "./CreatePlaylistModal";
import { usePlaylistStore } from "../store/usePlaylistStore";
import ProblemList from "./ProblemList";

const ProblemCard = ({ problem, isSolved, onAddToPlaylist }) => {
  const difficultyColors = {
    EASY: "text-emerald-400",
    MEDIUM: "text-yellow-400",
    HARD: "text-red-500",
  };

  return (
    <div className="relative group">
      {/* Background blur layer */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-300" />

      {/* Main card */}
      <div className="relative bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-green-500/50 transition-all duration-300">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={isSolved}
              readOnly
              className="checkbox checkbox-sm checkbox-success"
            />
            <span
              className={`text-sm font-semibold ${
                difficultyColors[problem.difficulty]
              }`}
            >
              {problem.difficulty}
            </span>
          </div>
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
        </div>

        <Link
          to={`/problem/${problem.id}`}
          className="block group-hover:text-green-400 transition-colors duration-300"
        >
          <h3 className="text-lg font-bold mb-2">{problem.title}</h3>
        </Link>

        <div className="flex flex-wrap gap-2 mb-4">
          {(problem.tags || []).map((tag, idx) => (
            <span
              key={idx}
              className="px-2 py-1 text-xs font-medium bg-gray-700/50 text-gray-300 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-400">
          <div className="flex items-center gap-1">
            <Code2 className="w-4 h-4" />
            <span>{problem.submissions || 0} submissions</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{problem.solvedBy?.length || 0} solved</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProblemsTable = ({ problems }) => {
  const { authUser } = useAuthStore();
  const { onDeleteProblem } = useActions();
  const { createPlaylist } = usePlaylistStore();
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("ALL");
  const [selectedTag, setSelectedTag] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isAddToPlaylistModalOpen, setIsAddToPlaylistModalOpen] =
    useState(false);
  const [selectedProblemId, setSelectedProblemId] = useState(null);
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'

  // Extract all unique tags from problems
  const allTags = useMemo(() => {
    if (!Array.isArray(problems)) return [];
    const tagsSet = new Set();
    problems.forEach((p) => p.tags?.forEach((t) => tagsSet.add(t)));
    return Array.from(tagsSet);
  }, [problems]);

  // Filter problems based on search, difficulty, and tags
  const filteredProblems = useMemo(() => {
    return (problems || [])
      .filter((problem) =>
        problem.title.toLowerCase().includes(search.toLowerCase())
      )
      .filter((problem) =>
        difficulty === "ALL" ? true : problem.difficulty === difficulty
      )
      .filter((problem) =>
        selectedTag === "ALL" ? true : problem.tags?.includes(selectedTag)
      );
  }, [problems, search, difficulty, selectedTag]);

  // Pagination logic
  const itemsPerPage = 6;
  const totalPages = Math.ceil(filteredProblems.length / itemsPerPage);
  const paginatedProblems = useMemo(() => {
    return filteredProblems.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  }, [filteredProblems, currentPage]);

  const handleDelete = (id) => {
    onDeleteProblem(id);
  };

  const handleCreatePlaylist = async (data) => {
    await createPlaylist(data);
  };

  const handleAddToPlaylist = (problemId) => {
    setSelectedProblemId(problemId);
    setIsAddToPlaylistModalOpen(true);
  };

  return (
    <div className="w-full max-w-7xl mx-auto mt-10">
      {/* Header with Create Playlist Button and View Toggle */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Problems</h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-gray-800/50 p-1 rounded-lg">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                viewMode === "grid"
                  ? "bg-green-500/20 text-green-400"
                  : "text-gray-400 hover:text-gray-300"
              }`}
            >
              <LayoutGrid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                viewMode === "list"
                  ? "bg-green-500/20 text-green-400"
                  : "text-gray-400 hover:text-gray-300"
              }`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
          <button
            className="btn bg-green-600 hover:bg-green-700 text-white gap-2"
            onClick={() => setIsCreateModalOpen(true)}
          >
            <Plus className="w-4 h-4" />
            Create Playlist
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4 mb-8 p-4 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50">
        <div className="flex-1 min-w-[200px]">
          <div className="relative">
            <input
              type="text"
              placeholder="Search problems..."
              className="w-full px-4 py-2 bg-gray-800/80 border border-gray-700 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-transparent transition-all duration-200"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search problems"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 flex-wrap">
          {/* Difficulty Buttons */}
          <div className="flex items-center gap-2">
            <div className="text-sm font-medium text-gray-400 mr-2">
              Difficulty:
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setDifficulty("ALL")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  difficulty === "ALL"
                    ? "bg-green-500/20 text-green-400 border border-green-500/30"
                    : "bg-gray-800/80 text-gray-300 border border-gray-700 hover:bg-gray-700/80"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setDifficulty("EASY")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  difficulty === "EASY"
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                    : "bg-gray-800/80 text-gray-300 border border-gray-700 hover:bg-gray-700/80"
                }`}
              >
                Easy
              </button>
              <button
                onClick={() => setDifficulty("MEDIUM")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  difficulty === "MEDIUM"
                    ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                    : "bg-gray-800/80 text-gray-300 border border-gray-700 hover:bg-gray-700/80"
                }`}
              >
                Medium
              </button>
              <button
                onClick={() => setDifficulty("HARD")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  difficulty === "HARD"
                    ? "bg-red-500/20 text-red-400 border border-red-500/30"
                    : "bg-gray-800/80 text-gray-300 border border-gray-700 hover:bg-gray-700/80"
                }`}
              >
                Hard
              </button>
            </div>
          </div>

          {/* Tags Dropdown */}
          <div className="relative">
            <select
              className="appearance-none px-4 py-2 bg-gray-800/80 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-transparent transition-all duration-200 cursor-pointer"
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              aria-label="Filter by tag"
            >
              <option value="ALL" className="bg-gray-800 text-gray-100">
                All Tags
              </option>
              {allTags.map((tag) => (
                <option
                  key={tag}
                  value={tag}
                  className="bg-gray-800 text-gray-100"
                >
                  {tag}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Problems Display */}
      <div className="mt-6">
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedProblems.map((problem) => (
              <ProblemCard
                key={problem.id}
                problem={problem}
                isSolved={problem.solvedBy?.some(
                  (user) => user.userId === authUser?.id
                )}
                onAddToPlaylist={handleAddToPlaylist}
              />
            ))}
          </div>
        ) : (
          <ProblemList
            problems={paginatedProblems}
            onAddToPlaylist={handleAddToPlaylist}
          />
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8 gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              currentPage === page
                ? "bg-green-500/20 text-green-400 border border-green-500/30"
                : "bg-gray-800/80 text-gray-300 border border-gray-700 hover:bg-gray-700/80"
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Modals */}
      <CreatePlaylistModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreatePlaylist}
      />
      <AddToPlaylistModal
        isOpen={isAddToPlaylistModalOpen}
        onClose={() => setIsAddToPlaylistModalOpen(false)}
        problemId={selectedProblemId}
      />
    </div>
  );
};

export default ProblemsTable;
