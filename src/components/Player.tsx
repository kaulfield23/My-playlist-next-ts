import { Grid, Input, Slider, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { FC, useEffect, useRef, useState } from "react";
import SpotifyPlayer from "react-spotify-web-playback";
import VolumeUp from "@mui/icons-material/VolumeUp";

type PlayerType = {
  accessToken: string;
  trackUri: string;
};

const Player: FC<PlayerType> = ({ accessToken, trackUri }) => {
  const [play, setPlay] = useState(false);
  const [value, setValue] = useState<number>(30);

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number);
  };

  useEffect(() => {
    setPlay(true);
  }, [trackUri]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const changeVolume = async () => {
        try {
          await fetch(
            `https://api.spotify.com/v1/me/player/volume?volume_percent=${value}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
        } catch (err) {
          console.log(err);
        }
      };
      if (play) {
        changeVolume();
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [value, accessToken, play]);

  if (!accessToken) {
    return null;
  }
  return (
    <>
      <Box className="player">
        <SpotifyPlayer
          token={accessToken}
          showSaveIcon
          initialVolume={0.7}
          styles={{
            sliderColor: "purple",
            activeColor: "green",
            trackArtistColor: "grey",
            height: "50px",
            bgColor: "#e0eae8",
            color: "purple",
          }}
          magnifySliderOnHover={true}
          callback={(state) => {
            if (!state.isPlaying) setPlay(false);
          }}
          play={play}
          uris={trackUri ? [trackUri] : []}
        />
        <Box sx={{ width: 200 }} className="volume">
          <Grid container alignItems="center">
            <Grid item>
              <VolumeUp />
            </Grid>
            <Grid item xs>
              <Slider
                value={typeof value === "number" ? value : 0}
                onChange={handleSliderChange}
                aria-labelledby="input-slider"
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default Player;
