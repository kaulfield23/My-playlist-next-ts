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
  offset: number,
  limit: number,
  accessToken: string
): Promise<{ items: [] }> => {
  return fetch(
    `https://api.spotify.com/v1/playlists/${playlistId}/tracks?limit=${limit}&offset=${offset}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  ).then((response) => response.json());
};

export const getLikedSongs = async (
  listId: string,
  offset: number,
  limit: number,
  accessToken: string
): Promise<{ items: [] }> => {
  return fetch(
    `https://api.spotify.com/v1/me/tracks?limit=${limit}&offset=${offset}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  ).then((response) => response.json());
};
//function for get specific datas that is depends on limit and offset
export const getSpecificDatas = async (
  listId: string,
  after: number,
  perPage: number,
  accessToken: string
) => {
  let getDatas = listId === "likedSongs" ? getLikedSongs : getTracks;
  let data;
  let more = true;

  let datas = await getDatas(listId, after - perPage, perPage, accessToken);
  more = datas.items.length === perPage;
  data = datas.items;
  return { data, more };
};
