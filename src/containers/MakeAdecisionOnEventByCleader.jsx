import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Naira from 'react-naira';
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
import {getAuthenticatedUser} from "../helpers/utils";
import * as actions from '../store/actions/index';
import { MyConfirmationDialog, MyPromptDialog } from "../commons";
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

const MakeAdecisionOnEventByCleader = (props) => {
  const token = JSON.parse(localStorage.getItem("user")).token;
  const singleEvent = props.data;
  const eventId = props.match.params.id;
  useEffect(() => {
    const event_id = props.match.params.id;
    props.checkEventDetails(event_id);

  },[]);

  const classes = moreStyles();

  let [openDialog, setOpenDialog] = useState(false);
  let [dialogTitle, setDialogTitle] = useState("");
  let [positiveDialog, setPositiveDialog] = useState(false);
 
  const [confirm, setConfirm] = useState(false);
  const [disapprove, setDisapprove] = useState(false);
  const [dialogueMsg, setDialogueMsg] = useState('');
  const [open,setOpen] = useState(false);
  const [reason_for_disapproval, setReason] = useState('');

  const handleApproveSubmit = () => {
    props.approveEventByCleader(token,eventId);
    setTimeout(() => (window.location = "/dashboard/getEventsByCleader"), 1000);
  };
  const handleDisApproveSubmit = () => {
    if (reason_for_disapproval.length<6) {
      setPositiveDialog(false);
      setDialogTitle("error");
      setDialogueMsg(`Clearly state the reason you disapprove this cause in not less than 20 words`);
      setOpen(true);
      return;
    }
     props.disApproveEvent(token,eventId,reason_for_disapproval);
    setTimeout(() => (window.location = "/dashboard/getEventsByCleader"), 1000);
  };


  let EventIsMounted = props.loading && <CircularProgress disableShrink className={classes.Circular }/>;
  if (singleEvent ) {
    EventIsMounted = <div>
        <Grid container spacing={5} style={{marginTop: "30px"}}>
            <Grid item xs={12}>
            <Typography variant="h6" component="h6" style={{color: "#FC636B", textAlign: "center", fontWeight: "bold"}}>
                {singleEvent.title}
            </Typography>
            <Typography variant="body1" component="p" className={classes.sectionSubhead} style={{tcolor: "#FC636B", textAlign: "center"}}>
                {singleEvent.description}
            </Typography><br/>
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
                   video={singleEvent.video}
                   />
             </Grid>
              <Grid item md={6}>
              <Zoom in={true} timeout={1000} mountOnEnter>
                <img
                  style={{height:'500px', width:'100%'}}
                  src={ baseUrl + singleEvent.pictures}
                  alt={`${singleEvent.title} picture`}
                  className={classes.heroImage}
                />
              </Zoom>
              </Grid>
              <Grid item md={6}>
               <Typography variant="h6" component="h6" style={{ fontWeight: "bold"}}>
                 Budget : <Naira>{singleEvent.budget}</Naira>
             </Typography><br/>
             <Typography variant="h6" component="h6" style={{ fontWeight: "bold"}}>
             Budget breakdown: {singleEvent.budget_breakdown}
             </Typography><br/>
            <Typography variant="h6" component="h6" style={{fontWeight: "bold"}}>
            Event date: 
            <Moment >{singleEvent.event_date}</Moment>
             </Typography><br/>
             <Typography variant="h6" component="h6" style={{ fontWeight: "bold"}}>
             Expected no of impact : {singleEvent.expected_no_of_impact}
             </Typography><br/>
             <Typography variant="h6" component="h6" style={{ fontWeight: "bold"}}>
             venue : {singleEvent.venue}
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
        title={dialogTitle}
        openDialog={open}
        positiveDialog={positiveDialog}
        onClose={() => setOpen(false)}
      >
        {dialogueMsg}
      </MyDialog>
      <MyDialog
        title={props.decision.status?props.decision.status:"network error"}
        openDialog={props.decision.status?true:false}
        positiveDialog={true}
        onClose={() => setOpen(false)}
      >
        {props.decision.message}
      </MyDialog>
      <MyPromptDialog
        title={''}
        positiveDialog={true}
        change = {(e) => setReason(e.target.value)}
        openDialog={disapprove}
        value={reason_for_disapproval}
        onClose={() => setDisapprove(false)}
        positive={() => handleDisApproveSubmit()}
       >
           { props.decisionSpinner && <CircularProgress disableShrink className={classes.Circular}/>}
       </MyPromptDialog>
      <MyConfirmationDialog
      openDialog={confirm}
      onClose={() => setConfirm(false)}
      positive={() => handleApproveSubmit()}
      >
        {"Are you sure you want to approve this event?"}
        { props.decisionSpinner && <CircularProgress disableShrink className={classes.Circular}/>}
      </MyConfirmationDialog>
      <MyDialog
        title="Make a decision"
        openDialog={openDialog}
        positiveDialog={true}
        onClose={() => setOpenDialog(false)}
      >
        { <div>
            <Button
                onClick={() => setDisapprove(true)}
                variant="contained"
                color="primary"
                style={{
                  //marginLeft: "auto",
                  color: "white",
                }}
              >
                Disaprove
              </Button>
              <Button
                onClick={() =>  setConfirm(true)}
                variant="contained"
                color="primary"
                style={{
                  marginLeft: "21px",
                  color: "white",
                  //float: "right",
                }}
              >
                Approve
              </Button>
        </div>}
      </MyDialog>
        <Container style={{ marginTop: 150 }}>
          <Typography variant="h4" component="h4" className={classes.sectionHead} style={{textAlign: "center"}}>
            Good going, {getAuthenticatedUser().first_name}. 
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
    loading : state.crudEvent.loading,
    data: state.crudEvent.event?state.crudEvent.event.data:[],
    error: state.crudEvent.error,
    decision: state.makeDecisionOnEventByCleader,
    decisionSpinner: state.makeDecisionOnEventByCleader.loading,
    deletedStatus:state.crudEvent.deletedStatus,
    deletedMessage:state.crudEvent.deletedMessage,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    checkEventDetails : (id) => dispatch(actions.checkEventDetails(id)),
    approveEventByCleader : (token,event_id) => dispatch(actions.approveEventByCleader(token,event_id)),
    disApproveEvent : (token,cause_id,reason) => dispatch(actions.disApproveEvent(token,cause_id,reason)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MakeAdecisionOnEventByCleader);
