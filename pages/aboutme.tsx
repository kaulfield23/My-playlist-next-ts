import { Box } from "@mui/system";
import Cookies from "cookies";
import type { GetServerSideProps, NextPage } from "next";
import Image from "next/image";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const userId = process.env.SPOTIFY_ID;
  const cookies = new Cookies(context.req, context.res);
  const accessToken = cookies.get("session") ?? "";

  let result = await fetch(`https://api.spotify.com/v1/users/${userId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  let userData = await result.json();
  return {
    props: { userData },
  };
};

type UserDataType = {
  userData: {
    display_name: string;
    images: [{ url: "" }];
  };
};
const aboutMe: NextPage<UserDataType> = ({ userData }) => {
  console.log(userData.images[0].url, "uda");
  return (
    <>
      <Box>
        <Image
          src={userData.images[0].url}
          width={50}
          height={50}
          alt={userData.display_name}
        />
        <h1>{userData.display_name}</h1>;
      </Box>
    </>
  );
};

export default aboutMe;
