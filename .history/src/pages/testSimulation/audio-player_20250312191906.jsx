"use client";

import { useState, useEffect, useRef } from "react";
import { FaVolumeMute, FaPlay, FaPause } from "react-icons/fa";

const AudioPlayer = ({ audioUrl, onAudioEnd, autoPlay = true }) => {
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [audioEnded, setAudioEnded] = useState(false);
  const audioRef = useRef(null);

  // Handle audio end event
  useEffect(() => {
    if (audioRef.current) {
      const handleEnded = () => {
        setAudioPlaying(false);
        setAudioEnded(true);
        if (onAudioEnd) onAudioEnd();
      };

      audioRef.current.addEventListener("ended", handleEnded);

      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener("ended", handleEnded);
          audioRef.current.pause();
        }
      };
    }
  }, [onAudioEnd]);

  // Auto-play when component mounts or audioUrl changes
  useEffect(() => {
    if (autoPlay && audioRef.current && !audioEnded) {
      const playPromise = audioRef.current.play();

      // Handle play promise to avoid uncaught promise errors
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setAudioPlaying(true);
          })
          .catch((error) => {
            // Auto-play was prevented, show play button
            console.log("Autoplay prevented:", error);
            setAudioPlaying(false);
          });
      }
    }
  }, [audioUrl, autoPlay, audioEnded]);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (audioPlaying) {
        audioRef.current.pause();
        setAudioPlaying(false);
      } else {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setAudioPlaying(true);
            })
            .catch((error) => {
              console.log("Play prevented:", error);
            });
        }
      }
    }
  };

  return (
    <>
      <audio ref={audioRef} src={audioUrl} />
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
