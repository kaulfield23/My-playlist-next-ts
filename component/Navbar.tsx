import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import {
  AppBar,
  Toolbar,
  Tabs,
  Tab,
  useMediaQuery,
  useTheme,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { Box } from "@mui/system";
import MusicNoteIcon from "@mui/icons-material/MusicNote";

const CustomTab = styled(Tab, {
  shouldForwardProp: (props) => props !== "sx",
})(() => ({
  fontWeight: "bold",
  fontSize: "16px",
  margin: "0 18px",
  color: "white",
  fontFamily: "nunito",
  opacity: 1,
  "&:hover": {
    color: "#500950",
  },
  "&.Mui-selected": {
    color: "#500950",
    fontWeight: "bold",
  },
}));

const menus = [
  { name: "Playlist", path: "/playlist" },
  { name: "IDK", path: "/idk" },
  { name: "Temporary", path: "/temporary" },
  { name: "About me", path: "/aboutme" },
];

const Navbar = () => {
  const [value, setValue] = useState(0);
  const theme = useTheme();
  const isMobileSize = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      <AppBar
        sx={{ backgroundColor: "#b9a1c2" }}
        position="sticky"
        elevation={3}
      >
        <Toolbar>
          <Link href="/" passHref>
            <MusicNoteIcon color="primary" sx={{ cursor: "pointer" }} />
          </Link>
          {isMobileSize ? (
            <>
              <Link href="/" passHref>
                <Typography
                  sx={{
                    marginLeft: "20px",
                    fontFamily: "Nunito",
                    fontWeight: "bold",
                    color: "#613a72",
                    cursor: "pointer",
                  }}
                >
                  My playlist
                </Typography>
              </Link>
              {/* <DrawerMUI /> */}
            </>
          ) : (
            <>
              <Tabs
                sx={{ marginLeft: "auto" }}
                value={value}
                onChange={(e, value) => setValue(value)}
                indicatorColor="primary"
                textColor="primary"
              >
                {menus.map((menu, index) => {
                  return (
                    <Link href={menu.path} passHref key={index}>
                      <Box onClick={() => setValue(index)}>
                        <CustomTab label={menu.name} />
                      </Box>
                    </Link>
                  );
                })}
              </Tabs>
            </>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
