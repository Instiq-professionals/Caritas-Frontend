import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from '@material-ui/core/CircularProgress';
import {
  Container,
  Grid,
  Typography,
  FormControl,
  Button,
  Paper,
} from "@material-ui/core";
import * as actions from '../store/actions/index';
import { Colors } from "../constants";
import { connect } from "react-redux";
import { PrimaryAppBar, MyTextField } from "../commons";
import { MyDialog } from "../components";
import {getAuthenticatedUser} from "../helpers/utils";
import { AddProfileImage } from "../components";
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

const EditEvent = (props) => {
  let user = JSON.parse(localStorage.getItem("user")).data;
  const token = JSON.parse(localStorage.getItem("user")).token;
  const event_id = props.match.params.id;
  const eventDetails = props.bigData;
  const editedData = props.editData;
  const editedError = props.editError;
  const[ editEvent, setEditEvent] = useState();

  useEffect(() => {
    const event_id = props.match.params.id;
    props.checkEventDetails(event_id);

  },[]);

  useEffect(() => {
    if (editedData && editedData.status) {
      setDialogTitle(editedData.status);
      setDialogMessage(editedData.message);

      setPositiveDialog(true);

      setOpenDialog(true);
      setTimeout(() => (window.location = "/dashboard/myevents"), 1000);
     } else if (editedError && editedError.status) {
      setDialogTitle(editedError.status);
      setDialogMessage(editedError.message);

      setPositiveDialog(false);

      setOpenDialog(true);
     } else {
      setDialogTitle('');
      setDialogMessage('');

      setPositiveDialog(false);

      setOpenDialog(false);
     }
    
  },[editedData,editedError]);

  useEffect(() => {
    if (eventDetails) {
      setEditEvent({
        category: eventDetails.category,
        title: eventDetails.title,
        description: eventDetails.description,
        pictures: eventDetails.pictures,
        video: eventDetails.video,
        budget: parseInt(eventDetails.budget),
        budget_breakdown: eventDetails.budget_breakdown,
        event_date: eventDetails.event_date,
        expected_no_of_impact: eventDetails.expected_no_of_impact,
        venue: eventDetails.venue,
      })
    };
    
  },[eventDetails,setEditEvent]);


  const classes = moreStyles();
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
    let fileInput = event.target.getElementsByTagName("input")[0];
    fileInput.click();
  };
 const handleChange = name => (e) => {
  setEditEvent({
        ...editEvent,
        [name]:e.target.value
    });
 };
  const handleSubmit = () => {
    editEvent.uploadFiles = uploadFiles;
    props.editMyEvent(token,event_id,editEvent);
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
      <Container style={{ marginTop: 150 }}>
        <Paper elevation={0} className={classes.causeCreation} style={{marginBottom: "100px"}}>
          <Typography variant="h6" component="h6" style={{textAlign: "center", fontWeight: "bold"}}>
            Edit Event
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
                     value={editEvent && editEvent.title}
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
                     value={editEvent && editEvent.description}
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
                     value={editEvent && editEvent.category}
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
                   video={editEvent && editEvent.video}
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
                     value={editEvent && editEvent.video}
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
                     value={editEvent && editEvent.budget}
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
                     value={editEvent && editEvent.budget_breakdown}
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
                     value={editEvent && editEvent.event_date}
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
                     value={editEvent && editEvent.expected_no_of_impact}
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
                     value={editEvent && editEvent.venue}
                     onChange={handleChange('venue')}
                   />
                 </FormControl>
                 </Grid>
                 </Grid>
              </form>  
            </div>
            {props.loading && <CircularProgress disableShrink className={classes.Circular }/>}
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
    editData: state.crudEvent.editData,
    bigData: state.crudEvent.event?state.crudEvent.event.data:[],
    error: state.crudEvent.error,
    editError: state.crudEvent.editError,
    modalopen: state.crudEvent.modalopen
  }
};

const mapDispatchToProps = dispatch => {
  return {
    editMyEvent: (token,event_id,content) => dispatch(actions.editMyEvent(token,event_id,content)),
    checkEventDetails : (id) => dispatch(actions.checkEventDetails(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditEvent);
