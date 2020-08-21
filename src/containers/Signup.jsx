import React, { Fragment, useState, useEffect } from "react";
import { connect } from 'react-redux';
import * as actionCreators from '../store/actions/index';
// import ReactDom from "react-dom";
import clsx from "clsx";
import {
  Grid,
  Container,
  TextField,
  FormControl,
  Radio,
  Checkbox,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Typography,
  Button,
  Zoom,
  Select,
  MenuItem,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { PrimaryAppBar, MyTextField } from "../commons";
import { Link } from "react-router-dom";
import { Colors, recaptchaKey } from "../constants";
import { registerUser } from "../services/user.service";
import {
  isValidFirstName,
  isValidLastName,
  isValidEmail,
  isValidPassword,
  isValidPhoneNumber,
  isValidVolunteer
} from "../helpers/validator";
import { MyButton, MyDialog } from "../components";
import ReCAPTCHA from "react-google-recaptcha";
import { AddProfileImage } from "../components";
import { getToken } from "../helpers/utils";
import TermsAndCondition from "../components/TermsAndCondition"

const useStyles = makeStyles((theme) => ({
  content: {
    marginTop: 100,
  },
  sectionHead: {
    fontSize: "18px",
    fontWeight: "bold",
    color: Colors.appRed,
  },
  sectionSubhead: {
    fontSize: "12px",
  },
  formControl: {
    width: `100%  !important`,
    display: "block",
  },
  recaptcha: {
    marginTop: 15,
    marginBottom: 15,
    textAlign: "center !important",
    [theme.breakpoints.up("md")]: {
      marginLeft: 45,
    },
    marginLeft: 30,
  },
  loginButton: {
    width: "100% !important",
    padding: theme.spacing(2),
    color: "white",
  },
  formHeader: {
    fontWeight: "bold",
    color: Colors.appRed,
    [theme.breakpoints.down("md")]: {
      textAlign: "center",
    },
  },
  formSubheader: {
    marginBottom: 50,
    [theme.breakpoints.down("md")]: {
      textAlign: "center",
    },
  },
  formByLine: {
    marginLeft: "30px",
  },
  textField: {
    width: "100% !important",
    borderRadius: 10,
  },
  leftGrid: {
    height: "600px",
    backgroundImage: "url(/images/login_pic.png)",
    backgroundSize: "cover",
  },
  left: {
    padding: "200px 50px",
    backgroundColor: Colors.appBackground,
  },
  right: {
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
    backgroundColor: Colors.appRed,
    height: "100% !important",
    padding: "200px 50px",
    backgroundImage: "url('/assets/images/auth-background.png')",
    backgroundPosition: "80% 150px",
    backgroundRepeat: "no-repeat",
    backgroundSize: "450px 450px",
  },
  authPage: {
    width: "100%",
    height: "150vh",
  },
  authImage: {
    width: "450px",
    display: "block",
    marginLeft: "auto",
    marginTop: "50px",
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  authLeft: { position: "relative" },
  alternate: {
    [theme.breakpoints.down("md")]: {
      textAlign: "center",
    },
  },
  copyright: {
    position: "absolute",
    bottom: "30px",
    fontSize: "10px",
    width: "100%",
  },
  form: {
    width: "400px !important",
    display: "block",
    margin: "auto",
    [theme.breakpoints.down("md")]: {
      width: "100% !important",
    },
  },
  checkbox: {
    display: "block",
    color: Colors.appRed
  },
  regForm: {
    width: "800px !important",
    display: "block",
    margin: "auto",
    marginTop: "50px",
    [theme.breakpoints.down("md")]: {
      width: "100% !important",
    },
  },
}));

const Signup = (props) => {
  const userId = props.userId;
  const errorMsg = props.errorMsg;
  useEffect(() => {
    if (userId && userId.status) {
      setVolunteer({});
      setDialogTitle(userId.status);
      setDialogMessage(userId.message);

      setPositiveDialog(true);

      setOpenDialog(true);
      setTimeout(() => (window.location = "/signin"), 5000);
     } else if (errorMsg && errorMsg.status) {
      setDialogTitle(errorMsg.status);
      setDialogMessage(errorMsg.message);

      setPositiveDialog(false);

      setOpenDialog(true);
     } else {
      setDialogTitle('');
      setDialogMessage('');

      setPositiveDialog(false);

      setOpenDialog(false);
     }
    
  },[userId,errorMsg]);
  const classes = useStyles();
  let [user, setUser] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phone: "",
    accountType: "",
    address: "",
    bankName: "",
    accountName: "",
    accountNumber: "",
    password: "",
    confirmPassword: "",
    dateOfBirth: "",
    title: "Select Title",
    gender: "Select Gender",
    dob: "",
    agreeToTandC:false
  });

  let [partner, setPartner] = useState({
    partnerType: "",
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phone: "",
    accountType: "",
    address: "",
    bankName: "",
    accountName: "",
    accountNumber: "",
    password: "",
    confirmPassword: "",
    institutionName: "",
    institutionType: "Select Institution Type",
    staffStrength: 0,
    RCNumber: "",
    institutionEmail: "",
    institutionPhone: "",
    institutionAddress: "",
    institutionState: "",
    institutionLga: "",
  });

  let [errorMessage, setErrorMessage] = useState("");
  let [progress, setProgress] = useState(false);
  let [dialogTitle, setDialogTitle] = useState("");
  let [dialogMessage, setDialogMessage] = useState("");
  let [openDialog, setOpenDialog] = useState();
  let [positiveDialog, setPositiveDialog] = useState(true);

  let [verified, setVerified] = useState(false);
  let [page, setPage] = useState(1);
  let [selectedType, setSelectedType] = useState("User");
  let [partnerType, setPartnerType] = useState("Individual Partner");
  let [volunteerType, setVolunteerType] = useState("Food");
  let [uploadFiles, setUploadFiles] = useState({
    image: null,
  });

  let [institution, setInstitution] = useState({
    name: "",
    type: "Select Institution Type",
    staffStrength: 0,
    RCNumber: "",
    email: "",
    phone: "",
    address: "",
    state: "",
    lga: "",
  });

  const  reg_credential =  user.email !== "" ? user.email : user.phone;
  const password = user.password;
  const volunteer_photo = uploadFiles.image;

  const [volunteer, setVolunteer] = useState({
    first_name: "",
    last_name: "",
    address:"",
    date_of_birth:"",
    local_govt:"",
    state:"",
    staff_strength:"",
    company:"",
    position:"",
    guarantor_name:"",
    relationship_with_guarantor:"",
    guarantor_address:"",
    guarantor_company:"",
    guarantor_position:"",
    highest_education_level:"",
    role: "Volunteer",
    photo:uploadFiles.image,
    phone_number:"",
    password:user.password,
    confirmPassword:user.confirmPassword,
    category : volunteerType,
    title: "Select Title",
    gender: "Select Gender",
    employment_status: "What is your employment status",
    relationship_with_guarantor:"Relationship With Guarantor"
  });

  const handleSubmit = async (event) => {

   
    if (event) event.preventDefault();

    progress === false ? setProgress(true) : setProgress(progress);

    if (validateSignup()) {
      //Here we submit shit...

      let outcome = await registerUser(user, uploadFiles.image, selectedType);

      setProgress(false);

      console.log("Outcome", outcome);

      if (outcome && outcome.data) {
        setErrorMessage("");
        setUser({
          firstName: "",
          middleName: "",
          lastName: "",
          email: "",
          phone: "",
          address: "",
          accountName: "",
          accountNumber: "",
          password: "",
          confirmPassword: "",
          dob: ""
        });
        setInstitution({
          name: "",
          type: "Select Institution Type",
          staffStrength: 0,
          RCNumber: "",
          email: "",
          phone: "",
          address: "",
          state: "",
          lga: "",
        });

        setUploadFiles({image: null});

        setDialogTitle("Registration Successful");
        setDialogMessage("Please check your email for verification");

        setPositiveDialog(true);

        setOpenDialog(true);
        setTimeout(() => (window.location = "/signin"), 5000);
      } else if (outcome.message) {
        setDialogTitle("Registration failed");
        console.log('error point'+ outcome.message)
        setDialogMessage(
          outcome.message.includes("400")
            ? outcome.message
            : "Please check your Internet connection"
        );

        setPositiveDialog(false);

        setOpenDialog(true);
      }
    }
  };

  const handleFirstNameChange = (event) => {
    setUser({ ...user, firstName: event.target.value.trim() });
  };
  const handleMiddleNameChange = (event) => {
    setUser({ ...user, middleName: event.target.value.trim() });
  };
  const handleLastNameChange = (event) => {
    setUser({ ...user, lastName: event.target.value.trim() });
  };
  const handleEmailChange = (event) => {
    setUser({ ...user, email: event.target.value.trim() });
  };
  const handlePhoneChange = (event) => {
    setUser({ ...user, phone: event.target.value.trim() });
  };
  const handleAddressChange = (event) => {
    setUser({ ...user, address: event.target.value });
  };
  const handleDOBChange = (event) => {
    setUser({ ...user, dob: event.target.value });
  };
  const handleAccountNumberChange = (event) => {
    setUser({ ...user, accountName: event.target.value.trim() });
  };
  const handleAccountNameChange = (event) => {
    setUser({ ...user, accountName: event.target.value });
  };
  const handleAccountTypeChange = (event) => {
    setUser({ ...user, accountType: event.target.value });
  };
  const handlePasswordChange = (event) => {
    setUser({ ...user, password: event.target.value.trim() });
  };
  const handleBankNameChange = (event) => {
    setUser({ ...user, bankName: event.target.value });
  };
  const handleGenderChange = (event) => {
    setUser({ ...user, gender: event.target.value });
  };
  const handleTitleChange = (event) => {
    setUser({ ...user, title: event.target.value });
  };
  const handleConfirmPasswordChange = (event) => {
    setUser({ ...user, confirmPassword: event.target.value.trim() });
  };
  const handleCheck = () => {
    setUser({ ...user, agreeToTandC:!user.agreeToTandC });
  }
  const handleInstitutionNameChange = (event) => {
    setInstitution({ ...institution, name: event.target.value });
  };

  const handleInstitutionTypeChange = (event) => {
    setInstitution({ ...institution, type: event.target.value });
  };

  const handleInstitutionStaffStrengthChange = (event) => {
    setInstitution({ ...institution, staffStrength: event.target.value });
  };

  const handleInstitutionRCNumberChange = (event) => {
    setInstitution({ ...institution, RCNumber: event.target.value.trim() });
  };

  const handleInstitutionEmailChange = (event) => {
    setInstitution({ ...institution, email: event.target.value.trim() });
  };

  const handleInstitutionPhoneChange = (event) => {
    setInstitution({ ...institution, phone: event.target.value.trim() });
  };

  const handleInstitutionAddressChange = (event) => {
    setInstitution({ ...institution, address: event.target.value });
  };


  const handleChangeVolunteer =  name => (e) => { 
    setVolunteer({
      ...volunteer,
      [name]: e.target.value
    });
    console.log(volunteer)
 };

  const handleAddImageClick = (event) => {
    event.stopPropagation();
    console.log("Clicked", event.target);
    let fileInput = event.target.getElementsByTagName("input")[0];
    fileInput.click();
  };

  const onRecaptcha = (value) => {
    //verified = value;
    if (value) {
      setVerified(true);
    }
  };


  const validateSignup = () => {
    if (!isValidFirstName(user.firstName)) {
      setErrorMessage("Ïnvalid First name");
      setProgress(false);
      return;
    }
    if (!isValidLastName(user.lastName)) {
      setErrorMessage("Ïnvalid Last name");
      setProgress(false);
      return;
    }
    if (!isValidEmail(user.email)) {
      setErrorMessage("Ïnvalid email address");
      setProgress(false);
      return;
    }
    if (!isValidPassword(user.password)) {
      setErrorMessage("Ïnvalid password");
      setProgress(false);
      return;
    }
    if (user.confirmPassword === "") {
      setErrorMessage("Please confirm your password");
      setProgress(false);
      return;
    }
    if (user.confirmPassword === "") {
      setErrorMessage("Please confirm your password");
      setProgress(false);
      return;
    }
    if (user.confirmPassword !== user.password) {
      setErrorMessage("Passwords don't match");
      setProgress(false);
      return;
    }
    if (!user.agreeToTandC) {
      setPositiveDialog(false);
      setDialogTitle("Terms and Conditions");
      setDialogMessage(
        `To be able to register on the platform, you must agree to the terms and conditions`
      );
      setOpenDialog(true);
      return;
    }
    return true;
  };

  const handlePage1Click = () => {
    // alert("Page 1 clicked");

    setProgress(true);

    if (user.email.trim() != "" && !isValidEmail(user.email)) {
      setErrorMessage("Invalid email address");
      setProgress(false);
      return;
    }

    if (user.phone.trim() != "" && !isValidPhoneNumber(user.phone)) {
      setErrorMessage("Invalid phone number");
      setProgress(false);
      return;
    }

    if(user.email.trim() == "" && user.phone.trim() == ""){
      setErrorMessage("You must provide a valid phone number if you don't have an email address");
      setProgress(false);
      return;
    }

    if (!isValidPassword(user.password.trim())) {
      setErrorMessage("Ïnvalid password");
      setProgress(false);
      return;
    }

    if(user.password.trim() != user.confirmPassword.trim()){
      setErrorMessage("Passwords don't match");
      setProgress(false);
      return;
    }

    setErrorMessage("");
    setProgress(false);
    console.log("User", user);

    //next page please
    setPage(2);
  }
  const validateVolunteerClick1 = () => {
    if (uploadFiles.image == null) {
      setPositiveDialog(false);
      setDialogTitle("Wait a minute");
      setDialogMessage(`You must upload at least one image for your cause`);
      setOpenDialog(true);
      return;
    }
    if (volunteer.title === "Select Title") {
      setErrorMessage("Select a title");
      setProgress(false);
      return;
    }
    if (volunteer.gender === "Select Gender") {
      setErrorMessage("Select a gender");
      setProgress(false);
      return;
    }
    if (!isValidVolunteer(volunteer.first_name.trim()) ||volunteer.first_name == undefined || volunteer.first_name.length<3) {
      setErrorMessage("Ïnvalid First name");
      setProgress(false);
      return;
    }

    if (!isValidVolunteer(volunteer.last_name.trim())||volunteer.last_name == undefined || volunteer.last_name.length<3) {
      setErrorMessage("Ïnvalid Last name");
      setProgress(false);
      return;
    }
    if (volunteer.date_of_birth.length<3) {
      setErrorMessage("Ïnvalid date of birth");
      setProgress(false);
      return;
    }
    if (!isValidPhoneNumber(volunteer.phone_number.trim()) || volunteer.phone_number == undefined ) {
      setErrorMessage("Ïnvalid phone number");
      setProgress(false);
      return;
    }
    if (volunteer.local_govt.length<3) {
      setErrorMessage("Ïnvalid Local government area");
      setProgress(false);
      return;
    }
    if (volunteer.state.length<3) {
      setErrorMessage("Ïnvalid State");
      setProgress(false);
      return;
    }
    return true;
  }
  const validateVolunteerClick2 = () => {
    if (volunteer.highest_education_level.length<3) {
      setErrorMessage("Ïnvalid eduction level");
      setProgress(false);
      return;
    }
    if (volunteer.employment_status === "What is your employment status") {
      setErrorMessage("Select a valid employment status");
      setProgress(false);
      return;
    }
    if (!isValidVolunteer(volunteer.guarantor_name.trim())||volunteer.guarantor_name == undefined || volunteer.guarantor_name.length<3) {
      setErrorMessage("Ïnvalid guarantor's first name");
      setProgress(false);
      return;
    }
    if (!isValidVolunteer(volunteer.guarantor_last_name.trim())||volunteer.guarantor_last_name == undefined || volunteer.guarantor_last_name.length<3) {
      setErrorMessage("Ïnvalid guarantor's last name");
      setProgress(false);
      return;
    }
    if (volunteer.relationship_with_guarantor === "Relationship With Guarantor") {
      setErrorMessage("Select a valid relationship with guarantor");
      setProgress(false);
      return;
    }
    if (!isValidEmail(volunteer.guarantor_email.trim()) || volunteer.guarantor_email == undefined ) {
      setErrorMessage("Ïnvalid guarantor's email address");
      setProgress(false);
      return;
    }
    if (!isValidPhoneNumber(volunteer.guarantor_phone_number.trim()) || volunteer.guarantor_phone_number == undefined ) {
      setErrorMessage("Ïnvalid guarantor's phone number");
      setProgress(false);
      return;
    }
    if (volunteer.guarantor_address === "") {
      setErrorMessage("Provide a valid guarantor's address");
      setProgress(false);
      return;
    }
    if (volunteer.guarantor_position.length<3) {
      setErrorMessage("Provide a valid guarantor's position");
      setProgress(false);
      return;
    }
    if (volunteer.guarantor_company.length<3) {
      setErrorMessage("Provide a valid guarantor's work details");
      setProgress(false);
      return;
    }
    return true;
  }
  const validateVolunteerClick3 = () => {
    if (volunteer.religious_group == undefined || volunteer.religious_group.length<1) {
      setErrorMessage("Choose if you are in a religious group");
      setProgress(false);
      return;
    }
    if (volunteer.religious_group === 'Yes' && volunteer.religion === '') {
      setErrorMessage("Provide the religious group you belong");
      setProgress(false);
      return;
    }
    if (volunteer.above_18 == undefined || volunteer.above_18.length<1) {
      setErrorMessage("State if  you are above 18 years old");
      setProgress(false);
      return;
    }
    if (volunteer.criminal_record == undefined || volunteer.criminal_record.length<1) {
      setErrorMessage("State if  you have any criminal record");
      setProgress(false);
      return;
    }
    if (volunteer.agreed == undefined || volunteer.agreed.length<1) {
      setPositiveDialog(false);
      setDialogTitle("Terms and Conditions");
      setDialogMessage(
        `To be able to upload this cause, you must agree to the terms and conditions`
      );
      setOpenDialog(true);
      return
    }
   return true
  }
  const handleVolunteerPageClick = (event) => {
    if (event) event.preventDefault();
    if (page === 4 && selectedType === "Volunteer" ){
      if (validateVolunteerClick1()){
        setErrorMessage("");
        setPage(5)
      } 
    } 
    if (page === 5 && selectedType === "Volunteer" ){
      if (validateVolunteerClick2()){
        setErrorMessage("");
        setPage(6)
      } 
    } 
  }

  const handleVolunteerSubmit =  (event) => {
    const {email,first_name,last_name,role,address,phone_number,
      date_of_birth,local_govt,state,title,staff_strength,photo,
      category,company,position,religion,guarantor_name,relationship_with_guarantor,
      guarantor_address,guarantor_company,guarantor_position,highest_education_level,criminal_record} = volunteer;
    if (event) event.preventDefault();
    progress === false ? setProgress(true) : setProgress(progress);
    if (validateVolunteerClick3()) {
     props.signUpUser(reg_credential,user.email,phone_number,password,first_name,last_name,role,address,date_of_birth,local_govt,state,title,staff_strength,uploadFiles.image,category,company,position,religion,guarantor_name,relationship_with_guarantor,guarantor_address,guarantor_company,guarantor_position,highest_education_level,criminal_record);
    }
    
  }

  const TypeSelection = 
  (props) => {
    const useStyles = makeStyles((theme) => ({
      root: {
        display: "flex",
        flexDirection: "column",
        padding: "50px 20px 30px 20px",
        alignItems: "center",
        cursor: "pointer",
        boxShadow:
          props.type == selectedType || props.type == volunteerType || props.type == partnerType
            ? "0px 0px 20px rgba(252, 99, 107, 0.7)"
            : "none",
        backgroundColor:
          props.type == selectedType || props.type == volunteerType || props.type == partnerType
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
          props.action(props.type);
        }}
      >
        <img src={props.image} alt="" style={{ height: "80px" }} />
        <p style={{ textAlign: "center" }}>{props.type}</p>
      </div>
    );
  };

  // console.log("selectedType", selectedType);

  return (
    <Fragment>
      <MyDialog
        title={dialogTitle}
        openDialog={openDialog}
        positiveDialog={positiveDialog}
        onClose={() => setOpenDialog(false)}
      >
        {dialogMessage}
      </MyDialog>

      {page === 1 && (
        <Container>
          <img
            src="/logo-dark.svg"
            alt=""
            style={{ display: "block", margin: "100px auto 50px auto", width: "80px" }}
          />

          <div style={{ textAlign: "center" }}>
            <Typography
              variant="h5"
              component="h5"
              className={classes.formHeader}
            >
              Glad to have you here...
            </Typography>
            <Typography
              variant="body1"
              component="p"
              className={classes.formSubheader}
            >
              Sign up to create an account.
            </Typography>
            <form action={"#"} method="POST" className={classes.form}>
              <div style={{ color: "red", textAlign: "center", margin: 16 }}>
                {errorMessage}
              </div>
              <FormControl className={classes.formControl}>
                <MyTextField
                  id="email"
                  type="email"
                  name="email"
                  required="required"
                  label="Email"
                  placeholder="Enter email address"
                  value={user.email}
                  onChange={handleEmailChange}
                />
              </FormControl>
              <FormControl className={classes.formControl}>
                <MyTextField
                  id="phone"
                  type="phone"
                  name="phone"
                  required="required"
                  label="Phone no"
                  placeholder="Enter your phone number"
                  value={user.phone}
                  onChange={handlePhoneChange}
                />
              </FormControl>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <FormControl className={classes.formControl}>
                    <MyTextField
                      id="password"
                      type="password"
                      name="password"
                      required="required"
                      label="Password"
                      placeholder="Choose a password"
                      value={user.password}
                      onChange={handlePasswordChange}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl className={classes.formControl}>
                    <MyTextField
                      id="confirm-password"
                      type="password"
                      name="confirm_password"
                      required="required"
                      label="Confirm Password"
                      placeholder="Please confirm your password"
                      value={user.confirmPassword}
                      onChange={handleConfirmPasswordChange}
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <MyButton onClick={handlePage1Click} progress={progress}>
                Sign up
              </MyButton>
            </form>
            <p
              style={{
                color: Colors.appBlack,
                marginTop: "50px",
              }}
              className={classes.alternate}
            >
              Already have an account?{" "}
              <Link
                to="/signin"
                style={{
                  color: Colors.appRed,
                  fontWeight: "bold",
                  display: "inline",
                }}
              >
                Sign In instead.
              </Link>
            </p>
          </div>
        </Container>
      )}
      {page === 2 && (
        <Container style={{ marginTop: "100px" }}>
          <Grid item xs={12} md={6}>
            <Typography
              variant="h4"
              component="h4"
              className={classes.sectionHead}
            >
              Glad to have you here
            </Typography>
            <Typography
              variant="body1"
              component="p"
              className={classes.sectionSubhead}
              style={{ width: "300px" }}
            >
              Kindly select what category you are signing up for To finish your
              registration.
            </Typography>
          </Grid>
          <Grid container spacing={5} style={{ marginTop: "100px" }}>
            <Grid item xs={6} md={3}>
              <TypeSelection
                image={"/assets/images/icons/user-type.png"}
                type="User"
                action={setSelectedType}
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <TypeSelection
                image={"/assets/images/icons/institution-type.png"}
                type="Institution"
                action={setSelectedType}
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <TypeSelection
                image={"/assets/images/icons/partner-type.png"}
                type="Partner"
                action={setSelectedType}
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <TypeSelection
                image={"/assets/images/icons/volunteer-type.png"}
                type="Volunteer"
                action={setSelectedType}
              />
            </Grid>
          </Grid>
          {selectedType !== null && (
            <div>
              <Button
                onClick={() => setPage(1)}
                variant="contained"
                color="default"
                style={{
                  marginTop: "100px",
                  marginBottom: "100px",
                }}
              >
                Back
              </Button>
              <Button
                onClick={() => setPage(3)}
                variant="contained"
                color="primary"
                style={{
                  marginTop: "100px",
                  marginBottom: "100px",
                  marginLeft: "auto",
                  color: "white",
                  float: "right",
                }}
              >
                Continue
              </Button>
            </div>
          )}
        </Container>
      )}
      {page === 3 && selectedType === "User" && (
        <Container style={{ marginTop: "100px" }}>
          <Typography
            variant="h4"
            component="h4"
            className={classes.sectionHead}
            style={{ textAlign: "center" }}
          >
            Complete User Registration
          </Typography>
          <Typography
            variant="body1"
            component="p"
            className={classes.sectionSubhead}
            style={{ width: "300px", textAlign: "center", margin: "auto" }}
          >
            Kindly provide all neccesary details to finish Your registration as
            a user.
          </Typography>

          <div style={{ color: "red", textAlign: "center", margin: 16 }}>
            {errorMessage}
          </div>
          <div className={classes.regForm}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Grid
                  item
                  xs={12}
                  style={{
                    border: `2px dashed ${Colors.appRed}`,
                    marginTop: "10px",
                  }}
                >
                  <AddProfileImage
                    image="/assets/images/icons/upload-image.png"
                    title="Upload picture*"
                    // text="This is image that will portray the cause."
                    style={{ alignSelf: "flex-start" }}
                    filename="image"
                    onClick={handleAddImageClick}
                    backgroundImage={uploadFiles.image}
                    setImage={(file) => {
                      setUploadFiles({
                        ...uploadFiles,
                        image: file,
                      });
                    }}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl
                  className={classes.formControl}
                  style={{ margin: "10px 0px" }}
                >
                  <Select
                    labelId="gender-type"
                    id="gender"
                    value={user.gender}
                    onChange={handleGenderChange}
                    variant="outlined"
                    style={{ width: "100% !important" }}
                    // margin="dense"
                    fullWidth
                  >
                    <MenuItem value="Select Gender">Select Gender</MenuItem>
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                </FormControl>

                <FormControl
                  className={classes.formControl}
                  style={{ margin: "10px 0px" }}
                >
                  <Select
                    labelId="title-type"
                    id="title"
                    value={user.title}
                    onChange={handleTitleChange}
                    variant="outlined"
                    style={{ width: "100% !important" }}
                    // margin="dense"
                    fullWidth
                  >
                    <MenuItem value="Select Title">Select Title</MenuItem>
                    <MenuItem value="Mr.">Mr.</MenuItem>
                    <MenuItem value="Mrs.">Mrs.</MenuItem>
                    <MenuItem value="Miss">Miss</MenuItem>
                    <MenuItem value="Dr.">Dr.</MenuItem>
                    <MenuItem value="Prof.">Prof.</MenuItem>
                    <MenuItem value="Engr.">Engr.</MenuItem>
                    <MenuItem value="Pastor">Pastor</MenuItem>
                  </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                  <MyTextField
                    id="first_name"
                    type="text"
                    name="first_name"
                    required="required"
                    label="First name"
                    placeholder="Enter your first name"
                    value={user.firstName}
                    onChange={handleFirstNameChange}
                  />
                </FormControl>

                <FormControl className={classes.formControl}>
                  <MyTextField
                    id="last_name"
                    type="text"
                    name="last_name"
                    required="required"
                    label="Last name"
                    placeholder="Enter your last name"
                    value={user.lastName}
                    onChange={handleLastNameChange}
                  />
                </FormControl>

                <FormControl className={classes.formControl}>
                  <MyTextField
                    id="address"
                    type="text"
                    name="address"
                    required="required"
                    label="Address"
                    placeholder="Enter your address"
                    value={user.address}
                    onChange={handleAddressChange}
                  />
                </FormControl>

                <FormControl className={classes.formControl}>
                  <MyTextField
                    id="dob"
                    type="date"
                    name="dob"
                    required="required"
                    label="Date of birth"
                    placeholder="Enter your date of birth"
                    value={user.dob}
                    onChange={handleDOBChange}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
             <TermsAndCondition />
             </Grid>
             <Grid item xs={12}>
             <FormControlLabel
                    className={classes.checkbox}
                    style={{ marginTop: "20px" }}
                    control={
                      <Checkbox
                        checked={user.agreeToTandC}
                        // onChange={handleChange}
                        name="agreeToTandC"
                        onChange={handleCheck}
                      />
                    }
                    label={`I agree to the terms and conditions.`}
                  />
             </Grid>
              <Grid item xs={12}>
                <div>
                  <Button
                    onClick={() => setPage(2)}
                    variant="contained"
                    color="default"
                    style={{
                      marginTop: "50px",
                      marginBottom: "100px",
                      padding: "10px 50px",
                    }}
                  >
                    Back
                  </Button>
                  <Button
                    onClick={() => handleSubmit(window.event)}
                    variant="contained"
                    color="primary"
                    style={{
                      marginTop: "50px",
                      marginBottom: "100px",
                      marginLeft: "auto",
                      color: "white",
                      float: "right",
                      padding: "10px 50px",
                    }}
                  >
                    Signup
                  </Button>
                </div>
              </Grid>
            </Grid>
          </div>

        </Container>
      )}
      {page === 3 && selectedType === "Institution" && (
        <Container style={{ marginTop: "100px" }}>
          <Typography
            variant="h4"
            component="h4"
            className={classes.sectionHead}
            style={{ textAlign: "center" }}
          >
            Complete Institution Registration
          </Typography>
          <Typography
            variant="body1"
            component="p"
            className={classes.sectionSubhead}
            style={{ width: "300px", textAlign: "center", margin: "auto" }}
          >
            Kindly provide all neccesary details to finish Your registration as
            an Institution.
          </Typography>

          <div style={{ color: "red", textAlign: "center", margin: 16 }}>
            {errorMessage}
          </div>
          <div className={classes.regForm}>
            <Typography
              variant="body1"
              component="p"
              className={classes.sectionHead}
            >
              Contact User Information
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <FormControl className={classes.formControl}>
                  <Select
                    labelId="title-type"
                    id="title"
                    value={user.title}
                    onChange={handleTitleChange}
                    variant="outlined"
                    style={{ width: "100% !important" }}
                    // margin="dense"
                    fullWidth
                  >
                    <MenuItem value="Select Title">Select Title</MenuItem>
                    <MenuItem value="Mr.">Mr.</MenuItem>
                    <MenuItem value="Mrs.">Mrs.</MenuItem>
                    <MenuItem value="Miss">Miss</MenuItem>
                    <MenuItem value="Dr.">Dr.</MenuItem>
                    <MenuItem value="Prof.">Prof.</MenuItem>
                    <MenuItem value="Engr.">Engr.</MenuItem>
                    <MenuItem value="Pastor">Pastor</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl className={classes.formControl}>
                  <MyTextField
                    id="first_name"
                    type="text"
                    name="first_name"
                    required="required"
                    label="First name"
                    placeholder="Enter your first name"
                    value={user.firstName}
                    onChange={handleFirstNameChange}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl className={classes.formControl}>
                  <MyTextField
                    id="middle_name"
                    type="text"
                    name="middle_name"
                    required="required"
                    label="Middle name"
                    placeholder="Enter your middle name"
                    value={user.middleName}
                    onChange={handleMiddleNameChange}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl className={classes.formControl}>
                  <MyTextField
                    id="last_name"
                    type="text"
                    name="last_name"
                    required="required"
                    label="Last name"
                    placeholder="Enter your last name"
                    value={user.lastName}
                    onChange={handleLastNameChange}
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Typography
              variant="body1"
              component="p"
              className={classes.sectionHead}
            >
              Institution Details
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <FormControl className={classes.formControl}>
                  <MyTextField
                    id="institution_name"
                    type="text"
                    name="institution_name"
                    required="required"
                    label="Name of Institution"
                    placeholder="Enter Name of Institution"
                    value={institution.name}
                    onChange={handleInstitutionNameChange}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl className={classes.formControl}>
                  <Select
                    labelId="institution-type"
                    id="institution-type"
                    value={institution.type}
                    onChange={handleInstitutionTypeChange}
                    variant="outlined"
                    style={{ width: "100% !important" }}
                    // margin="dense"
                    fullWidth
                  >
                    <MenuItem value="Select Institution Type">
                      Select Institution Type
                    </MenuItem>
                    <MenuItem value="Non-profit">Non-profit</MenuItem>
                    <MenuItem value="NGO">NGO</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl className={classes.formControl}>
                  <MyTextField
                    id="staff_strength"
                    type="number"
                    min="0"
                    name="staff_strength"
                    required="required"
                    label="Staff Strength"
                    placeholder="Enter Staff Strength"
                    value={institution.staffStrength}
                    onChange={handleInstitutionStaffStrengthChange}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl className={classes.formControl}>
                  <MyTextField
                    id="rc_number"
                    type="text"
                    name="rc_number"
                    required="required"
                    label="RC Number"
                    placeholder="Enter RC Number"
                    value={institution.RCNumber}
                    onChange={handleInstitutionRCNumberChange}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl className={classes.formControl}>
                  <MyTextField
                    id="institution_email"
                    type="email"
                    name="institution_email"
                    required="required"
                    label="Institution email"
                    placeholder="Enter Institution email"
                    value={institution.email}
                    onChange={handleInstitutionEmailChange}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl className={classes.formControl}>
                  <MyTextField
                    id="institution_phone"
                    type="phone"
                    name="institution_phone"
                    required="required"
                    label="Institution Phone number"
                    placeholder="Enter Institution Phone number"
                    value={institution.name}
                    onChange={handleInstitutionPhoneChange}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl className={classes.formControl}>
                  <MyTextField
                    id="institution_address"
                    type="text"
                    name="institution_address"
                    required="required"
                    label="Institution Address"
                    placeholder="Enter Institution ddress"
                    value={institution.address}
                    onChange={handleInstitutionAddressChange}
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Typography
              variant="body1"
              component="p"
              className={classes.sectionHead}
            >
              Upload Documents
            </Typography>
            <Grid container spacing={3} style={{ padding: "15px" }}>
              <Grid
                item
                xs={12}
                md={6}
                style={{
                  border: `2px dashed ${Colors.appRed}`,
                  marginTop: "10px",
                }}
              >
                <AddProfileImage
                  image="/assets/images/icons/upload-image.png"
                  title="Upload photgraph*"
                  // text="This is image that will portray the cause."
                  style={{ alignSelf: "flex-start" }}
                  filename="image"
                  onClick={handleAddImageClick}
                  backgroundImage={uploadFiles.image}
                  setImage={(file) => {
                    setUploadFiles({
                      ...uploadFiles,
                      image: file,
                    });
                  }}
                />
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
                style={{
                  border: `2px dashed ${Colors.appRed}`,
                  marginTop: "10px",
                }}
              >
                <AddProfileImage
                  image="/assets/images/icons/upload-image.png"
                  title="Upload appliction letter*"
                  // text="This is image that will portray the cause."
                  style={{ alignSelf: "flex-start" }}
                  filename="image"
                  onClick={handleAddImageClick}
                  backgroundImage={uploadFiles.image}
                  setImage={(file) => {
                    setUploadFiles({
                      ...uploadFiles,
                      image: file,
                    });
                  }}
                />
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <div>
                  <Button
                    onClick={() => setPage(2)}
                    variant="contained"
                    color="default"
                    style={{
                      marginTop: "50px",
                      marginBottom: "100px",
                      padding: "10px 50px",
                    }}
                  >
                    Back
                  </Button>
                  <Button
                    onClick={() => {}}
                    variant="contained"
                    color="primary"
                    style={{
                      marginTop: "50px",
                      marginBottom: "100px",
                      marginLeft: "auto",
                      color: "white",
                      float: "right",
                      padding: "10px 50px",
                    }}
                  >
                    Signup
                  </Button>
                </div>
              </Grid>
            </Grid>
          </div>
        </Container>
      )}
      {page === 3 && selectedType === "Partner" && (
        <Container style={{ marginTop: "100px" }}>
          <Typography
            variant="h4"
            component="h4"
            className={classes.sectionHead}
            style={{ textAlign: "center" }}
          >
            Glad to have you as a partner
          </Typography>
          <Typography
            variant="body1"
            component="p"
            className={classes.sectionSubhead}
            style={{ width: "300px", textAlign: "center", margin: "auto" }}
          >
            Kindly select what category you are signing up for To finish your
            registration.
          </Typography>
          <Grid
            container
            spacing={5}
            justify="center"
            style={{ marginTop: "100px" }}
          >
            <Grid item xs={6} md={3}>
              <TypeSelection
                image={"/assets/images/icons/user-type.png"}
                type="Individual Partner"
                action={setPartnerType}
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <TypeSelection
                image={"/assets/images/icons/institution-type.png"}
                type="Institution Partner"
                action={setPartnerType}
              />
            </Grid>
          </Grid>
          {(partnerType !== undefined || partnerType !== "") && (
            <div>
              <Button
                onClick={() => setPage(2)}
                variant="contained"
                color="default"
                style={{
                  marginTop: "50px",
                  marginBottom: "100px",
                  padding: "10px 50px",
                }}
              >
                Back
              </Button>
              <Button
                onClick={() => setPage(4)}
                variant="contained"
                color="primary"
                style={{
                  marginTop: "50px",
                  marginBottom: "100px",
                  marginLeft: "auto",
                  color: "white",
                  float: "right",
                  padding: "10px 50px",
                }}
              >
                Continue
              </Button>
            </div>
          )}
        </Container>
      )}

      {page === 4 &&
        selectedType === "Partner" &&
        partnerType === "Individual Partner" && (
          <Container style={{ marginTop: "100px" }}>
            <Typography
              variant="h4"
              component="h4"
              className={classes.sectionHead}
              style={{ textAlign: "center" }}
            >
              Complete User Registration
            </Typography>
            <Typography
              variant="body1"
              component="p"
              className={classes.sectionSubhead}
              style={{ width: "300px", textAlign: "center", margin: "auto" }}
            >
              Kindly provide all neccesary details to finish Your registration
              as a user.
            </Typography>

            <div style={{ color: "red", textAlign: "center", margin: 16 }}>
              {errorMessage}
            </div>
            <div className={classes.regForm}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Grid
                    item
                    xs={12}
                    style={{
                      border: `2px dashed ${Colors.appRed}`,
                      marginTop: "10px",
                    }}
                  >
                    <AddProfileImage
                      image="/assets/images/icons/upload-image.png"
                      title="Upload picture*"
                      // text="This is image that will portray the cause."
                      style={{ alignSelf: "flex-start" }}
                      filename="image"
                      onClick={handleAddImageClick}
                      backgroundImage={uploadFiles.image}
                      setImage={(file) => {
                        setUploadFiles({
                          ...uploadFiles,
                          image: file,
                        });
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl
                    className={classes.formControl}
                    style={{ margin: "10px 0px" }}
                  >
                    <Select
                      labelId="gender-type"
                      id="gender"
                      value={user.gender}
                      onChange={handleGenderChange}
                      variant="outlined"
                      style={{ width: "100% !important" }}
                      // margin="dense"
                      fullWidth
                    >
                      <MenuItem value="Select Gender">Select Gender</MenuItem>
                      <MenuItem value="Male">Male</MenuItem>
                      <MenuItem value="Female">Female</MenuItem>
                      <MenuItem value="Other">Other</MenuItem>
                    </Select>
                  </FormControl>

                  <FormControl
                    className={classes.formControl}
                    style={{ margin: "10px 0px" }}
                  >
                    <Select
                      labelId="title-type"
                      id="title"
                      value={user.title}
                      onChange={handleTitleChange}
                      variant="outlined"
                      style={{ width: "100% !important" }}
                      // margin="dense"
                      fullWidth
                    >
                      <MenuItem value="Select Title">Select Title</MenuItem>
                      <MenuItem value="Mr.">Mr.</MenuItem>
                      <MenuItem value="Mrs.">Mrs.</MenuItem>
                      <MenuItem value="Miss">Miss</MenuItem>
                      <MenuItem value="Dr.">Dr.</MenuItem>
                      <MenuItem value="Prof.">Prof.</MenuItem>
                      <MenuItem value="Engr.">Engr.</MenuItem>
                      <MenuItem value="Pastor">Pastor</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl className={classes.formControl}>
                    <MyTextField
                      id="first_name"
                      type="text"
                      name="first_name"
                      required="required"
                      label="First name"
                      placeholder="Enter your first name"
                      value={user.firstName}
                      onChange={handleFirstNameChange}
                    />
                  </FormControl>

                  <FormControl className={classes.formControl}>
                    <MyTextField
                      id="last_name"
                      type="text"
                      name="last_name"
                      required="required"
                      label="Last name"
                      placeholder="Enter your last name"
                      value={user.lastName}
                      onChange={handleLastNameChange}
                    />
                  </FormControl>

                  <FormControl className={classes.formControl}>
                    <MyTextField
                      id="address"
                      type="text"
                      name="address"
                      required="required"
                      label="Address"
                      placeholder="Enter your address"
                      value={user.address}
                      onChange={handleAddressChange}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <div>
                    <Button
                      onClick={() => setPage(3)}
                      variant="contained"
                      color="default"
                      style={{
                        marginTop: "50px",
                        marginBottom: "100px",
                        padding: "10px 50px",
                      }}
                    >
                      Back
                    </Button>
                    <Button
                      onClick={() => alert("I wan submit")}
                      variant="contained"
                      color="primary"
                      style={{
                        marginTop: "50px",
                        marginBottom: "100px",
                        marginLeft: "auto",
                        color: "white",
                        float: "right",
                        padding: "10px 50px",
                      }}
                    >
                      Signup
                    </Button>
                  </div>
                </Grid>
              </Grid>
            </div>
          </Container>
        )}

      {page === 4 &&
        selectedType === "Partner" &&
        partnerType === "Institution Partner" && (
          <Container style={{ marginTop: "100px" }}>
            <Typography
              variant="h4"
              component="h4"
              className={classes.sectionHead}
              style={{ textAlign: "center" }}
            >
              Complete Institution Registration
            </Typography>
            <Typography
              variant="body1"
              component="p"
              className={classes.sectionSubhead}
              style={{ width: "300px", textAlign: "center", margin: "auto" }}
            >
              Kindly provide all neccesary details to finish Your registration
              as an Institution.
            </Typography>

            <div style={{ color: "red", textAlign: "center", margin: 16 }}>
              {errorMessage}
            </div>
            <div className={classes.regForm}>
              <Typography
                variant="body1"
                component="p"
                className={classes.sectionHead}
              >
                Contact User Information
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <FormControl className={classes.formControl}>
                    <Select
                      labelId="title-type"
                      id="title"
                      value={user.title}
                      onChange={handleTitleChange}
                      variant="outlined"
                      style={{ width: "100% !important" }}
                      // margin="dense"
                      fullWidth
                    >
                      <MenuItem value="Select Title">Select Title</MenuItem>
                      <MenuItem value="Mr.">Mr.</MenuItem>
                      <MenuItem value="Mrs.">Mrs.</MenuItem>
                      <MenuItem value="Miss">Miss</MenuItem>
                      <MenuItem value="Dr.">Dr.</MenuItem>
                      <MenuItem value="Prof.">Prof.</MenuItem>
                      <MenuItem value="Engr.">Engr.</MenuItem>
                      <MenuItem value="Pastor">Pastor</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl className={classes.formControl}>
                    <MyTextField
                      id="first_name"
                      type="text"
                      name="first_name"
                      required="required"
                      label="First name"
                      placeholder="Enter your first name"
                      value={user.firstName}
                      onChange={handleFirstNameChange}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl className={classes.formControl}>
                    <MyTextField
                      id="middle_name"
                      type="text"
                      name="middle_name"
                      required="required"
                      label="Middle name"
                      placeholder="Enter your middle name"
                      value={user.middleName}
                      onChange={handleMiddleNameChange}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl className={classes.formControl}>
                    <MyTextField
                      id="last_name"
                      type="text"
                      name="last_name"
                      required="required"
                      label="Last name"
                      placeholder="Enter your last name"
                      value={user.lastName}
                      onChange={handleLastNameChange}
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <Typography
                variant="body1"
                component="p"
                className={classes.sectionHead}
              >
                Institution Details
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <FormControl className={classes.formControl}>
                    <MyTextField
                      id="institution_name"
                      type="text"
                      name="institution_name"
                      required="required"
                      label="Name of Institution"
                      placeholder="Enter Name of Institution"
                      value={institution.name}
                      onChange={handleInstitutionNameChange}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl className={classes.formControl}>
                    <Select
                      labelId="institution-type"
                      id="institution-type"
                      value={institution.type}
                      onChange={handleInstitutionTypeChange}
                      variant="outlined"
                      style={{ width: "100% !important" }}
                      // margin="dense"
                      fullWidth
                    >
                      <MenuItem value="Select Institution Type">
                        Select Institution Type
                      </MenuItem>
                      <MenuItem value="Non-profit">Non-profit</MenuItem>
                      <MenuItem value="NGO">NGO</MenuItem>
                      <MenuItem value="Other">Other</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl className={classes.formControl}>
                    <MyTextField
                      id="staff_strength"
                      type="number"
                      min="0"
                      name="staff_strength"
                      required="required"
                      label="Staff Strength"
                      placeholder="Enter Staff Strength"
                      value={institution.staffStrength}
                      onChange={handleInstitutionStaffStrengthChange}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl className={classes.formControl}>
                    <MyTextField
                      id="rc_number"
                      type="text"
                      name="rc_number"
                      required="required"
                      label="RC Number"
                      placeholder="Enter RC Number"
                      value={institution.RCNumber}
                      onChange={handleInstitutionRCNumberChange}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl className={classes.formControl}>
                    <MyTextField
                      id="institution_email"
                      type="email"
                      name="institution_email"
                      required="required"
                      label="Institution email"
                      placeholder="Enter Institution email"
                      value={institution.email}
                      onChange={handleInstitutionEmailChange}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl className={classes.formControl}>
                    <MyTextField
                      id="institution_phone"
                      type="phone"
                      name="institution_phone"
                      required="required"
                      label="Institution Phone number"
                      placeholder="Enter Institution Phone number"
                      value={institution.name}
                      onChange={handleInstitutionPhoneChange}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl className={classes.formControl}>
                    <MyTextField
                      id="institution_address"
                      type="text"
                      name="institution_address"
                      required="required"
                      label="Institution Address"
                      placeholder="Enter Institution ddress"
                      value={institution.address}
                      onChange={handleInstitutionAddressChange}
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <Typography
                variant="body1"
                component="p"
                className={classes.sectionHead}
              >
                Upload Documents
              </Typography>
              <Grid container spacing={3} style={{ padding: "15px" }}>
                <Grid
                  item
                  xs={12}
                  md={6}
                  style={{
                    border: `2px dashed ${Colors.appRed}`,
                    marginTop: "10px",
                  }}
                >
                  <AddProfileImage
                    image="/assets/images/icons/upload-image.png"
                    title="Upload photgraph*"
                    // text="This is image that will portray the cause."
                    style={{ alignSelf: "flex-start" }}
                    filename="image"
                    onClick={handleAddImageClick}
                    backgroundImage={uploadFiles.image}
                    setImage={(file) => {
                      setUploadFiles({
                        ...uploadFiles,
                        image: file,
                      });
                    }}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={6}
                  style={{
                    border: `2px dashed ${Colors.appRed}`,
                    marginTop: "10px",
                  }}
                >
                  <AddProfileImage
                    image="/assets/images/icons/upload-image.png"
                    title="Upload appliction letter*"
                    // text="This is image that will portray the cause."
                    style={{ alignSelf: "flex-start" }}
                    filename="image"
                    onClick={handleAddImageClick}
                    backgroundImage={uploadFiles.image}
                    setImage={(file) => {
                      setUploadFiles({
                        ...uploadFiles,
                        image: file,
                      });
                    }}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <div>
                    <Button
                      onClick={() => setPage(3)}
                      variant="contained"
                      color="default"
                      style={{
                        marginTop: "50px",
                        marginBottom: "100px",
                        padding: "10px 50px",
                      }}
                    >
                      Back
                    </Button>
                    <Button
                      onClick={() => {}}
                      variant="contained"
                      color="primary"
                      style={{
                        marginTop: "50px",
                        marginBottom: "100px",
                        marginLeft: "auto",
                        color: "white",
                        float: "right",
                        padding: "10px 50px",
                      }}
                    >
                      Signup
                    </Button>
                  </div>
                </Grid>
              </Grid>
            </div>
          </Container>
        )}
        {page === 3 && selectedType === "Volunteer" && (
         <Container style={{ marginTop: "100px" }}>
         <Grid item xs={12} md={6}>
           <Typography
             variant="h4"
             component="h4"
             className={classes.sectionHead}
           >
             What Category are you interested in?
           </Typography>
           <Typography
             variant="body1"
             component="p"
             className={classes.sectionSubhead}
             style={{ width: "300px" }}
           >
             Kindly select what category you are signing up for To finish your
             registration.
           </Typography>
         </Grid>
         <Grid container spacing={5} style={{ marginTop: "100px" }}>
           <Grid item xs={6} md={3} onClick={()=>setVolunteer({
             ...volunteer,
             category:'Food'
           })}>
             <TypeSelection
               image={"/assets/images/icons/food-help.png"}
               type="Food"
                action={setVolunteerType}
             />
           </Grid>
           <Grid item xs={6} md={3} onClick={()=>setVolunteer({
             ...volunteer,
             category:'Education'
           })}>
             <TypeSelection
               image={"/assets/images/icons/education-help.png"}
               type="Education"
               action={setVolunteerType}
             />
           </Grid>
           <Grid item xs={6} md={3} onClick={()=>setVolunteer({
             ...volunteer,
             category:'Health'
           })}>
             <TypeSelection
               image={"/assets/images/icons/health-help.png"}
               type="Health"
               action={setVolunteerType}
             />
           </Grid>
           <Grid item xs={6} md={3} onClick={()=>setVolunteer({
             ...volunteer,
             category:'Human right'
           })}>
             <TypeSelection
               image={"/assets/images/icons/human-rights-help.png"}
               type="Human right"
               action={setVolunteerType}
             />
           </Grid>
         </Grid>
         {(volunteerType !== undefined || volunteerType  !== "") && (
           <div>
             <Button
               onClick={() => setPage(2)}
               variant="contained"
               color="default"
               style={{
                 marginTop: "100px",
                 marginBottom: "100px",
               }}
             >
               Back
             </Button>
             <Button
               onClick={() =>setPage(4) }
               variant="contained"
               color="primary"
               style={{
                 marginTop: "100px",
                 marginBottom: "100px",
                 marginLeft: "auto",
                 color: "white",
                 float: "right",
               }}
             >
               Continue
             </Button>
           </div>
         )}
       </Container>
      )}
      {page === 4 &&
        selectedType === "Volunteer" && (
          <Container style={{ marginTop: "100px" }}>
            <Typography
              variant="h4"
              component="h4"
              className={classes.sectionHead}
              style={{ textAlign: "center" }}
            >
              Complete Volunteer Registration
            </Typography>
            <Typography
              variant="body1"
              component="p"
              className={classes.sectionSubhead}
              style={{ width: "300px", textAlign: "center", margin: "auto" }}
            >
              Kindly provide all neccesary details to finish Your registration
              as a volunteer.
            </Typography>

            <div style={{ color: "red", textAlign: "center", margin: 16 }}>
              {errorMessage}
            </div>
            <div className={classes.regForm}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Grid
                    item
                    xs={12}
                    style={{
                      border: `2px dashed ${Colors.appRed}`,
                      marginTop: "10px",
                    }}
                  >
                    <AddProfileImage
                      image="/assets/images/icons/upload-image.png"
                      title="Upload picture*"
                      // text="This is image that will portray the cause."
                      style={{ alignSelf: "flex-start" }}
                      filename="image"
                      onClick={handleAddImageClick}
                      backgroundImage={uploadFiles.image}
                      setImage={(file) => {
                        setUploadFiles({
                          ...uploadFiles,
                          image: file,
                        });
                      }}
                    />
                  </Grid>
                  <FormControl
                    className={classes.formControl}
                    style={{ margin: "10px 0px" }}
                  >
                    <Select
                      labelId="gender-type"
                      id="gender"
                      value={volunteer.gender}
                      onChange={handleChangeVolunteer("gender")}
                      variant="outlined"
                      style={{ width: "100% !important" }}
                      // margin="dense"
                      fullWidth
                    >
                      <MenuItem value="Select Gender">Select Gender</MenuItem>
                      <MenuItem value="Male">Male</MenuItem>
                      <MenuItem value="Female">Female</MenuItem>
                      <MenuItem value="Other">Other</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl className={classes.formControl}>
                    <MyTextField
                      id="phone_number"
                      type="phone"
                      name="phone_number"
                      required="required"
                      label="Phone Number"
                      placeholder="Provide Phone Number"
                      value={volunteer.phone_number}
                      onChange={handleChangeVolunteer("phone_number")}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                <FormControl
                  className={classes.formControl}
                  style={{ margin: "10px 0px" }}
                >
                  <Select
                    labelId="title-type"
                    id="title"
                    value={volunteer.title}
                    onChange={handleChangeVolunteer("title")}
                    variant="outlined"
                    style={{ width: "100% !important" }}
                    // margin="dense"
                    fullWidth
                  >
                    <MenuItem value="Select Title">Select Title</MenuItem>
                    <MenuItem value="Mr.">Mr.</MenuItem>
                    <MenuItem value="Mrs.">Mrs.</MenuItem>
                    <MenuItem value="Miss">Miss</MenuItem>
                    <MenuItem value="Dr.">Dr.</MenuItem>
                    <MenuItem value="Prof.">Prof.</MenuItem>
                    <MenuItem value="Engr.">Engr.</MenuItem>
                    <MenuItem value="Pastor">Pastor</MenuItem>
                  </Select>
                </FormControl>
                  <FormControl className={classes.formControl}>
                    <MyTextField
                      id="first_name"
                      type="text"
                      name="first_name"
                      required="required"
                      label="First name"
                      placeholder="Enter your first name"
                      value={volunteer.first_name}
                      onChange={handleChangeVolunteer("first_name")}
                    />
                  </FormControl>

                  <FormControl className={classes.formControl}>
                    <MyTextField
                      id="last_name"
                      type="text"
                      name="last_name"
                      required="required"
                      label="Last name"
                      placeholder="Enter your last name"
                      value={volunteer.last_name}
                      onChange={handleChangeVolunteer("last_name")}
                    />
                  </FormControl>
                  <FormControl className={classes.formControl}>
                  <MyTextField
                    id="dob"
                    type="date"
                    name="dob"
                    required="required"
                    label="Date of birth"
                    placeholder="Enter your date of birth"
                    value={volunteer.date_of_birth}
                    onChange={handleChangeVolunteer("date_of_birth")}
                  />
                </FormControl>
                  <FormControl className={classes.formControl}>
                    <MyTextField
                      id="Address"
                      type="text"
                      name="Address"
                      required="required"
                      label="Address"
                      placeholder="Provide Address"
                      value={volunteer.address}
                      onChange={handleChangeVolunteer("address")}
                    />
                  </FormControl>
                  <FormControl className={classes.formControl}>
                    <MyTextField
                      id="lga"
                      type="text"
                      name="lga"
                      required="required"
                      label="LGA"
                      placeholder="Provide LGA"
                      value={volunteer.local_govt}
                      onChange={handleChangeVolunteer("local_govt")}
                    />
                  </FormControl>
                  <FormControl className={classes.formControl}>
                    <MyTextField
                      id="state"
                      type="text"
                      name="state"
                      required="required"
                      label="State"
                      placeholder="Provide State"
                      value={volunteer.state}
                      onChange={handleChangeVolunteer("state")}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <div>
                    <Button
                      onClick={() => setPage(3)}
                      variant="contained"
                      color="default"
                      style={{
                        marginTop: "50px",
                        marginBottom: "100px",
                        padding: "10px 50px",
                      }}
                    >
                      Back
                    </Button>
                    <Button
                      onClick={() => handleVolunteerPageClick()}
                      variant="contained"
                      color="primary"
                      style={{
                        marginTop: "50px",
                        marginBottom: "100px",
                        marginLeft: "auto",
                        color: "white",
                        float: "right",
                        padding: "10px 50px",
                      }}
                    >
                      Next
                    </Button>
                  </div>
                </Grid>
              </Grid>
            </div>
          </Container>
        )}
        {page === 5 &&
        selectedType === "Volunteer" && (
        <Container style={{ marginTop: "100px" }}>
          <Typography
            variant="h4"
            component="h4"
            className={classes.sectionHead}
            style={{ textAlign: "center" }}
          >
            Complete Volunteer Registration
          </Typography>
          <Typography
            variant="body1"
            component="p"
            className={classes.sectionSubhead}
            style={{ width: "300px", textAlign: "center", margin: "auto" }}
          >
            Kindly provide all neccesary details to finish Your registration as
            a volunteer.
          </Typography>

          <div style={{ color: "red", textAlign: "center", margin: 16 }}>
            {errorMessage}
          </div>
          <div className={classes.regForm}>
            <Typography
              variant="body1"
              component="p"
              className={classes.sectionHead}
            >
              More Personal Details
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
              <FormControl className={classes.formControl}>
                  <MyTextField
                    id=" eduction_level"
                    type="text"
                    name="eduction_level"
                    required="required"
                    label=" Eduction Level"
                    placeholder="Enter your highest Education Level"
                    value={volunteer.eduction_level}
                    onChange={handleChangeVolunteer("highest_education_level")}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
              <FormControl className={classes.formControl}>
                  <Select
                    labelId="employment_status"
                    id="employment_status"
                    value={volunteer.employment_status}
                    onChange={handleChangeVolunteer("employment_status")}
                    variant="outlined"
                    style={{ width: "100% !important" }}
                    // margin="dense"
                    fullWidth
                  >
                    <MenuItem value="What is your employment status">What is your employment status</MenuItem>
                    <MenuItem value="Employed">Employed</MenuItem>
                    <MenuItem value="Unemployed">Unemployed</MenuItem>
                    <MenuItem value="Self Employed">Self Employed</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Typography
              variant="body1"
              component="p"
              className={classes.sectionHead}
            >
              Guarantor Details
            </Typography>
            <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
                <FormControl className={classes.formControl}>
                <FormControl className={classes.formControl}>
                  <MyTextField
                    id="guarantor_first_name"
                    type="text"
                    name="guarantor_first_name"
                    required="required"
                    label="First name"
                    placeholder="Enter your guarantor's first name"
                    value={volunteer.guarantor_name}
                    onChange={handleChangeVolunteer("guarantor_name")}
                  />
                </FormControl>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl className={classes.formControl}>
                  <MyTextField
                    id="guarantor_last_name"
                    type="text"
                    name="guarantor_last_name"
                    required="required"
                    label="Last name"
                    placeholder="Enter your guarantor's last name"
                    value={volunteer.guarantor_last_name}
                    onChange={handleChangeVolunteer("guarantor_last_name")}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
              <FormControl className={classes.formControl}>
                  <Select
                    labelId="relationship_with_guarantor"
                    id="relationship_with_guarantor"
                    value={volunteer.relationship_with_guarantor}
                    onChange={handleChangeVolunteer("relationship_with_guarantor")}
                    variant="outlined"
                    style={{ width: "100% !important" }}
                    // margin="dense"
                    fullWidth
                  >
                    <MenuItem value="Relationship With Guarantor">How are you related to this person</MenuItem>
                    <MenuItem value="Employer">Employer</MenuItem>
                    <MenuItem value="Family">Family</MenuItem>
                    <MenuItem value="Others">Others</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl className={classes.formControl}>
                  <MyTextField
                    id="guarantor_email"
                    type="email"
                    name="guarantor_email"
                    required="required"
                    label=" Email Address"
                    placeholder="Provide email address"
                    value={volunteer.guarantor_email}
                    onChange={handleChangeVolunteer("guarantor_email")}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl className={classes.formControl}>
                  <MyTextField
                    id="guarantor_phone_number"
                    type="phone"
                    name="phone_number"
                    required="required"
                    label=" Phone number"
                    placeholder="Provide Phone number"
                    value={volunteer.guarantor_phone_number}
                    onChange={handleChangeVolunteer("guarantor_phone_number")}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl className={classes.formControl}>
                  <MyTextField
                    id="guarantor's_address"
                    type="text"
                    name="guarantor's_address"
                    required="required"
                    label="Guarantor's Address"
                    placeholder="Provide guarantor's address"
                    value={volunteer.guarantor_address}
                    onChange={handleChangeVolunteer("guarantor_address")}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl className={classes.formControl}>
                  <MyTextField
                    id="guarantor_position"
                    type="text"
                    name="position"
                    required="required"
                    label="Position"
                    placeholder="What is this persons position"
                    value={volunteer.guarantor_position}
                    onChange={handleChangeVolunteer("guarantor_position")}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl className={classes.formControl}>
                  <MyTextField
                    id="guarantor_work_details"
                    type="text"
                    name="work_details"
                    required="required"
                    label="Work Details"
                    placeholder="What type of work does this person do"
                    value={volunteer.guarantor_company}
                    onChange={handleChangeVolunteer("guarantor_company")}
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <div>
                  <Button
                    onClick={() => setPage(4)}
                    variant="contained"
                    color="default"
                    style={{
                      marginTop: "50px",
                      marginBottom: "100px",
                      padding: "10px 50px",
                    }}
                  >
                    Back
                  </Button>
                  <Button
                    onClick={() => handleVolunteerPageClick()}
                    variant="contained"
                    color="primary"
                    style={{
                      marginTop: "50px",
                      marginBottom: "100px",
                      marginLeft: "auto",
                      color: "white",
                      float: "right",
                      padding: "10px 50px",
                    }}
                  >
                    Next
                  </Button>
                </div>
              </Grid>
            </Grid>
          </div>
        </Container>
      )}
       {page === 6 &&
        selectedType === "Volunteer" && (
        <Container style={{ marginTop: "100px" }}>
          <Typography
            variant="h4"
            component="h4"
            className={classes.sectionHead}
            style={{ textAlign: "center" }}
          >
            Just some Extra Information and we are good
          </Typography>
          <Typography
            variant="body1"
            component="p"
            className={classes.sectionSubhead}
            style={{ width: "300px", textAlign: "center", margin: "auto" }}
          >
            Kindly provide all neccesary details to finish Your registration as
            a volunteer.
          </Typography>

          <div style={{ color: "red", textAlign: "center", margin: 16 }}>
            {errorMessage}
          </div>
          <div className={classes.regForm} >
           <Grid container spacing={3} >
             <Grid item xs={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Do you belong to any social or religious group?</FormLabel>
                  <RadioGroup aria-label="group" name="religious_group" 
                  value={volunteer.religious_group} 
                  onChange={handleChangeVolunteer("religious_group")}>
                    <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                    <FormControlLabel value="No" control={<Radio />} label="No" />
                  </RadioGroup>
              </FormControl>
             </Grid>
             <Grid item xs={12} md={6}>
                <FormControl className={classes.formControl}>
                  <MyTextField
                    id="religious_group_name"
                    type="text"
                    name="religious_group_name"
                    required="required"
                    label="Provide groups name"
                    placeholder="If yes provide groups name"
                    value={volunteer.religion}
                    onChange={handleChangeVolunteer("religion")}
                  />
                </FormControl>
              </Grid>
             <Grid item xs={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Are you above 18 years of age?</FormLabel>
                  <RadioGroup aria-label="age" name="above_18"
                  value={volunteer.above_18} 
                  onChange={handleChangeVolunteer("above_18")}
                   >
                    <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                    <FormControlLabel value="No" control={<Radio />} label="No" />
                  </RadioGroup>
              </FormControl>
             </Grid>
             <Grid item xs={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Have you been involved in any criminal activities?</FormLabel>
                  <RadioGroup aria-label="criminal record" name="criminal_record" 
                  value={volunteer.criminal_record} 
                  onChange={handleChangeVolunteer("criminal_record")}
                  >
                    <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                    <FormControlLabel value="No" control={<Radio />} label="No" />
                  </RadioGroup>
              </FormControl>
             </Grid>
             <Grid item xs={12}>
             <TermsAndCondition />
             </Grid>
             <Grid item xs={12}>
              <FormControl component="fieldset">
                  <RadioGroup aria-label="agreed" name="agreed"
                  value={volunteer.agreed} 
                  onChange={handleChangeVolunteer("agreed")}
                  >
                    <FormControlLabel value="yes" control={<Radio />} label="Agree to Terms and Conditions." />
                  </RadioGroup>
              </FormControl>
             </Grid>
           </Grid>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <div>
                  <Button
                    onClick={() => setPage(5)}
                    variant="contained"
                    color="default"
                    style={{
                      marginTop: "50px",
                      marginBottom: "100px",
                      padding: "10px 50px",
                    }}
                  >
                    Back
                  </Button>
                  <Button
                    onClick={() => handleVolunteerSubmit()}
                    variant="contained"
                    color="primary"
                    style={{
                      marginTop: "50px",
                      marginBottom: "100px",
                      marginLeft: "auto",
                      color: "white",
                      float: "right",
                      padding: "10px 50px",
                    }}
                  >
                    Signup
                  </Button>
                </div>
              </Grid>
            </Grid>
          </div>
        </Container>
      )}

      {/* <div className={classes.copyright}>
          <Container>
            <p>Copyright &copy; 2020 | All Rights Reserved | QCare.org</p>
          </Container>
        </div> */}
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    userId : state.signup.userId,
    errorMsg: state.signup.error 
  }
};

const mapDispatchToProps = dispatch => {
  return {
    signUpUser: (reg_credential,email,phone_number,password,first_name,last_name,role,address,date_of_birth,local_govt,state,title,staff_strength,photo,category,company,position,religion,guarantor_name,relationship_with_guarantor,guarantor_address,guarantor_company,guarantor_position,highest_education_level,criminal_record) => dispatch(actionCreators.authSignUp(reg_credential,email,phone_number,password,first_name,last_name,role,address,date_of_birth,local_govt,state,title,staff_strength,photo,category,company,position,religion,guarantor_name,relationship_with_guarantor,guarantor_address,guarantor_company,guarantor_position,highest_education_level,criminal_record))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Signup);
