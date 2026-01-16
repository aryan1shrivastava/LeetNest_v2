import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const Layout = () => {
  return (
    <div className="min-h-screen w-full relative text-gray-100">
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
        <Navbar />
        <main className="text-gray-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
