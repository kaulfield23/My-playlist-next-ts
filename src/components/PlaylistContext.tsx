import { useRouter } from "next/router";
import React, { createContext, useState, FC, PropsWithChildren } from "react";
import { getPlaylists } from "../data/fetchDatas";
import { PlaylistType } from "../types";

export type LoadPlaylistContextType = {
  more: boolean;
  data: PlaylistType[];
  loadPlaylists?: (value: string, value2: string, value3: number) => void;
  changeMore: (value: boolean) => void;
};

const loadContextDefaultValues: LoadPlaylistContextType = {
  more: true,
  data: [],
  changeMore: (value: boolean) => ({}),
};
export const PlaylistContext = createContext<LoadPlaylistContextType>(
  loadContextDefaultValues
);

const PlaylistProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const [data, setData] = useState([]);
  const [more, setMore] = useState<boolean>(true);
  const router = useRouter();
  const changeMore = (value: boolean) => {
    setMore(value);
  };

  //for limit and offset
  let after = 0;

  //to set after(for offset) for where it stopped
  if (router.pathname === "/playlist" && data.length > 0) {
    after = data.length;
  }
  //get the playlists
  const loadPlaylists = async (
    userId: string,
    accessToken: string,
    perPage: number
  ) => {
    //for saving the data from where it stopped in playlists page
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

  return (
    <PlaylistContext.Provider
      value={{
        data,
        more,
        changeMore,
        loadPlaylists,
      }}
    >
      {children}
    </PlaylistContext.Provider>
  );
};
export default PlaylistProvider;
