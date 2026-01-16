import React, { useEffect, useState } from "react";
import { X, Plus, Loader } from "lucide-react";
import { usePlaylistStore } from "../store/usePlaylistStore";

const AddToPlaylistModal = ({ isOpen, onClose, problemId }) => {
  const { playlists, getAllPlaylists, addProblemToPlaylist, isLoading } =
    usePlaylistStore();
  const [selectedPlaylist, setSelectedPlaylist] = useState("");

  useEffect(() => {
    if (isOpen) {
      getAllPlaylists();
    }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedPlaylist) return;

    await addProblemToPlaylist(selectedPlaylist, [problemId]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-base-100 rounded-xl shadow-2xl w-full max-w-md border border-base-300/50 transform transition-all duration-300 scale-100">
        <div className="flex justify-between items-center p-6 border-b border-base-300/50">
          <h3 className="text-xl font-bold text-base-content">
            Add to Playlist
          </h3>
          <button
            onClick={onClose}
            className="btn btn-ghost btn-sm btn-circle hover:bg-base-300/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="form-control space-y-2">
            <label className="label">
              <span className="label-text font-medium text-base-content/90">
                Select Playlist
              </span>
            </label>
            <div className="relative">
              <select
                className="select w-full bg-base-200 border-2 border-base-300 text-base-content/90 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-200 pl-4 pr-10 py-3 appearance-none cursor-pointer hover:border-green-500/50 rounded-lg"
                value={selectedPlaylist}
                onChange={(e) => setSelectedPlaylist(e.target.value)}
                disabled={isLoading}
              >
                <option
                  value=""
                  className="text-base-content/70 bg-base-200 py-2"
                >
                  Select a playlist
                </option>
                {playlists?.map((playlist) =>
                  playlist ? (
                    <option
                      key={playlist.id}
                      value={playlist.id}
                      className="text-base-content bg-base-200 py-2"
                    >
                      {playlist.name}
                    </option>
                  ) : null
                )}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-base-content/50 transition-transform duration-200 group-hover:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
            {playlists?.length === 0 && (
              <p className="text-sm text-base-content/70 mt-2">
                No playlists available. Create one first!
              </p>
            )}
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
              className="btn bg-green-600 hover:bg-green-700 text-white gap-2 transition-colors px-6 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!selectedPlaylist || isLoading}
            >
              {isLoading ? (
                <Loader className="w-4 h-4 animate-spin" />
              ) : (
                <Plus className="w-4 h-4" />
              )}
              Add to Playlist
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddToPlaylistModal;
