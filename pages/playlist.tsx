import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { LoginToken, refreshTokenFunc } from "../src/components/loginToken";
import { NewTokenContext } from "../src/components/newToken";
import { TokenTypes } from "../src/types";

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const code = context.query.code as string;

//   const protocol = context.req.headers["x-forwarded-proto"] ?? "http";
//   const url = new URL(
//     "/api/login",
//     `${protocol}://${context.req.headers.host}`
//   );
//   const res = await fetch(url.toString(), {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ code }),
//   });

// const responseData = await res.json();
// const responseData = await loginToken(code, url.toString());

// if (responseData.accessToken !== null) {
//   return {
//     redirect: {
//       permanent: false,
//       destination: "/playlist",
//     },
//     props: {
//       code: code ?? "",
//       accessToken: responseData.accessToken,
//       refreshToken: responseData.refreshToken,
//       expiresIn: responseData.expiresIn,
//     },
//   };
// }

//   return {
//     props: {
//       code: code ?? "",
//       accessToken: responseData.accessToken,
//       refreshToken: responseData.refreshToken,
//       expiresIn: responseData.expiresIn,
//     },
//   };
// };

const Playlist: NextPage<TokenTypes> = ({}) => {
  const {
    ctxRefreshToken,
    changeCtxRefreshToken,
    ctxExpiresIn,
    changeCtxExpiresIn,
    ctxAccessToken,
    changeCtxAccessToken,
  } = useContext(NewTokenContext);

  const router = useRouter();

  // if (ctxExpiresIn !== "hey") {
  // }

  // useEffect(() => {
  //   console.log("hey");
  //   // if (router.pathname !== "http://localhost:3000/playlist") {
  //   // }
  // }, []);

  // useEffect(() => {
  //   if (!ctxRefreshToken || !ctxExpiresIn) return;
  //   const interval = setInterval(async () => {
  //     const res = await refreshTokenFunc(refreshToken);
  //     // changeCtxAccessToken(res.accessToken);
  //     // changeCtxRefreshToken(res.refreshToken);
  //   }, (parseInt(expiresIn) - 60) * 1000);
  //   return () => clearInterval(interval);
  // }, [
  //   ctxRefreshToken,
  //   ctxExpiresIn,
  //   accessToken,
  //   changeCtxAccessToken,
  //   changeCtxRefreshToken,
  //   expiresIn,
  // ]);

  return (
    <>
      <h2>hello</h2>
    </>
  );
};

export default Playlist;
