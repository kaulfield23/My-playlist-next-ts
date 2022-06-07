import { Grow, Zoom } from "@mui/material";
import { Box } from "@mui/system";
import Image from "next/image";
import React, {
  FC,
  useState,
  useRef,
  useEffect,
  RefObject,
  useReducer,
  Reducer,
} from "react";
import EachPlaylist from "./EachPlaylist";
import { MyPlaylistProps } from "../types";

type ListType = {
  name: string;
  id: string;
  images: [{ url: string }];
};
const reducer = (state: { after: number }, action: { type: string }) => {
  if (action.type === "start") {
    return { ...state, loading: true };
  } else if (action.type === "loaded") {
    return { ...state, loading: false, after: (state.after = state.after + 6) };
  } else {
    throw new Error(`Don't understand the action`);
  }
};

const MyPlaylists: FC<MyPlaylistProps> = ({ accessToken, userId }) => {
  const [showPlaylists, setShowPlaylists] = useState<boolean>(true);
  const [playlistID, setPlaylistID] = useState<string>("");
  const [datas, setDatas] = useState<ListType[]>([]);

  const [state, dispatch] = useReducer<Reducer<any, any>>(reducer, {
    loading: false,
    more: true,
    after: 6,
  });

  const { loading, after } = state;
  useEffect(() => {
    const getPlaylists = async (accessToken: string, userId: string) => {
      if (accessToken) {
        const response = await fetch(
          `https://api.spotify.com/v1/users/${userId}/playlists?offset=0&limit=${after} `,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const res = await response.json();
        if (res) setDatas(res.items);
      }
    };
    getPlaylists(accessToken, userId);
  }, [accessToken, userId, after]);

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
          {datas.map((item, index) => {
            return (
              <Grow
                in={true}
                key={item.name}
                style={{ transformOrigin: "0 0 0" }}
                timeout={parseInt(`${(index % 6) + 2}99`)}
                className="playlist-box"
              >
                <Box
                  key={index}
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
        </Box>
      )}
      {loading && <h2>hello</h2>}
      {!loading && (
        <>
          <Box
            onClick={() => {
              dispatch({ type: "start" });
              dispatch({ type: "loaded" });
            }}
          >
            <button>Loard more</button>
          </Box>
        </>
      )}
      {!showPlaylists && (
        <EachPlaylist goBack={handleGoBack} playlistID={playlistID} />
      )}
    </>
  );
};

export default MyPlaylists;
