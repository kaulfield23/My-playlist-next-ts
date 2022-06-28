import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Tab } from "@mui/material";
import { Box } from "@mui/system";
import Cookies from "cookies";
import type { GetServerSideProps, NextPage } from "next";
import { useState } from "react";
import LikedSongs from "../../src/components/LikedSongs";
import MyPlaylists from "../../src/components/MyPlaylists";
import { RefreshingToken } from "../../src/components/refreshingToken";
import { PlaylistTypes } from "../../src/types";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const userId = process.env.SPOTIFY_ID;
  const cookies = new Cookies(context.req, context.res);
  const accessToken = cookies.get("session") ?? "";
  return {
    props: {
      accessToken: accessToken,
      userId: userId,
    },
  };
};

const Playlist: NextPage<PlaylistTypes> = ({ accessToken, userId }) => {
  const [value, setValue] = useState("1");

  if (typeof window !== "undefined") {
    const refresh: string | null = localStorage.getItem("refresh");
    let expires: string | null | number = localStorage.getItem("expire");

    if (expires !== null) {
      expires = parseInt(expires);
    }
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
              <MyPlaylists accessToken={accessToken} userId={userId} />
            </TabPanel>
            <TabPanel value="2">
              <LikedSongs accessToken={accessToken} />
            </TabPanel>
          </TabContext>
        </Box>
      </Box>
    </>
  );
};

export default Playlist;
