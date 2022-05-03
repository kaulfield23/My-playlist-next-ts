import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Navbar from "../component/Navbar";
import { StyledEngineProvider, ThemeProvider } from "@mui/material";
import { theme } from "../styles/theme";
import Head from "next/head";
import { useRouter } from "next/router";
function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const path = router.pathname;
  return (
    <>
      <Head>
        <title>My playlist</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <StyledEngineProvider>
        <ThemeProvider theme={theme}>
          {path !== "/" ? <Navbar /> : ""}
          <Component {...pageProps} />
        </ThemeProvider>
      </StyledEngineProvider>
    </>
  );
}

export default MyApp;
