export type PlaylistTypes = {
  code: string | undefined;
  accessToken: string;
  userId: string;
  refreshToken: string;
  expiresIn: string;
};

export type ListType = {
  name: string;
  id: string;
  images: [{ url: string }];
};
export type MyPlaylistProps = {
  accessToken: string;
  userId: string;
};

export type MyTracklistProps = {
  accessToken: string;
};

export type PlaylistType = {
  name: string;
  id: string;
  images: [{ url: string }];
};

export type TracksType = {
  track: {
    name: string;
    album: { images: [{ url: string }] };
    artists: [{ name: string }];
    uri: string;
  };
};

export type EachPlaylistProps = {
  playlistID: string;
  accessToken: string;
  playlistName: string;
};

export type LikedSongsType = {
  track: {
    name: string;
    album: { name: string; images: [{ url: string }]; artists: [{ name: string }] };
    uri: string;
  };
};
