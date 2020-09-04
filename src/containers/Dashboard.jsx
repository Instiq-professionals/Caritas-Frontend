import React, { useState, useEffect } from "react";
import "../index.css";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Grid,
  Typography,
  Paper,
} from "@material-ui/core";
import { userIsUser,cLeader,Volunteer, userIsModerator, userIsAnAdmin, userIsChairman } from "../helpers/utils";

import { Colors } from "../constants";
import { connect } from "react-redux";
import { PrimaryAppBar } from "../commons";
import { SlideableGridList } from "../components";
import {
  getAllCauses,
  getAllUsersAsModerator
} from "../services/cause.service";
import {  UsersTable, Number } from "../components";
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
  const token = JSON.parse(localStorage.getItem("user")).token;
  const daysLeft = props.timeToCreateanotherCause;
  const user = props.profile;
 
  useEffect(() => {
    props.getProfile(token);
    userIsModerator() && props.onGetAllCausesForDirector(token);
    cLeader() && props.onGetAllCauses(token);
    props.getAllCausesByAuser(token);
    cLeader() && props.getVolunteersForApproval(token);
    Volunteer() && props.reviewCauses(token);
    !userIsUser() && props.getAllMyEvents(token);
    cLeader() && props.getEventByCleader(token);
    userIsModerator() && props.getEventByDirector(token)
    (userIsChairman() || userIsAnAdmin()) && props.getCausesAsAdmin(token)
    (userIsChairman() || userIsAnAdmin()) && props.getEventByAdmins(token)
  },[]);
  const CausesData = props.data;
  const errorMsg = props.error;
  const RegPendingData = props.volunteersRegPendingData;
  const volunteersReviewData = props.volunteersReviewData;
  const cLeaderData = props.CleadersDashboard;
  const getAllEventsByCleader = props.getAllEventsByCleader;
  const getMyEventdata = props.getMyEventdata;
  const getsAllEventByDirectorData = props.getsAllEventByDirectorData;
  const getAllCausesAsAdmin = props.getAllCausesAsAdmin;
  const getAllEventsByAdmins = props.getAllEventByAdmins;
  const adminsError = props.adminsError



  const userCauseStatus = [];
  for (const data of CausesData ) {
    userCauseStatus.push(data.cause_status );
};

const volunterCauseStatus = [];
  for (const data of volunteersReviewData ) {
    volunterCauseStatus.push(data.cause_status );
};

const cLeaderCauseStatus = [];
  for (const data of cLeaderData ) {
    cLeaderCauseStatus.push(data.cause_status );
};

const cLeaderEventsStatus = [];
  for (const data of getAllEventsByCleader ) {
    cLeaderEventsStatus.push(data.event_status );
};

const adminsCauseStatus = [];
   for (const data of getAllCausesAsAdmin) {
    adminsCauseStatus.push(data.cause_status)
   }

   const adminsEventsStatus = [];
   for (const data of getAllEventsByAdmins) {
    adminsEventsStatus.push(data.event_status)
   }

const userCausePendingLength = userCauseStatus.filter(element => element === "Awaiting Approval");
const userApprovedCausesLength = userCauseStatus.filter(element => element === "Approved");
const volunteerCausePendingLength = volunterCauseStatus.filter(element => element === "Awaiting Approval");
const pendingCausesInAdminsDashboard = adminsCauseStatus.filter(element => element === "Awaiting Approval");
const approvedCausesInAdminsDashboard = adminsCauseStatus.filter(element => element === "Approved");
const disApprovedCausesInAdminsDashboard = adminsCauseStatus.filter(element => element === "Disapproved");
const resolvedCausesInAdminsDashboard = adminsCauseStatus.filter(element => element === "Resolved");
const approvedEventsInAdminsDashboard = adminsEventsStatus.filter(element => element === "Approved");
const pendingEventsInAdminsDashboard = adminsEventsStatus.filter(element => element === "Awaiting approval");
const disApprovedEventsInAdminsDashboard = adminsEventsStatus.filter(element => element === "Disapproved");
const closedEventsInAdminsDashboard = adminsEventsStatus.filter(element => element === "Closed");
//const cLeaderCauseResolvedLength = cLeaderCauseStatus.filter(element => element === "Resolved");
console.log('getsAllEventByDirectorData.length...',getsAllEventByDirectorData.length)


  //const [curUser, setCurUser] = useState(user);

  //const classes = moreStyles();

  const handleCausesPageClick = () => {
    props.history.push('/dashboard/myCauses')
  }
  

  return (
    <>
      <PrimaryAppBar user={user}/>
      <Summary 
      userCausesDataLength={errorMsg?'0':CausesData.length}
      userPendingCausesLength={userCausePendingLength.length}
      userApprovedCausesLength={userApprovedCausesLength.length}
      daysLeft={daysLeft?`${daysLeft} days left `:'0'}
      clickToCausesPage={handleCausesPageClick}
      />
      {userIsChairman() || userIsAnAdmin() && <Chairman
      totalCauses={adminsError?0:getAllCausesAsAdmin.length}
      totalEvents={adminsError?0:getAllEventsByAdmins.length}
      pendingCauses={adminsError?0:pendingCausesInAdminsDashboard.length}
      approvedCauses={adminsError?0:approvedCausesInAdminsDashboard.length}
      disApprovedCauses={adminsError?0:disApprovedCausesInAdminsDashboard.length}
      resolvedCauses={adminsError?0:resolvedCausesInAdminsDashboard.length}
      pendingEvents={adminsError?0:pendingEventsInAdminsDashboard.length}
      approvedEvents={adminsError?0:approvedEventsInAdminsDashboard.length}
      disApprovedEvents={adminsError?0:disApprovedEventsInAdminsDashboard.length}
      closedEvents={adminsError?0:closedEventsInAdminsDashboard.length}
      successStories={0}
      clickToUsersPage={() => {
        window.location = `/dashboard/users`;
      }}
       />}
      {userIsModerator() && <Director
        approved={props.directordataError?'0':props.directordata.length}
        getsAllEventByDirectorData={getsAllEventByDirectorData.length}
        clickToCausesPage={() => props.history.push('/dashboard/resolve')}
        clickToEventsPage={() => props.history.push('/dashboard/resolveEvent')}
       />}
      {Volunteer() && <VolunteerDashboard
       userCausesDataLength={errorMsg?'0':CausesData.length}
        CausePending={volunteersReviewData.length}
        getMyEventdata={getMyEventdata.length}
        clickToCausesPage={() => props.history.push('/dashboard/review')}
        clickToEventPage={() => props.history.push('/dashboard/myevents')}
        clickToMyCausesPage={handleCausesPageClick}
       />}
      {cLeader() && <CleadersDashboard
      userCausesDataLength={errorMsg?'0':CausesData.length}
        RegPendingData={props.volunteersRegPendingDataError?'0':RegPendingData.length}
        Pending={cLeaderData.length}
        Event={getAllEventsByCleader.length}
        clickToCausesPage={() => props.history.push('/dashboard/approve')}
        clickToRegPendingPage={() => props.history.push('/dashboard/approveVolunteer')}
        clickToEventPage={() => props.history.push('/dashboard/getEventsByCleader')}
        clickToMyCausesPage={handleCausesPageClick}
        />}
    </>
  );
};

const Chairman = (props) => {
  const classes = moreStyles();
  let [allUsers, setAllUsers] = useState([]);

  const moderatorFetchAllUsers = async () => {
    return await getAllUsersAsModerator();
  };

  useEffect(() => {
    async function setTheUsers() {
      let returnedUsers = await moderatorFetchAllUsers();
      if (Array.isArray(returnedUsers)) setAllUsers(returnedUsers.length);
      else setAllUsers([]);
    }
    setTheUsers();
  }, []);
  const data = [
    {
      "name": "Cause countdown",
      "value": 5
    },
    
  ];
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
           <Grid item xs={12} sm={6} md={3} onClick={props.clickToUsersPage}>
              <SummaryCard title="Total Users" value={allUsers?allUsers:0} />
           </Grid>
           <Grid item xs={12} sm={6} md={3} onClick={() => {
            window.location = `/dashboard/viewCausesAsAleader`;
            }}>
              <SummaryCard title="Total Causes" Text={props.totalCauses} Text={props.totalCauses}/>
           </Grid>
           <Grid item xs={12} sm={6} md={3} onClick={() => {
            window.location = `/dashboard/viewEventsAsAleader`;
            }}>
              <SummaryCard title="Total Events" Text={props.totalEvents} />
           </Grid>
           <Grid item xs={12} sm={6} md={3} onClick={props.clickToEventsPage}>
              <SummaryCard title="Pending Causes" Text={props.pendingCauses} />
           </Grid>
           <Grid item xs={12} sm={6} md={3} onClick={props.clickToEventsPage}>
              <SummaryCard title="Pending Events" Text={props.pendingEvents} />
           </Grid>
           <Grid item xs={12} sm={6} md={3} onClick={props.clickToEventsPage}>
              <SummaryCard title="Approved Causes" Text={props.approvedCauses} />
           </Grid>
           <Grid item xs={12} sm={6} md={3} onClick = {props.clickToCausesPage}>
              <SummaryCard title="Approved Events" Text={props.approvedEvents} />
           </Grid>
           <Grid item xs={12} sm={6} md={3} onClick={props.clickToEventsPage}>
              <SummaryCard title="Disapproved Causes" Text={props.disApprovedCauses} />
           </Grid>
           <Grid item xs={12} sm={6} md={3} onClick = {props.clickToCausesPage}>
              <SummaryCard title="Disapproved Events" Text={props.disApprovedEvents} />
           </Grid>
           <Grid item xs={12} sm={6} md={3} onClick = {props.clickToCausesPage}>
              <SummaryCard title="Resolved Causes" Text={props.resolvedCauses} />
           </Grid>
           <Grid item xs={12} sm={6} md={3} onClick = {props.clickToCausesPage}>
              <SummaryCard title="Closed Events" Text={props.closedEvents} />
           </Grid>
           <Grid item xs={12} sm={6} md={3}>
           <SummaryPie title="Impacts" data={data} Text={551}
           />
           </Grid>
           </Grid>
    </Container>
  )
  
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
              <SummaryCard title="Total C.Leaders" Text="4" />
           </Grid>
           <Grid item xs={12} sm={6} md={3} onClick={props.clickToEventsPage}>
              <SummaryCard title="Approved events in your category" Text={props.getsAllEventByDirectorData} />
           </Grid>
           <Grid item xs={12} sm={6} md={3} onClick = {props.clickToCausesPage}>
              <SummaryCard title="Approved Causes in your category" Text={props.approved} />
           </Grid>
           <Grid item xs={12} sm={6} md={3}>
              <SummaryCard title="Impacts" value="551" />
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
           <Grid item xs={12} sm={6} md={3} onClick = {props.clickToMyCausesPage}>
              <SummaryCard title="My Causes" Text={props.userCausesDataLength}  />
           </Grid>
           <Grid item xs={12} sm={6} md={3} onClick = {props.clickToCausesPage}>
              <SummaryCard title="Pending Causes in Your Category" value={props.CausePending} Text={props.CausePending}/>
           </Grid>
           <Grid item xs={12} sm={6} md={3} onClick = {props.clickToEventPage}>
              <SummaryCard title="My events" Text={props.getMyEventdata} />
           </Grid>
           <Grid item xs={12} sm={6} md={3}>
              <SummaryCard title="Next event" Text="Sep,24" />
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
           <Grid item xs={12} sm={6} md={3} onClick = {props.clickToMyCausesPage}>
              <SummaryCard title="My Causes" Text={props.userCausesDataLength}  />
           </Grid>
           <Grid item xs={12} sm={6} md={3} onClick = {props.clickToCausesPage}>
              <SummaryCard title="Pending Causes in Your Category" value={props.Pending} Text={props.Pending}/>
           </Grid>
           <Grid item xs={12} sm={6} md={3} onClick = {props.clickToEventPage}>
              <SummaryCard title="Pending Event in your category" Text={props.Event}/>
           </Grid>
           <Grid item xs={12} sm={6} md={3} onClick = {props.clickToRegPendingPage}>
             <SummaryCard title="volunteer Registration Pending" Text={props.RegPendingData} />
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
              Text={props.userCausesDataLength}
              />
           </Grid>
           <Grid item xs={12} sm={6} md={3}>
              <SummaryCard title="Pending Causes"  Text={props.userPendingCausesLength}/>
           </Grid>
           <Grid item xs={12} sm={6} md={3}>
              <SummaryCard title="Approved Causes" Text={props.userApprovedCausesLength}/>
           </Grid>
           <Grid item xs={12} sm={6} md={3}>
              <SummaryPie 
              title="Cause countdown"
               data={data} 
               value={props.daysLeft}/>
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
    </Container>
  );
};

const SummaryCard = (props) => {

  const classes = moreStyles();

  return (
    <Paper className={classes.summaryCard} >
        <Typography component="h6" variant="h6" style={{fontSize: '12px', color: 'black', marginBottom: "10px"}}>{props.title}</Typography>
        <Typography component="h4" variant="h4" style={{fontWeight:  'bold'}}>{props.value?<Number number={props.value} />:props.Text}</Typography>
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
        <Typography component="h3" variant="h3" style={{fontSize: '20px', fontWeight: 'bold',  color: Colors.appRed, alignSelf: 'center', position: 'absolute', top: '50%'}}>
          {props.value?<Number number={props.value} />:props.Text}
          </Typography>
    </Paper>
  )

}

const mapStateToProps = state => {
  return {
    timeToCreateanotherCause: state.profile.timeToCreateAnotherCause,
    profile: state.profile.details?state.profile.details.data:[],
    loading : state.getAllMyCauses.loading,
    data: state.getAllMyCauses.causes?state.getAllMyCauses.causes.data:[],
    error: state.getAllMyCauses.error,
    volunteersRegPendingData: state.getVolunteersForApproval.volunteers?state.getVolunteersForApproval.volunteers.data:[],
    volunteersRegPendingDataError: state.getVolunteersForApproval.error,
    volunteersReviewData: state.reviewCauses.causes?state.reviewCauses.causes.data:[],
    CleadersDashboard: state.makeDecisionOnCause.causes?state.makeDecisionOnCause.causes.data:[],
    directordata: state.resolveCause.causes?state.resolveCause.causes.data:[],
    directordataError: state.resolveCause.error,
    getAllEventsByCleader: state.makeDecisionOnEventByCleader.events?state.makeDecisionOnEventByCleader.events.data:[],
    getAllEventsByCleaderError: state.makeDecisionOnEventByCleader.error,
    getMyEventdata: state.crudEvent.events?state.crudEvent.events.data:[],
    getMyEventdataError: state.crudEvent.error,
    getsAllEventByDirectorData: state.resolveEvent.events?state.resolveEvent.events.data:[],
    getsAllEventByDirectorError: state.resolveEvent.error,
    getAllCausesAsAdmin: state.admins.causes?state.admins.causes.data:[],
    getAllEventByAdmins: state.admins.events?state.admins.events.data:[],
    adminsError: state.admins.error,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    getProfile : (token) => dispatch(actions.profile(token)),
    getAllCausesByAuser : (token) => dispatch(actions.getAllMyCauses(token)),
    getVolunteersForApproval : (token) => dispatch(actions.getVolunteersForApproval(token)),
    reviewCauses : (token) => dispatch(actions.reviewCauses(token)),
    onGetAllCauses : (token) => dispatch(actions.getCausesForApproval(token)),
    onGetAllCausesForDirector : (token) => dispatch(actions.getCausesForResolution(token)),
    getAllMyEvents : (token) => dispatch(actions.getAllMyEvents(token)),
    getEventByCleader : (token) => dispatch(actions.getEventByCleader(token)),
    getEventByDirector : (token) => dispatch(actions.getEventForResolution(token)),
    getCausesAsAdmin : (token) => dispatch(actions.getCausesAsAdmin(token)),
    getEventByAdmins : (token) => dispatch(actions.getEventsAsAdmin(token)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
