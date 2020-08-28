import React from "react";
import { Container, Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Colors } from "../../constants";
import "../../index.css";
import { baseUrl } from "../../constants";
import Moment from 'react-moment';

const moreStyles = makeStyles((theme) => ({
  mainImage: {
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

const AstoryHeader = (props) => {
  const classes2 = moreStyles(props);
  return (
    <Container>
      {props.error?<div>{props.error.message}</div>:<Grid container spacing={4} style={{ marginBottom: "100px" }}>
        <Grid item xs={12} md={6} className={classes2.mainImage}>
          {props.StoryData.pictures && (
            <img
              src={baseUrl + props.StoryData.pictures}
              alt={"pic"}
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
            <Moment >{props.StoryData.createdAt }</Moment>
          </Typography>
          <Typography
            variant="h5"
            component="h5"
            style={{ fontWeight: "bold", marginBottom: "20px" }}
          >
            {`${props.UserData.first_name} ${props.UserData.last_name}` }
          </Typography>

          <Typography
            variant="body1"
            component="p"
            style={{ fontSize: "14px", marginBottom: "20px" }}
          >
            {props.StoryData.testimonial }
          </Typography>
        </Grid>
      </Grid>}
    </Container>
  );
};

export default AstoryHeader;
