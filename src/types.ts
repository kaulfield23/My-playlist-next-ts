export type PlaylistTypes = {
  code: string | undefined;
  accessToken: string;
  userId: string;
  refreshToken: string;
  expiresIn: string;
  ssrCode: string | undefined;
  // items: [
  //   {
  //     id: string;
  //     name: string;
  //     images: [{ url: string }];
  //   }
  // ];
  // tracks: [
  //   {
  //     track: {
  //       name: string;
  //       album: { name: string; artists: [{ name: string }] };
  //     };
  //   }
  // ];
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
