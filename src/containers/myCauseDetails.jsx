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

const CauseDetailsbySingleUser = (props) => {
  const token = JSON.parse(localStorage.getItem("user")).token;
  const singleCause = props.singleCauseDetails;
  const createdBy = props.createdBy;
  const causeId = props.match.params.id;
  useEffect(() => {
    const cause_id = props.match.params.id;
    props.getAsingleCauseDetails(token,cause_id);

  },[]);


  const classes = moreStyles();
  let [openDialog, setOpenDialog] = useState(false);
  const [deleteCause, setDeleteCause] = useState(false);

  const handleDeleteCause = (id) => {
    props.deleteCause(token,id);
    setTimeout(() => (window.location = "/dashboard/myCauses"), 1000);
   };

   const onPressDelete = () => {
    setDeleteCause(true);
  }
  
  const onPressNo = () => {
    setDeleteCause(false);
  }

  let CauseIsMounted = props.loading && <CircularProgress disableShrink className={classes.Circular }/>;
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
                  src={baseUrl + singleCause.cause_photos}
                  alt="cause photo"
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
             {singleCause.first_name && <div>
              <Typography variant="h6" component="h6" style={{ fontWeight: "bold"}}>
                 Beneficiary name : {`${singleCause.first_name} ${singleCause.last_name}`}
             </Typography><br/>
               </div>}
             {singleCause.first_name && <div>
              <Typography variant="h6" component="h6" style={{ fontWeight: "bold"}}>
                 Beneficiary address : {singleCause.address}
             </Typography><br/>
               </div>}
               <Typography variant="h6" component="h6" style={{ fontWeight: "bold"}}>
                 Account number : {singleCause.account_number}
             </Typography><br/>
             <Typography variant="h6" component="h6" style={{ fontWeight: "bold"}}>
                Bank name: {singleCause.bank}
             </Typography><br/>
            <Typography variant="h6" component="h6" style={{fontWeight: "bold"}}>
              Amount required: 
            <Naira>{singleCause.amount_required}</Naira> 
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
                    textAlign: "center",
                    width: "100%"
                  }}>
                <Button
                  onClick={() => onPressDelete()}
                  variant="contained"
                  color="primary"
                  style={{
                    //marginLeft: "50%",
                    color: "white",
                    //float: "right",
                  }}
                >
                 Delete cause
                </Button>
                <Button
                  onClick={() => props.history.push(`/dashboard/myCauses/${causeId}/${causeId}`)}
                  variant="contained"
                  color="primary"
                  style={{
                    //marginLeft: "55%",
                    color: "white",
                    //float: "right",
                  }}
                >
                 Edit cause
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
                onClick={() =>  handleDeleteCause(causeId)}
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
    loading : state.getMyCause.loading,
    singleCauseDetails: state.getMyCause.cause?state.getMyCause.cause.data[0]:null,
    createdBy: state.getMyCause.cause?state.getMyCause.cause.data[1]:null,
    causeError: state.getMyCause.error,
    deletedStatus:state.getAllMyCauses.deletedStatus,
    deletedMessage:state.getAllMyCauses.deletedMessage,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    getAsingleCauseDetails : (token,id) => dispatch(actions.checkCauseDetails(token,id)),
    deleteCause : (token,cause_id) => dispatch(actions.deleteCause(token,cause_id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CauseDetailsbySingleUser);
