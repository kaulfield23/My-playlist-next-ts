import React, { FC } from "react";
import SpotifyPlayer from "react-spotify-web-playback";
type PlayerType = {
  accessToken: string;
  trackUri: string;
};
const Player: FC<PlayerType> = ({ accessToken, trackUri }) => {
  if (!accessToken) return null;
  return (
    <SpotifyPlayer
      token={accessToken}
      //   showSaveIcon
      //   uris={trackUri ? [trackUri] : []}
    />
  );
};

export default Player;
