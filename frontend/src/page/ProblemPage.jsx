import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import {
  Play,
  FileText,
  MessageSquare,
  Lightbulb,
  Bookmark,
  Share2,
  Clock,
  ChevronRight,
  BookOpen,
  Terminal,
  Code2,
  Users,
  ThumbsUp,
  Home,
  CheckCircle,
  Plus,
  XCircle,
} from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useProblemStore } from "../store/useProblemStore";
import { getLanguageId } from "../lib/lang";
import { useExecutionStore } from "../store/useExecutionStore";
import { useSubmissionStore } from "../store/useSubmissionStore";
import Submission from "../components/Submission.jsx";
import SubmissionsList from "../components/SubmissionList.jsx";
import Button from "../components/ui/Button";
import { usePlaylistStore } from "../store/usePlaylistStore";
import AddToPlaylist from "../components/AddToPlaylist";
import { toast } from "react-hot-toast";

const ProblemPage = ({ problemId, isChallenge = false }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProblemById, problem, isProblemLoading } = useProblemStore();
  const { getAllPlaylists, playlists } = usePlaylistStore();
  const [showAddToPlaylist, setShowAddToPlaylist] = useState(false);

  const {
    submission: submissions,
    isLoading: isSubmissionsLoading,
    getSubmissionForProblem,
    getSubmissionCountForProblem,
    submissionCount,
  } = useSubmissionStore();

  const [code, setCode] = useState("");
  const [activeTab, setActiveTab] = useState("description");
  const [selectedLanguage, setSelectedLanguage] = useState("JAVA");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [testcases, setTestCases] = useState([]);

  const { executeCode, submission, isExecuting } = useExecutionStore();

  // Add useEffect for auto-scrolling
  useEffect(() => {
    if (submission) {
      const submissionElement = document.getElementById("latest-submission");
      if (submissionElement) {
        submissionElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  }, [submission]);

  useEffect(() => {
    const problemIdToFetch = problemId || id;
    getProblemById(problemIdToFetch);
    getSubmissionCountForProblem(problemIdToFetch);
    if (!isChallenge) {
      getAllPlaylists();
    }
  }, [
    id,
    problemId,
    getProblemById,
    getSubmissionCountForProblem,
    getAllPlaylists,
    isChallenge,
  ]);

  useEffect(() => {
    if (problem) {
      console.log("Problem loaded:", problem);
      console.log("Code snippets:", problem.codeSnippets);
      console.log("Selected language:", selectedLanguage);
      console.log(
        "Code for selected language:",
        problem.codeSnippets?.[selectedLanguage]
      );

      // Set initial code based on selected language
      const initialCode = problem.codeSnippets?.[selectedLanguage] || "";
      console.log("Setting initial code:", initialCode);
      setCode(initialCode);

      setTestCases(
        problem.testcases?.map((tc) => ({
          input: tc.input,
          output: tc.output,
        })) || []
      );
    }
  }, [problem, selectedLanguage]);

  useEffect(() => {
    if (activeTab === "submissions" && id) {
      getSubmissionForProblem(id);
    }
  }, [activeTab, id]);

  const handleLanguageChange = (e) => {
    const lang = e.target.value.toUpperCase();
    setSelectedLanguage(lang);
    console.log("Language changed to:", lang);
    console.log("Available code snippets:", problem?.codeSnippets);
    const newCode = problem?.codeSnippets?.[lang] || "";
    console.log("New code for language:", newCode);
    setCode(newCode);
  };

  const handleRunCode = async (e) => {
    e.preventDefault();
    try {
      const language_id = getLanguageId(selectedLanguage);
      const stdin = problem.testcases.map((tc) => tc.input);
      const expected_outputs = problem.testcases.map((tc) => tc.output);
      const result = await executeCode(
        code,
        language_id,
        stdin,
        expected_outputs,
        id
      );

      if (isChallenge) {
        if (result?.status === "success") {
          toast.success("Challenge completed successfully!");
          navigate("/problems");
        } else {
          toast.error("Some test cases failed. Try again!");
        }
      }
    } catch (error) {
      console.log("Error executing code", error);
      if (isChallenge) {
        toast.error("Error executing code. Please try again.");
      }
    }
  };

  const handleGiveUp = () => {
    if (window.confirm("Are you sure you want to give up this challenge?")) {
      toast.error("Challenge failed.");
      navigate("/problems");
    }
  };

  if (isProblemLoading || !problem) {
    return (
      <div className="flex items-center justify-center h-screen bg-base-200">
        <div className="card bg-base-100 p-8 shadow-xl">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="mt-4 text-base-content/70">Loading problem...</p>
        </div>
      </div>
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "description":
        return (
          <div className="space-y-6">
            <div className="prose max-w-none">
              <h2 className="text-2xl font-bold mb-4">Description</h2>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <div
                  dangerouslySetInnerHTML={{ __html: problem.description }}
                />
              </div>
            </div>

            {problem.examples && problem.examples.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold">Examples:</h3>
                {problem.examples.map((example, index) => (
                  <div
                    key={index}
                    className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
                  >
                    <div className="space-y-2">
                      <p className="font-semibold">Example {index + 1}:</p>
                      <div className="space-y-2">
                        <p>
                          <span className="font-semibold">Input: </span>
                          {example.input}
                        </p>
                        <p>
                          <span className="font-semibold">Output: </span>
                          {example.output}
                        </p>
                        {example.explanation && (
                          <p>
                            <span className="font-semibold">Explanation: </span>
                            {example.explanation}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {problem.constraints && (
              <>
                <h3 className="text-xl font-bold mb-4">Constraints:</h3>
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                  <span className="text-white text-lg">
                    {problem.constraints}
                  </span>
                </div>
              </>
            )}
          </div>
        );
      case "submissions":
        return (
          <div className="space-y-6">
            <SubmissionsList
              submissions={submissions}
              isLoading={isSubmissionsLoading}
            />
          </div>
        );
      case "discussion":
        return (
          <div className="p-4 text-center text-gray-400">
            No discussions yet
          </div>
        );
      case "hints":
        return (
          <div className="p-4">
            {problem?.hints ? (
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <span className="text-white text-lg">{problem.hints}</span>
              </div>
            ) : (
              <div className="text-center text-gray-400">
                No hints available
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen relative">
      {/* Background gradient layers */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800" />

      {/* Animated gradient orbs */}
      <div className="fixed inset-0">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-500/12 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-green-500/12 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-600/8 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      {/* Subtle mesh gradient */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,rgba(74,222,128,0.06),transparent_70%)]" />

      {/* Subtle pattern overlay */}
      <div className="fixed inset-0 opacity-7">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(74,222,128,0.12)_50%,transparent_75%)] bg-[length:20px_20px]" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Top Navigation Bar */}
        <div className="max-w-7xl mx-auto px-4">
          <nav className="sticky top-0 z-40 bg-base-100/80 backdrop-blur-sm border-b border-base-300/50 px-6 py-3 rounded-lg mt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link
                  to="/problems"
                  className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                >
                  <Home className="w-4 h-4" />
                  <span>Problems</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
                <span className="text-white">{problem.title}</span>
              </div>

              <div className="flex items-center gap-4">
                {!isChallenge && (
                  <>
                    <button
                      onClick={() => setIsBookmarked(!isBookmarked)}
                      className={`p-2 rounded-lg transition-colors ${
                        isBookmarked
                          ? "text-yellow-400 hover:text-yellow-300"
                          : "text-gray-400 hover:text-white"
                      }`}
                    >
                      <Bookmark className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setShowAddToPlaylist(true)}
                      className="p-2 rounded-lg text-gray-400 hover:text-white transition-colors"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                    <button className="p-2 rounded-lg text-gray-400 hover:text-white transition-colors">
                      <Share2 className="w-5 h-5" />
                    </button>
                  </>
                )}
                {isChallenge && (
                  <button
                    onClick={handleGiveUp}
                    className="btn btn-error btn-outline gap-2"
                  >
                    <XCircle className="w-4 h-4" />
                    Give Up
                  </button>
                )}
              </div>
            </div>
          </nav>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Problem Description */}
            <div className="space-y-6">
              {/* Tabs */}
              <div className="flex gap-4 border-b border-gray-700">
                <button
                  onClick={() => setActiveTab("description")}
                  className={`px-4 py-2 font-medium transition-colors ${
                    activeTab === "description"
                      ? "text-green-400 border-b-2 border-green-400"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    <span>Description</span>
                  </div>
                </button>
                {!isChallenge && (
                  <>
                    <button
                      onClick={() => setActiveTab("submissions")}
                      className={`px-4 py-2 font-medium transition-colors ${
                        activeTab === "submissions"
                          ? "text-green-400 border-b-2 border-green-400"
                          : "text-gray-400 hover:text-white"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Code2 className="w-4 h-4" />
                        <span>Submissions</span>
                        {submissionCount > 0 && (
                          <span className="px-2 py-0.5 text-xs bg-gray-700 rounded-full">
                            {submissionCount}
                          </span>
                        )}
                      </div>
                    </button>
                    <button
                      onClick={() => setActiveTab("discussion")}
                      className={`px-4 py-2 font-medium transition-colors ${
                        activeTab === "discussion"
                          ? "text-green-400 border-b-2 border-green-400"
                          : "text-gray-400 hover:text-white"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <MessageSquare className="w-4 h-4" />
                        <span>Discussion</span>
                      </div>
                    </button>
                    <button
                      onClick={() => setActiveTab("hints")}
                      className={`px-4 py-2 font-medium transition-colors ${
                        activeTab === "hints"
                          ? "text-green-400 border-b-2 border-green-400"
                          : "text-gray-400 hover:text-white"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Lightbulb className="w-4 h-4" />
                        <span>Hints</span>
                      </div>
                    </button>
                  </>
                )}
              </div>

              {/* Tab Content */}
              {renderTabContent()}
            </div>

            {/* Right Column - Code Editor */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <select
                  value={selectedLanguage.toLowerCase()}
                  onChange={handleLanguageChange}
                  className="select select-bordered bg-gray-800 text-white border-gray-700"
                >
                  <option value="java">Java</option>
                  <option value="python">Python</option>
                  <option value="cpp">C++</option>
                  <option value="javascript">JavaScript</option>
                </select>
                <button
                  onClick={handleRunCode}
                  disabled={isExecuting}
                  className="btn btn-success gap-2"
                >
                  {isExecuting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                      Running...
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4" />
                      Submit
                    </>
                  )}
                </button>
              </div>

              <div className="h-[600px] border border-gray-700 rounded-lg overflow-hidden">
                <Editor
                  height="100%"
                  defaultLanguage={selectedLanguage}
                  language={selectedLanguage}
                  value={code}
                  onChange={setCode}
                  theme="vs-dark"
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    wordWrap: "on",
                  }}
                />
              </div>

              {/* Latest Submission */}
              {submission && (
                <div id="latest-submission" className="mt-4">
                  <Submission submission={submission} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Add to Playlist Modal */}
      {showAddToPlaylist && (
        <AddToPlaylist
          problem={problem}
          playlists={playlists}
          onClose={() => setShowAddToPlaylist(false)}
        />
      )}
    </div>
  );
};

export default ProblemPage;
