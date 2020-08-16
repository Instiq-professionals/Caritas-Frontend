import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Slide from "@material-ui/core/Slide";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import { MenuList } from "@material-ui/core";
import { Link } from "react-router-dom";
import Container from "@material-ui/core/Container";
import { useLocation } from "react-router";
import { Colors } from "../constants";
import { NavLink } from "react-router-dom";
import { FancyShape, FancyButton } from "../helpers";
import { LoggedInAvatar } from "../components";
// import { user } from "../mock";
import {
  isAuthenticated,
  getAuthenticatedUser,
  userIsUser,cLeader,Volunteer, userIsModerator, userIsAnAdmin,
  signout,
} from "../helpers/utils";

const useStyles = makeStyles((theme) => ({
  caritas: {
    color: "black",
    fontWeight: "bold",
    cursor: "pointer",
  },
  appbar: {
    backgroundColor: "rgba(0,0,0,.0) !important",
    boxShadow: "none",
    padding: "10px 0px 0px 0px",
  },
  appbarScrolling: {
    backgroundColor: "white !important",
    color: "black",
    boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.5)",
    padding: "10px 0px 0px 0px",
  },

  logo: {
    height: "30px",
  },

  menulink: {
    display: "inline",
    color: Colors.appBlack,
    textDecoration: "none",
    marginRight: "50px",
    "&:hover": {
      color: Colors.appRed,
    },
  },

  active: {
    color: Colors.appRed,
  },
  grow: {
    flexGrow: 1,
  },

  login: {
    backgroundColor: "white",
    margin: "5px",
    paddingLeft: "15px !important",
    paddingRight: "15px !important",
    color: "black",
    marginLeft: theme.spacing(2),

    "&:hover": {
      backgroundColor: "grey",
      color: "white",
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200,
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
    "&:focus, &:active": {
      outline: "none !important",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  white: {
    color: "white !important",
  },
  hidden: {
    display: "none !important",
  },
  bottomShadow: {
    boxShadow: "0px 2px 5px rgba(0,0,0,.2) !important",
  },
}));

export default function PrimarySearchAppBar() {
  const classes = useStyles();
  const location = useLocation();
  const [scrolling, setScrolling] = useState(false);
  const [user, setUser] = useState(
    isAuthenticated() ? getAuthenticatedUser() : null
  );
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  let [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const authPage =
    location.pathname === "/signin" ||
    location.pathname === "/signup" ||
    location.pathname === "/recover-password" ||
    location.pathname.includes("/users/reset_password/");

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  // console.log("location", location);

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <NavLink
          to="/about"
          className={
            location.pathname === "/about" ? classes.active : classes.inactive
          }
        >
          About
        </NavLink>
      </MenuItem>
      <MenuItem>
        <NavLink
          to="/causes"
          className={
            location.pathname === "/causes" ? classes.active : classes.inactive
          }
        >
          Causes
        </NavLink>
      </MenuItem>
      <MenuItem>
        <NavLink
          to="/how-it-works"
          className={
            location.pathname === "/how-it-works"
              ? classes.active
              : classes.inactive
          }
        >
          How it Works
        </NavLink>
      </MenuItem>
      {isAuthenticated() && (
        <span>
          <MenuItem>
            <NavLink
              to="/dashboard"
              className={
                location.pathname === "/dashboard"
                  ? classes.active
                  : classes.inactive
              }
            >
              Dashboard
            </NavLink>
          </MenuItem>
          <MenuItem>
            <NavLink
              to="/dashboard/create-cause"
              className={
                location.pathname === "/dashboard/create-cause"
                  ? classes.active
                  : classes.inactive
              }
            >
              Create a cause
            </NavLink>
          </MenuItem>
          <MenuItem>
            <NavLink
              to="/dashboard/profile"
              className={
                location.pathname === "/dashboard/profile"
                  ? classes.active
                  : classes.inactive
              }
            >
              Profile
            </NavLink>
          </MenuItem>
          <MenuItem
            onClick={() => {
              signout();
              window.location = "/signin";
            }}
          >
            Sign out
          </MenuItem>
        </span>
      )}
      {!isAuthenticated() && (
        <span>
          <MenuItem>
            <NavLink
              to="/signup"
              className={
                location.pathname === "/signup"
                  ? classes.active
                  : classes.inactive
              }
            >
              Sign up
            </NavLink>
          </MenuItem>
          <MenuItem>
            <NavLink
              to="/signin"
              className={
                location.pathname === "/signin"
                  ? classes.active
                  : classes.inactive
              }
            >
              Sign in
            </NavLink>
          </MenuItem>
        </span>
      )}
    </Menu>
  );

  useEffect(() => {
    window.addEventListener("scroll", function () {
      if (window.scrollY >= 50) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    });
  }, []);

  return (
    <div className={classes.grow}>
      <Slide direction="down" in={true} timeout={1000} mountOnEnter>
        <AppBar
          position="fixed"
          className={clsx(
            classes.appbar,
            scrolling && classes.appbarScrolling,
            location.pathname.includes("/dashboard") && classes.bottomShadow
          )}
        >
          <Container>
            <Toolbar style={{ padding: 0 }}>
              <Typography
                variant="h6"
                component="h6"
                className={classes.caritas}
                onClick={() => {
                  if (location.pathname !== "/") window.location = "/";
                }}
              >
                {/* QCare<span style={{ color: Colors.appRed }}>...</span> */}
                <img
                  src="/logo-dark.svg"
                  alt=""
                  style={{ height: "80px", marginLeft: "-16px" }}
                />
              </Typography>

              <div className={classes.grow} />
              <div className={classes.sectionDesktop}>
                {/* links to be shown on other screens apart from dashboard */}
                {!location.pathname.includes("/dashboard") && (
                  <MenuList>
                    <NavLink
                      to="/about"
                      className={clsx(
                        classes.menulink,
                        location.pathname === "/about" && classes.active,
                        authPage && classes.white
                      )}
                    >
                      About Us
                    </NavLink>
                    <NavLink
                      to="/causes"
                      className={clsx(
                        classes.menulink,
                        location.pathname === "/causes" && classes.active,
                        authPage && classes.white
                      )}
                    >
                      Causes
                    </NavLink>
                    <NavLink
                      to="/how-it-works"
                      className={clsx(
                        classes.menulink,
                        location.pathname === "/how-it-works" && classes.active,
                        authPage && classes.white
                      )}
                    >
                      How it works
                    </NavLink>

                    {isAuthenticated() ? (
                      <LoggedInAvatar user={user} />
                    ) : (
                      <NavLink
                        to="/signin"
                        className={clsx(
                          classes.menulink,
                          authPage && classes.hidden
                        )}
                      >
                        Sign In
                      </NavLink>
                    )}
                  </MenuList>
                )}
                {!location.pathname.includes("/dashboard") &&
                  !authPage &&
                  !isAuthenticated() && (
                    <Link to="/signup">
                      <FancyButton label="Sign Up" />
                    </Link>
                  )}
                {location.pathname.includes("/dashboard") && (
                  <>
                    {!location.pathname.includes("/dashboard/create-cause") && (
                      <div>
                          <NavLink to="/dashboard/create-cause">
                          <FancyButton label="+ Add a Cause" />{" "}
                         </NavLink>
                         {!userIsUser() && (
                           <NavLink to="/dashboard/createEvent">
                           <FancyButton label="+ Add an Event" />{" "}
                          </NavLink>
                         )} 
                       {(Volunteer() || userIsAnAdmin()) && (
                      <NavLink to="/dashboard/review">
                      <FancyButton label="Review Causes" />{" "}
                     </NavLink>
                       )}
                       {(cLeader() || userIsAnAdmin() )&& (
                      <NavLink to="/dashboard/approve">
                      <FancyButton label="Approve Causes" />{" "}
                     </NavLink>
                       )}
                       {userIsModerator() && (
                         <NavLink to="/dashboard/resolve">
                         <FancyButton label="Resolve Causes" />{" "}
                        </NavLink>
                       )}
                       {(cLeader())&& (
                      <NavLink to="/dashboard/approveVolunteer">
                      <FancyButton label="Approve Volunteers" />{" "}
                     </NavLink>
                       )}
                      </div>
                    )}

                    <LoggedInAvatar user={user} />
                  </>
                )}
              </div>
              <div className={clsx(classes.sectionMobile)}>
                <IconButton
                  aria-label="show more"
                  aria-controls={mobileMenuId}
                  aria-haspopup="true"
                  onClick={handleMobileMenuOpen}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
              </div>
            </Toolbar>
          </Container>
        </AppBar>
      </Slide>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}
