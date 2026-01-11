import React, { useEffect, useState } from "react";
import { axiosInstance } from "../lib/axios";
import { Code, CheckCircle2 } from "lucide-react";
import { toast } from "react-hot-toast";

const ProfileSubmission = () => {
  const [recentActivity, setRecentActivity] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const activityRes = await axiosInstance.get("users/activity");
        setRecentActivity(activityRes.data || []);
      } catch (error) {
        toast.error(
          error.response?.data?.message ||
            "Failed to load recent activity. Please try again later."
        );
        setRecentActivity([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchActivity();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="h-[400px] flex flex-col">
      <h2 className="text-xl font-semibold mb-4"></h2>
      <div className="flex-1 overflow-y-auto space-y-4 pr-2">
        {recentActivity.length === 0 ? (
          <p className="text-gray-400">No recent activity</p>
        ) : (
          recentActivity.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center gap-4 p-4 bg-white/5 rounded-xl"
            >
              <div className="p-2 rounded-lg bg-[#4ADE80]/10">
                {activity.type === "submission" ? (
                  <Code className="w-5 h-5 text-[#4ADE80]" />
                ) : (
                  <CheckCircle2 className="w-5 h-5 text-[#4ADE80]" />
                )}
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-300">
                  {activity.description}
                </p>
                <p className="text-sm text-gray-400">
                  {new Date(activity.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProfileSubmission;
