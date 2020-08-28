import React from "react";
import clsx from "clsx";
import { Paper, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Colors } from "../constants";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "0px !important",
  },
  item: {
    width: "100%",
    minHeight: "240px",
    maxHeight:300,
    display: "flex",
    padding: "0px !important",
    overflow: "hidden",
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
      display: "block",
      margin: "auto",
      width: "100%",
      height: "450px",
    },
  },
  image: {
    backgroundImage: (props) => "url(" + props.image + ")",
    backgroundSize: "cover",
    backgroundPosition:'center',
    backgroundOrigin:'center',
    backgroundRepeat:'no-repeat',
    minHeight: "240px",
    maxHeight:300,
    flex: 0.45,
    [theme.breakpoints.down("xs")]: {
      height: "200px",
    },
  },
  right: {
    flex: 0.55,
    position: "relative",
  },
  story: {
    position: "relative",
    padding: theme.spacing(2),
    textDecoration: "none !important",
  },
  style: {
    position: "absolute", 
    bottom: -90,
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
    bottom:0,
    float: "right",
    cursor: "pointer",
  },
}));

const Story = (props) => {
  const classes = useStyles(props);
  return (
    <Paper
     elevation="4"
      className={clsx(classes.item, classes.root)}
      onClick={() => (window.location = `/story/${props.causeId}`)}
      >
      <div className={clsx(classes.image, classes.root)}></div>
      <div className={classes.right}>
        <div className={classes.story}>
          <h4 style={{ color: Colors.appRed, width: "70%" }}>{props.title}</h4>
          <p style={{ fontSize: 10 }}>{props.children}</p>
          <div className={clsx(classes.style, classes.root)}>
          <button className={classes.readMore}>
            Read more</button>
        </div>
        </div>
      </div>
    </Paper>
  );
};

export default Story;
