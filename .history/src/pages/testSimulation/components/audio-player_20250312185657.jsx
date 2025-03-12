"use client";

import { useState, useEffect, useRef } from "react";
import { FaVolumeMute, FaPlay, FaPause } from "react-icons/fa";

const AudioPlayer = ({ audioUrl, onAudioEnd }) => {
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [audioEnded, setAudioEnded] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener("ended", () => {
        setAudioPlaying(false);
        setAudioEnded(true);
        if (onAudioEnd) onAudioEnd();
      });
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("ended", () => {});
        audioRef.current.pause();
      }
    };
  }, [onAudioEnd]);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (audioPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setAudioPlaying(!audioPlaying);
    }
  };

  return (
    <>
      <audio ref={audioRef} src={audioUrl} />
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
    </>
  );
};

export default AudioPlayer;
