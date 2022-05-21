import type { GetServerSideProps, NextPage } from "next";
import { useEffect } from "react";
import { TokenTypes } from "../src/types";

const refreshTokenFunc = async (refreshToken: string) => {
  const res = await fetch(`/api/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refreshToken }),
  });

  const resData = await res.json();
  // console.log(resData.accessToken, resData.expiresIn, "oooo");
};
export const getServerSideProps: GetServerSideProps = async (context) => {
  const code = context.query.code as string;

  const protocol = context.req.headers["x-forwarded-proto"] ?? "http";
  const url = new URL(
    "/api/login",
    `${protocol}://${context.req.headers.host}`
  );

  const res = await fetch(url.toString(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ code }),
  });
  const responseData = await res.json();

  return {
    props: {
      code: code ?? "",
      accessToken: responseData.accessToken,
      refreshToken: responseData.refreshToken,
      expiresIn: 61,
    },
  };
};

const Playlist: NextPage<TokenTypes> = ({
  code,
  accessToken,
  refreshToken,
  expiresIn,
}) => {
  useEffect(() => {
    if (!refreshToken || !expiresIn) return;
    const interval = setInterval(() => {
      refreshTokenFunc(refreshToken);
    }, (parseInt(expiresIn) - 60) * 1000);
    return () => clearInterval(interval);
  }, [refreshToken, expiresIn, accessToken]);

  return (
    <>
      <h1>{code}</h1>
      <h1>{refreshToken}</h1>
      <h2>hello</h2>
    </>
  );
};

export default Playlist;
