export type PlaylistTypes = {
  code: string | undefined;
  accessToken: string;
  refreshToken: string;
  expiresIn: string;
  ssrCode: string | undefined;
  items: [
    {
      id: string;
      name: string;
      images: [{ url: string }];
    }
  ];
  tracks: [
    {
      track: {
        name: string;
        album: { name: string; artists: [{ name: string }] };
      };
    }
  ];
};

export type MyPlaylistProps = {
  playlists: [
    {
      name: string;
      id: string;
      images: [{ url: string }];
    }
  ];
};

export type MyTracklistProps = {
  tracks: [
    {
      track: {
        name: string;
        album: { name: string; artists: [{ name: string }] };
      };
    }
  ];
};
