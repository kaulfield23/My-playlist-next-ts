import { Box } from "@mui/system";
import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import profile from "../src/img/haeju.png";
const aboutMe: NextPage = () => {
  return (
    <>
      <Box sx={{ textAlign: "center", margin: 6 }}>
        <h2>Hello there!</h2>
        <h4>A simple side project for testing Spotify API</h4>
      </Box>
      <Box
        sx={{
          textAlign: "center",
          // margin: 3,
          backgroundColor: "white",
          padding: 4,
          maxWidth: "1000px",
          margin: "30px auto",
          borderRadius: "20px",
        }}
      >
        <Box sx={{ textAlign: "center", padding: 3 }}>
          <Image src={profile} alt="haeju" />
          <h3> Name: Haeju Eom</h3>
          <h3> Age: 30</h3>
          <h3> Hobby : Drawing, Gaming, Watching movie</h3>
          <h3>
            Github :{" "}
            <Link href="https://github.com/kaulfield23">
              https://github.com/kaulfield23
            </Link>
          </h3>
          <h3> School : Lernia YH</h3>
        </Box>
        <Box sx={{ color: "purple", m: 2 }}>
          <h2>What I learned through this project</h2>
        </Box>
        <Box sx={{ backgroundColor: "pink" }}>
          <h3> - Load specific datas by using intersection observer</h3>
          <h3> - How to use Spotify API</h3>
          <h3> - Material UI</h3>
          <h3> - Refresh token when it expires</h3>
          <h3> - SSR by using getServerSideProps of Next.js</h3>
        </Box>
      </Box>
    </>
  );
};

export default aboutMe;
