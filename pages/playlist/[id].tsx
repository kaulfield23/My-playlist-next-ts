import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Button, Grow, Tab } from "@mui/material";
import Cookies from "cookies";
import { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import LikedSongs from "../../src/components/LikedSongs";
import { getSpecificDatas } from "../../src/data/fetchDatas";
import { EachPlaylistProps, TracksType } from "../../src/types";

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

const EachPlaylist: NextPage<EachPlaylistProps> = ({
  accessToken,
  playlistID,
  playlistName,
}) => {
  const myRef = useRef<HTMLDivElement>(null);
  const [tracks, setTracks] = useState<TracksType[]>([]);
  const [loadMore, setMore] = useState(true);
  const [value, setValue] = useState("1");

  const limit = 15;
  const loader = useRef(getSpecificDatas);
  const router = useRouter();
  useEffect(() => {
    const observer = new IntersectionObserver(
      async (entries) => {
        const first = entries[0];
        const offset = tracks.length + limit;
        if (first.isIntersecting) {
          let result = await loader.current?.(
            playlistID,
            limit,
            offset,
            accessToken
          );
          setMore(result.more);
          setTracks((prevState) => [...prevState, ...result.data]);
        }
      },
      { threshold: 1 }
    );

    const currentObserver = myRef.current;
    if (myRef.current !== null) observer.observe(myRef.current);

    return () => {
      if (currentObserver) observer.unobserve(currentObserver);
    };
  }, [myRef, playlistID, accessToken, tracks]);

  const onClickBack = () => {
    router.push("/playlist");
  };

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
              <Box className="bg-color-track">
                <Box className="tracklists">
                  <h1>{playlistName}</h1>
                  <Button
                    variant="contained"
                    color="info"
                    onClick={() => onClickBack()}
                  >
                    Go back
                  </Button>
                  {tracks?.map((item, index) => {
                    return (
                      <Grow
                        key={item.track.name}
                        style={{ transformOrigin: "0 0 0" }}
                        timeout={parseInt(`${(index % 15) + 3}99`)}
                        in={true}
                      >
                        <Box className="tracks-box">
                          <Box className="album-art">
                            <Image
                              className="album-art"
                              alt={item.track.name}
                              src={item.track.album.images[0].url}
                              width={50}
                              height={50}
                            />
                          </Box>
                          <Box className="track-info">
                            <span className="track-name">
                              {item.track.name}
                            </span>
                            <span className="track-artist">
                              {item.track.artists[0].name}
                            </span>
                          </Box>
                        </Box>
                      </Grow>
                    );
                  })}
                  {loadMore && (
                    <>
                      <Box ref={myRef} sx={{ textAlign: "center", margin: 4 }}>
                        <Button variant="contained" color="secondary">
                          Load more
                        </Button>
                      </Box>
                    </>
                  )}
                </Box>
              </Box>
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

export default EachPlaylist;
