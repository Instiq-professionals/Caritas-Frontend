import React from "react";
import clsx from "clsx";
import { Paper, Slider, Button } from "@material-ui/core";
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
    width: "550px",
    height: "250px",
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
  console.log("Inside cause item", props);
  return (
    <Paper
    style={{backgroundImage:`url(${baseUrl}${props.cause.cause_photos})`}}
      elevation="4"
      className={clsx(classes.item, classes.root)}
      onClick={() => (window.location = `/cause/${props.cause._id}`)}
    >
      <div className={clsx(classes.image, classes.root)}></div>
      <div className={classes.right}>
        <div className={classes.desc}>
          <span className={classes.category}>{props.cause.category}</span>
          <h4 style={{ color: Colors.appRed, width: "70%" }}>
            {props.cause.cause_title}
          </h4>
          <p style={{ fontSize: 10 }}>{props.children}</p>
          <div className={classes.root}>
            <Slider
              value={parseInt(props.cause.amount_donated)}
              max={parseInt(props.cause.amount_required)}
            />
            <p
              style={{
                textAlign: "center",
                padding: 0,
                margin: 0,
                color: Colors.appRed,
                fontSize: "10px",
              }}
            >
              <Naira>{props.cause.amount_donated?props.cause.amount_donated:0}</Naira>
               - <Naira>{props.cause.amount_required}</Naira>
            </p>
          </div>
        </div>
        <div
          className={classes.root}
          style={{ position: "absolute", bottom: 0, left: 0, width: "100%" }}
        >
          <button className={classes.donate}>Donate</button>
          <button className={classes.readMore}>Read more</button>
        </div>
      </div>
    </Paper>
  );
};

export default CauseItem;
