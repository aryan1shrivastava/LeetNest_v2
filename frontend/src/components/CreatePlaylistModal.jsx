import React from "react";
import { useForm } from "react-hook-form";
import { X } from "lucide-react";
const CreatePlaylistModal = ({ isOpen, onClose, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleFormSubmit = async (data) => {
    await onSubmit(data);
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-base-100 rounded-xl shadow-2xl w-full max-w-md border border-base-300/50 transform transition-all duration-300 scale-100">
        <div className="flex justify-between items-center p-6 border-b border-base-300/50">
          <h3 className="text-xl font-bold text-base-content">
            Create New Playlist
          </h3>
          <button
            onClick={onClose}
            className="btn btn-ghost btn-sm btn-circle hover:bg-base-300/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="p-6 space-y-6"
        >
          <div className="form-control space-y-2">
            <label className="label">
              <span className="label-text font-medium text-base-content/90">
                Playlist Name
              </span>
            </label>
            <div className="relative">
              <input
                type="text"
                className="input input-bordered w-full bg-base-200 border-base-300 text-base-content/90 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-200 pl-4 pr-4 py-3"
                placeholder="Enter playlist name"
                {...register("name", { required: "Playlist name is required" })}
              />
            </div>
            {errors.name && (
              <label className="label">
                <span className="label-text-alt text-error text-sm mt-1">
                  {errors.name.message}
                </span>
              </label>
            )}
          </div>

          <div className="form-control space-y-2">
            <label className="label">
              <span className="label-text font-medium text-base-content/90">
                Description
              </span>
            </label>
            <div className="relative">
              <textarea
                className="textarea textarea-bordered w-full bg-base-200 border-base-300 text-base-content/90 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-200 pl-4 pr-4 py-3 resize-none"
                placeholder="Enter playlist description (optional)"
                rows={4}
                {...register("description")}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-8 pt-4 border-t border-base-300/50">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-ghost hover:bg-base-300/50 transition-colors px-6"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn bg-green-600 hover:bg-green-700 text-white transition-colors px-6"
            >
              Create Playlist
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePlaylistModal;
