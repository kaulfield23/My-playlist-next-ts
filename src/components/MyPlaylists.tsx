import { Grow } from "@mui/material";
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
import { ListType, MyPlaylistProps } from "../types";

const reducer = (
  state: { after: number; data: [] },
  action: { type: string; datas: [] }
) => {
  if (action.type === "start") {
    return { ...state, loading: true };
  } else if (action.type === "loaded") {
    return {
      ...state,
      loading: false,
      data: [...state.data, ...action.datas],
      after: (state.after = state.after + 6),
      more: state.data.length < action.datas.length,
    };
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
    data: [],
  });

  const { loading, more, after } = state;
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
                    cursor: "pointer",
                  }}
                  onClick={() => handlePlaylist(item.id)}
                >
                  <Image
                    className="playlistsImg"
                    src={item.images[0].url}
                    key={index}
                    alt={"hey"}
                    width={200}
                    height={200}
                  />
                  <p className="playlist-name">{item.name}</p>
                </Box>
              </Grow>
            );
          })}
        </Box>
      )}
      {!loading && more && (
        <>
          <Box
            onClick={() => {
              dispatch({ type: "loaded", datas });
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
