import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Naira from 'react-naira';
import CircularProgress from '@material-ui/core/CircularProgress';
import clsx from "clsx";
import {
  Container,
  Grid,
  Typography,
  FormControl,
  Button,
  Checkbox,
  Paper,
  FormControlLabel,
  Select,
  MenuItem,
  Grow, 
  Zoom
} from "@material-ui/core";
import { useStyles } from "../helpers";
import { Colors } from "../constants";
import { useLocation, useHistory, Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { PrimaryAppBar, MyTextField } from "../commons";
import { yourCauses, trendingCauses, followedCauses} from "../mock";
import { SlideableGridList, AddImage, AddCauseImage, AddVideo, ApproveCauseTable  } from "../components";
import {
  isValidCauseTitle,
  isValidFunds,
  isValidBriefDescription,
} from "../helpers/validator";
import { createCause } from "../services/cause.service";
import { MyDialog, MyButton } from "../components";
import {getAuthenticatedUser} from "../helpers/utils";
import * as actions from '../store/actions/index';
import YouTubeMedia from "../components/YoutubeMedia";
import Moment from 'react-moment';
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

const MyEventDetails = (props) => {
  let user = JSON.parse(localStorage.getItem("user")).data;
  const token = JSON.parse(localStorage.getItem("user")).token;
  const StoryData = props.StoryData;
  const UserData = props.UserData;
  console.log('data=======',UserData )
  const eventId = props.match.params.id;
  //5f25c0cc97b1ed04536c55c9
  useEffect(() => {
    const event_id = props.match.params.id;
    props.checkEventDetails(event_id);

  },[]);

  const [curUser, setCurUser] = useState(user);

  let location = useLocation();
  let history = useHistory();

  const classes = moreStyles();
  let [page, setPage] = useState(1);

  let [briefDescription, setBriefDescription] = useState("");
  let [causeOptions, setCauseOptions] = useState({
    enableComments: false,
    enableWatching: true,
    fundStatus: true,
    socialMediaSharing: true,
    agreeToTandC: false,
  });
  

  // let [category, setCategory] = useState("Food");
  let [errorMessage, setErrorMessage] = useState("");
  let [openDialog, setOpenDialog] = useState(false);
  let [dialogMessage, setDialogMessage] = useState("");
  let [dialogTitle, setDialogTitle] = useState("");
  let [positiveDialog, setPositiveDialog] = useState(false);
  let [selectedOwner, setSelectedOwner] = useState("Self");
  const [deleteCause, setDeleteCause] = useState(false);
  const handleViewCauses = () => {
    setPage(2);
    //props.getAsingleCauseDetails(token,cause_id);
  }


  const handleDeleteCause = (id) => {
    props.deleteMyEvent(token,id);
    setTimeout(() => (window.location = "/dashboard/myevents"), 1000);
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
            {`${UserData.first_name} ${UserData.last_name} cause details`}
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
                  onClick={() => props.history.push(`/dashboard/editEvent/${eventId}`)}
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
                onClick={() =>  handleDeleteCause(eventId)}
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
          <Typography variant="h4" component="h4" className={classes.sectionHead} style={{textAlign: "center"}}>
            Good going, {getAuthenticatedUser().first_name}. 
          </Typography>
          <Typography variant="body1" component="p" className={classes.sectionSubhead} style={{textAlign: "center"}}>
            Start the process of adding a new cause
          </Typography>
          <Typography component="h1" variant="h5" className={classes.Circular}>
          </Typography>
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
    checkEventDetails : (id) => dispatch(actions.checkSuccessStoryDetails(id)),
    deleteMyEvent : (token,event_id) => dispatch(actions.deleteMyEvent(token,event_id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyEventDetails);
