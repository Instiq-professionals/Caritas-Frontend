import React, { useState, useEffect } from "react";
import clsx from "clsx";
import "../index.css";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Grid,
  Typography,
  FormControl,
  Button,
  Checkbox,
  Paper,
  FormControlLabel,
} from "@material-ui/core";
import { useStyles } from "../helpers";
import { userIsUser,cLeader,Volunteer, userIsModerator, userIsAnAdmin } from "../helpers/utils";

import { Colors } from "../constants";
import { useLocation, useHistory, Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { PrimaryAppBar, MyTextField } from "../commons";
import { yourCauses, trendingCauses, followedCauses, user } from "../mock";
import { SlideableGridList, AddImage } from "../components";
import {
  isValidCauseTitle,
  isValidFunds,
  isValidBriefDescription,
} from "../helpers/validator";
import {
  getAllCauses,
  getAllCausesAsModerator,
} from "../services/cause.service";
import { CausesTable, UsersTable } from "../components";
import {PieChart, Pie} from 'recharts';
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
  summaryCard:{
    height: "100px",
    display: 'flex',
    flexDirection: "column",
    alignItems: 'center',
    paddingTop: '30px',    
    elevation: 5,
    backgroundColor: "white",
    color: Colors.appRed,
    width: '100%',
    boxShadow: '2px 2px 5px rgba(0,0,0,.2)'
    
  }
}));

const Dashboard = (props) => {
  let user = JSON.parse(localStorage.getItem("user")).data;
  const token = JSON.parse(localStorage.getItem("user")).token;
  const daysLeft = JSON.parse(localStorage.getItem("user")).daysLeft;

  useEffect(() => {
    userIsUser() && props.getAllCausesByAuser(token);
    cLeader() && props.getVolunteersForApproval(token);
    props.reviewCauses(token)
  },[]);
  const CausesData = props.data;
  const errorMsg = props.error;
  const RegPendingData = props.volunteersRegPendingData;
  const volunteersReviewData = props.volunteersReviewData;

  const userCauseStatus = [];
  for (const data of CausesData ) {
    userCauseStatus.push(data.cause_status );
};
const userCausePendingLength = userCauseStatus.filter(element => element === "Awaiting Approval");
const userApprovedCausesLength = userCauseStatus.filter(element => element === "Approved")
console.log('userApprovedCausesLength...',userApprovedCausesLength )


  const [curUser, setCurUser] = useState(user);

  let location = useLocation();
  let history = useHistory();

  const classes = moreStyles();
  let [page, setPage] = useState(props.page ? props.page : 0);

  const handleCausesPageClick = () => {
    props.history.push('/dashboard/myCauses')
  }
  

  return (
    <>
      <PrimaryAppBar />
      <Summary 
      userCausesDataLength={errorMsg?'0':CausesData.length}
      userPendingCausesLength={userCausePendingLength.length}
      userApprovedCausesLength={userApprovedCausesLength.length}
      daysLeft={daysLeft?`${daysLeft} days left`:'0'}
      clickToCausesPage={handleCausesPageClick}
      />
      {userIsModerator() && <Director
        clickToCausesPage={() => props.history.push('/dashboard/resolve')}
       />}
      {Volunteer() && <VolunteerDashboard
        clickToCausesPage={() => props.history.push('/dashboard/review')}
       />}
      {cLeader() && <CleadersDashboard
        RegPendingData={props.volunteersRegPendingDataError?'0':RegPendingData.length}
        clickToCausesPage={() => props.history.push('/dashboard/approve')}
        clickToRegPendingPage={() => props.history.push('/dashboard/approveVolunteer')}
        />}
    </>
  );
};

const Director = (props) => {
  const classes = moreStyles();
  return (
    <Container style={{ marginTop: 200 }}>
        <Grid container spacing={2}>
           <Grid item xs={12}>
             <Typography
               variant="h4"
               component="h4"
               className={classes.sectionHead}
             >
               Activity Summary
             </Typography>            
           </Grid>
           <Grid item xs={12} sm={6} md={3}>
              <SummaryCard title="Total Causes" value="0" />
           </Grid>
           <Grid item xs={12} sm={6} md={3}>
              <SummaryCard title="Pending Causes" value="0" />
           </Grid>
           <Grid item xs={12} sm={6} md={3} onClick = {props.clickToCausesPage}>
              <SummaryCard title="Approved Causes" value="0" />
           </Grid>
           <Grid item xs={12} sm={6} md={3}>
              <SummaryCard title="Impacts" value="0" />
           </Grid>
           </Grid>
    </Container>
  )
  
};

const VolunteerDashboard = (props) => {
  const classes = moreStyles();
  return (
    <Container style={{ marginTop: 200 }}>
        <Grid container spacing={2}>
           <Grid item xs={12}>
             <Typography
               variant="h4"
               component="h4"
               className={classes.sectionHead}
             >
               Activity Summary
             </Typography>            
           </Grid>
           <Grid item xs={12} sm={6} md={3}>
              <SummaryCard title="Total Causes" value="0" />
           </Grid>
           <Grid item xs={12} sm={6} md={3} onClick = {props.clickToCausesPage}>
              <SummaryCard title="Pending Causes" value="0" />
           </Grid>
           <Grid item xs={12} sm={6} md={3}>
              <SummaryCard title="Approved Causes" value="0" />
           </Grid>
           <Grid item xs={12} sm={6} md={3}>
              <SummaryCard title="Review causes" value="0" />
           </Grid>
           </Grid>
    </Container>
  )
  
};

const CleadersDashboard = (props) => {
  const classes = moreStyles();
  return (
    <Container style={{ marginTop: 200 }}>
        <Grid container spacing={2}>
           <Grid item xs={12}>
             <Typography
               variant="h4"
               component="h4"
               className={classes.sectionHead}
             >
               Activity Summary
             </Typography>            
           </Grid>
           <Grid item xs={12} sm={6} md={3}>
              <SummaryCard title="Total Causes" value="0" />
           </Grid>
           <Grid item xs={12} sm={6} md={3} onClick = {props.clickToCausesPage}>
              <SummaryCard title="Pending Causes" value="0" />
           </Grid>
           <Grid item xs={12} sm={6} md={3} >
              <SummaryCard title="Approved Causes" value="0" />
           </Grid>
           <Grid item xs={12} sm={6} md={3} onClick = {props.clickToRegPendingPage}>
             <SummaryCard title="volunteer Registration Pending" value={props.RegPendingData} />
           </Grid>
           </Grid>
    </Container>
  )
  
};

const Summary = (props) => {
  const classes = moreStyles();

  let [allCauses, setAllCauses] = useState([]);

  const fetchAllCauses = async () => {
    return await getAllCauses();
  };

  const data = [
    {
      "name": "Cause countdown",
      "value": 5
    },
    
  ];

  useEffect(() => {
    async function setTheCauses() {
      let returnedCauses = await fetchAllCauses();
      if (Array.isArray(returnedCauses)) setAllCauses(returnedCauses);
      else setAllCauses([]);
    }
    setTheCauses();
  }, []);

  return (
    <Container style={{ marginTop: 200 }}>
      {userIsUser() && (
        // <Grid container spacing={10}>
        //   <Grid item xs={12} md={6}>
        //     <Typography
        //       variant="h4"
        //       component="h4"
        //       className={classes.sectionHead}
        //     >
        //       Your Causes
        //     </Typography>
        //     <Typography
        //       variant="body1"
        //       component="p"
        //       className={classes.sectionSubhead}
        //     >
        //       Here are the causes pioneered by you.
        //     </Typography>
        //     <SlideableGridList
        //       causes={allCauses}
        //       label="Glad you are here. Create a new cause."
        //       cols={2}
        //     />
        //   </Grid>
        //   <Grid item xs={12} md={6}>
        //     <Typography
        //       variant="h4"
        //       component="h4"
        //       className={classes.sectionHead}
        //     >
        //       Trending
        //     </Typography>
        //     <Typography
        //       variant="body1"
        //       component="p"
        //       className={classes.sectionSubhead}
        //     >
        //       Here are the causes making the most impressions
        //     </Typography>
        //     <SlideableGridList
        //       causes={allCauses}
        //       label="There are no trending causes yet"
        //       cols={2}
        //     />
        //   </Grid>
        //   <Grid item xs={12} md={9}>
        //     <Typography
        //       variant="h4"
        //       component="h4"
        //       className={classes.sectionHead}
        //     >
        //       Causes you follow
        //     </Typography>
        //     <Typography
        //       variant="body1"
        //       component="p"
        //       className={classes.sectionSubhead}
        //     >
        //       Here are the causes you have shown interest in
        //     </Typography>
        //     <SlideableGridList
        //       causes={allCauses}
        //       label="You are not following Any cause at the moment"
        //       cols={3}
        //     />
        //   </Grid>

        //   <Grid
        //     item
        //     xs={12}
        //     md={3}
        //     className={classes.coronalink}
        //     onClick={() => (window.location = "/about")}
        //   ></Grid>
        // </Grid>

        <>
        <Grid container spacing={2}>
           <Grid item xs={12}>

             <Typography
               variant="h4"
               component="h4"
               className={classes.sectionHead}
             >
               Activity Summary
             </Typography>
                          
           </Grid>
           <Grid item xs={12} sm={6} md={3} onClick = {props.clickToCausesPage} >
              <SummaryCard 
              title="Total Causes" 
              value={props.userCausesDataLength} 
              />
           </Grid>
           <Grid item xs={12} sm={6} md={3}>
              <SummaryCard title="Pending Causes" value={props.userPendingCausesLength} />
           </Grid>
           <Grid item xs={12} sm={6} md={3}>
              <SummaryCard title="Approved Causes" value={props.userApprovedCausesLength}/>
           </Grid>
           <Grid item xs={12} sm={6} md={3}>
              <SummaryPie title="Cause counddown" data={data} daysLeftToLogAnotherCause={props.daysLeft}/>
           </Grid>

        </Grid>

        <Grid container spacing={10}>
           
          <Grid item xs={12}>

             <Typography
               variant="h4"
               component="h4"
               className={classes.sectionHead}
             >
               Ongoing  Causes
             </Typography>
             <Typography
               variant="body1"
               component="p"
               className={classes.sectionSubhead}
             >
               Here are the causes pioneered by you
             </Typography>
                                       
           </Grid>

          
             <SlideableGridList
               causes={allCauses}
               label="Glad you are here. Create a new cause."
               cols={4}
             />
           
        </Grid>
        </>
      )}

      {(userIsAnAdmin() )  && (
        <>
        <Grid container spacing={2}>
           <Grid item xs={12}>

             <Typography
               variant="h4"
               component="h4"
               className={classes.sectionHead}
             >
               Activity Summary
             </Typography>
                          
           </Grid>
           <Grid item xs={12} sm={6} md={3}>
              <SummaryCard title="Total Causes" value="50" />
           </Grid>
           <Grid item xs={12} sm={6} md={3}>
              <SummaryCard title="Pending Causes" value="20" />
           </Grid>
           <Grid item xs={12} sm={6} md={3}>
              <SummaryCard title="Approved Causes" value="30" />
           </Grid>
           {(userIsAnAdmin() ) && (
             <Grid item xs={12} sm={6} md={3}>
             <SummaryCard title="volunteer Registration Pending" value={props.RegPendingData} />
          </Grid>
           )}

        </Grid>

        <Grid container spacing={10}>
           
          <Grid item xs={12}>

             <Typography
               variant="h4"
               component="h4"
               className={classes.sectionHead}
             >
               Ongoing  Causes
             </Typography>
             <Typography
               variant="body1"
               component="p"
               className={classes.sectionSubhead}
             >
               Here are the causes pioneered users
             </Typography>
                                       
           </Grid>

          
             {/* <SlideableGridList
               causes={allCauses}
               label="Glad you are here. Create a new cause."
               cols={4}
             /> */}
           
        </Grid>
        </>
      )}

      {/* {(userIsModerator())&& (
        <>
          <Typography
            variant="h6"
            component="h6"
            style={{
              color: Colors.appRed,
              fontWeight: "bold",
              marginBottom: "30px",
            }}
          >
            All Causes
          </Typography>
          <Grid container spacing={5}>
            <CausesTable />
          </Grid>
        </>
      )} */}
      {userIsAnAdmin()  && (
        <>
          <Typography
            variant="h6"
            component="h6"
            style={{
              color: Colors.appRed,
              fontWeight: "bold",
              marginBottom: "30px",
              marginTop: "50px",
            }}
          >
            Users
          </Typography>
          <Grid container spacing={5}>
            <UsersTable />
          </Grid>
        </>
      )}
    </Container>
  );
};

const SummaryCard = (props) => {

  const classes = moreStyles();

  return (
    <Paper className={classes.summaryCard} >
        <Typography component="h6" variant="h6" style={{fontSize: '12px', color: 'black', marginBottom: "10px"}}>{props.title}</Typography>
        <Typography component="h4" variant="h4" style={{fontWeight:  'bold'}}>{props.value}</Typography>
    </Paper>
  )

}

const SummaryPie = (props) => {

  const classes = moreStyles();

  return (
    <Paper className={classes.summaryCard} style={{height: "250px", position: 'relative'}} >
        <Typography component="h6" variant="h6" style={{fontSize: '12px', color: 'black'}}>{props.title}</Typography>
        <PieChart width={200} height={200}>
          
          <Pie data={props.data} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill={Colors.appRed} label />
        
        </PieChart>
        <Typography component="h3" variant="h3" style={{fontSize: '20px', fontWeight: 'bold',  color: Colors.appRed, alignSelf: 'center', position: 'absolute', top: '50%'}}>{props.daysLeftToLogAnotherCause}</Typography>
    </Paper>
  )

}

const mapStateToProps = state => {
  return {
    loading : state.getAllMyCauses.loading,
    data: state.getAllMyCauses.causes?state.getAllMyCauses.causes.data:"There is no cause found",
    error: state.getAllMyCauses.error,
    volunteersRegPendingData: state.getVolunteersForApproval.volunteers?state.getVolunteersForApproval.volunteers.data:'loading...',
    volunteersRegPendingDataError: state.getVolunteersForApproval.error,
    volunteersReviewData: state.reviewCauses.causes?state.reviewCauses.causes.data:"There is no cause found",
  }
};

const mapDispatchToProps = dispatch => {
  return {
    getAllCausesByAuser : (token) => dispatch(actions.getAllMyCauses(token)),
    getVolunteersForApproval : (token) => dispatch(actions.getVolunteersForApproval(token)),
    reviewCauses : (token) => dispatch(actions.reviewCauses(token)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
