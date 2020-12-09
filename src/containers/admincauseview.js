import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Naira from 'react-naira';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';
import {
  Container,
  Grid,
  TextField,
  Typography,
  Button,
  Paper,
  Zoom
} from "@material-ui/core";
import { Colors } from "../constants";
import { connect } from "react-redux";
import { PrimaryAppBar } from "../commons";
import { MyDialog } from "../components";
import { MyConfirmationDialog, MyPromptDialog } from "../commons";
import { ApproveDialogue } from "../commons/MyPromptDialog";
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
  },
  comment:{
    paddingTop: 20,
    paddingBottom: 20,
    width: "400px",
    textAlign: "center",
    [theme.breakpoints.down('xs')]:{
      width:'100%'
    }
  }
}));

const AdminCauseView = (props) => {
  let user = JSON.parse(localStorage.getItem("user")).data;
  const token = JSON.parse(localStorage.getItem("user")).token;
  const singleCause = props.singleCauseDetails;
  const createdBy = props.createdBy;
  const cause_id = props.match.params.id;
  useEffect(() => {
    props.getAsingleCauseDetails(token,cause_id);

  },[]);

  const classes = moreStyles();
  const [buttonApprove, setButtonApprove] = useState('Approve');
  const [buttonDisApprove, setButtonDisApprove] = useState('Disaprove');
  const [dialogTitle, setDialogTitle] = useState("");
  const [reason_for_disapproval, setReason] = useState('');
  const [amount_approved, setAmountApproved] = useState('');
  const [approval_comment, setComment] = useState('');
  const [approval, setApproval] = useState(false)

  let [openDialog, setOpenDialog] = useState(false);
  let [positiveDialog, setPositiveDialog] = useState(false);


  const [msg, setMsg] = useState('');
  const [confirm, setConfirm] = useState(false);
  const [disapprove, setDisapprove] = useState(false);
  const [dialogueMsg, setDialogueMsg] = useState('');
  const [open,setOpen] = useState(false);

  
  const handleApproveSubmit = () => {
    if (amount_approved === ''){
      setMsg('Kindly state the amount the approve for this cause');
      return
    }
    if (approval_comment===''){
      setMsg('kindly send a message to the user');
      return
    }
    props.onPressApprove(token,cause_id,amount_approved,approval_comment);
    setTimeout(() => (window.location = "/dashboard/approve"), 1000);
  };
  const handleDisApproveSubmit = () => {
    if (reason_for_disapproval.length<6) {
      setPositiveDialog(false);
      setDialogTitle("error");
      setDialogueMsg(`Clearly state the reason you disapprove this cause in not less than 20 words`);
      setOpen(true);
      return;
    }
     props.onPressDisApprove(token,cause_id,reason_for_disapproval);
    setTimeout(() => (window.location = "/dashboard/approve"), 1000);
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
                style={{ width:'100%'}}
                  src={baseUrl + singleCause.cause_photos}
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
             {props.reviewedBy && <div>
              <Typography variant="h6" component="h6" style={{ fontWeight: "bold"}}>
                 Reviewed By : {`${props.reviewedBy.first_name} ${props.reviewedBy.last_name}`}
             </Typography><br/>
             <Typography variant="h6" component="h6" style={{ fontWeight: "bold"}}>
                 Reviewed at : {singleCause.reviewed_at}
             </Typography><br/>
             <Typography variant="h6" component="h6" style={{ fontWeight: "bold"}}>
                 Reviewer's comment : {singleCause.reviewer_message}
             </Typography><br/>
               </div>}
               {singleCause.approval_comment && <div>
                <Typography variant="h6" component="h6" style={{ fontWeight: "bold"}}>
                 Amount Approved : {singleCause.amount_approved}
             </Typography><br/>
             <Typography variant="h6" component="h6" style={{ fontWeight: "bold"}}>
                 Approval's comment : {singleCause.approval_comment}
             </Typography><br/>
                 </div>}
              </Grid>
            </Grid>
    </div>
  }
  return (
    <>
      <PrimaryAppBar />
        <Container style={{ marginTop: 150 }}>
          <Paper elevation={0} className={classes.causeCreation} style={{marginBottom: "100px"}}>
            {CauseIsMounted}
          </Paper>
        </Container>
    </>
  );
};

//5f3509e661942a156a366d10

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
    onPressDisApprove :  (token,cause_id,reason) => dispatch(actions.disApproveCause(token,cause_id,reason)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminCauseView);
