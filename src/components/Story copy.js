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
    width: "500px",
    height: "200px",
    display: "flex",
    padding: "0px !important",
    overflow: "hidden",
    [theme.breakpoints.down("md")]: {
      display: "block",
      margin: "auto",
      width: "300px",
      height: "450px",
    },
  },
  image: {
    backgroundImage: (props) => "url(" + props.image + ")",
    backgroundSize: "cover",
    flex: 0.45,
    [theme.breakpoints.down("md")]: {
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
  },
}));

const Story = (props) => {
  const classes = useStyles(props);
  return (
    <Paper elevation="4" className={clsx(classes.item, classes.root)}>
      <div className={clsx(classes.image, classes.root)}></div>
      <div className={classes.right}>
        <div className={classes.story}>
          <h4 style={{ color: Colors.appRed, width: "70%" }}>{props.title}</h4>
          <p style={{ fontSize: 10 }}>{props.children}</p>
          <div className={classes.root}></div>
        </div>
      </div>
    </Paper>
  );
};

export default Story;
