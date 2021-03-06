import React, { useState, useEffect } from "react";
//import { makeStyles } from "@material-ui/core/styles";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
//import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
//import Button from '@material-ui/core/Button';
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

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: '#FC636B',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);


const useTableStyles = makeStyles(theme => ({
  root: {
    width: '90%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: "80%",
  },
}));

const MyCauses = (props) => {
  let user = JSON.parse(localStorage.getItem("user")).data;
  const token = JSON.parse(localStorage.getItem("user")).token;
  const causeId = JSON.parse(localStorage.getItem("user")).causes[0]._id;
  const causeData = props.data;
  const causeError = props.error;
  useEffect(() => {
    props.getMyCauses(token);
  },[]);

  //const [delete, setDelete] = useState(false);
  const [deleteCause, setDeleteCause] = useState(false);
  let [openDialog, setOpenDialog] = useState(false);

  const classes = moreStyles();
  const tableClass = useTableStyles();

  let [selectedOwner, setSelectedOwner] = useState("Self");
  const rows = [];
  for (const data of causeData) {
     rows.push(data);
 };

 const onPressDelete = () => {
  setDeleteCause(true);
}

const onPressNo = () => {
  setDeleteCause(false);
}

 const handleDeleteCause = (id) => {
  props.deleteCause(token,id);
  setTimeout(() => (window.location = "/dashboard/myCauses"), 3000);
 }

  const handleViewCause = (id) => {
    props.history.push(`/dashboard/myCauses/${id}`)
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
  let CauseTable;
  if (causeError) {
    CauseTable = <div><Typography variant="h6" component="h6" style={{textAlign: "center", fontWeight: "bold"}}>
    {causeError.message}
  </Typography></div>;
  }
  else {
    CauseTable = <div>
      <Typography variant="h6" component="h6" style={{textAlign: "center", fontWeight: "bold"}}>
            My causes table
      </Typography>
          <Grid container spacing={5} style={{marginTop: "30px"}}>
          <Paper className={tableClass.root}>
      <Table className={tableClass.table}>
        <TableHead>
          <TableRow>
            <StyledTableCell>Cause Photo</StyledTableCell>
            <StyledTableCell align="right">Cause title</StyledTableCell>
            <StyledTableCell align="right">Amount required</StyledTableCell>
            <StyledTableCell align="right">Status</StyledTableCell>
            <StyledTableCell align="right">Category</StyledTableCell>
            <StyledTableCell align="right">Delete</StyledTableCell>
            <StyledTableCell align="right">View</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(cause=> (
            <StyledTableRow key={cause._id}>
            <StyledTableCell align="right">
                <Avatar src={cause.cause_photos} />
              </StyledTableCell>
              <StyledTableCell align="right">{cause.cause_title}</StyledTableCell>
              <StyledTableCell align="right">{cause.amount_required}</StyledTableCell>
              <StyledTableCell align="right">{cause.cause_status}</StyledTableCell>
              <StyledTableCell align="right">{cause.category}</StyledTableCell>
              <StyledTableCell align="right">
              <div style={{textAlign: "center", width: "100%"}} >
              <Button
                  onClick={() => onPressDelete() }
                  variant="contained"
                  color="primary"
                  style={{
                    margin: "30px auto",
                    color: "white",
                    paddingLeft: "30px",
                    paddingRight: "30px"                    
                  }}
                >
                   Delete
              </Button>
            </div>
              </StyledTableCell>
              <StyledTableCell align="right">
              <div style={{textAlign: "center", width: "100%"}} >
              <Button
                  onClick={() =>  handleViewCause(cause._id)}
                  variant="contained"
                  color="primary"
                  style={{
                    margin: "30px auto",
                    color: "white",
                    paddingLeft: "30px",
                    paddingRight: "30px"                    
                  }}
                >
                  View Details
              </Button>
            </div>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
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
        <Typography variant="h4" component="h4" className={classes.sectionHead} style={{textAlign: "center"}}>
          Good going, {getAuthenticatedUser().first_name}. 
        </Typography>
        <Typography variant="body1" component="p" className={classes.sectionSubhead} style={{textAlign: "center"}}>
          Start the process of adding a new cause
        </Typography>

        <Paper elevation={0} className={classes.causeCreation} style={{marginBottom: "100px"}}>
       { props.loading && <CircularProgress disableShrink className={classes.Circular }/>}
          {CauseTable}
        </Paper>
      </Container>
    </>
  );
};



const mapStateToProps = state => {
  return {
    loading : state.getAllMyCauses.loading,
    data: state.getAllMyCauses.causes?state.getAllMyCauses.causes.data:[],
    error: state.getAllMyCauses.error,
    deletedStatus:state.getAllMyCauses.deletedStatus,
    deletedMessage:state.getAllMyCauses.deletedMessage,
    deleteCauseId:state.getAllMyCauses.cause_id,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    getMyCauses : (token) => dispatch(actions.getAllMyCauses(token)),
    deleteCause : (token,cause_id) => dispatch(actions.deleteCause(token,cause_id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyCauses);
