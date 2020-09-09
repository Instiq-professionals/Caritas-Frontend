import React, { useEffect } from "react";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Avatar from '@material-ui/core/Avatar';
//import CircularProgress from '@material-ui/core/CircularProgress';
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

const ReviewVolunteer = (props) => {
  const token = JSON.parse(localStorage.getItem("user")).token;
  const volunteersData = props.data;

  useEffect(() => {
    props.getVolunteersForApproval(token);
  },[]);

  const classes = moreStyles();
  const tableClass = useTableStyles();

  const rows = [];
  for (const data of volunteersData) {
     rows.push(data);
 }
  const handleViewVolunteer = (id) => {
    props.history.push(`/dashboard/approveVolunteer/${id}`)
  }

  let volunteersTable;
  if (props.volunterError) {
    volunteersTable = <div><Typography variant="h6" component="h6" style={{textAlign: "center", fontWeight: "bold"}}>
    {props.volunterError.message}
  </Typography></div>;
  } else {
    volunteersTable = <div>
      <Typography variant="h6" component="h6" style={{textAlign: "center", fontWeight: "bold"}}>
            Review volunteers table
      </Typography>
          <Grid container spacing={5} style={{marginTop: "30px"}}>
          <Paper className={tableClass.root}>
      <Table className={tableClass.table}>
        <TableHead>
          <TableRow>
            <StyledTableCell>volunteers Photo</StyledTableCell>
            <StyledTableCell align="right">First Name</StyledTableCell>
            <StyledTableCell align="right">Last Name</StyledTableCell>
            <StyledTableCell align="right">State</StyledTableCell>
            <StyledTableCell align="right">Highest Education level</StyledTableCell>
            <StyledTableCell align="right">Phone Number</StyledTableCell>
            <StyledTableCell align="right">View</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(volunteer=> (
            <StyledTableRow key={volunteer._id}>
            <StyledTableCell align="right">
                <Avatar src={baseUrl + volunteer.photo} />
              </StyledTableCell>
              <StyledTableCell align="right">{volunteer.first_name}</StyledTableCell>
              <StyledTableCell align="right">{volunteer.last_name}</StyledTableCell>
              <StyledTableCell align="right">{volunteer.state}</StyledTableCell>
              <StyledTableCell align="right">{volunteer.highest_education_level}</StyledTableCell>
              <StyledTableCell align="right">{volunteer.phone_number}</StyledTableCell>
              <StyledTableCell align="right">
              <div style={{textAlign: "center", width: "100%"}} >
              <Button
                  onClick={() =>  handleViewVolunteer(volunteer._id)}
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
        <Paper elevation={0} className={classes.causeCreation} style={{marginBottom: "100px"}}>
          {volunteersTable}
        </Paper>
      </Container>
    </>
  );
};



const mapStateToProps = state => {
  return {
    loading : state.displayCause.loading,
    data: state.getVolunteersForApproval.volunteers?state.getVolunteersForApproval.volunteers.data:'loading...',
    volunterError: state.getVolunteersForApproval.error,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    getVolunteersForApproval : (token) => dispatch(actions.getVolunteersForApproval(token)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewVolunteer);
