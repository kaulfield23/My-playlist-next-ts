import { Button, Grow } from "@mui/material";
import { Box } from "@mui/system";
import Image from "next/image";
import React, { FC, useState, useEffect, useContext, useRef } from "react";
import EachPlaylist from "./EachPlaylist";
import { MyPlaylistProps } from "../types";
import { LoadContext } from "./LoadContext";

const MyPlaylists: FC<MyPlaylistProps> = ({ accessToken, userId }) => {
  const [showPlaylists, setShowPlaylists] = useState<boolean>(true);
  const [playlistID, setPlaylistID] = useState<string>("");
  const { changePerPage, load, data, more } = useContext(LoadContext);
  const perPage = 6;

  const myRef = useRef<HTMLDivElement>(null);
  const loader = useRef(load);

  useEffect(() => {
    changePerPage(perPage);
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting) {
          loader.current?.(userId, accessToken);
        }
      },
      { threshold: 1 }
    );

    const currentObserver = myRef.current;
    if (myRef.current !== null) observer.observe(myRef.current);

    return () => {
      if (currentObserver) observer.unobserve(currentObserver);
    };
  }, [myRef, userId, accessToken, changePerPage]);

  const handlePlaylist = (id: string) => {
    setShowPlaylists(false);
    setPlaylistID(id);
  };

  const handleGoBack = (value: boolean) => {
    setShowPlaylists(value);
  };

  return (
    <>
      {showPlaylists && (
        <Box
          sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
        >
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
                  onClick={() => handlePlaylist(item.id)}
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
      )}
      {more && (
        <>
          <Box ref={myRef} sx={{ textAlign: "center", margin: 4 }}>
            <Button variant="contained" color="secondary">
              Load more
            </Button>
          </Box>
        </>
      )}
      {!showPlaylists && (
        <EachPlaylist goBack={handleGoBack} playlistID={playlistID} />
      )}
    </>
  );
};

export default MyPlaylists;
