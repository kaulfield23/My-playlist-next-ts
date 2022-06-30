import React, { FC, useEffect, useState } from "react";
import SpotifyPlayer from "react-spotify-web-playback";
type PlayerType = {
  accessToken: string;
  trackUri: string;
};
const Player: FC<PlayerType> = ({ accessToken, trackUri }) => {
  const [play, setPlay] = useState(false);
  useEffect(() => {
    setPlay(true);
  }, [trackUri]);

  if (!accessToken) {
    return null;
  }

  return (
    <SpotifyPlayer
      token={accessToken}
      showSaveIcon
      styles={{ sliderColor: "purple" }}
      callback={(state) => {
        if (!state.isPlaying) setPlay(false);
      }}
      play={play}
      uris={trackUri ? [trackUri] : []}
    />
  );
};

export default Player;
