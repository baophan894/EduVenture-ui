"use client";

import { useState, useEffect } from "react";
import { FaVolumeMute, FaPlay, FaPause } from "react-icons/fa";

const AudioPlayer = ({ audioUrl, onAudioEnd, autoPlay = true }) => {
  const [audioPlaying, setAudioPlaying] = useState(autoPlay);
  const [audioEnded, setAudioEnded] = useState(false);

  useEffect(() => {
    if (autoPlay) {
      setAudioPlaying(true);
    }
  }, [autoPlay]);

  // Function to handle play/pause
  const toggleAudio = () => {
    setAudioPlaying((prev) => !prev);
  };

  return (
    <>
      <iframe
        src={audioPlaying ? audioUrl : "about:blank"}
        allow="autoplay"
        className="hidden"
      />
      <div className="flex items-center gap-2">
        <button
          onClick={toggleAudio}
          disabled={audioEnded}
          className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm ${
            audioEnded
              ? "bg-gray-200 text-gray-500"
              : audioPlaying
              ? "bg-[#FCB80B] text-white"
              : "bg-[#FCB80B] bg-opacity-20 text-[#FCB80B]"
          } font-shopee`}
        >
          {audioPlaying ? (
            <>
              <FaPause /> Pause
            </>
          ) : audioEnded ? (
            <>
              <FaVolumeMute /> Completed
            </>
          ) : (
            <>
              <FaPlay /> Play
            </>
          )}
        </button>
        <span className="text-sm text-gray-600 font-shopee">
          {audioPlaying
            ? "Audio playing..."
            : audioEnded
            ? "Audio completed"
            : "Click to play audio"}
        </span>
      </div>
    </>
  );
};

export default AudioPlayer;
