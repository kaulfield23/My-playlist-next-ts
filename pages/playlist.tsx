import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Grid, Tab } from "@mui/material";
import { Box } from "@mui/system";
import Cookies from "cookies";
import type { GetServerSideProps, NextPage } from "next";
import { useEffect, useState } from "react";
import LikedSongs from "../src/components/LikedSongs";
import MyPlaylists from "../src/components/MyPlaylists";
import { RefreshingToken } from "../src/components/refreshingToken";
import { PlaylistTypes } from "../src/types";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = new Cookies(context.req, context.res);
  const accessToken = cookies.get("session") ?? "";
  const userId = process.env.SPOTIFY_ID;
  let tracks;
  let items;
  if (accessToken) {
    const response = await fetch(
      `https://api.spotify.com/v1/users/${userId}/playlists `,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const res = await response.json();
    items = res.items;

    const tracksRes = await fetch(` https://api.spotify.com/v1/me/tracks`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    tracks = await tracksRes.json();
  }

  return {
    props: {
      items: items ?? "",
      tracks: tracks.items ?? "",
    },
  };
};

const Playlist: NextPage<PlaylistTypes> = ({ items, tracks }) => {
  const [value, setValue] = useState("1");

  if (typeof window !== "undefined") {
    const refresh: string | null = localStorage.getItem("refresh");
    let expires: string | null | number = localStorage.getItem("expire");

    if (expires !== null) expires = parseInt(expires);
    if (refresh && expires) {
      RefreshingToken(refresh, expires);
    }
  }

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <>
      <Box className="playlist main">
        <Box sx={{ width: "80%", margin: "3rem auto" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="My playlists" value="1" />
                <Tab label="Liked songs" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <MyPlaylists playlists={items} />
            </TabPanel>
            <TabPanel value="2">
              <LikedSongs tracks={tracks} />
            </TabPanel>
          </TabContext>
        </Box>
      </Box>
    </>
  );
};

export default Playlist;
