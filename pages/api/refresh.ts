import { NextApiRequest, NextApiResponse } from "next";
import SpotifyWebApi from "spotify-web-api-node";

export default async function refreshHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const refreshToken = req.body.refreshToken;
    const SpotifyApi = new SpotifyWebApi({
      redirectUri: `/playlist`,
      clientId: "57d2e6a20ac547dab1320ff810ac1b7d",
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken,
    });
    console.log("what");
    const data = await SpotifyApi.refreshAccessToken();
    res.json({
      accessToken: data.body.access_token,
      refreshToken: data.body.refresh_token,
      expiresIn: 61,
    });
  } catch (err) {
    // console.log(err);
    res.status(400).end();
  }
}
