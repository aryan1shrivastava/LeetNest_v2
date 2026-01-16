import React, { useEffect, useState } from "react";
import { axiosInstance } from "../lib/axios";
import { BookOpen } from "lucide-react";
import { toast } from "react-hot-toast";

const PlaylistProfile = () => {
  const [stats, setStats] = useState({
    problemsSolved: 0,
    submissions: 0,
    playlists: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const statsRes = await axiosInstance.get("/users/stats");
        if (statsRes.data) {
          setStats(statsRes.data);
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
        toast.error("Failed to load statistics");
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

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
        <h2 className="card-title">Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="stat bg-base-200 rounded-box">
            <div className="stat-figure text-primary">
              <BookOpen className="w-8 h-8" />
            </div>
            <div className="stat-title">Solved</div>
            <div className="stat-value text-primary">
              {stats.problemsSolved}
            </div>
          </div>
          <div className="stat bg-base-200 rounded-box">
            <div className="stat-figure text-primary">
              <BookOpen className="w-8 h-8" />
            </div>
            <div className="stat-title">Submissions</div>
            <div className="stat-value text-primary">{stats.submissions}</div>
          </div>
          <div className="stat bg-base-200 rounded-box">
            <div className="stat-figure text-primary">
              <BookOpen className="w-8 h-8" />
            </div>
            <div className="stat-title">Playlists</div>
            <div className="stat-value text-primary">{stats.playlists}</div>
          </div>
          <div className="stat bg-base-200 rounded-box">
            <div className="stat-figure text-primary">
              <BookOpen className="w-8 h-8" />
            </div>
            <div className="stat-title">Success Rate</div>
            <div className="stat-value text-primary">
              {stats.submissions
                ? Math.round((stats.problemsSolved / stats.submissions) * 100)
                : 0}
              %
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaylistProfile;
