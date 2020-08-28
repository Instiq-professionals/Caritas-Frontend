import React, { Fragment, useState } from "react";
import clsx from "clsx";
import { Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Colors } from "../constants";
import { Link } from "react-router-dom";
import { baseUrl  } from "../constants";
import { signout, processPhoto } from "../helpers/utils";
import { useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  dropdown: {
    position: "absolute",
    boxShadow: "2px 2px 5px rgba(0,0,0,.3)",
    backgroundColor: "white",
    borderRadius: "10px",
    padding: "10px 30px",
    top: "50px",
    right: "0px",
    zIndex: 2000,
    display: "none",
  },
  display: {
    display: "block",
  },

  dropdownLink: {
    lineHeight: "32px",
    color: Colors.appBlack,
    "&:hover": {
      color: Colors.appRed,
    },
    "&:nth-child(2)": {
      marginTop: "20px",
    },
  },
}));

const LoggedInAvatar = (props) => {
  let [open, setOpen] = useState(false);
  const location = useLocation();

  const classes = useStyles(open);

  return props.user != null ? (
    <Fragment>
      <div
        style={{
          display: "inline-flex",
          flexWrap: "nowrap",
          cursor: "pointer",
          position: "relative",
        }}
        open={open}
        onClick={() => {
          setOpen(!open);
        }}
      >
        <p
          style={{
            marginLeft: "50px",
            marginRight: "20px",
            fontSize: "14px",
            fontWeight: "bold",
            lineHeight: "100%",
            display: "inline-block",
          }}
        >
          Hi, {props.user.first_name}
        </p>
        <Avatar
          alt={props.user.first_name}
          src={baseUrl + props.user.photo}
          style={{ WebKitTransform: "scale(1.5, 1.5)" }}
        />

        <div className={clsx(classes.dropdown, open && classes.display)}>
          {!location.pathname.includes("dashboard") && (
            <>
              <Link className={classes.dropdownLink} to="/dashboard">
                Dashboard
              </Link>

              {/* <hr style={{ color: Colors.appRed }} /> */}
            </>
          )}
          <p style={{ textAlign: "center" }}>
            <Link to="/dashboard/profile" className={classes.dropdownLink}>
              Profile
            </Link>
          </p>
          <p
            className={classes.dropdownLink}
            style={{ margin: "0px", textAlign: "center" }}
            onClick={() => {
              if (signout()) window.location = "/signin";
            }}
          >
            Signout
          </p>
        </div>
      </div>
    </Fragment>
  ) : (
    <Fragment></Fragment>
  );
};

export default LoggedInAvatar;
