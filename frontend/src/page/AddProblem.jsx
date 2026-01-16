import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import CreateProblemForm from "../components/CreateProblemForm";

const AddProblem = () => {
  return (
    <div className="min-h-screen bg-base-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-row justify-between items-center w-full mb-6">
          <div className="flex items-center gap-3">
            <Link to={"/"} className="btn btn-circle btn-ghost">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-3xl font-bold">Add New Problem</h1>
          </div>
        </div>

        <CreateProblemForm />
      </div>
    </div>
  );
};

export default AddProblem;
