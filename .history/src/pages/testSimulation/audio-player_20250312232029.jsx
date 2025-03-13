"use client";

import { useEffect, useRef } from "react";

const AudioPlayer = ({ audioUrl, autoPlay = true, onAudioEnd }) => {
  const audioRef = useRef(null);

  useEffect(() => {
    if (autoPlay && audioRef.current) {
      audioRef.current.play();
    }
  }, [autoPlay]);

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
