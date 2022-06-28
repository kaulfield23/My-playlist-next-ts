import { Button } from "@mui/material";
import { Box } from "@mui/system";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { FC, useEffect, useRef, useState } from "react";
import { getSpecificDatas } from "../data/fetchDatas";
import { LikedSongsType, MyTracklistProps } from "../types";

const LikedSongs: FC<MyTracklistProps> = ({ accessToken }) => {
  const [likedSongs, setLikedSongs] = useState<LikedSongsType[]>([]);
  const [loadMore, setLoadMore] = useState(true);
  const limit = 15;
  const myRef = useRef<HTMLDivElement>(null);
  const loader = useRef(getSpecificDatas);
  const router = useRouter();

  useEffect(() => {
    const observer = new IntersectionObserver(
      async (entries) => {
        const first = entries[0];
        const offset = likedSongs.length + limit;

        if (first.isIntersecting) {
          let result = await loader.current?.(
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
      <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {likedSongs.map((item, index) => {
          return (
            <>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "0.5rem",
                }}
                key={item.track.name}
              >
                <Image
                  alt={item.track.name}
                  src={item.track.album.images[0].url}
                  width={50}
                  height={50}
                />
                <span>{item.track.name}</span>
                <span>{item.track.album.name}</span>
                <span>{item.track.album.artists[0].name}</span>
              </Box>
            </>
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
    </>
  );
};

export default LikedSongs;
