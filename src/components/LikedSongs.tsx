import { Button, Zoom } from "@mui/material";
import { Box } from "@mui/system";
import Image from "next/image";
import React, { FC, useEffect, useRef, useState } from "react";
import { getSpecificDatas } from "../data/fetchDatas";
import { LikedSongsType, MyTracklistProps } from "../types";
import Player from "./Player";

const LikedSongs: FC<MyTracklistProps> = ({ accessToken }) => {
  const [likedSongs, setLikedSongs] = useState<LikedSongsType[]>([]);
  const [loadMore, setLoadMore] = useState(true);
  const [playingTrack, setPlayingTrack] = useState("");

  const limit = 15;
  const myRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      async (entries) => {
        const first = entries[0];
        const offset = likedSongs.length + limit;
        
        if (first.isIntersecting) {
          let result = await getSpecificDatas(
            "likedSongs",
            offset,
            limit,
            accessToken
          );
          setLoadMore(result.more);
          setLikedSongs((prevState) => [...prevState, ...result.data]);
        }
      },
      { threshold: 1 }
    );

    const currentObserver = myRef.current;
    if (myRef.current !== null) observer.observe(myRef.current);

    return () => {
      if (currentObserver) observer.unobserve(currentObserver);
    };
  }, [myRef, accessToken, likedSongs]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
        className="likedSongs"
      >
        {likedSongs.map((item, index) => {
          return (
            <Zoom
              in={true}
              timeout={parseInt(`${(index % 15) + 3}99`)}
              key={`likedsong-${index}`}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "0.5rem",
                }}
                className="likedSong"
              >
                <Box className="likedSongs-album-img">
                  <Image
                    alt={item.track.name}
                    src={
                      item.track.album.images[0]?.url ??
                      "http://placekitten.com/50/50"
                    }
                    width={50}
                    height={50}
                  />
                  <h3
                    className="likedSongs-track-name"
                    onClick={() => setPlayingTrack(item.track.uri)}
                  >
                    {item.track.name}
                  </h3>
                </Box>
                <Box className="likedSongs-info" sx={{ marginTop: 2 }}>
                  <Box
                    sx={{ margin: "0 30px 0 4px", color: "purple" }}
                    className="little-space"
                  >
                    <h5>{item.track.album.artists[0].name}</h5>
                  </Box>
                  <Box>
                    <span>{item.track.album.name}</span>
                  </Box>
                </Box>
              </Box>
            </Zoom>
          );
        })}
      </Box>
      {loadMore && (
        <>
          <Box ref={myRef} sx={{ textAlign: "center", margin: 4 }}>
            <Button variant="contained" color="secondary">
              Load more
            </Button>
          </Box>
        </>
      )}
      <Player accessToken={accessToken} trackUri={playingTrack} />
    </>
  );
};

export default LikedSongs;
