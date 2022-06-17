import Cookies from "cookies";
import { NextApiRequest, NextApiResponse } from "next";
import SpotifyWebApi from "spotify-web-api-node";

export default async function loginHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { code } = req.body;

  if (req.method === "POST" && code) {
    const protocol = req.headers["x-forwarded-proto"] ?? "http";

    const SpotifyApi = new SpotifyWebApi({
      redirectUri: `${protocol}://${req.headers.host}`,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
    });
    console.log(process.env.CLIENT_SECRET, "secret");

    const data = await SpotifyApi.authorizationCodeGrant(code);

    const cookies = new Cookies(req, res);
    cookies.set("session", data.body.access_token);

    res.json({
      accessToken: data.body.access_token,
      refreshToken: data.body.refresh_token,
      expiresIn: data.body.expires_in,
    });
  } else {
    res.json({
      accessToken: null,
      refreshToken: null,
      expiresIn: null,
    });
  }
}
