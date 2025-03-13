"use client";

import { useState, useEffect, useRef } from "react";
import { FaVolumeMute, FaPlay, FaPause } from "react-icons/fa";

const AudioPlayer = ({ audioUrl, onAudioEnd, autoPlay = true }) => {
  const [audioPlaying, setAudioPlaying] = useState(autoPlay);
  const [audioEnded, setAudioEnded] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (autoPlay && audioRef.current) {
      audioRef.current.play();
    }
  }, [autoPlay]);

  // Function to handle play/pause
  const toggleAudio = () => {
    if (!audioRef.current) return;

    if (audioPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setAudioPlaying((prev) => !prev);
  };

  // Handle audio end
  const handleAudioEnd = () => {
    setAudioPlaying(false);
    setAudioEnded(true);
    if (onAudioEnd) {
      onAudioEnd();
    }
  };

  return (
    <div>
      <audio
        ref={audioRef}
        src={audioUrl}
        autoPlay={autoPlay}
        onEnded={handleAudioEnd}
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
    </div>
  );
};

export default AudioPlayer;
