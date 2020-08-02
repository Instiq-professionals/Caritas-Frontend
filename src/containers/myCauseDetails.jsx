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

const CauseDetailsbySingleUser = (props) => {
  let user = JSON.parse(localStorage.getItem("user")).data;
  const token = JSON.parse(localStorage.getItem("user")).token;
  const data = [];
  const singleCause = props.singleCauseDetails;
  const createdBy = props.createdBy;
  const cause_id = localStorage.getItem('cause_id' );
  //5f25c0cc97b1ed04536c55c9
  useEffect(() => {
    const cause_id = props.match.params.id;
    props.getAsingleCauseDetails(token,cause_id);

  },[]);
  // useEffect(() => {
  //   props.getAsingleCauseDetails(token,cause_id);

  // },[]);
  const [curUser, setCurUser] = useState(user);

  let location = useLocation();
  let history = useHistory();

  const classes = moreStyles();
  let [page, setPage] = useState(1);

  let [causeTitle, setCauseTitle] = useState("");
  let [amountRequired, setAmountRequired] = useState("0");
  let [briefDescription, setBriefDescription] = useState("");
  let [charityInformation, setCharityInformation] = useState("");
  let [additionalInformation, setAdditionalInformation] = useState("");
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
  const handleViewCauses = () => {
    setPage(2);
    //props.getAsingleCauseDetails(token,cause_id);
  }



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
    if (event) event.preventDefault();
    if (validateForm()) {
      setErrorMessage('');
      props.recommendAcause(briefDescription,token,cause_id);
      setTimeout(() => (window.location = "/dashboard/review"), 3000);
    }
  }

  
  const CauseOwnerSelection = (props) => {
    const useStyles = makeStyles((theme) => ({
      root: {
        display: "flex",
        flexDirection: "column",
        padding: "20px",
        alignItems: "center",
        cursor: "pointer",
        boxShadow:
          props.type == selectedOwner
            ? "0px 0px 20px rgba(252, 99, 107, 0.7)"
            : "none",
        backgroundColor:
          props.type == selectedOwner
            ? "rgba(255,255,255,.7)"
            : "transparent",

        "&:hover": {
          boxShadow: "0px 0px 30px rgba(252, 99, 107, 0.7)",
          backgroundColor: "rgba(255,255,255,.7)",
        },
      },

      active: {
        boxShadow: "0px 0px 30px rgba(252, 99, 107, 0.7)",
      },
    }));

    const classes2 = useStyles();
    return (
      <div
        className={clsx(classes2.root)}
        onClick={() => {
          setSelectedOwner(props.type);
        }}
      >
        <img src={props.image} alt="" style={{ height: "80px" }} />
        <p style={{ textAlign: "center" }}>{props.type}</p>
      </div>
    );
  };
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
                  src="/assets/images/top_left.png"
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
                Bank name: Access
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
                  onClick={() => {}}
                  variant="contained"
                  color="primary"
                  style={{
                    marginLeft: "50%",
                    color: "white",
                    //float: "right",
                  }}
                >
                 Delete cause
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
    </>
  );
};



const mapStateToProps = state => {
  return {
    loading : state.displayCause.loading,
    data: state.reviewCauses.causes?state.reviewCauses.causes.data:"There is no cause found",
    singleCauseDetails: state.getCauseBySingleUser.cause?state.getCauseBySingleUser.cause.data[0]:null,
    createdBy: state.getCauseBySingleUser.cause?state.getCauseBySingleUser.cause.data[1]:null,
    causeError: state.displayCause.error,
    causeMessage: state.recommend.message
  }
};

const mapDispatchToProps = dispatch => {
  return {
    reviewCauses : (token) => dispatch(actions.reviewCauses(token)),
    getAsingleCauseDetails : (token,id) => dispatch(actions.checkCauseDetails(token,id)),
    recommendAcause : (formData, token,cause_id) => dispatch(actions.recommendAcourseForApproval(formData,token,cause_id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CauseDetailsbySingleUser);
