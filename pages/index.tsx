import { useMediaQuery, useTheme, Grid } from "@mui/material";
import type { GetServerSideProps, NextPage } from "next";
import React, { useEffect, useState } from "react";
import profile from "../component/img/profile-pic.jpg";
import bigProfile from "../component/img/big-profile.jpg";
import Button from "@mui/material/Button";
import Link from "next/link";
import { Box } from "@mui/system";
import Image from "next/image";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useRouter } from "next/router";

const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=57d2e6a20ac547dab1320ff810ac1b7d&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const code = context.query.code as string;

  const res = await fetch(`http://localhost:3000/api/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ code }),
  });
  const responseData = await res.json();

  return {
    props: {
      code: code ?? "",
      accessToken: responseData.accessToken,
      refreshToken: responseData.refreshToken,
      expiresIn: responseData.expiresIn,
    },
  };
};
type Code = {
  code: string | undefined;
  accessToken: string;
  refreshToken: string;
  expiresIn: string;
};

const Home: NextPage<Code> = ({
  code,
  accessToken,
  refreshToken,
  expiresIn,
}) => {
  const [width, setWidth] = useState<number>(0);
  const [tokens, setTokens] = useState<string>("");
  const router = useRouter();
  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);

    setTokens(accessToken);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setWidth, accessToken]);

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

                <Link href={AUTH_URL} passHref>
                  <Button
                    variant="contained"
                    color="secondary"
                    sx={{
                      borderRadius: 20,
                      marginTop: 2,
                      fontWeight: "bold",
                    }}
                  >
                    Login with Spotify
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
                  {/* Songs that I listen / listened in 2022<br></br>
                  Just testing out NEXT.js,TS,Material UI<br></br>
                  with Spotify API for fun */}
                  {tokens}
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
