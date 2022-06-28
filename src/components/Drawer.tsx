import React, { useState } from "react";
import {
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import Link from "next/link";
import MenuIcon from "@mui/icons-material/Menu";

const menus = [
  { name: "PLAYLIST", path: "/playlist" },
  { name: "MY PROFILE", path: "/myProfile" },
];

const DrawerMUI = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  return (
    <>
      <Drawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        anchor={"right"}
      >
        <List>
          {menus.map((menu, index) => {
            return (
              <Link href={menu.path} passHref key={index}>
                <ListItemButton onClick={() => setOpenDrawer(false)}>
                  <ListItemIcon>
                    <ListItemText
                      primaryTypographyProps={{
                        color: "purple",
                        fontWeight: "bold",
                        fontFamily: "Nunito",
                        variant: "body2",
                        padding: "13px",
                      }}
                    >
                      {menu.name}
                    </ListItemText>
                  </ListItemIcon>
                </ListItemButton>
              </Link>
            );
          })}
          <Divider />
          <ListItemButton
            onClick={() => setOpenDrawer(false)}
            key={Math.random()}
          >
            <Link href="/aboutme" passHref>
              <ListItemText
                primaryTypographyProps={{
                  color: "#3a4172",
                  fontWeight: "bold",
                  fontFamily: "Nunito",
                  variant: "body2",
                  padding: "13px",
                }}
              >
                ABOUT ME
              </ListItemText>
            </Link>
          </ListItemButton>
        </List>
      </Drawer>
      <IconButton
        sx={{ color: "white", marginLeft: "auto" }}
        onClick={() => setOpenDrawer(!openDrawer)}
      >
        <MenuIcon />
      </IconButton>
    </>
  );
};

export default DrawerMUI;
