import Image from "next/image";
import React, { FC } from "react";
type MyPlaylistProps = {
  playlists: [
    {
      images: [{ url: string }];
    }
  ];
};

const MyPlaylists: FC<MyPlaylistProps> = ({ playlists }) => {
  return (
    <>
      {playlists.map((item, index) => {
        return (
          <Image
            src={item.images[0].url}
            key={index}
            alt={"hey"}
            width={200}
            height={200}
          />
        );
      })}
    </>
  );
};

export default MyPlaylists;
