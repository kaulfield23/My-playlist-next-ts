import { useEffect } from "react";

export async function UseAuth(refreshToken: string, expiresIn: number) {
  useEffect(() => {
    if (!refreshToken || !expiresIn) return;
    const fetchData = () => {
      const interval = setInterval(async () => {
        const res = await fetch(`/api/refresh`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            refreshToken,
          }),
        });
      }, (expiresIn - 60) * 1000);
      return () => clearInterval(interval);
    };
    fetchData();
  }, [refreshToken, expiresIn]);
}
