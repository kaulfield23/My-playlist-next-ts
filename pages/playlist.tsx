import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { NewTokenContext } from "../src/components/newToken";
import { UseAuth } from "../src/components/useAuth";
import { TokenTypes } from "../src/types";

const Playlist: NextPage<TokenTypes> = ({}) => {
  const [accessToken, setAccessToken] = useState<string>("");
  const router = useRouter();
  const code = router.query.code;
  const getToken = async () => {
    const res = await UseAuth(code);
    console.log(res, "resss");
    setAccessToken(res);
  };
  getToken();
  return (
    <>
      <h2>hello</h2>
      {code}
      <h1>hehe {accessToken}</h1>
    </>
  );
};

export default Playlist;
