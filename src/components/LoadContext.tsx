import React, { createContext, useState, FC, PropsWithChildren } from "react";
import { getPlaylists, getTracks } from "../data/fetchDatas";

type dataType = {
  name: string;
  id: string;
  images: [{ url: string }];
};
export type MyContextType = {
  more: boolean;
  data: dataType[];
  tracks: any[];
  loadPlaylists?: (value: string, value2: string, value3: number) => void;
  loadTracks?: (value: string, value2: string, value3: number) => void;
  // changePerPage: (value: number) => void;
};

const myContextDefaultValues: MyContextType = {
  more: true,
  data: [],
  tracks: [],
  // after: 0,
  // changePerPage: (value: number) => ({}),
};
export const LoadContext = createContext<MyContextType>(myContextDefaultValues);

const LoadProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const [perPage, setPerPage] = useState<number>(6);
  const [data, setData] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [more, setMore] = useState<boolean>(true);

  // const changePerPage = (value: number) => setPerPage(value);

  let after = 0;
  const loadPlaylists = async (
    userId: string,
    accessToken: string,
    perPage: number
  ) => {
    after += perPage;
    console.log("hey");
    let datas = await getPlaylists(
      userId,
      after - perPage,
      perPage,
      accessToken
    );
    setMore(datas.items.length === perPage);
    setData((prevState) => [...prevState, ...datas.items]);
  };

  const loadTracks = async (
    playlistId: string,
    accessToken: string,
    perPage: number
  ) => {
    console.log("ehy");
    let datas = await getTracks(playlistId, accessToken);
    setTracks(datas.items);
  };

  return (
    <LoadContext.Provider
      value={{
        data,
        more,
        tracks,
        // changePerPage,
        loadPlaylists,
        loadTracks,
      }}
    >
      {children}
    </LoadContext.Provider>
  );
};
export default LoadProvider;
