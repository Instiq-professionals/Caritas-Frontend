import React from "react";
import clsx from "clsx";
import { Paper, Slider, Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Colors } from "../constants";
import { baseUrl } from "../constants";
import Naira from 'react-naira';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "0px !important",
    textDecoration: "none !important",
  },
  item: {
    width: "100%",
    minHeight: "240px",
    maxHeight: 300,
    display: "flex",
    padding: "0px !important",
    overflow: "hidden",
    cursor: "pointer",
    textDecoration: "none !important",
    "&:hover": {
      backgroundColor: "#ddd",
      "& div:first-child": {
        backgroundSize: "110% 110%",
        transition: "background-size 10s",
        "-webkit-transition": "background-size 10s",
      },
    },
    [theme.breakpoints.down("xs")]: {
      height: "500px",
      flexDirection: "column"
    },
  },
  image: {
    // backgroundImage: (props) =>
    //   process.env.NODE_ENV === "development"
    //     ? "url(" +
    //       props.cause.cause_photos[0].replace(/^uploads\\/, baseUrl) +
    //       ")"
    //     : "/" + props.cause.cause_photos[0],

    backgroundSize: "cover",
    backgroundPosition: "center",
    flex: 0.45,
  },
  right: {
    flex: 0.55,
    position: "relative",
    textDecoration: "none !important",
  },
  desc: {
    position: "relative",
    padding: theme.spacing(2),
    textDecoration: "none !important",
  },
  category: {
    backgroundColor: Colors.appRed,
    color: "white",
    padding: "5px 10px",
    position: "absolute",
    top: 0,
    right: 0,
  },
  donate: {
    backgroundColor: Colors.appRed,
    color: "white",
    height: 42,
    border: "none",
    width: "140px",
    cursor: "pointer",
  },
  style: {
    position: "absolute", 
    bottom: 10,
     left: 0, 
     width: "100%",
     [theme.breakpoints.down("xs")]: {
      bottom: 40,
    },
  },
  readMore: {
    backgroundColor: "black",
    color: "white",
    height: 42,
    border: "none",
    width: "140px",
    marginLeft: "auto",
    float: "right",
    cursor: "pointer",
  },
}));

const CauseItem = (props) => {
  const classes = useStyles(props);
  return (
    <Paper
      elevation="4"
      className={clsx(classes.item, classes.root)}
      onClick={() => (window.location = `/cause/${props.cause._id}`)}
    >
      <div className={clsx(classes.image, classes.root)} style={{backgroundImage:`url(${baseUrl}${props.cause.cause_photos})`}}></div>
      <div className={classes.right}>
        <div className={classes.desc}>
          <span className={classes.category}>{props.cause.category}</span>
          <h4 style={{ color: Colors.appRed, width: "70%" }}>
            {props.cause.cause_title}
          </h4>
          <p style={{ fontSize: 10 }}>{props.children}</p>
        </div>
        <div
          className={clsx(classes.style, classes.root)}
        >
          <button className={classes.readMore}
          >
            Read more</button>
        </div>
      </div>
    </Paper>
  );
};

export default CauseItem;
