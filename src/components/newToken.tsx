import React, { createContext, useState, FC, PropsWithChildren } from "react";
export interface InewTokenContextType {
  ctxAccessToken: string;
  ctxRefreshToken: string;
  ctxExpiresIn: string;
  changeCtxAccessToken: (value: string) => void;
  changeCtxRefreshToken: (value: string) => void;
  changeCtxExpiresIn: (value: string) => void;
}
export const NewTokenContext = createContext<InewTokenContextType>({
  ctxAccessToken: "",
  ctxRefreshToken: "",
  ctxExpiresIn: "",
  changeCtxAccessToken: (value: string) => ({}),
  changeCtxRefreshToken: (value: string) => ({}),
  changeCtxExpiresIn: (value: string) => ({}),
});

// const newTokenProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
//   return <NewTokenContext.Provider>{children}</NewTokenContext.Provider>;
// };

const NewTokenProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const [ctxAccessToken, setctxAccessToken] = useState("");
  const [ctxRefreshToken, setctxRefreshToken] = useState("");
  const [ctxExpiresIn, setctxExpiresIn] = useState("");
  const changeCtxAccessToken = (value: string) => setctxAccessToken(value);
  const changeCtxRefreshToken = (value: string) => setctxRefreshToken(value);
  const changeCtxExpiresIn = (value: string) => setctxExpiresIn(value);

  return (
    <NewTokenContext.Provider
      value={{
        ctxAccessToken,
        ctxRefreshToken,
        ctxExpiresIn,
        changeCtxAccessToken,
        changeCtxRefreshToken,
        changeCtxExpiresIn,
      }}
    >
      {children}
    </NewTokenContext.Provider>
  );
};
export default NewTokenProvider;
