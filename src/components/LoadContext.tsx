import { useRouter } from "next/router";
import React, {
  createContext,
  useState,
  FC,
  PropsWithChildren,
  useEffect,
} from "react";
import { getPlaylists, getTracks } from "../data/fetchDatas";
import { PlaylistType, TracksType } from "../types";

export type MyContextType = {
  more: boolean;
  data: PlaylistType[];
  tracks: TracksType[];
  loadPlaylists?: (value: string, value2: string, value3: number) => void;
  loadTracks?: (value: string, value2: string, value3: number) => void;
  changeMore: (value: boolean) => void;
  changeTracks: () => void;
};

const myContextDefaultValues: MyContextType = {
  more: true,
  data: [],
  tracks: [],
  changeMore: (value: boolean) => ({}),
  changeTracks: () => ({}),
};
export const LoadContext = createContext<MyContextType>(myContextDefaultValues);

const LoadProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const [data, setData] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [more, setMore] = useState<boolean>(true);
  const router = useRouter();

  //to reset the tracks' data when user clicks the back button
  useEffect(() => {
    if (router.pathname === "/playlist") {
      setTracks([]);
    }
  }, [router]);

  const changeMore = (value: boolean) => {
    setMore(value);
  };
  const changeTracks = () => {
    setTracks([]);
  };

  //for limit and offset
  let after = 0;

  //get the playlists
  const loadPlaylists = async (
    userId: string,
    accessToken: string,
    perPage: number
  ) => {
    //for saving the data from where it stopped in playlists page
    if (data.length > 0) {
      after = data.length;
    }
    after += perPage;

    let datas = await getPlaylists(
      userId,
      after - perPage,
      perPage,
      accessToken
    );
    setMore(datas.items.length === perPage);
    setData((prevState) => [...prevState, ...datas.items]);
  };

  //get the tracklist
  const loadTracks = async (
    playlistId: string,
    accessToken: string,
    perPage: number
  ) => {
    after += perPage;

    let datas = await getTracks(
      playlistId,
      after - perPage,
      perPage,
      accessToken
    );
    setMore(datas.items.length === perPage);
    setTracks((prevState) => [...prevState, ...datas.items]);
  };

  return (
    <LoadContext.Provider
      value={{
        data,
        more,
        tracks,
        changeMore,
        loadPlaylists,
        changeTracks,
        loadTracks,
      }}
    >
      {children}
    </LoadContext.Provider>
  );
};
export default LoadProvider;
