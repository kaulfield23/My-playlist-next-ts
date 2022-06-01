import { Grid, Grow, Zoom } from "@mui/material";
import { Box } from "@mui/system";
import Image from "next/image";
import React, { FC, useState } from "react";
import { MyPlaylistProps } from "../types";
import EachPlaylist from "./EachPlaylist";

const MyPlaylists: FC<MyPlaylistProps> = ({ playlists }) => {
  const [showPlaylists, setShowPlaylists] = useState<boolean>(true);
  const [playlistID, setPlaylistID] = useState<string>("");
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
          {playlists.map((item, index) => {
            return (
              <Grow
                in={true}
                key={item.name}
                style={{ transformOrigin: "0 0 0" }}
                timeout={parseInt(`${index}99`)}
              >
                <Box
                  className="playlist-box"
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    padding: "0.5rem",
                  }}
                >
                  <Image
                    className="playlistsImg"
                    src={item.images[0].url}
                    key={index}
                    alt={"hey"}
                    width={200}
                    height={200}
                    onClick={() => handlePlaylist(item.id)}
                  />
                  <p className="playlist-name">{item.name}</p>
                </Box>
              </Grow>
            );
          })}
        </Box>
      )}
      {!showPlaylists && (
        <EachPlaylist goBack={handleGoBack} playlistID={playlistID} />
      )}
    </>
  );
};

export default MyPlaylists;
