import React, { useEffect } from "react";
import { Container, Typography, Grid } from "@material-ui/core";
import { useStyles } from "../../helpers";
import { Story } from "../";
import { SubscriptionBox } from "./";
import { Colors } from "../../constants";
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { baseUrl  } from "../../constants";
import Carousel from "./Carousel";
import SuccessStoryForMobile from "./SucessStoryForMobile";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import * as actions from '../../store/actions/index';


const StoriesSection = (props) => {
  const stories = props.data;
  const matches = useMediaQuery('(min-width:600px)');
  useEffect(() => {
    props.getAllSuccessStories();
  },[]);
  const classes = useStyles();
  return (
    <section className={classes.stories}>
      <Container>
        <Typography
          variant="h5"
          component="h5"
          style={{
            color: Colors.appRed,
            fontWeight: "bold",
            width: "100%",
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          Success Stories
        </Typography>
          <div>
            {matches?<Carousel>
              {stories.map((story, index) => (
                <Story image={baseUrl + story.pictures} title={'Success story'} causeId={story.cause_id}>
                {story.testimonial.substr(0, 400)}
              </Story>
              ))}
            </Carousel>:<SuccessStoryForMobile tutorialSteps={stories}/>}
          {stories.length === 0 && (
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
              Many causes are currently undergoing review post launching of this
              platform and once users' stories have been documented. This
              section will be updated.
            </div>
          )}
        </div>
        <SubscriptionBox />
      </Container>
    </section>
  );
};

const mapStateToProps = state => {
  return {
    loading : state.getAllSuccessStories.loading,
    data: state.getAllSuccessStories.stories?state.getAllSuccessStories.stories.data:[],
    error: state.getAllSuccessStories.error,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    getAllSuccessStories : () => dispatch(actions.getAllSuccessStories()),
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(StoriesSection));
