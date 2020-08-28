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
  Paper,
  Zoom
} from "@material-ui/core";
import { Colors } from "../constants";
import { useLocation, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { PrimaryAppBar, MyTextField } from "../commons";
import {
  isValidBriefDescription,
} from "../helpers/validator";
import { MyDialog } from "../components";
import {getAuthenticatedUser} from "../helpers/utils";
import { baseUrl  } from "../constants";
import * as actions from '../store/actions/index';


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

const RecommendAcause = (props) => {
  let user = JSON.parse(localStorage.getItem("user")).data;
  const token = JSON.parse(localStorage.getItem("user")).token;
  const singleCause = props.singleCauseDetails;
  const createdBy = props.createdBy;
  useEffect(() => {
    const cause_id = props.match.params.id;
    props.getAsingleCauseDetails(token,cause_id);

  },[]);

  const classes = moreStyles();
  let [page, setPage] = useState(1);

  let [briefDescription, setBriefDescription] = useState("");
  let [errorMessage, setErrorMessage] = useState("");
  let [openDialog, setOpenDialog] = useState(false);
  let [positiveDialog, setPositiveDialog] = useState(false);
  let [selectedOwner, setSelectedOwner] = useState("Self");


  const handleBriefDescriptionChange = (event) => {
    setBriefDescription(event.target.value);
  };
  const validateForm = () => {
    if (!isValidBriefDescription(briefDescription) || briefDescription.length < 5) {
      setErrorMessage("Please enter a valid description");
      return;
    }
    return true
  }
  const handleSubmit = (event) => {
    const cause_id = props.match.params.id;
    if (event) event.preventDefault();
    if (validateForm()) {
      setErrorMessage('');
      props.recommendAcause(briefDescription,token,cause_id);
      setTimeout(() => (window.location = "/dashboard/review"), 3000);
    }
  }

  let CauseIsMounted = props.loading && <CircularProgress disableShrink />;
  if (singleCause ) {
    CauseIsMounted = <div>
      <Typography variant="h6" component="h6" style={{textAlign: "center", fontWeight: "bold"}}>
                {`${createdBy.first_name} ${createdBy.last_name} cause details`}
            </Typography>
            <Grid container spacing={5} style={{marginTop: "30px"}}>
              <Grid item md={6}>
              <Zoom in={true} timeout={1000} mountOnEnter>
                <img
                style={{height:'100%', width:'100%'}}
                  src={ baseUrl + singleCause.cause_photos}
                  alt=""
                  className={classes.heroImage}
                />
              </Zoom>
              </Grid>
              <Grid item md={6}>
              <Typography variant="h6" component="h6" style={{color: "#FC636B", textAlign: "center", fontWeight: "bold"}}>
                 {singleCause.cause_title}
              </Typography>
              <Typography variant="body1" component="p" className={classes.sectionSubhead} style={{tcolor: "#FC636B", textAlign: "center"}}>
             {singleCause.brief_description}
            </Typography><br/>
             <Typography variant="h6" component="h6" style={{ fontWeight: "bold"}}>
                 Address : {singleCause.address}
             </Typography><br/>
            <Typography variant="h6" component="h6" style={{ fontWeight: "bold"}}>
                 Account number : {singleCause.account_number}
             </Typography><br/>
             <Typography variant="h6" component="h6" style={{ fontWeight: "bold"}}>
                Bank name:{singleCause.bank}
             </Typography><br/>
            <Typography variant="h6" component="h6" style={{fontWeight: "bold"}}>
              Amount required: 
            <Naira>{singleCause.amount_required}</Naira> 
             </Typography><br/>
              <Typography variant="h6" component="h6" style={{ fontWeight: "bold"}}>
                 Name : {`${createdBy.first_name} ${createdBy.last_name}`}
             </Typography><br/>
             <Typography variant="h6" component="h6" style={{ fontWeight: "bold"}}>
                 Email : {createdBy.email}
             </Typography><br/>
             <Typography variant="h6" component="h6" style={{ fontWeight: "bold"}}>
                 Address : {createdBy.address}
             </Typography><br/>
             <Typography variant="h6" component="h6" style={{ fontWeight: "bold"}}>
                 Phone Number : {createdBy.phone_number}
             </Typography><br/>
              </Grid>
              <div style={{
                    marginTop: "30px",
                    marginBottom: "30px",
                    width: "100%"
                  }}>
                <Button
                  onClick={() => setPage(1)}
                  variant="contained"
                  color="default"
                  
                >
                  Back
                </Button>
                <Button
                  onClick={() => setPage(2)}
                  variant="contained"
                  color="primary"
                  style={{
                    marginLeft: "auto",
                    color: "white",
                    float: "right",
                  }}
                >
                 Take a decision
                </Button>
              </div>
            </Grid>
    </div>
  }
  return (
    <>
      <PrimaryAppBar />
      <MyDialog
        title={props.causeMessage?props.causeMessage.status: 'error'}
        openDialog={props.causeMessage?true:false}
        positiveDialog={positiveDialog}
        onClose={() => setOpenDialog(false)}
      >
        {props.causeMessage?props.causeMessage.message: 'something went wrong'}
      </MyDialog>
      {page === 1 && (

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
            {CauseIsMounted}
          </Paper>
        </Container>
      )}
      {page === 2 && (
        <Container style={{ marginTop: 150 }}>
        <Paper elevation={0} className={classes.causeCreation} style={{marginBottom: "100px"}}>
          <Typography variant="h6" component="h6" style={{textAlign: "center", fontWeight: "bold"}}>
            Make a recommendation 
          </Typography>          
            
            <div style={{width: "100%", textAlign: "center", marginTop: "30px"}} >

              <form action="#" method="POST" className={classes.form}>
              <div style={{ color: "red", textAlign: "center", margin: 16 }}>
                {errorMessage}
              </div>
                 <FormControl className={classes.formControl}>
                   <MyTextField
                     id="description"
                     type="text"
                     name="description"
                     required="required"
                     label="Reviewers message"
                     placeholder="Say what you feel about the cause"
                     multiline={true}
                     rows={3}
                     value={briefDescription}
                     onChange={handleBriefDescriptionChange}
                   />
                 </FormControl>
              </form>
                  
            </div>

            <div style={{
                  marginTop: "30px",
                  marginBottom: "30px",
                }}>
              <Button
                onClick={() => setPage(1)}
                variant="contained"
                color="default"
                
              >
                Back
              </Button>
              <Button
                onClick={() => handleSubmit()}
                variant="contained"
                color="primary"
                style={{
                  marginLeft: "auto",
                  color: "white",
                  float: "right",
                }}
              >
                Submit
              </Button>
            </div>
                    
        </Paper>
        </Container>
      )}
    </>
  );
};



const mapStateToProps = state => {
  return {
    loading : state.displayCause.loading,
    data: state.reviewCauses.causes?state.reviewCauses.causes.data:"There is no cause found",
    singleCauseDetails: state.displayCause.cause?state.displayCause.cause.data[0]:null,
    createdBy: state.displayCause.cause?state.displayCause.cause.data[1]:null,
    causeError: state.displayCause.error,
    causeMessage: state.recommend.message
  }
};

const mapDispatchToProps = dispatch => {
  return {
    getAsingleCauseDetails : (token,id) => dispatch(actions.reviewCauseDetails(token,id)),
    recommendAcause : (formData, token,cause_id) => dispatch(actions.recommendAcourseForApproval(formData,token,cause_id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecommendAcause);
