import React, { useEffect } from "react";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
  Container,
  Grid,
  Typography,
  Button,
  Paper,
} from "@material-ui/core";
import { Colors } from "../constants";
import { connect } from "react-redux";
import { PrimaryAppBar } from "../commons";
import {getAuthenticatedUser} from "../helpers/utils";
import * as actions from '../store/actions/index';
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

const GetAllEventsByDirector = (props) => {
  const token = JSON.parse(localStorage.getItem("user")).token;
  const eventData = props.data;
  const eventError = props.error;
  useEffect(() => {
    props.getEventByDirector(token);
  },[]);


  const classes = moreStyles();
  const tableClass = useTableStyles();

  const rows = [];
  for (const data of eventData) {
     rows.push(data);
 };


  const handleViewMyEvent = (id) => {
    props.history.push(`/dashboard/resolveEvent/${id}`)
  }

  let EventTable;
  if (eventError) {
    EventTable = <div><Typography variant="h6" component="h6" style={{textAlign: "center", fontWeight: "bold"}}>
    {eventError.message}
  </Typography></div>;
  }
  else {
    EventTable = <div>
      <Typography variant="h6" component="h6" style={{textAlign: "center", fontWeight: "bold"}}>
            Event table
      </Typography>
          <Grid container spacing={5} style={{marginTop: "30px"}}>
          <Paper className={tableClass.root}>
      <Table className={tableClass.table}>
        <TableHead>
          <TableRow>
            <StyledTableCell>Cause Photo</StyledTableCell>
            <StyledTableCell align="right">title</StyledTableCell>
            <StyledTableCell align="right">category</StyledTableCell>
            <StyledTableCell align="right">Status</StyledTableCell>
            <StyledTableCell align="right">budget</StyledTableCell>
            <StyledTableCell align="right">event_date</StyledTableCell>
            <StyledTableCell align="right">View</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(event=> (
            <StyledTableRow key={event._id}>
            <StyledTableCell align="right">
                <Avatar src={baseUrl + event.pictures} />
              </StyledTableCell>
              <StyledTableCell align="right">{event.title}</StyledTableCell>
              <StyledTableCell align="right">{event.category}</StyledTableCell>
              <StyledTableCell align="right">{event.event_status}</StyledTableCell>
              <StyledTableCell align="right">{event.budget}</StyledTableCell>
              <StyledTableCell align="right"><Moment >{event.event_date}</Moment></StyledTableCell>
              <StyledTableCell align="right">
              <div style={{textAlign: "center", width: "100%"}} >
              <Button
                  onClick={() =>  handleViewMyEvent(event._id)}
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
        <Container style={{ marginTop: 150 }}>
        <Typography variant="h4" component="h4" className={classes.sectionHead} style={{textAlign: "center"}}>
          Good going, {getAuthenticatedUser().first_name}. 
        </Typography>
        <Typography variant="body1" component="p" className={classes.sectionSubhead} style={{textAlign: "center"}}>
          Start the process of adding a new cause
        </Typography>

        <Paper elevation={0} className={classes.causeCreation} style={{marginBottom: "100px"}}>
       { props.loading && <CircularProgress disableShrink className={classes.Circular }/>}
          {EventTable}
        </Paper>
      </Container>
    </>
  );
};



const mapStateToProps = state => {
  return {
    loading : state.resolveEvent.loading,
    data: state.resolveEvent.events?state.resolveEvent.events.data:[],
    error: state.resolveEvent.error,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    getEventByDirector : (token) => dispatch(actions.getEventForResolution(token)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GetAllEventsByDirector);
