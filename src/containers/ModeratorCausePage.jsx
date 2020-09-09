import React, { Fragment, useEffect, useState } from "react";
import { PrimaryAppBar } from "../commons";
import { Footer } from "../components";
import { useStyles } from "../helpers";
import { SubscriptionBox, ACauseHeader } from "../components/sections";
import { CauseItem } from "../components";
import { useParams } from "react-router-dom";
import { Grid, Typography, Container, Tabs, Tab } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Colors, baseUrl } from "../constants";
import { useLocation } from "react-router-dom";
import { getCause, getAllCauses } from "../services/cause.service";

const causes = [
  {
    id: 2,
    image: "/assets/images/classroom1.png",
    category: "Health",
    title: "Saint Johns School Needs Renovation",
    currency: "$",
    contribution: 200000,
    target: 400000,
    desc: `Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                        sed diam nonumy eirmod tempor invidunt ut labore et
                        dolore magna aliquyam erat, sed diam voluptua.`,
  },
  {
    id: 3,
    image: "/assets/images/classroom1.png",
    category: "Health",
    title: "Saint Johns School Needs Renovation",
    currency: "$",
    contribution: 200000,
    target: 400000,
    desc: `Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                        sed diam nonumy eirmod tempor invidunt ut labore et
                        dolore magna aliquyam erat, sed diam voluptua.`,
  },
];

const moreStyles = makeStyles((theme) => ({
  tab1LeftImage: {
    height: "400px",
    backgroundImage: (cause) => {
      return `url(${
        cause.cause_photos
          ? cause.cause_photos[0].replace(/^uploads\\/, baseUrl + "/")
          : "/assets/images/lady-in-wheelchair.png"
      })`;
    },
    // backgroundImage: "url(/assets/images/wheel-chair-lady.png)",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  },
  tab1TopRightImage: {
    backgroundImage: (cause) => {
      return `url(${
        cause.cause_photos && cause.cause_photos[1]
          ? cause.cause_photos[1].replace(/^uploads\\/, baseUrl + "/")
          : "/assets/images/surgeons-theater.png"
      })`;
    },
    // backgroundImage: "url('/assets/images/surgeons-theater.png')",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: "50%",
    margin: "0px !important",
  },
  tab1BottomRightImage: {
    backgroundImage: (cause) => {
      return `url(${
        cause.cause_photos && cause.cause_photos[2]
          ? cause.cause_photos[2].replace(/^uploads\\/, baseUrl + "/")
          : "/assets/images/surgeon-testing.png"
      })`;
    },
    // backgroundImage: "url('/assets/images/surgeon-testing.png')",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: "50%",
    margin: "0px !important",
  },
}));

const ModeratorCausePage = () => {
  const [tab, setTab] = useState(0);
  const [cause, setCause] = useState([]);
  const [user, setUser] = useState({});
  const [allCauses, setAllCauses] = useState([]);
  const { id } = useParams();

  const handleTabChange = (value) => {
    setTab(value);
  };
  const classes = useStyles();
  const classes2 = moreStyles(cause);


  const fetchCause = async (id) => {
    return await getCause(id);
  };
  const fetchAllCauses = async () => {
    return await getAllCauses();
  };

  useEffect(() => {
    async function setACause() {
      let returnedCause = await fetchCause(id);
      if (returnedCause) {
        setCause(returnedCause[0]);
        setUser(returnedCause[1]);
      } else setCause([]);
    }
    async function setTheCauses() {
      let returnedCauses = await fetchAllCauses();
      if (Array.isArray(returnedCauses)) setAllCauses(returnedCauses);
      else setAllCauses([]);
    }
    setTheCauses();
    setACause();
  }, []);


  return (
    <Fragment>
      <PrimaryAppBar
        position="fixed"
        className={classes.appbar}
      ></PrimaryAppBar>
      <main className={classes.main}>
        <ACauseHeader cause={cause} user={user} />
        <Container>
          <div style={{ paddingTop: "50px" }}>
            <Grid container spacing={5}>
              <Grid item xs={12} md={6}>
                <Typography
                  variant="body1"
                  component="h6"
                  style={{ color: Colors.appRed }}
                >
                  Charity Information
                </Typography>
                <Typography
                  variant="body1"
                  component="p"
                  style={{ paddingBottom: "50px" }}
                >
                  {cause.charity_information}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography
                  variant="body1"
                  component="h6"
                  style={{ color: Colors.appRed }}
                >
                  Additional Information
                </Typography>
                <Typography
                  variant="body1"
                  component="p"
                  style={{ paddingBottom: "50px" }}
                >
                  {cause.additional_information}
                </Typography>
              </Grid>
            </Grid>

            <Grid container spacing={3} style={{ marginBottom: "100px" }}>
              <Grid item xs={12} md={6}>
                <div className={classes2.tab1LeftImage}></div>
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
                style={{
                  margin: "0px !important",
                  padding: "0px !important",
                }}
              >
                <div className={classes2.tab1TopRightImage}></div>
                <div className={classes2.tab1BottomRightImage}></div>
              </Grid>
            </Grid>
          </div>
          )}
        </Container>

        <Footer />
      </main>
    </Fragment>
  );
};

export default ModeratorCausePage;
