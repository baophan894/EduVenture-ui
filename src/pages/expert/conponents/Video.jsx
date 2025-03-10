/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";

const VideoPlayer = ({ lesson, isShowTitle = true, isNav = false }) => {
  const videoRef = useRef(null);
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [lesson]);
  return (
    <>
      <video
        style={isNav ? { maxWidth: "75%" } : { minWidth: "100%" }}
        ref={videoRef}
        controls
      >
        <source src={lesson?.videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="text-left mt-2">
        <span className="text-[18px] font-bold ">
          {isShowTitle && `${lesson?.lessonOrder}.${lesson?.name}`}
        </span>
      </div>
    </>
  );
};

export default VideoPlayer;
