import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from '@material-ui/core/CircularProgress';
import ArrowBackSharpIcon from '@material-ui/icons/ArrowBackSharp';
import {
  Container,
  Grid,
  Typography,
  Paper,
  Zoom
} from "@material-ui/core";
import { Colors } from "../constants";
import { connect } from "react-redux";
import { PrimaryAppBar, TableaCard } from "../commons";
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

const UsersDetails = (props) => {
  const token = JSON.parse(localStorage.getItem("user")).token;
  const user = props.user;

  useEffect(() => {
    const user_id = props.match.params.id;
    props.getProfileAsAdmin(token,user_id);

  },[]);

  const classes = moreStyles();


  let VolunteerIsMounted = props.loading && <CircularProgress disableShrink />;
  if (props.error) {
    VolunteerIsMounted = <div>
      <ArrowBackSharpIcon 
       onClick={() => {
        window.location = `/dashboard/users`;
      }}
      />
      <Typography variant="h6" component="h6" style={{textAlign: "center", fontWeight: "bold"}}>
                {props.error.message}
      </Typography>
    </div>
  }
  if (user) {
    VolunteerIsMounted = <div>
      <ArrowBackSharpIcon 
       onClick={() => {
        window.location = `/dashboard/users`;
      }}
      />
      <TableaCard
            title={`${user.title} ${user.first_name} ${user.last_name} form details`}
          >
            <Grid container spacing={5} style={{marginTop: "30px"}}>
              <Grid item xs={12} md={6}>
              <Zoom in={true} timeout={1000} mountOnEnter>
                <img
                  style={{height:'100%', width:'100%'}}
                  src={baseUrl + user.photo}
                  alt={`Pictures of ${user.first_name} ${user.last_name}`}
                  className={classes.heroImage}
                />
              </Zoom>
              </Grid>
              <Grid itemxs={12} md={6}>
              <Typography variant="h6" component="h6" style={{ fontWeight: "bold"}}>
                 Role : {user.role[0]}
             </Typography><br/>
             <Typography variant="h6" component="h6" style={{ fontWeight: "bold"}}>
                 Address : {user.address}
             </Typography><br/>
             <Typography variant="h6" component="h6" style={{ fontWeight: "bold"}}>
                Email: {user.email}
             </Typography><br/>
             <Typography variant="h6" component="h6" style={{ fontWeight: "bold"}}>
                 Phone Number : {user.phone_number}
             </Typography><br/>
            <Typography variant="h6" component="h6" style={{ fontWeight: "bold"}}>
                 Highest education level : {user.highest_education_level}
             </Typography><br/>
            <Typography variant="h6" component="h6" style={{fontWeight: "bold"}}>
              Category: {user.category}
             </Typography><br/>
              <Typography variant="h6" component="h6" style={{ fontWeight: "bold"}}>
                 Guarantor's name : {`${user.guarantor_name} `}
             </Typography><br/>
             <Typography variant="h6" component="h6" style={{ fontWeight: "bold"}}>
              Guarantor's address: {user.guarantor_address}
             </Typography><br/>
             <Typography variant="h6" component="h6" style={{ fontWeight: "bold"}}>
              Relationship with guarantor: {user.relationship_with_guarantor}
             </Typography><br/>
             <Typography variant="h6" component="h6" style={{ fontWeight: "bold"}}>
             Guarantor's company : {user.guarantor_company}
             </Typography><br/>
             <Typography variant="h6" component="h6" style={{ fontWeight: "bold"}}>
             Guarantor's postion : {user.guarantor_position}
             </Typography><br/>
             <Typography variant="h6" component="h6" style={{ fontWeight: "bold"}}>
             Criminal record : {user.criminal_record}
             </Typography><br/>
              </Grid>
            </Grid>
       </TableaCard>
      
    </div>
  }
  return (
    <>
      <PrimaryAppBar />
        <Container style={{ marginTop: 150 }}>
          <Typography variant="h4" component="h4" className={classes.sectionHead} style={{textAlign: "center"}}>
            Good going, {getAuthenticatedUser().first_name}. 
          </Typography>
          <Typography component="h1" variant="h5" className={classes.Circular}>
          </Typography>
          <Paper elevation={0} className={classes.causeCreation} style={{marginBottom: "100px"}}>
            {VolunteerIsMounted}
          </Paper>
        </Container>
    </>
  );
};



const mapStateToProps = state => {
  return {
    user: state.profile.userProfile?state.profile.userProfile.data:null,
    error: state.profile.userProfileError,
    loading: state.profile.loading,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    getProfileAsAdmin : (token,userId) => dispatch(actions.getProfileAsAdmin(token,userId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersDetails);
