import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Grid, Tab } from "@mui/material";
import { Box } from "@mui/system";
import Cookies from "cookies";
import type { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import { useState } from "react";
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
    let expires: string | null = localStorage.getItem("expire");
    let expiresInput: number;
    if (expires) expiresInput = parseInt(expires);
    const getToken = async () => {
      if (refresh && expiresInput) {
        RefreshingToken(refresh, expiresInput);
      }
    };
    getToken();
  }

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <>
      <Grid item xs={8} md={6} lg={4} xl={3}>
        <Box className="playlist main">
          <Box sx={{ width: "100%" }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  <Tab label="Item One" value="1" />
                  <Tab label="Item Two" value="2" />
                  <Tab label="Item Three" value="3" />
                </TabList>
              </Box>
              <TabPanel value="1">Item One</TabPanel>
              <TabPanel value="2">Item Two</TabPanel>
              <TabPanel value="3">Item Three</TabPanel>
            </TabContext>
          </Box>
        </Box>
      </Grid>

      {items.map((item, index) => {
        return (
          <Image
            src={item.images[0].url}
            key={index}
            alt={"hey"}
            width={200}
            height={200}
          />
        );
      })}
    </>
  );
};

export default Playlist;
