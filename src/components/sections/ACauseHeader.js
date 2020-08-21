import React, { useState, useEffect } from "react";
import { Container, Typography, Slider, Grid, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { FancyShape, useStyles } from "../../helpers";
import { Colors } from "../../constants";
import { Link } from "react-router-dom";
import "../../index.css";
import { baseUrl } from "../../constants";
import { useLocation, useParams } from "react-router";
import {
  FacebookIcon,
  TwitterIcon,
  InstapaperIcon,
  FacebookShareButton,
  TwitterShareButton,
  InstapaperShareButton,
} from "react-share";
import {
  userIsModerator,
  processPhoto,
  isAuthenticated,
  getAuthenticatedUser,
} from "../../helpers/utils";
import { approveACause, rejectACause } from "../../services/cause.service";
import { createSuccessStory } from "../../services/user.service";
import { MyDialog, MyConfirmationDialog, MyPromptDialog } from "../../commons";
import * as moment from "moment";

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
  const classes = useStyles();

  let [confirmOpen, setConfirmOpen] = useState(false);
  let [promptOpen, setPromptOpen] = useState(false);
  let [rejectReason, setRejectReason] = useState("");
  let [dialogOpen, setDialogOpen] = useState(false);
  let [positive, setPositive] = useState(false);
  let [dialogTitle, setDialogTitle] = useState("");
  let [dialogMessage, setDialogMessage] = useState("");
  let [successPositive, setSuccessPositive] = useState(false);
  let [promptSuccessOpen, setPromptSuccessOpen] = useState(false);
  let [successStory, setSuccessStory] = useState("");
  const causeId = useParams().id;

  console.log("param id: ", causeId);

  const classes2 = moreStyles(props);

  console.log("Cause on page", props.cause);

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
