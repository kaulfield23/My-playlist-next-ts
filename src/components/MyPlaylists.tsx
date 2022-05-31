import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import Image from "next/image";
import React, { FC } from "react";
import { MyPlaylistProps } from "../types";

const MyPlaylists: FC<MyPlaylistProps> = ({ playlists }) => {
  return (
    <>
      <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {playlists.map((item, index) => {
          return (
            <Box
              className="playlist-box"
              sx={{
                display: "flex",
                flexDirection: "column",
                padding: "0.5rem",
              }}
              key={item.name}
            >
              <Image
                src={item.images[0].url}
                key={index}
                alt={"hey"}
                width={200}
                height={200}
              />
              <p className="playlist-name">{item.name}</p>
            </Box>
          );
        })}
      </Box>
    </>
  );
};

export default MyPlaylists;
