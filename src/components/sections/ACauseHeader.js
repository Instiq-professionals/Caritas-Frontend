import React from "react";
import { Container, Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Colors } from "../../constants";
import "../../index.css";
import { baseUrl } from "../../constants";
import {  useParams } from "react-router";

const moreStyles = makeStyles((theme) => ({
  mainImage: {
    // backgroundImage: (cause) => {
    //   console.log("Making styles", cause);
    //   return `url('${cause !== [] ? cause.cause_photos[0] : "null"}')`;
    // },
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: "400px",
  },
  headerTitle: {
    color: Colors.appRed,
    fontSize: "14px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  share: {
    height: "40px",
    marginLeft: "20px",
  },
}));

const ACauseHeader = (props) => {

  const causeId = useParams().id;

  const classes2 = moreStyles(props);


  return (
    <Container>
      <Grid container spacing={4} style={{ marginBottom: "100px" }}>
        <Grid item xs={12} md={6} className={classes2.mainImage}>
          {props.cause.cause_photos && (
            <img
              src={baseUrl + props.cause.cause_photos}
              alt=""
              style={{ width: "100%", height: "100%" }}
            />
          )}
        </Grid>
        <Grid item xs={12} md={6} style={{ position: "relative" }}>
          <Typography
            variant="h6"
            component="h6"
            className={classes2.headerTitle}
          >
            {props.cause.category || "Test"}
          </Typography>
          <Typography
            variant="h5"
            component="h5"
            style={{ fontWeight: "bold", marginBottom: "20px" }}
          >
            {props.cause.cause_title || "Title goes here"}
          </Typography>

          <Typography
            variant="body1"
            component="p"
            style={{ fontSize: "14px", marginBottom: "20px" }}
          >
            {props.cause.brief_description || "Description goes here"}
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ACauseHeader;
