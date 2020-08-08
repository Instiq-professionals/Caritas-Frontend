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
import { SlideableGridList, AddImage, AddCauseImage, AddVideo, ReviewCauseTable  } from "../components";
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

const RecommendAcause = (props) => {
  let user = JSON.parse(localStorage.getItem("user")).data;
  const token = JSON.parse(localStorage.getItem("user")).token;
  const singleCause = props.singleCauseDetails;
  const createdBy = props.createdBy;
  const cause_id = props.match.params.id;
  useEffect(() => {
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
  const [accept, setAccept] = useState(false);
  const [buttonApprove, setButtonApprove] = useState('Approve');
  const [buttonDisApprove, setButtonDisApprove] = useState('Disaprove');
  const [dialogTitle, setDialogTitle] = useState("Make a decision");
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
  let [positiveDialog, setPositiveDialog] = useState(false);
  let [selectedOwner, setSelectedOwner] = useState("Self");

  const onPressApprove = () => {
    setAccept(true);
}

const onPressNo = () => {
  setAccept(false);
}
  
  const handleApproveSubmit = () => {
    props.onPressApprove(token,cause_id);
    setTimeout(() => (window.location = "/dashboard/approve"), 1000);
  };
  const handleDisApproveSubmit = () => {
    props.onPressDisApprove(token,cause_id);
    setTimeout(() => (window.location = "/dashboard/approve"), 1000);
  };
  
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
  let CauseIsMounted = props.loading && <CircularProgress disableShrink className={classes.Circular}/>;
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
             <Typography variant="h6" component="h6" style={{ fontWeight: "bold"}}>
                 Reviewed By : {`${props.reviewedBy.first_name} ${props.reviewedBy.last_name}`}
             </Typography><br/>
             <Typography variant="h6" component="h6" style={{ fontWeight: "bold"}}>
                 Reviewed at : {singleCause.reviewed_at}
             </Typography><br/>
             <Typography variant="h6" component="h6" style={{ fontWeight: "bold"}}>
                 Reviewer's Message : {singleCause.reviewer_message}
             </Typography><br/>
              </Grid>
              <div style={{
                    marginTop: "30px",
                    marginBottom: "30px",
                    textAlign: "center",
                    width: "100%"
                  }}>
                <Button
                  onClick={() => setOpenDialog(true)}
                  variant="contained"
                  color="primary"
                  style={{
                    //marginLeft: "auto",
                    color: "white",
                    //float: "right",
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
        title={props.decision.status !== null?props.decision.status:dialogTitle}
        openDialog={openDialog}
        positiveDialog={true}
        onClose={() => setOpenDialog(false)}
      >
        {props.decision.status !== null? props.decision.message: <div>
            <Button
                onClick={() => handleDisApproveSubmit()}
                variant="contained"
                color="primary"
                style={{
                  //marginLeft: "auto",
                  color: "white",
                }}
              >
                {buttonDisApprove}
              </Button>
              <Button
                onClick={() =>  handleApproveSubmit()}
                variant="contained"
                color="primary"
                style={{
                  marginLeft: "21px",
                  color: "white",
                  //float: "right",
                }}
              >
                {buttonApprove}
              </Button>
             { props.decisionSpinner && <CircularProgress disableShrink className={classes.Circular}/>}
        </div>}
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
    singleCauseDetails: state.displayCause.cause?state.displayCause.cause.data[0]:null,
    createdBy: state.displayCause.cause?state.displayCause.cause.data[1]:null,
    reviewedBy: state.displayCause.cause?state.displayCause.cause.data[2]:null,
    causeError: state.displayCause.error,
    causeMessage: state.recommend.message,
    decision: state.makeDecisionOnCause,
    decisionSpinner: state.makeDecisionOnCause.loading
  }
};

const mapDispatchToProps = dispatch => {
  return {
    getAsingleCauseDetails : (token,id) => dispatch(actions.reviewCauseDetails(token,id)),
    onPressApprove :  (token,cause_id) => dispatch(actions.approveCause(token,cause_id)),
    onPressDisApprove :  (token,cause_id) => dispatch(actions.disApproveCause(token,cause_id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecommendAcause);
