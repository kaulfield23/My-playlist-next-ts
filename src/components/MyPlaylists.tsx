import { Button, Grow } from "@mui/material";
import { Box } from "@mui/system";
import Image from "next/image";
import React, { FC, useState, useEffect, useContext, useRef } from "react";
// import EachPlaylist from "./EachPlaylist";
import { MyPlaylistProps } from "../types";
import { PlaylistContext } from "./LoadContext";
import { useRouter } from "next/router";

const MyPlaylists: FC<MyPlaylistProps> = ({ accessToken, userId }) => {
  const [showPlaylists, setShowPlaylists] = useState<boolean>(true);
  const [playlistID, setPlaylistID] = useState<string>("");
  const { loadPlaylists, data, more } = useContext(PlaylistContext);
  const perPage = 10;

  const myRef = useRef<HTMLDivElement>(null);
  const loader = useRef(loadPlaylists);
  const router = useRouter();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting) {
          loader.current?.(userId, accessToken, perPage);
        }
      },
      { threshold: 1 }
    );

    const currentObserver = myRef.current;
    if (myRef.current !== null) observer.observe(myRef.current);

    return () => {
      if (currentObserver) observer.unobserve(currentObserver);
    };
  }, [myRef, userId, accessToken]);

  const onClickPlaylist = (id: string, playlistName: string) => {
    router.push({
      pathname: `/playlist/${id}`,
      query: { playlistName: playlistName },
    });
  };

  return (
    <>
      <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {data?.map((item, index) => {
          return (
            <Grow
              in={true}
              key={item.name}
              style={{ transformOrigin: "0 0 0" }}
              timeout={parseInt(`${(index % 6) + 2}99`)}
              className="playlist-box"
            >
              <Box
                key={index}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "0.5rem",
                  cursor: "pointer",
                }}
                onClick={() => onClickPlaylist(item.id, item.name)}
              >
                <Image
                  className="playlistsImg"
                  src={item.images[0].url}
                  key={index}
                  alt={"hey"}
                  width={200}
                  height={200}
                />
                <p className="playlist-name">{item.name}</p>
              </Box>
            </Grow>
          );
        })}
      </Box>

      {more && (
        <>
          <Box ref={myRef} sx={{ textAlign: "center", margin: 4 }}>
            <Button variant="contained" color="secondary">
              Load more
            </Button>
          </Box>
        </>
      )}
    </>
  );
};

export default MyPlaylists;
