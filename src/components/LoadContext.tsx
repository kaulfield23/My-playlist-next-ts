import React, {
  createContext,
  useState,
  FC,
  PropsWithChildren,
  useReducer,
  Reducer,
  useEffect,
} from "react";
// export interface ILoadProvider {
//   state: {
//     more: boolean;
//     after: number;
//     data: [{ name: string; id: string; images: [{ url: string }] }];
//   };
//   changePerPage: (value: number) => void;
//   load?: (value1: string, value2: string) => void;
// }
export type MyContextType = {
  more: boolean;
  data: any[];
  after?: number;
  load?: (value: string, value2: string) => void;
  changePerPage: (value: number) => void;
};

const reducer = (state: MyContextType, action: any) => {
  if (action.type === "loaded") {
    console.log(state.after, action.perPage, "whyyyyyyyyyyy");
    return {
      ...state,
      data: [...state.data, ...action.datas],
      after: state.after + action.datas.length,
      more: action.datas.length === action.perPage,
    };
  } else {
    throw new Error(`Don't understand the action`);
  }
};

const myContextDefaultValues: MyContextType = {
  more: true,
  data: [],
  after: 0,
  changePerPage: (value: number) => ({}),
};
export const LoadContext = createContext<MyContextType>(myContextDefaultValues);

const LoadProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const [perPage, setPerPage] = useState<number>(6);
  const [state, dispatch] = useReducer<Reducer<any, any>>(reducer, {
    more: true,
    after: 0,
    data: [],
  });
  const changePerPage = (value: number) => setPerPage(value);

  const { data, after, more } = state;

  const getPlaylists = async (
    userId: string,
    offset: number,
    limit: number,
    accessToken: string
  ) => {
    console.log(offset, limit, more);
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

  const load = async (userId: string, accessToken: string) => {
    setTimeout(async () => {
      getPlaylists(userId, after, after + perPage, accessToken).then((data) => {
        dispatch({ type: "loaded", datas: data.items, perPage });
      });
    }, 300);
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
