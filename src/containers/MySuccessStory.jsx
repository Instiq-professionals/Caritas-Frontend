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
  Paper,
} from "@material-ui/core";
import * as actions from '../store/actions/index';
import { Colors } from "../constants";
import { connect } from "react-redux";
import { PrimaryAppBar, MyTextField } from "../commons";
import { MyDialog } from "../components";
import {getAuthenticatedUser} from "../helpers/utils";
import { AddProfileImage } from "../components";

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

const MySuccessStory = (props) => {
  const token = JSON.parse(localStorage.getItem("user")).token;
  const cause_id = props.match.params.id;
  const data = props.data;
  const errorMsg = props.error;
  useEffect(() => {
    if (data && data.status) {
      setDialogTitle(data.status);
      setDialogMessage(data.message);

      setPositiveDialog(true);

      setOpenDialog(true);
      setTimeout(() => (window.location = "/dashboard/myCauses"), 1000);
     } else if (errorMsg && errorMsg.status) {
      setDialogTitle(errorMsg.status);
      setDialogMessage(errorMsg.message);

      setPositiveDialog(false);

      setOpenDialog(true);
     } else {
      setDialogTitle('');
      setDialogMessage('');

      setPositiveDialog(false);

      setOpenDialog(false);
     }
    
  },[data,errorMsg]);


  const classes = moreStyles();
  const [testimonial,setTestimonial] = useState('');
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
 
  const handleSubmit = () => {
    if (uploadFiles.image1 === null) {
      setPositiveDialog(false);
      setDialogTitle("Upload Failure");
      setDialogMessage(`You must upload at least one image for your cause`);
      setOpenDialog(true);
      return;
    }
    if (testimonial.length<6) {
      setPositiveDialog(false);
      setDialogTitle("error");
      setDialogMessage(`You must write at least 50 word to narrate your success story`);
      setOpenDialog(true);
      return;
    }
    props.createSuccessStory(token,cause_id,testimonial,uploadFiles);
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
        <Typography variant="h4" component="h4" className={classes.sectionHead} style={{textAlign: "center"}}>
          Good going, {getAuthenticatedUser().first_name}. 
        </Typography>
        <Typography variant="body1" component="p" className={classes.sectionSubhead} style={{textAlign: "center"}}>
          Tell us your sucess story
        </Typography>

        <Paper elevation={0} className={classes.causeCreation} style={{marginBottom: "100px"}}>
          <Typography variant="h6" component="h6" style={{textAlign: "center", fontWeight: "bold"}}>
            Create success story
          </Typography>          
            
            <div style={{width: "100%", textAlign: "center", marginTop: "30px"}} >
              <form action="#" method="POST" className={classes.form}>
                 <FormControl className={classes.formControl}>
                   <MyTextField
                     id="description"
                     type="text"
                     name="description"
                     required="required"
                     label="Testimony"
                     placeholder="Write your testimonies"
                     multiline={true}
                     rows={3}
                     value={testimonial}
                     onChange={(e) => setTestimonial(e.target.value)}
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
                 </Grid>
              </form>  
            </div>
            {props.loading && <CircularProgress disableShrink  className={classes.Circular }/>}
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
    loading : state.MyStoryDetails.loading,
    data: state.MyStoryDetails.story,
    error: state.MyStoryDetails.error,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    createSuccessStory: (token,cause_id,testimonial,uploadFiles) => dispatch(actions.createMySuccessStory(token,cause_id,testimonial,uploadFiles))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MySuccessStory);
