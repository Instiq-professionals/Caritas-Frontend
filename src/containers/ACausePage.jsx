import React, { Fragment, useEffect, useState } from "react";
import { PrimaryAppBar } from "../commons";
import { Footer } from "../components";
import { useStyles } from "../helpers";
import { SubscriptionBox, ACauseHeader } from "../components/sections";
import { useParams } from "react-router-dom";
import {  Typography, Container} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Colors, baseUrl } from "../constants";
import { getCause, getAllCauses } from "../services/cause.service";
import Carousel from "../components/sections/Carousel";
import CarouselCauseContent from "../components/CarouselCauseContent";
import SwipeableTextMobileStepper from "../components/sections/SwipeableText";
import useMediaQuery from '@material-ui/core/useMediaQuery';


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

const ACausePage = () => {
  const [tab, setTab] = useState(0);
  const [cause, setCause] = useState([]);
  const [user, setUser] = useState(null);
  const [allCauses, setAllCauses] = useState([]);
  const { id } = useParams();
  const matches = useMediaQuery('(min-width:600px)');

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
          <Typography
            varant="h5"
            component="h5"
            style={{ color: Colors.appRed, fontWeight: "bold" }}
          >
            Similar Causes
          </Typography>
          <div>
          {matches?<Carousel>
                  {allCauses.map((cause, index) => (
                      <CarouselCauseContent cause={cause} key={`cause-${cause._id}`}>
                        {cause.brief_description.substr(0, 400)}
                      </CarouselCauseContent>
                  ))}
                </Carousel>: <SwipeableTextMobileStepper tutorialSteps={allCauses}/>}
                {allCauses.length === 0 && (
                    <div
                      style={{
                        backgroundColor: "rgba(255,255,255,.5)",
                        boxShadow: "2px 2px 5px rgba(0,0,0,.2)",
                        borderRadius: "10px",
                        padding: "16px",
                        width: "300px",
                        display: "block",
                        margin: "auto",
                      }}
                    >
                      Many causes are currently undergoing review post launching
                      of this platform. This section will be updated.
                    </div>
                  )}
                </div>
        </Container>
        <SubscriptionBox />
        <Footer />
      </main>
    </Fragment>
  );
};

export default ACausePage;
