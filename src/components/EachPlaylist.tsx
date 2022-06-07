import React, { FC } from "react";

type EachPlaylistProps = {
  goBack: (value: boolean) => void;
  playlistID: string;
};
const EachPlaylist: FC<EachPlaylistProps> = ({ goBack, playlistID }) => {
  return (
    <>
      <h1>{playlistID}</h1>
      <button onClick={() => goBack(true)}>go back</button>
    </>
  );
};

export default EachPlaylist;
