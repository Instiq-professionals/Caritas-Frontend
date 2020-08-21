import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import CircularProgress from '@material-ui/core/CircularProgress';
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
} from "@material-ui/core";
import { useStyles } from "../helpers";
import * as actions from '../store/actions/index';
import { Colors } from "../constants";
import { useLocation, useHistory, Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { PrimaryAppBar, MyTextField } from "../commons";
import { yourCauses, trendingCauses, followedCauses} from "../mock";
import { SlideableGridList, AddImage, AddCauseImage, AddVideo } from "../components";
import {
  isValidCauseTitle,
  isValidFunds,
  isValidBriefDescription,
} from "../helpers/validator";
import { createCause } from "../services/cause.service";
import { MyDialog, MyButton} from "../components";
import {getAuthenticatedUser} from "../helpers/utils";
import {MyConfirmationDialog,MyPromptDialog } from "../commons"
import { AddProfileImage } from "../components";
import MyVideo from "../components/ReactYoutube";
import YouTubeMedia from "../components/YoutubeMedia";

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
    maxWidth: "600px",

    [theme.breakpoints.down('md')]:{
      width: "95% !important",

    }
  }
}));

const CreateEvent = (props) => {
  let user = JSON.parse(localStorage.getItem("user")).data;
  const token = JSON.parse(localStorage.getItem("user")).token;
  const [curUser, setCurUser] = useState(user);
  const data = props.data;
  const errorMsg = props.error;
  useEffect(() => {
    if (data && data.status) {
      setDialogTitle(data.status);
      setDialogMessage(data.message);

      setPositiveDialog(true);

      setOpenDialog(props.modalopen);
      props.modalopen && setTimeout(() => (window.location = "/dashboard/myevents"), 1000);
     } else if (errorMsg && errorMsg.status) {
      setDialogTitle(errorMsg.status);
      setDialogMessage(errorMsg.message);

      setPositiveDialog(false);

      setOpenDialog(props.modalopen);
     } else {
      setDialogTitle('');
      setDialogMessage('');

      setPositiveDialog(false);

      setOpenDialog(false);
     }
    
  },[data,errorMsg]);



  const classes = moreStyles();
  const [testimonial,setTestimonial] = useState('');
  const [event, setEvent] = useState({
      category: curUser.role[1],
      title: '',
      description: '',
      video: '',
      budget: '',
      budget_breakdown: '',
      event_date:'',
      expected_no_of_impact:'',
      venue:'',
  });
  let [uploadFiles, setUploadFiles] = useState({
    image1: null,
    image2: null,
    image3: null,
    image4: null,
    image5: null,
    image6: null,
    video1: null,
  });

  let [openDialog, setOpenDialog] = useState(false);
  let [dialogMessage, setDialogMessage] = useState("");
  let [dialogTitle, setDialogTitle] = useState("");
  let [positiveDialog, setPositiveDialog] = useState(false);


  const handleAddImageClick = (event) => {
    event.stopPropagation();
    console.log("Clicked", event.target);
    let fileInput = event.target.getElementsByTagName("input")[0];
    fileInput.click();
  };
 const handleChange = name => (e) => {
    setEvent({
        ...event,
        [name]:e.target.value
    });
 };
  const handleSubmit = () => {
    if (uploadFiles.image1 == null ) {
      setPositiveDialog(false);
      setDialogTitle("Upload Failure");
      setDialogMessage(`You must upload at least one image for your cause`);
      setOpenDialog(true);
      return;
    }
    if (event.title.length<6) {
      setPositiveDialog(false);
      setDialogTitle("error");
      setDialogMessage(`Your event must have a valid title`);
      setOpenDialog(true);
      return;
    }
    if (event.description.length<6) {
        setPositiveDialog(false);
        setDialogTitle("error");
        setDialogMessage(`Your event must have a valid description`);
        setOpenDialog(true);
        return;
      }
      if (event.budget==='') {
        setPositiveDialog(false);
        setDialogTitle("error");
        setDialogMessage(`Provide budget`);
        setOpenDialog(true);
        return;
      }
      if (event.budget_breakdown==='') {
        setPositiveDialog(false);
        setDialogTitle("error");
        setDialogMessage(`Invalid event breakdown`);
        setOpenDialog(true);
        return;
      }
      if (event.event_date.length<3) {
        setPositiveDialog(false);
        setDialogTitle("error");
        setDialogMessage(`Invalid date`);
        setOpenDialog(true);
        return;
      }
      if (event.expected_no_of_impact === "") {
        setPositiveDialog(false);
        setDialogTitle("error");
        setDialogMessage(`Provide the expected numbers of people`);
        setOpenDialog(true);
        return;
      }
      if (event.venue === "") {
        setPositiveDialog(false);
        setDialogTitle("error");
        setDialogMessage(`Provide venue`);
        setOpenDialog(true);
        return;
      }
      console.log('submiting....',event)
    props.createAnEvent(token,event,uploadFiles);
    //setTimeout(() => (window.location = "/dashboard"), 1000);
  }

  return (
    <>
      <PrimaryAppBar />
      <MyDialog
        title={dialogTitle}
        openDialog={openDialog}
        positiveDialog={positiveDialog}
        onClose={() => setOpenDialog(false)}
      >
        {dialogMessage}
      </MyDialog>
      {/* <MyDialog
        title={props.error?props.error.status:'error'}
        openDialog={props.modalopen}
        positiveDialog={props.error?false:true}
        onClose={() => setOpenDialog(false)}
      >
        {props.error?props.error.message:'Network error'}
      </MyDialog>
      <MyDialog
        title={props.data?props.data.status:'network'}
        openDialog={props.modalopen}
        positiveDialog={props.data?true:false}
        onClose={() => setOpenDialog(false)}
      >
        {props.data?props.data.message:'Something went wrong'}
      </MyDialog> */}
      <Container style={{ marginTop: 150 }}>
        <Typography variant="h4" component="h4" className={classes.sectionHead} style={{textAlign: "center"}}>
          Good going, {getAuthenticatedUser().first_name}. 
        </Typography>
        <Typography variant="body1" component="p" className={classes.sectionSubhead} style={{textAlign: "center"}}>
          Start he process of creating an event
        </Typography>

        <Paper elevation={0} className={classes.causeCreation} style={{marginBottom: "100px"}}>
          <Typography variant="h6" component="h6" style={{textAlign: "center", fontWeight: "bold"}}>
            Create Event
          </Typography>          
            
            <div style={{width: "100%", textAlign: "center", marginTop: "30px"}} >
              <form action="#" method="POST" className={classes.form}>
              <FormControl className={classes.formControl}>
                   <MyTextField
                     id="title"
                     type="text"
                     name="title"
                     required="required"
                     label="Title of your Cause"
                     placeholder="Provide a Title for your event"
                     value={event.title}
                     onChange={handleChange('title')}
                   />
                 </FormControl>
                 <FormControl className={classes.formControl}>
                   <MyTextField
                     id="description"
                     type="text"
                     name="description"
                     required="required"
                     label="description"
                     placeholder="Describe the event"
                     multiline={true}
                     rows={3}
                     value={event.description}
                     onChange={handleChange('description')}
                   />
                 </FormControl>
                 <FormControl className={classes.formControl}>
                   <MyTextField
                     id="category"
                     type="text"
                     name="category"
                     required="required"
                     disabled={true}
                     label="category"
                     value={event.category}
                   />
                 </FormControl>
                 <Grid container spacing={3}>
                 <Grid
                  item
                  xs={12}
                  style={{
                    border: `2px dashed ${Colors.appRed}`,
                    marginBottom: "40px",
                  }}
                >
                  <AddProfileImage
                    image="/assets/images/icons/upload-image.png"
                    title="Upload picture*"
                    // text="This is image that will portray the cause."
                    style={{ alignSelf: "flex-start" }}
                    filename="image"
                    onClick={handleAddImageClick}
                    backgroundImage={uploadFiles.image1}
                    setImage={(file) => {
                      setUploadFiles({
                        ...uploadFiles,
                        image1: file,
                      });
                    }}
                  />
                </Grid>
                
                <Grid
                  item
                  xs={12}
                  style={{
                    border: `2px dashed ${Colors.appRed}`,
                    marginBottom: "40px",
                  }}
                >
                  <YouTubeMedia
                   video={event.video}
                   />
                </Grid>
                 </Grid>
                 <Grid container spacing={3}>
                 <Grid item xs={12}>
                <FormControl className={classes.formControl}>
                   <MyTextField
                     id="video"
                     type="url"
                     name="video"
                     required="required"
                     label="Youtube link"
                     placeholder="Provide Youtube link"
                     value={event.video}
                     onChange={handleChange('video')}
                   />
                 </FormControl>
                 </Grid>
                 <Grid item xs={12}>
                <FormControl className={classes.formControl}>
                   <MyTextField
                     id="budget"
                     type="number"
                     name="budget"
                     required="required"
                     label="budget"
                     placeholder="Provide budget"
                     value={event.budget}
                     onChange={handleChange('budget')}
                   />
                 </FormControl>
                 </Grid>
                 <Grid item xs={12} >
                 <FormControl className={classes.formControl}>
                   <MyTextField
                     id="budget_breakdown"
                     type="text"
                     name="budget_breakdown"
                     required="required"
                     label="budget breakdown"
                     multiline={true}
                     rows={3}
                     placeholder="Provide budget breakdown"
                     value={event.budget_breakdown}
                     onChange={handleChange('budget_breakdown')}
                   />
                 </FormControl>
                </Grid>
                <Grid item xs={12}>
                <FormControl className={classes.formControl}>
                   <MyTextField
                     id="event_date"
                     type="date"
                     name="event_date"
                     required="required"
                     label="event_date"
                     placeholder="Provide event date"
                     value={event.event_date}
                     onChange={handleChange('event_date')}
                   />
                 </FormControl>
                 </Grid>
                 <Grid item xs={12}>
                <FormControl className={classes.formControl}>
                   <MyTextField
                     id="expected_no_of_impact"
                     type="text"
                     name="expected_no_of_impact"
                     required="required"
                     label="expected no of impacts"
                     placeholder="Provide the expected no of impacts"
                     value={event.expected_no_of_impact}
                     onChange={handleChange('expected_no_of_impact')}
                   />
                 </FormControl>
                 </Grid>
                 <Grid item xs={12}>
                <FormControl className={classes.formControl}>
                   <MyTextField
                     id="venue"
                     type="text"
                     name="venue"
                     required="required"
                     label="venue"
                     placeholder="Provide venue"
                     value={event.venue}
                     onChange={handleChange('venue')}
                   />
                 </FormControl>
                 </Grid>
                 </Grid>
              </form>  
            </div>
            {props.loading && <CircularProgress disableShrink className={classes.Circular } className={classes.Circular }/>}
            <div style={{
                  marginTop: "30px",
                  marginBottom: "30px",
                  textAlign: "center"
                }}>
              <Button
                onClick={() => handleSubmit()}
                variant="contained"
                color="primary"
                style={{
                  //marginLeft: "auto",
                  color: "white",
                  //float: "right",
                }}
              >
                Submit
              </Button>
            </div>
                    
        </Paper>
        </Container>
    </>
  );
};

const mapStateToProps = state => {
  return {
    loading : state.crudEvent.loading,
    data: state.crudEvent.event,
    error: state.crudEvent.error,
    modalopen: state.crudEvent.modalopen
  }
};

const mapDispatchToProps = dispatch => {
  return {
    createAnEvent: (token,content,uploadFiles) => dispatch(actions.createAnEvent(token,content,uploadFiles))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateEvent);