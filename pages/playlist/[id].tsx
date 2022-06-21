import { Box, Button } from "@mui/material";
import Cookies from "cookies";
import { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useRef } from "react";
import { LoadContext } from "../../src/components/LoadContext";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const playlistID = context.params?.id;
  const cookies = new Cookies(context.req, context.res);
  const accessToken = cookies.get("session") ?? "";
  const playlistName = context.query?.playlistName;

  return {
    props: {
      playlistID: playlistID,
      accessToken: accessToken,
      playlistName,
    },
  };
};
type EachPlaylistProps = {
  playlistID: string;
  accessToken: string;
  playlistName: string;
};
const EachPlaylist: NextPage<EachPlaylistProps> = ({
  accessToken,
  playlistID,
  playlistName,
}) => {
  const { loadTracks, tracks, more, changeTracks, changeMore, loadedAll } =
    useContext(LoadContext);

  const myRef = useRef<HTMLDivElement>(null);
  const loader = useRef(loadTracks);
  const router = useRouter();

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

  const onClickBack = () => {
    console.log(loadedAll, "loadallllllllllll");
    //if the playlist hasn't loaded all playlists then show 'load more button'
    // if (loadedAll) {
    //   changeMore(false);
    // } else {
    //   changeMore(true);
    // }
    router.push("/playlist");
  };
  useEffect(() => {
    loadTracks?.(playlistID, accessToken, 5);
  }, [accessToken]);
  return (
    <>
      <Box className="tracklists">
        <h1>{playlistName}</h1>
        <button onClick={() => onClickBack()}>go back</button>
        {tracks.map((item) => {
          return (
            <Box key={item.track.name} className="tracks-box">
              <Image
                alt={item.track.name}
                src={item.track.album.images[0].url}
                width={50}
                height={50}
              />
              <h5>{item.track.name}</h5>
              <h5>{item.track.artists[0].name}</h5>
            </Box>
          );
        })}
        {more && (
          <>
            <Box ref={myRef} sx={{ textAlign: "center", margin: 4 }}>
              <Button variant="contained" color="secondary">
                Load more
              </Button>
            </Box>
          </>
        )}
      </Box>
    </>
  );
};

export default EachPlaylist;
