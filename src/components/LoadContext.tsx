import React, { createContext, useState, FC, PropsWithChildren } from "react";

type dataType = {
  name: string;
  id: string;
  images: [{ url: string }];
};
export type MyContextType = {
  more: boolean;
  data: dataType[];
  load?: (value: string, value2: string) => void;
  changePerPage: (value: number) => void;
};

const myContextDefaultValues: MyContextType = {
  more: true,
  data: [],
  // after: 0,
  changePerPage: (value: number) => ({}),
};
export const LoadContext = createContext<MyContextType>(myContextDefaultValues);

const LoadProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const [perPage, setPerPage] = useState<number>(6);
  const [data, setData] = useState([]);
  const [more, setMore] = useState<boolean>(true);

  const changePerPage = (value: number) => setPerPage(value);

  const getPlaylists = async (
    userId: string,
    offset: number,
    limit: number,
    accessToken: string
  ): Promise<{ items: [] }> => {
    return fetch(
      `https://api.spotify.com/v1/users/${userId}/playlists?limit=${limit}&offset=${offset}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    ).then((response) => response.json());
  };

  let after = 0;
  const load = async (userId: string, accessToken: string) => {
    after += perPage;
    let datas = await getPlaylists(userId, after - 6, perPage, accessToken);
    setMore(datas.items.length === perPage);
    setData((prevState) => [...prevState, ...datas.items]);
  };

  return (
    <LoadContext.Provider
      value={{
        data,
        more,
        changePerPage,
        load,
      }}
    >
      {children}
    </LoadContext.Provider>
  );
};
export default LoadProvider;
