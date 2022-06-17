export const getPlaylists = async (
  userId: string,
  offset: number,
  limit: number,
  accessToken: string
): Promise<{ items: [] }> => {
  return fetch(
    `https://api.spotify.com/v1/users/${userId}/playlists?limit=${limit}&offset=${offset}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  ).then((response) => response.json());
};

export const getTracks = async (
  playlistId: string,
  accessToken: string
): Promise<{ items: [] }> => {
  return fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  }).then((response) => response.json());
};
