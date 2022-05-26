import Cookies from "cookies";
import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { UseAuth } from "../src/components/useAuth";
import { TokenTypes } from "../src/types";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = new Cookies(context.req, context.res);
  const accessToken = cookies.get("session") ?? "";
  const userId = "kaulfield1113";
  let items;
  if (accessToken) {
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
    items = res.items;
  }

  return {
    props: {
      items: items ?? "",
    },
  };
};

const Playlist: NextPage<TokenTypes> = ({ items }) => {
  if (typeof window !== "undefined") {
    const refresh: string | null = localStorage.getItem("refresh");
    let expires: string | null = localStorage.getItem("expire");
    let expiresInput: number;
    if (expires) expiresInput = parseInt(expires);
    const getToken = async () => {
      if (refresh && expiresInput) {
        const res = await UseAuth(refresh, expiresInput);
      }
      console.log("hahahahahah");
    };
    getToken();
  }
  return (
    <>
      <h2>hello</h2>
      {items && JSON.stringify(items[0].name)}
    </>
  );
};

export default Playlist;
