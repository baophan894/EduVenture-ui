"use client";

import { useEffect, useRef } from "react";
import PropTypes from "prop-types";

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
      style={{ display: "none" }}
    />
  );
};

AudioPlayer.propTypes = {
  audioUrl: PropTypes.string.isRequired,
  autoPlay: PropTypes.bool,
  onAudioEnd: PropTypes.func,
  showResultsModal: PropTypes.bool,
};

export default AudioPlayer;
