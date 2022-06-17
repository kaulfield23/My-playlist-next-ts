import React, { FC, useContext, useEffect, useRef } from "react";
import { LoadContext } from "./LoadContext";

type EachPlaylistProps = {
  onClickBack: (value: boolean) => void;
  playlistID: string;
  accessToken: string;
};
const EachPlaylist: FC<EachPlaylistProps> = ({
  onClickBack,
  accessToken,
  playlistID,
}) => {
  const { loadTracks, tracks, more } = useContext(LoadContext);

  const myRef = useRef<HTMLDivElement>(null);
  const loader = useRef(loadTracks);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting) {
          loader.current?.(playlistID, accessToken, 15);
        }
      },
      { threshold: 1 }
    );

    const currentObserver = myRef.current;
    if (myRef.current !== null) observer.observe(myRef.current);

    return () => {
      if (currentObserver) observer.unobserve(currentObserver);
    };
  }, [myRef, playlistID, accessToken]);

  // useEffect(() => {
  //   loadTracks?.(playlistID, accessToken, 5);
  // }, [accessToken]);
  return (
    <>
      <h1>{playlistID}</h1>
      <p>{JSON.stringify(tracks)}</p>
      {tracks.map((item) => {})}
      <button onClick={() => onClickBack(true)}>go back</button>
    </>
  );
};

export default EachPlaylist;
