import React, {
  createContext,
  useState,
  FC,
  PropsWithChildren,
  useReducer,
  Reducer,
  useEffect,
} from "react";
export interface ILoadProvider {
  state: {
    more: boolean;
    after: number;
    data: [{ name: string; id: string; images: [{ url: string }] }];
  };
  changePerPage: (value: number) => void;
  load?: (value1: string, value2: string) => void;
}

const reducer = (
  state: { after: number; data: [] },
  action: { type: string; datas: []; perPage: number }
) => {
  if (action.type === "loaded") {
    return {
      ...state,
      data: [...state.data, ...action.datas],
      after: state.after + action.perPage,
      more: action.datas.length <= action.perPage,
    };
  } else {
    throw new Error(`Don't understand the action`);
  }
};
export const LoadContext = createContext<ILoadProvider>({
  state: {
    more: true,
    after: 0,
    data: [{ name: "", id: "", images: [{ url: "" }] }],
  },
  changePerPage: (value: number) => ({}),
  load: (value: {}) => ({}),
});

const LoadProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const [perPage, setPerPage] = useState<number>(6);
  const [state, dispatch] = useReducer<Reducer<any, any>>(reducer, {
    more: true,
    after: perPage,
    data: [],
  });
  const changePerPage = (value: number) => setPerPage(value);

  const { after } = state;

  const getPlaylists = async (
    userId: string,
    offset: number,
    limit: number,
    accessToken: string
  ) => {
    console.log(offset, "eeeeeeeeee");
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
      debugger;
      console.log(after, "afterrrrrrrrrrrrr");
      let result = await getPlaylists(
        userId,
        after - perPage,
        after,
        accessToken
      );
      dispatch({
        type: "loaded",
        datas: result.items,
        perPage,
      });
    }, 300);
  };

  return (
    <LoadContext.Provider
      value={{
        state,
        changePerPage,
        load,
      }}
    >
      {children}
    </LoadContext.Provider>
  );
};
export default LoadProvider;
