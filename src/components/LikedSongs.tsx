import { TrackChangesOutlined } from "@mui/icons-material";
import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import Image from "next/image";
import React, { FC } from "react";
import { MyTracklistProps } from "../types";

const LikedSongs: FC<MyTracklistProps> = ({ tracks }) => {
  return (
    <>
      <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {tracks.map((item, index) => {
          return (
            <Box
              className="playlist-box"
              sx={{
                display: "flex",
                flexDirection: "column",
                padding: "0.5rem",
              }}
              key={item.track.name}
            >
              <p className="playlist-name">{item.track.name}</p>
              <p className="playlist-name">{item.track.album.name}</p>
              <p className="playlist-name">
                {item.track.album.artists[0].name}
              </p>
            </Box>
          );
        })}
      </Box>
    </>
  );
};

export default LikedSongs;
