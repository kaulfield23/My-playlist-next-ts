import { NextApiRequest, NextApiResponse } from "next";
import SpotifyWebApi from "spotify-web-api-node";

export default async function loginHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { code } = req.body.code;
    const SpotifyApi = new SpotifyWebApi({
      redirectUri: `http://localhost:3000`,
      clientId: "57d2e6a20ac547dab1320ff810ac1b7d",
      clientSecret: process.env.CLIENT_SECRET,
    });

    SpotifyApi.authorizationCodeGrant(code)
      .then((data) => {
        res.json({
          accessToken: data.body.access_token,
          refreshToken: data.body.refresh_token,
          expiresIn: data.body.expires_in,
        });
      })
      .catch(() => {
        res.status(400).end();
      });
  }
}
