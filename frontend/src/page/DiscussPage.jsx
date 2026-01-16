import React from "react";
import { MessageSquare } from "lucide-react";

const DiscussPage = () => {
  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mb-6">
          <MessageSquare className="w-10 h-10 text-green-400" />
        </div>
        <h1 className="text-4xl font-bold text-white mb-4">Discussion Forum</h1>
        <p className="text-gray-400 text-lg max-w-2xl">
          The discussion forum is coming soon! Share your solutions, ask
          questions, and learn from the community.
        </p>
      </div>
    </div>
  );
};

export default DiscussPage;
