import React from "react";
import { Calendar, Clock, Users, Trophy, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const ContestPage = () => {
  const upcomingContests = [
    {
      id: 1,
      title: "Weekly Coding Challenge",
      date: "2024-03-25",
      time: "14:00 UTC",
      duration: "2 hours",
      participants: 150,
      difficulty: "Medium",
      prize: "$500",
    },
    {
      id: 2,
      title: "Algorithm Masters",
      date: "2024-04-01",
      time: "15:00 UTC",
      duration: "3 hours",
      participants: 200,
      difficulty: "Hard",
      prize: "$1000",
    },
    {
      id: 3,
      title: "Data Structures Sprint",
      date: "2024-04-08",
      time: "13:00 UTC",
      duration: "2.5 hours",
      participants: 180,
      difficulty: "Medium",
      prize: "$750",
    },
  ];

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
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
        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-base-content mb-4">
              Upcoming Contests
            </h1>
            <p className="text-base-content/70 text-lg">
              Test your skills and win exciting prizes in our coding contests
            </p>
          </div>

          {/* Contest Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {upcomingContests.map((contest) => (
              <div
                key={contest.id}
                className="group relative bg-base-100/80 backdrop-blur-sm rounded-xl border border-base-300/50 overflow-hidden hover:border-green-500/50 transition-all duration-300"
              >
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="p-6 relative">
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-500/10 text-green-500">
                      {contest.difficulty}
                    </span>
                    <span className="text-base-content/70 text-sm">
                      {contest.participants} participants
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-base-content mb-4 group-hover:text-green-500 transition-colors">
                    {contest.title}
                  </h3>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 text-base-content/70">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(contest.date)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-base-content/70">
                      <Clock className="w-4 h-4" />
                      <span>
                        {contest.time} ({contest.duration})
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-base-content/70">
                      <Trophy className="w-4 h-4" />
                      <span>Prize Pool: {contest.prize}</span>
                    </div>
                  </div>

                  <button className="w-full btn bg-green-600 hover:bg-green-700 text-white gap-2 transition-colors">
                    Register Now
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Coming Soon Section */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/20 p-8">
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

            <div className="relative">
              <div className="flex flex-col items-center text-center">
                <div className="inline-flex items-center rounded-full bg-green-500/10 px-4 py-1 text-sm font-medium text-green-500 mb-4">
                  Coming Soon
                </div>
                <h2 className="text-3xl font-bold text-base-content mb-4">
                  Monthly Championship
                </h2>
                <p className="text-base-content/70 text-lg max-w-2xl mb-6">
                  Get ready for our biggest contest of the month! Compete with
                  top coders from around the world and win amazing prizes.
                </p>
                <div className="flex items-center gap-4 text-base-content/70">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    <span>500+ Participants</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Trophy className="w-5 h-5" />
                    <span>$5000 Prize Pool</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContestPage;
