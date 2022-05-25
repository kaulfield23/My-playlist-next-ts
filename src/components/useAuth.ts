import { NextRouter, useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

export async function UseAuth(code: string | string[] | undefined) {
  const [accessToken, setAccessToken] = useState<string>("");
  const [refreshToken, setRefreshToken] = useState<string>("");
  const [expiresIn, setExpiresIn] = useState<number>(0);

  const push = usePush();
  const reload = useReload();
  useEffect(() => {
    if (code === undefined) return;
    const fetchData = async () => {
      const res = await fetch(`/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code,
        }),
      });
      console.log("what what what");
      const response = await res.json();
      setAccessToken(response.accessToken);
      setRefreshToken(response.refreshToken);
      setExpiresIn(65);
      if (response.accessToken) {
        push("/playlist");
      }
    };

    fetchData();
  }, [code, push]);

  useEffect(() => {
    console.log("eyeyey");
    if (!refreshToken || !expiresIn) return;
    const fetchData = () => {
      const interval = setInterval(async () => {
        localStorage.removeItem("token");
        const res = await fetch(`/api/refresh`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            refreshToken,
          }),
        });
        const response = await res.json();
        setAccessToken(response.accessToken);
        setExpiresIn(65);
        localStorage.setItem("token", response.accessToken);

        if (response.accessToken) {
          push("/playlist");
        }
      }, (expiresIn - 60) * 1000);
      return () => clearInterval(interval);
    };
    fetchData();
  }, [refreshToken, expiresIn, push]);

  return accessToken;
}

export function usePush(): NextRouter["push"] {
  const router = useRouter();
  const routerRef = useRef(router);

  routerRef.current = router;

  const [{ push }] = useState<Pick<NextRouter, "push">>({
    push: (path) => routerRef.current.push(path),
  });

  return push;
}

export function useReload(): NextRouter["reload"] {
  const router = useRouter();
  const routerRef = useRef(router);

  routerRef.current = router;

  const [{ reload }] = useState<Pick<NextRouter, "reload">>({
    reload: () => routerRef.current.reload(),
  });

  return reload;
}
