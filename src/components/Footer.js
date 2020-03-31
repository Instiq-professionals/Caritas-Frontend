import React from "react";
import clsx from "clsx";
import { Grid, Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Colors } from "../constants";
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    padding: "50px",
    backgroundColor: Colors.appRed
  },
  sectionHead: {
    marginBottom: "24px"
  },
  link: {
    color: "white",
    textDecoration: "none",
    marginBottom: "24px !important",
    lineHeight: "30px"
  },
  socialMedia: {
    width: 30,
    marginRight: "30px"
  }
}));

const Footer = props => {
  const classes = useStyles(props);
  return (
    <div className={classes.root}>
      <Container>
        <Grid container spacing="5">
          <Grid item xs={12} md={4} style={{ color: "white", height: "200px" }}>
            <Typography
              variant="h4"
              component="h4"
              className={classes.sectionHead}
            >
              Caritas...
            </Typography>
            <Typography
              variant="body1"
              component="p"
              style={{ fontSize: "10px", width: "80%" }}
            >
              Our goal is to make an impact of 500Million in the next five
              years. We know food, healthcare support, shelter, and human right
              are the basic needs of an average African citizen. Yes, we cannot
              leave this to the government and as a responsible not-for-profit
              organization, we have created this platform to offer genuine help.
              We encourage lots of volunteers, partners, and other
              not-for-profits to join us to make an exponential impact on
              people's life.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4} style={{ color: "white", height: "200px" }}>
            <Typography
              variant="h4"
              component="h4"
              className={classes.sectionHead}
            >
              Links
            </Typography>

            <Link to="/" className={classes.link}>
              About Us
            </Link>
            <br />
            <Link to="/" className={classes.link}>
              How it works
            </Link>
            <br />
            <Link to="/" className={classes.link}>
              Causes
            </Link>
            <br />
            <Link to="/" className={classes.link}>
              Account Settings
            </Link>
            <br />
          </Grid>
          <Grid item xs={12} md={4} style={{ color: "white", height: "200px" }}>
            <Typography
              variant="h4"
              component="h4"
              className={classes.sectionHead}
            >
              Want to help?
            </Typography>

            <Link to="/" className={classes.link}>
              Donate Money
            </Link>
            <br />
            <Link to="/" className={classes.link}>
              Become a partner
            </Link>
            <br />
            <Link to="/" className={classes.link}>
              Become a volunteer
            </Link>
            <br />
          </Grid>
        </Grid>
        <Grid container spacing="5" style={{ padding: "50px 0px" }}>
          <Grid item xs={4} style={{ color: "white" }}>
            <Typography
              variant="body1"
              component="p"
              style={{ fontSize: "10px" }}
            >
              Copyright &copy; 2020 | All Rights Reserved | Caritas.org
            </Typography>
          </Grid>
          <Grid item xs={4} style={{ color: "white" }}></Grid>
          <Grid item xs={4} style={{ color: "white" }}>
            <Link to="https://www.facebook.com">
              <img
                src="/assets/images/icons/facebook.png"
                alt=""
                className={classes.socialMedia}
              />
            </Link>
            <Link to="https://www.facebook.com">
              <img
                src="/assets/images/icons/twitter.png"
                alt=""
                className={classes.socialMedia}
              />
            </Link>
            <Link to="https://www.facebook.com">
              <img
                src="/assets/images/icons/instagram.png"
                alt=""
                className={classes.socialMedia}
              />
            </Link>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Footer;
