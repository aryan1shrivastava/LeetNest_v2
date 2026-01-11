import React from "react";
import {
  CheckCircle2,
  XCircle,
  Clock,
  MemoryStick as Memory,
} from "lucide-react";

const SubmissionResults = ({ submission }) => {
  // Parse stringified arrays
  const memoryArr = JSON.parse(submission.memory || "[]");
  const timeArr = JSON.parse(submission.time || "[]");

  // Calculate averages
  const avgMemory =
    memoryArr
      .map((m) => parseFloat(m)) // remove ' KB' using parseFloat
      .reduce((a, b) => a + b, 0) / memoryArr.length;

  const avgTime =
    timeArr
      .map((t) => parseFloat(t)) // remove ' s' using parseFloat
      .reduce((a, b) => a + b, 0) / timeArr.length;

  const passedTests = submission.testCases.filter((tc) => tc.passed).length;
  const totalTests = submission.testCases.length;
  const successRate = (passedTests / totalTests) * 100;

  return (
    <div className="space-y-6">
      {/* Overall Status */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
          <h3 className="text-sm font-medium text-gray-400">Status</h3>
          <div
            className={`text-lg font-bold ${
              submission.status === "Accepted"
                ? "text-[#4ADE80]"
                : "text-red-400"
            }`}
          >
            {submission.status}
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
          <h3 className="text-sm font-medium text-gray-400">Success Rate</h3>
          <div className="text-lg font-bold text-white">
            {successRate.toFixed(1)}%
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
          <h3 className="text-sm font-medium text-gray-400 flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Avg. Runtime
          </h3>
          <div className="text-lg font-bold text-white">
            {avgTime.toFixed(3)} s
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
          <h3 className="text-sm font-medium text-gray-400 flex items-center gap-2">
            <Memory className="w-4 h-4" />
            Avg. Memory
          </h3>
          <div className="text-lg font-bold text-white">
            {avgMemory.toFixed(0)} KB
          </div>
        </div>
      </div>

      {/* Test Cases Results */}
      <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
        <div className="p-6">
          <h2 className="text-xl font-bold text-white mb-6">
            Test Cases Results
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">
                    Expected Output
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">
                    Your Output
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">
                    Memory
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">
                    Time
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {submission.testCases.map((testCase) => (
                  <tr key={testCase.id} className="hover:bg-white/5">
                    <td className="py-3 px-4">
                      {testCase.passed ? (
                        <div className="flex items-center gap-2 text-[#4ADE80]">
                          <CheckCircle2 className="w-5 h-5" />
                          Passed
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-red-400">
                          <XCircle className="w-5 h-5" />
                          Failed
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-4 font-mono text-sm text-gray-300">
                      {testCase.expected}
                    </td>
                    <td className="py-3 px-4 font-mono text-sm text-gray-300">
                      {testCase.stdout || "null"}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-300">
                      {testCase.memory}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-300">
                      {testCase.time}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmissionResults;
