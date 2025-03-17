"use client";

import { useEffect, useRef } from "react";

const AudioPlayer = ({
  audioUrl,
  autoPlay = true,
  onAudioEnd,
  showResultsModal,
}) => {
  const audioRef = useRef(null);

  useEffect(() => {
    if (autoPlay && audioRef.current) {
      audioRef.current.play();
    }
    if (showResultsModal) {
      audioRef.current.pause();
    }
  }, [autoPlay, showResultsModal]);

  return (
    <audio
      ref={audioRef}
      src={audioUrl}
      autoPlay={autoPlay}
      onEnded={onAudioEnd}
      style={{ display: "none" }} // Completely hides the audio element
    />
  );
};

export default AudioPlayer;
