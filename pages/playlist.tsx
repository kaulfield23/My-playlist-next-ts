import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Grid, Tab } from "@mui/material";
import { Box } from "@mui/system";
import Cookies from "cookies";
import type { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";
import MyPlaylists from "../src/components/MyPlaylists";
import { RefreshingToken } from "../src/components/refreshingToken";
import { TokenTypes } from "../src/types";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = new Cookies(context.req, context.res);
  const accessToken = cookies.get("session") ?? "";
  const userId = process.env.SPOTIFY_ID;
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
  }

  return {
    props: {
      items: items ?? "",
    },
  };
};

const Playlist: NextPage<TokenTypes> = ({ items }) => {
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
                <Tab label="my playlists" value="1" />
                <Tab label="Item Two" value="2" />
                <Tab label="Item Three" value="3" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <MyPlaylists playlists={items} />
            </TabPanel>
            <TabPanel value="2">Item Two</TabPanel>
            <TabPanel value="3">Item Three</TabPanel>
          </TabContext>
        </Box>
      </Box>
    </>
  );
};

export default Playlist;
