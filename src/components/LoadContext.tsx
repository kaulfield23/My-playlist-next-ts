import React, {
  createContext,
  useState,
  FC,
  PropsWithChildren,
  useReducer,
  Reducer,
} from "react";
export interface ILoadProvider {
  state: { more: boolean; after: number };
  changePerPage: (value: number) => void;
  load: (value: {}) => void;
}

const reducer = (
  state: { after: number; data: [] },
  action: { type: string; datas: []; perPage: number }
) => {
  if (action.type === "loaded") {
    console.log(state.data.length, action.datas.length, "after");
    return {
      ...state,
      data: [...state.data, ...action.datas],
      after: (state.after = state.after + action.perPage),
      more: action.datas.length === action.perPage,
    };
  } else {
    throw new Error(`Don't understand the action`);
  }
};
export const LoadContext = createContext<ILoadProvider>({
  state: { more: true, after: 0 },
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

  const load = (datas: {}) => {
    dispatch({ type: "loaded", datas, perPage });
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
