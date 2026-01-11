import { db } from "../libs/db.js";

export const getStats = async (req, res) => {
  try {
    const userId = req.user.id;

    const [problemsSolved, submissions, playlists] = await Promise.all([
      db.problemSolved.count({
        where: { userId },
      }),
      db.submission.count({
        where: { userId },
      }),
      db.playlist.count({
        where: { userId },
      }),
    ]);

    res.status(200).json({
      problemsSolved,
      submissions,
      playlists,
    });
  } catch (error) {
    console.error("Error getting user stats:", error);
    res.status(500).json({ message: "Error getting user stats" });
  }
};

export const getActivity = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get recent submissions
    const submissions = await db.submission.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 10,
      include: {
        problem: {
          select: {
            title: true,
          },
        },
      },
    });

    // Get recent solved problems
    const solvedProblems = await db.problemSolved.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 10,
      include: {
        problem: {
          select: {
            title: true,
          },
        },
      },
    });

    // Combine and format activities
    const activities = [
      ...submissions.map((sub) => ({
        id: sub.id,
        type: "submission",
        description: `Submitted solution for "${sub.problem.title}"`,
        createdAt: sub.createdAt,
      })),
      ...solvedProblems.map((solved) => ({
        id: solved.id,
        type: "solved",
        description: `Solved "${solved.problem.title}"`,
        createdAt: solved.createdAt,
      })),
    ]
      .sort((a, b) => b.createdAt - a.createdAt)
      .slice(0, 10);

    res.status(200).json(activities);
  } catch (error) {
    console.error("Error getting user activity:", error);
    res.status(500).json({ message: "Error getting user activity" });
  }
};
