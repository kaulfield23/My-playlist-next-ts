import { Grid, Input, Slider, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { FC, useEffect, useState } from "react";
import SpotifyPlayer from "react-spotify-web-playback";
import VolumeUp from "@mui/icons-material/VolumeUp";

type PlayerType = {
  accessToken: string;
  trackUri: string;
};

const Player: FC<PlayerType> = ({ accessToken, trackUri }) => {
  const [play, setPlay] = useState(false);
  const [value, setValue] = useState<number | string | Array<number | string>>(
    30
  );

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value === "" ? "" : Number(event.target.value));
  };

  const handleBlur = () => {
    if (value < 0) {
      setValue(0);
    } else if (value > 100) {
      setValue(100);
    }
  };
  useEffect(() => {
    setPlay(true);
  }, [trackUri]);

  if (!accessToken) {
    return null;
  }

  return (
    <>
      <Box className="player">
        <SpotifyPlayer
          token={accessToken}
          showSaveIcon
          styles={{
            sliderColor: "purple",
            activeColor: "green",
            trackArtistColor: "grey",
            height: "50px",
          }}
          callback={(state) => {
            if (!state.isPlaying) setPlay(false);
          }}
          play={play}
          uris={trackUri ? [trackUri] : []}
        />
      </Box>
      <Box sx={{ width: 250 }}>
        <Typography id="input-slider" gutterBottom>
          Volume
        </Typography>
        <Grid container spacing={2} alignItems="center">
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
          <Grid item>
            <Input
              value={value}
              size="small"
              onChange={handleInputChange}
              onBlur={handleBlur}
              inputProps={{
                step: 10,
                min: 0,
                max: 100,
                type: "number",
                "aria-labelledby": "input-slider",
              }}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Player;
