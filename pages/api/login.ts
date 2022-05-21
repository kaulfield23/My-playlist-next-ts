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
      redirectUri: `${protocol}://${req.headers.host}/playlist`,
      clientId: "57d2e6a20ac547dab1320ff810ac1b7d",
      clientSecret: process.env.CLIENT_SECRET,
    });

    const data = await SpotifyApi.authorizationCodeGrant(code);
    res.json({
      accessToken: data.body.access_token,
      refreshToken: data.body.refresh_token,
      expiresIn: 61,
    });
  } else {
    res.json({
      accessToken: null,
      refreshToken: null,
      expiresIn: null,
    });
  }
}
