import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Zoom from "@material-ui/core/Zoom";

const offset = 40;
const cardShadow = "0px 14px 80px rgba(34, 35, 58, 0.2)";
// const cardShadow = "0px 0px 0px rgba(34, 35, 58, 0.2)";
const headerShadow = "4px 4px 20px 1px rgba(0, 0, 0, 0.2)";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: offset,
    borderRadius: theme.spacing(0.5),
    transition: "0.3s",
    boxShadow: cardShadow,
    position: "relative",
    // [theme.breakpoints.only("sm")]: {
    //   width: "70%"
    // },
    // [theme.breakpoints.only("md")]: {
    //   width: "80%"
    // },
    // [theme.breakpoints.only("xs")]: {
    //   width: "90%"
    // },
    // width: "50%",
    width: "100%",
    overflow: "initial",
    background: "#ffffff",
    "& .MuiCardHeader-root": {
      flexShrink: 0,
      // marginTop: -40,
      // marginLeft: 25,
      // marginRight: 25,
      position: "absolute",
      top: -offset,
      right: 20,
      left: 20,
      borderRadius: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
      // backgroundColor: "#f89b5f",
      // overflow: "hidden",
      boxShadow: headerShadow,
      textAlign: "left",
      "& .MuiCardHeader-title": {
        color: "#ffffff",
        fontWeight: 900,
        letterSpacing: 1,
      },
      "& .MuiCardHeader-subheader": {
        color: "#ffffff",
        opacity: 0.87,
        fontWeight: 200,
        letterSpacing: 0.4,
      },
    },
    "& .MuiCardContent-root": {
      textAlign: "left",
      "& .MuiCardContent-inner": {
        paddingTop: "38px",
        overflowX: "auto",
      },
    },
  },
}));

const CardComponent = (props) => {
  const classes = useStyles();
  const { title, subtitle } = props;

  return (
    <Zoom in={true} style={{ transitionDelay: "200ms" }}>
      <Card className={classes.root}>
        <CardHeader
          className={"MuiCardHeader-root"}
          title={title}
          subheader={subtitle}
          classes={{
            title: "MuiCardHeader-title",
            subheader: "MuiCardHeader-subheader",
          }}
        />
        <CardContent className={"MuiCardContent-root"}>
          <div className={"MuiCardContent-inner"}>{props.children}</div>
        </CardContent>
      </Card>
    </Zoom>
  );
};

export default CardComponent;
