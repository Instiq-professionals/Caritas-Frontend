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
  Zoom
} from "@material-ui/core";
import { Colors } from "../constants";
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

const ApproveVolunteer = (props) => {
  const token = JSON.parse(localStorage.getItem("user")).token;
  const singleVolunteer = props.volunteer;

  useEffect(() => {
    const volunteer_id = props.match.params.id;
    props.checkVolunteerDetails(token,volunteer_id);

  },[]);

  const classes = moreStyles();
  let [page, setPage] = useState(1);


  const [briefDescription, setBriefDescription] = useState("");
  const [accept, setAccept] = useState(false);


  let [errorMessage, setErrorMessage] = useState("");
  let [openDialog, setOpenDialog] = useState(false);


  const handleBriefDescriptionChange = (event) => {
    setBriefDescription(event.target.value);
  };
  const validateForm = () => {
    if (!isValidBriefDescription(briefDescription) || briefDescription.length < 5) {
      setErrorMessage("Please enter a valid description");
      return;
    }
    return true
  };

  const onPressApprove = () => {
      setAccept(true);
  }

  const onPressNo = () => {
    setAccept(false);
}

  const handleApproveSubmit = (event,volunteer_id) => {
    event.preventDefault();
    props.approveVolunteer(token,volunteer_id);
    setTimeout(() => (window.location = "/dashboard/approveVolunteer"), 3000);
  };

  const handleDisApproveSubmit = (event, volunteer_id) => {
    if (event) event.preventDefault();
    if (validateForm()) {
      setErrorMessage('');
      props.disApproveVolunteer(briefDescription,token,volunteer_id);
      setTimeout(() => (window.location = "/dashboard/approveVolunteer"), 3000);
    }
  }

  let VolunteerIsMounted = props.loading && <CircularProgress disableShrink />;
  if (singleVolunteer) {
    VolunteerIsMounted = <div>
      <Typography variant="h6" component="h6" style={{textAlign: "center", fontWeight: "bold"}}>
                {`${singleVolunteer.first_name} ${singleVolunteer.last_name} form details`}
            </Typography>
            <Grid container spacing={5} style={{marginTop: "30px"}}>
              <Grid item xs={12} md={6}>
              <Zoom in={true} timeout={1000} mountOnEnter>
                <img
                  style={{height:'100%', width:'100%'}}
                  src={baseUrl + singleVolunteer.photo}
                  alt={`Pictures of ${singleVolunteer.first_name} ${singleVolunteer.last_name}`}
                  className={classes.heroImage}
                />
              </Zoom>
              </Grid>
              <Grid itemxs={12} md={6}>
             <Typography variant="h6" component="h6" style={{ fontWeight: "bold"}}>
                 Address : {singleVolunteer.address}
             </Typography><br/>
            <Typography variant="h6" component="h6" style={{ fontWeight: "bold"}}>
                 Highest education level : {singleVolunteer.highest_education_level}
             </Typography><br/>
             <Typography variant="h6" component="h6" style={{ fontWeight: "bold"}}>
                Email: {singleVolunteer.email}
             </Typography><br/>
            <Typography variant="h6" component="h6" style={{fontWeight: "bold"}}>
              Category: {singleVolunteer.category}
             </Typography><br/>
              <Typography variant="h6" component="h6" style={{ fontWeight: "bold"}}>
                 Guarantor's name : {`${singleVolunteer.guarantor_name} `}
             </Typography><br/>
             <Typography variant="h6" component="h6" style={{ fontWeight: "bold"}}>
              Guarantor's address: {singleVolunteer.guarantor_address}
             </Typography><br/>
             <Typography variant="h6" component="h6" style={{ fontWeight: "bold"}}>
              Relationship with guarantor: {singleVolunteer.relationship_with_guarantor}
             </Typography><br/>
             <Typography variant="h6" component="h6" style={{ fontWeight: "bold"}}>
             Guarantor's company : {singleVolunteer.guarantor_company}
             </Typography><br/>
             <Typography variant="h6" component="h6" style={{ fontWeight: "bold"}}>
             Guarantor's postion : {singleVolunteer.guarantor_position}
             </Typography><br/>
             <Typography variant="h6" component="h6" style={{ fontWeight: "bold"}}>
             Criminal record : {singleVolunteer.criminal_record}
             </Typography><br/>
              </Grid>
              <div style={{
                    marginTop: "30px",
                    marginBottom: "30px",
                    width: "100%"
                  }}>
                <Button
                  onClick={() => setPage(2)}
                  variant="contained"
                  color="primary"
                  style={{
                    marginLeft: "auto",
                    color: "white",
                    float: "left",
                  }}
                >
                disapprove
                </Button>
                <Button
                  onClick={() => onPressApprove()}
                  variant="contained"
                  color="primary"
                  style={{
                    marginLeft: "auto",
                    color: "white",
                    float: "right",
                  }}
                >
                 Approve
                </Button>
              </div>
            </Grid>
    </div>
  }
  return (
    <>
      <PrimaryAppBar />
      <MyDialog
        title={props.error?props.error.status: 'error'}
        openDialog={props.error?true:false}
        positiveDialog={false}
        onClose={() => setOpenDialog(false)}
      >
        {props.error?props.error.message: 'something went wrong'}
      </MyDialog>
      <MyDialog
        title='Success'
        openDialog={props.message?true:false}
        positiveDialog={true}
        onClose={() => setOpenDialog(false)}
      >
        {props.message?props.message.message: 'something went wrong'}
      </MyDialog>
      <MyDialog
        title='Accept Volunteer'
        openDialog={accept}
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
                onClick={(event) => handleApproveSubmit(event,singleVolunteer._id)}
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
            {VolunteerIsMounted}
          </Paper>
        </Container>
      )}
      {page === 2 && (
        <Container style={{ marginTop: 150 }}>
        <Paper elevation={0} className={classes.causeCreation} style={{marginBottom: "100px"}}>
          <Typography variant="h6" component="h6" style={{textAlign: "center", fontWeight: "bold"}}>
            Give a reson you disapproved {`${singleVolunteer.first_name} ${singleVolunteer.last_name}'s `} request
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
                onClick={(event) => handleDisApproveSubmit(event,singleVolunteer._id)}
                variant="contained"
                color="primary"
                style={{
                  marginLeft: "auto",
                  color: "white",
                  float: "right",
                }}
              >
                Disapprove
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
    volunteer: state.getVolunteerForApproval.volunteer?state.getVolunteerForApproval.volunteer.data:null,
    error: state.makeDecisionOnVolunteer.error,
    message: state.makeDecisionOnVolunteer.message,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    checkVolunteerDetails : (token,volunteer_id) => dispatch(actions.checkVolunteerDetails(token,volunteer_id)),
    approveVolunteer : (formData, token,volunteer_id) => dispatch(actions.approveVolunteer(formData,token,volunteer_id)),
    disApproveVolunteer : (formData, token,volunteer_id) => dispatch(actions.disApproveVolunteer(formData,token,volunteer_id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ApproveVolunteer);
