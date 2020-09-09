import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from '@material-ui/core/CircularProgress';
import {
  Container,
  Grid,
  Typography,
  Button,
  Paper, 
  Zoom
} from "@material-ui/core";
import { Colors } from "../constants";
import { connect } from "react-redux";
import { PrimaryAppBar } from "../commons";
import { MyDialog } from "../components";
import * as actions from '../store/actions/index';
import { baseUrl  } from "../constants";


const moreStyles = makeStyles((theme) => ({
  sectionHead: {
    fontSize: "18px",
    fontWeight: "bold",
    color: Colors.appRed,
  },
  sectionSubhead: {
    fontSize: "12px",
  },
  coronalink: {
    backgroundImage: "url('/assets/images/corona-outbreak.png')",
    backgroundSize: "100% 100%",
    backgroundRepeat: "cover",
    marginBottom: "30px",
    cursor: "pointer",
  },
  formControl: {
    display: "block",
    marginBottom: "20px",
    borderRadius: 20,
  },
  textField: {
    borderColor: Colors.appRed,
    borderRadius: "20px !important",
  },
  form: {
    marginTop: "100px",
    paddingRight: 50,
  },
  checkbox: {
    display: "block",
  },
  t_and_c: {
    marginLeft: "-60px",
    display: "inline",
    [theme.breakpoints.down("md")]: {
      marginLeft: "30px",
    },
  },
  Circular : {
    margin: '0px 50%'
  },
  successBox: {
    backgroundColor: "white",
    width: "500px",
    height: "400px",
    margin: "auto",
    textAlign: "center",
    paddingTop: "50px",
    "& img": {
      width: "200px",
      display: "block",
      margin: "auto",
    },
  },
  
  causeCreation:{
    marginTop: "50px", 
    backgroundColor: "white", 
    display: "block", 
    margin: "auto", 
    padding: "30px", 
    maxWidth: "90%",

    [theme.breakpoints.down('md')]:{
      width: "95% !important",

    }
  }
}));

const MySucessStoryDetails = (props) => {
  const StoryData = props.StoryData;
  const UserData = props.UserData;
  const storyId = props.match.params.id;
  useEffect(() => {
    const story_id = props.match.params.id;
    props.checkSuccessDetails(story_id);

  },[]);



  const classes = moreStyles();
  let [openDialog, setOpenDialog] = useState(false);
  const [deleteCause, setDeleteCause] = useState(false);


  const handleDeleteSuccessStory = (id) => {
    // props.deleteMySuccessStory(token,id);
    // setTimeout(() => (window.location = "/dashboard/myevents"), 1000);
   };

   const onPressDelete = () => {
    setDeleteCause(true);
  }
  
  const onPressNo = () => {
    setDeleteCause(false);
  }


  let EventIsMounted = props.loading && <CircularProgress disableShrink className={classes.Circular }/>;
  if (UserData) {
    EventIsMounted = <div>
        <Grid container spacing={5} style={{marginTop: "30px"}}>
            <Grid item xs={12}>
            <Typography variant="h6" component="h6" style={{color: "#FC636B", textAlign: "center", fontWeight: "bold"}}>
            {`${UserData.first_name} ${UserData.last_name} story details`}
            </Typography>
            </Grid>
             </Grid>
              <Grid container spacing={5}>
              <Grid item md={6}>
              <Zoom in={true} timeout={1000} mountOnEnter>
                <img
                style={{height:'100%', width:'100%'}}
                  src={baseUrl + StoryData.pictures}
                  alt={`picture`}
                  className={classes.heroImage}
                />
              </Zoom>
              </Grid>
              <Grid item md={6}>
               <Typography variant="h6" component="h6" style={{ fontWeight: "bold"}}>
                 {StoryData.testimonial}
             </Typography><br/>
              </Grid>
              </Grid>
              <Grid>
              <div style={{
                    marginTop: "30px",
                    marginBottom: "30px",
                    textAlign: "center",
                    width: "100%"
                  }}>
                <Button
                disabled
                  onClick={() => onPressDelete()}
                  variant="contained"
                  color="primary"
                  style={{
                    //marginLeft: "50%",
                    color: "white",
                    //float: "right",
                  }}
                >
                 Delete event
                </Button>
                <Button
                disabled 
                  onClick={() => props.history.push(`/dashboard/editEvent/${storyId}`)}
                  variant="contained"
                  color="primary"
                  style={{
                    //marginLeft: "55%",
                    color: "white",
                    //float: "right",
                  }}
                >
                 Edit event
                </Button>
              </div>
            </Grid>
    </div>
  }
  return (
    <>
      <PrimaryAppBar />
      <MyDialog
        title={props.deletedStatus?props.deletedStatus: 'error'}
        openDialog={props.deletedStatus?true:false}
        positiveDialog={true}
        onClose={() => setOpenDialog(false)}
      >
        {props.deletedMessage?props.deletedMessage: 'something went wrong'}
      </MyDialog>
      <MyDialog
        title='Delete Cause'
        openDialog={deleteCause}
        positiveDialog={true}
        onClose={() => setOpenDialog(false)}
      >
        {'Are you sure you want to continue?'}
        <div>
            <Button
                onClick={(event) => onPressNo()}
                variant="contained"
                color="primary"
                style={{
                  //marginLeft: "auto",
                  color: "white",
                }}
              >
                No
              </Button>
              <Button
                onClick={() =>  handleDeleteSuccessStory(storyId)}
                variant="contained"
                color="primary"
                style={{
                  marginLeft: "auto",
                  color: "white",
                  //float: "right",
                }}
              >
                Yes
              </Button>
        </div>
      </MyDialog>
        <Container style={{ marginTop: 150 }}>
          <Paper elevation={0} className={classes.causeCreation} style={{marginBottom: "100px"}}>
            {EventIsMounted}
          </Paper>
        </Container>
    </>
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

export default connect(mapStateToProps, mapDispatchToProps)(MySucessStoryDetails);
