import React, { Fragment, useEffect } from "react";
import { PrimaryAppBar } from "../commons";
import { Footer } from "../components";
import { useStyles } from "../helpers";
import { SubscriptionBox, SuccessStoryHeader , StoriesSection} from "../components/sections";
import {  Typography, Container} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Colors, baseUrl } from "../constants";
import { connect } from "react-redux";
import * as actions from '../store/actions/index';


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

const AvisitorStoryPage = (props) => {
  const classes = useStyles();
  const cause_id = props.match.params.id;
  const UserData = props.UserData;
  const StoryData = props.StoryData;
  const error = props.error;
  console.log('here.......1.',StoryData)
  useEffect(() => {
    props.checkSuccessDetails(cause_id);
  }, []);

  return (
    <Fragment>
      <PrimaryAppBar
        position="fixed"
        className={classes.appbar}
      ></PrimaryAppBar>
      <main className={classes.main}>
        <SuccessStoryHeader  StoryData={StoryData?StoryData:[]} UserData={UserData?UserData:[]} error={error?error:null }/>
        <Container>
          <Typography
            varant="h5"
            component="h5"
            style={{ color: Colors.appRed, fontWeight: "bold" }}
          >
            Similar stories
          </Typography>
          <div>
            <StoriesSection />
         </div>
        </Container>
        <SubscriptionBox />
        <Footer />
      </main>
    </Fragment>
  );
};


const mapStateToProps = state => {
  return {
    loading : state.MyStoryDetails.loading,
    StoryData: state.MyStoryDetails.story?state.MyStoryDetails.story.data[0]:null,
    UserData: state.MyStoryDetails.story?state.MyStoryDetails.story.data[1]:null,
    error: state.MyStoryDetails.error,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    checkSuccessDetails : (id) => dispatch(actions.checkSuccessStoryDetails(id)),
    //deleteMySuccessStory : (token,event_id) => dispatch(actions.deleteMyEvent(token,event_id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AvisitorStoryPage);
