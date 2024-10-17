import * as React from "react";
import { useContext, useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { productContext } from "../context/ProductContext";
import { userContext } from "../context/userContext";
import Button from "@mui/material/Button";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import Drawer from "@mui/material/Drawer";
import Cart from "./Cart";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function Navbar() {
  const search = useContext(productContext);
  const { user, setUser } = useContext(userContext);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCartDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setIsCartOpen(open);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static"  sx={{ backgroundColor: "#FFAA00" }}>
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            Frew - Easy Shopping
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              onChange={(e) => search.setSearch(e.target.value)}
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <IconButton
            color="inherit"
            onClick={toggleCartDrawer(true)}
            sx={{
              margin: 1,
              padding: "10px",
            }}
          >
            <LocalMallIcon />
          </IconButton>
          <Button
            sx={{
              backgroundColor: "white",
              color: "black",
              fontWeight: "bold",
              border: "none",
              padding: {
                xs: "6px 12px",
                sm: "6px 16px",
                md: "6px 20px",
              },
              fontSize: {
                xs: "0.75rem",
                sm: "0.875rem",
                md: "1rem",
              },
              "&:hover": {
                backgroundColor: "white",
              },
            }}
            variant="outlined"
            color="white"
            onClick={() => setUser(null)}
          >
            Logout?
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={isCartOpen}
        onClose={toggleCartDrawer(false)}
      >
        <Box
          sx={{ width: 380 }}
          role="presentation"
          onClick={(e) => e.stopPropagation()} 
          onKeyDown={(e) => e.stopPropagation()} 
        >
          <Cart onClose={toggleCartDrawer(false)} /> 
        </Box>
      </Drawer>
    </Box>
  );
}