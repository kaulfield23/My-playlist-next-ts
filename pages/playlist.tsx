import Cookies from "cookies";
import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { UseAuth } from "../src/components/useAuth";
import { TokenTypes } from "../src/types";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = new Cookies(context.req, context.res);
  const accessToken = cookies.get("session");
  const userId = "kaulfield1113";
  const response = await fetch(
    `https://api.spotify.com/v1/users/${userId}/playlists `,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const res = await response.json();
  const items = res.items;
  return {
    props: {
      items,
    },
  };
};

const Playlist: NextPage<TokenTypes> = ({ items }) => {
  const [accessToken, setAccessToken] = useState<string>("");
  const router = useRouter();
  const code = router.query.code;

  useEffect(() => {
    setAccessToken(localStorage.getItem("token") ?? "");
  }, [code]);

  const getToken = async () => {
    const res = await UseAuth(code);

    if (typeof window !== "undefined") {
      localStorage.setItem("token", res);
    }

    if (accessToken) {
      const response = await fetch(
        `https://api.spotify.com/v1/users/kaulfield1113/playlists `,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
    }
  };

  getToken();
  return (
    <>
      <h2>hello</h2>
      {code}
      <h1>hehe {accessToken}</h1>
      {JSON.stringify(items[0].name)}
    </>
  );
};

export default Playlist;
