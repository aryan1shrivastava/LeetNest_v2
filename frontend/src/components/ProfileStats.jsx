import React, { useEffect, useState } from "react";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-hot-toast";

const ProfileStats = () => {
  const [stats, setStats] = useState({
    problemsSolved: 0,
    submissions: 0,
    playlists: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const statsRes = await axiosInstance.get("users/stats");
        if (statsRes.data) {
          setStats(statsRes.data);
        }
      } catch (error) {
        toast.error(
          error.response?.data?.message ||
            "Failed to load statistics. Please try again later."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white/5 rounded-xl p-4 animate-pulse">
            <div className="h-6 bg-white/10 rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-white/10 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="bg-white/5 rounded-xl p-4">
        <div className="text-xl font-bold text-[#4ADE80]">
          {stats.problemsSolved}
        </div>
        <div className="text-sm text-gray-400">Solved</div>
      </div>
      <div className="bg-white/5 rounded-xl p-4">
        <div className="text-xl font-bold text-[#4ADE80]">
          {stats.submissions}
        </div>
        <div className="text-sm text-gray-400">Submissions</div>
      </div>
      <div className="bg-white/5 rounded-xl p-4">
        <div className="text-xl font-bold text-[#4ADE80]">
          {stats.playlists}
        </div>
        <div className="text-sm text-gray-400">Playlists</div>
      </div>
      <div className="bg-white/5 rounded-xl p-4">
        <div className="text-xl font-bold text-[#4ADE80]">
          {stats.submissions
            ? Math.round((stats.problemsSolved / stats.submissions) * 100)
            : 0}
          %
        </div>
        <div className="text-sm text-gray-400">Success Rate</div>
      </div>
    </div>
  );
};

export default ProfileStats;
