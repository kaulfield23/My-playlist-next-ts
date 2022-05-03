import { useMediaQuery, useTheme, Grid } from "@mui/material";
import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import profile from "../component/img/profile-pic.jpg";
import bigProfile from "../component/img/big-profile.jpg";
import Button from "@mui/material/Button";
import Link from "next/link";
import { Box } from "@mui/system";
import Image from "next/image";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

const Home: NextPage = () => {
  const [width, setWidth] = useState<number>(0);
  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setWidth]);
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <Box
        className="index-main"
        sx={{
          height: "100vh",
          maxWidth: "1280px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto",
        }}
        padding={isSmall ? 0 : "0 20px"}
      >
        <Box
          borderRadius={isSmall ? 0 : 20}
          className="index-profile"
          height={isSmall ? 1 : "auto"}
        >
          <Box id="index-img" borderRadius={isSmall ? 0 : 20}>
            {width >= 900 ? (
              <Image src={bigProfile} alt="main-pic" />
            ) : (
              <Image src={profile} alt="main-pic" />
            )}
          </Box>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            className="playlist-intro"
          >
            <Grid item sm={3}>
              <div id="calendar-box">
                <CalendarMonthIcon />
                <h5>2022</h5>
              </div>
            </Grid>
            <Grid item sm={5}>
              <Box textAlign={width <= 950 ? "center" : "left"}>
                <h1 id="mylist-title">My playlist</h1>
                <h4 id="by-haeju">by Haeju</h4>
                <Link href="/playlist" passHref>
                  <Button
                    variant="contained"
                    color="secondary"
                    sx={{
                      borderRadius: 20,
                      marginTop: 2,
                      fontWeight: "bold",
                    }}
                  >
                    check out playlists
                  </Button>
                </Link>
              </Box>
            </Grid>
            <Grid item sm={4}>
              <Box
                sx={{ letterSpacing: 2 }}
                textAlign={width <= 950 ? "center" : "left"}
              >
                <p>
                  Songs that I listen / listened in 2022<br></br>
                  Just testing out NEXT.js,TS,Material UI<br></br>
                  with Spotify API for fun
                </p>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default Home;
