import React from "react";
import { Container, Grid, Typography, Grow, Zoom } from "@material-ui/core";
import { useStyles } from "../../helpers";
import { Colors } from "../../constants";
import { Link } from "react-router-dom";

const HomeHeaderSection = () => {
  const classes = useStyles();
  return (
    <section className={classes.header}>
      <Container>
        <Grid container>
          <Grow in={true} timeout={3000} mountOnEnter>
            <Grid
              item
              md={6}
              style={{ paddingRight: "30px" }}
              className={classes.welcomeSubscribe}
            >
              <Typography
                variant="h6"
                component="h6"
                className={classes.sectionTitle}
              >
                Welcome to QCare
              </Typography>
              <Typography
                variant="h4"
                component="h4"
                style={{
                  color: "black",
                  fontWeight: "bold",
                  marginBottom: 16,
                }}
              >
                An Online Community of people committed to a single cause of
                making Africa a better place.
              </Typography>
              <Grid
                item
                xs={12}
                style={{ display: "flex", margin: "32px 0px" }}
              >
                <Link
                  to="/causes"
                  style={{
                    flex: 1,
                    color: Colors.appGreen,
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  Education
                </Link>
                <Link
                  to="/causes"
                  style={{
                    flex: 1,
                    color: Colors.appOrange,
                    cursor: "pointer",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Food
                </Link>
                <Link
                  to="/causes"
                  style={{
                    flex: 1,
                    color: Colors.appRed,
                    cursor: "pointer",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Health
                </Link>
                <Link
                  to="/causes"
                  style={{
                    flex: 1,
                    color: Colors.appBlue,
                    cursor: "pointer",
                    fontWeight: "bold",
                    textAlign: "right",
                  }}
                >
                  Human Rights
                </Link>
              </Grid>
              <Grid
                item
                xs={12}
                style={{ display: "flex", flexWrap: "nowrap" }}
              >
                <input
                  type="email"
                  className={classes.subscribe}
                  id="sunscribe1"
                  placeholder="Subscribe to our newsletter"
                />
                <button className={classes.subscribeButton}>Subscibe</button>
              </Grid>

              <Grid item xs={12} style={{ marginTop: 60 }}>
                <Typography
                  variant="body1"
                  component="span"
                  style={{
                    color: Colors.appRed,
                    fontWeight: "bold",
                    marginRight: 8,
                  }}
                >
                  Call for help:
                </Typography>
                <a
                  href="/"
                  style={{
                    color: Colors.appBlack,
                    fontWeight: "bold",
                  }}
                >
                  Coronavirus Food &amp; Medical Assistance Relief
                </a>
              </Grid>
            </Grid>
          </Grow>
          <Grid
            item
            md={5}
            style={{
              marginLeft: "auto",
              display: "flex",
              paddingBottom: "30px",
            }}
            className={classes.welcomePictures}
          >
            <Grid item xs={6}>
              <Zoom in={true} timeout={1000} mountOnEnter>
                <img
                  src="/assets/images/top_left.png"
                  alt=""
                  className={classes.heroImage}
                />
              </Zoom>
              <Zoom in={true} timeout={2000} mountOnEnter>
                <img
                  src="/assets/images/bottom_left.png"
                  alt=""
                  className={classes.heroImage}
                />
              </Zoom>
            </Grid>
            <Grid item xs={6} style={{ paddingTop: "20px" }}>
              <Zoom in={true} timeout={2000} mountOnEnter>
                <img
                  src="/assets/images/top_right.png"
                  alt=""
                  className={classes.heroImage}
                />
              </Zoom>
              <Zoom in={true} timeout={1000} mountOnEnter>
                <img
                  src="/assets/images/bottom_right.png"
                  alt=""
                  className={classes.heroImage}
                  // style={{ boxShadow: "2px 2px 5px rgb(0,0,0,.5)" }}
                />
              </Zoom>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
};

export default HomeHeaderSection;
