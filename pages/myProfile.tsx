import { Avatar } from "@mui/material";
import { Box } from "@mui/system";
import Cookies from "cookies";
import type { GetServerSideProps, NextPage } from "next";
type UserDataType = {
  userData: {
    display_name: string;
    images: [{ url: "" }];
    followers: { total: number };
    id: string;
  };
};
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
const myProfile: NextPage<UserDataType> = ({ userData }) => {
  return (
    <>
      <Box
        sx={{
          textAlign: "center",
          color: "purple",
          margin: "0 auto",
          maxWidth: "800px",
        }}
      >
        <Box
          sx={{
            // marginTop: "80px",
            backgroundColor: "white",
            margin: "200px 10px 0px 10px",
            padding: 2,
            border: "solid 2px purple",
            borderRadius: "10px",
          }}
          className="card-space"
        >
          <Box
            sx={{
              border: "solid 2px purple",
              padding: 2,
              borderRadius: "10px",
            }}
          >
            <h1>My profile</h1>
            <Avatar
              alt={userData.display_name}
              src={userData.images[0].url}
              sx={{ width: 250, height: 250, margin: "40px auto 30px auto" }}
            />
            <h4>Name : {userData.display_name}</h4>
            <h4>Spotify ID : {userData.id}</h4>
            <h4>Followers : {userData.followers.total}</h4>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default myProfile;
