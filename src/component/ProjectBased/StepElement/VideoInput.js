import React from "react";

export default function VideoInput({
  width,
  height,
  videoSrc
}) {

  const inputRef = React.useRef();

  // const [source, setSource] = React.useState();

  // setSource(videoSrc);

  const handleChoose = (event) => {
    inputRef.current.click();
  };

  return (
    <div className="VideoInput">
      {videoSrc && (
        <video
          className="VideoInput_video"
          width={width}
          height={height}
          autoPlay
          loop
          src={videoSrc}
        />
      )}
    </div>
  );
}
