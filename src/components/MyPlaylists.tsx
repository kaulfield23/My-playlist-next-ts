import { Grow, Zoom } from "@mui/material";
import { Box } from "@mui/system";
import Image from "next/image";
import React, { FC, useState, useRef, useEffect, RefObject } from "react";
import { MyPlaylistProps } from "../types";
import EachPlaylist from "./EachPlaylist";
import { useInView } from "react-intersection-observer";

const MyPlaylists: FC<MyPlaylistProps> = ({ playlists }) => {
  const [showPlaylists, setShowPlaylists] = useState<boolean>(true);
  const [playlistID, setPlaylistID] = useState<string>("");
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const useOnScreen = (ref: RefObject<HTMLElement>) => {
    const observerRef = useRef<IntersectionObserver | null>(null);
    const [isOnScreen, setIsOnScreen] = useState(false);

    useEffect(() => {
      observerRef.current = new IntersectionObserver(([entry]) =>
        setIsOnScreen(entry.isIntersecting)
      );
    }, []);

    useEffect(() => {
      if (ref.current) {
        observerRef.current?.observe(ref.current);
      }

      return () => {
        observerRef.current?.disconnect();
      };
    }, [ref]);
    console.log(isOnScreen, "heylo");
    return isOnScreen;
  };
  const myRef = useRef<HTMLElement>(null);
  const isOnScreen = useOnScreen(myRef);

  // useEffect(() => {
  //   const observer = new IntersectionObserver((entries) => {
  //     entries.forEach((entry) => {
  //       setIsVisible(entry.isIntersecting);
  //       console.log(isVisible, "visible");
  //     });
  //   });
  //   if (myRef.current) observer.observe(myRef.current);
  // }, []);

  const handlePlaylist = (id: string) => {
    setShowPlaylists(false);
    setPlaylistID(id);
  };

  const handleGoBack = (value: boolean) => {
    setShowPlaylists(value);
  };

  return (
    <>
      {showPlaylists && (
        <Box
          sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
        >
          {playlists.map((item, index) => {
            return (
              <Grow
                in={true}
                key={item.name}
                style={{ transformOrigin: "0 0 0" }}
                timeout={parseInt(`${index}99`)}
              >
                <Box
                  ref={myRef}
                  key={index}
                  className={isOnScreen ? "playlist-none" : "playlist-box"}
                  // className="playlist-box"
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    padding: "0.5rem",
                  }}
                >
                  <Image
                    className="playlistsImg"
                    src={item.images[0].url}
                    key={index}
                    alt={"hey"}
                    width={200}
                    height={200}
                    onClick={() => handlePlaylist(item.id)}
                  />
                  <p className="playlist-name">{item.name}</p>
                </Box>
              </Grow>
            );
          })}
          {/* <h2 ref={myRef}>hello</h2> */}
        </Box>
      )}
      {!showPlaylists && (
        <EachPlaylist goBack={handleGoBack} playlistID={playlistID} />
      )}
    </>
  );
};

export default MyPlaylists;
