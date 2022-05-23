import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export async function LoginToken(code: string, url: string) {
  //   const [accessToken, setAccessToken] = useState<string>("");
  //   const [refreshToken, se(tRefreshToken] = useState<string>("");
  //   const [expiresIn, setExpiresIn] = useState<string>("");
  const router = useRouter();
  // useEffect(() => {
  // const fetchData = async () => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ code }),
  });
  const result = await response.json();
  router.push("/playlist");
  return result;
  // };
  // console.log(fetchData, "data");
  // fetchData();
  // }, [code, url, router]);
}

export const refreshTokenFunc = async (refreshToken: string) => {
  console.log("refresh");
  const res = await fetch(`/api/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refreshToken }),
  });
  return await res.json();
};
