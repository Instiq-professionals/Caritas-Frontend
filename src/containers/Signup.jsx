import React, { Fragment, useState } from "react";
// import ReactDom from "react-dom";
import clsx from "clsx";
import {
  Grid,
  Container,
  TextField,
  FormControl,
  Radio,
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
  isValidPhoneNumber
} from "../helpers/validator";
import { MyButton, MyDialog } from "../components";
import ReCAPTCHA from "react-google-recaptcha";
import { AddProfileImage } from "../components";
import { getToken } from "../helpers/utils";

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

const Signup = () => {
  const classes = useStyles();
  let [user, setUser] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "abc@gmail.com",
    phone: "",
    accountType: "",
    address: "",
    bankName: "",
    accountName: "",
    accountNumber: "",
    password: "123456",
    confirmPassword: "123456",
    dateOfBirth: "",
    title: "Select Title",
    gender: "Select Gender",
    dob: ""
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

  let [volunteer, setVolunteer] = useState('');

  const handleSubmit = async (event) => {

   
    if (event) event.preventDefault();

    progress === false ? setProgress(true) : setProgress(progress);

    if (validateSignup()) {
      //Here we submit shit...

      // if (!verified) {
      //   setDialogTitle("Hold on!");
      //   setDialogMessage("Please verify you are human");

      //   setPositiveDialog(false);

      //   setOpenDialog(true);

      //   return;
      // }
      console.log("Sending...");

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
            ? "Email is already taken"
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
    // if (user.bankName === "Select Bank") {
    //   setErrorMessage("Please select your bank");
    //   setProgress(false);
    //   return;
    // }
    // if (user.accountName === "") {
    //   setErrorMessage("Your account name is empty");
    //   setProgress(false);
    //   return;
    // }
    // if (user.accountNumber === "") {
    //   setErrorMessage("Your account number is empty");
    //   setProgress(false);
    //   return;
    // }
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
              {/* <Grid container spacing={3}>
                    <Grid item xs={6}>
                      <FormControl className={classes.formControl}>
                        <MyTextField
                          id="first_name"
                          type="text"
                          name="first_name"
                          required="required"
                          label="First name"
                          placeholder="Enter your first name"
                          value={firstName}
                          onChange={handleFirstNameChange}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                      <FormControl className={classes.formControl}>
                        <MyTextField
                          id="last_name"
                          type="text"
                          name="last_name"
                          required="required"
                          label="Last name"
                          placeholder="Enter your last name"
                          value={lastName}
                          onChange={handleLastNameChange}
                        />
                      </FormControl>
                    </Grid>
                  </Grid> */}
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
              {/* <FormControl className={classes.formControl}>
                <MyTextField
                  id="address"
                  type="text"
                  name="address"
                  required="required"
                  label="Address"
                  placeholder="Enter your address"
                  value={address}
                  onChange={handleAddressChange}
                />
              </FormControl>

              <FormControl
                className={classes.formControl}
                style={{ marginBottom: "20px" }}
              >
                <Select
                  labelId="bank-name"
                  id="bank-name"
                  value={bankName}
                  onChange={handleBankNameChange}
                  variant="outlined"
                  style={{ width: "100% !important" }}
                  // margin="dense"
                  fullWidth
                >
                  <MenuItem value="Select Bank">Select Bank</MenuItem>
                  <MenuItem value="UBA">UBA</MenuItem>
                  <MenuItem value="GT Bank">GT Bank</MenuItem>
                  <MenuItem value="Zenith">Zenith</MenuItem>
                  <MenuItem value="First Bank">First Bank</MenuItem>
                  <MenuItem value="Keystone Bank">Keystone Bank</MenuItem>
                  <MenuItem value="Access Bank">Access Bank</MenuItem>
                  <MenuItem value="FCMB">FCMB</MenuItem>
                  <MenuItem value="Fidelity">Fidelity</MenuItem>
                  <MenuItem value="Polaris">Polaris</MenuItem>
                  <MenuItem value="Eko Bank">Eko Bank</MenuItem>
                  <MenuItem value="Wema Bank">Wema Bank</MenuItem>
                  <MenuItem value="Heritage Bank">Heritage Bank</MenuItem>
                  <MenuItem value="Sterling Bank">Sterling Bank</MenuItem>
                  <MenuItem value="Standard Chartered Bank">
                    Standard Chartered Bank
                  </MenuItem>
                  <MenuItem value="Stanbic IBTC">Stanbic IBTC Bank</MenuItem>
                  <MenuItem value="Titan Bank">Titan Bank</MenuItem>
                  <MenuItem value="Unity Bank">Unity Bank</MenuItem>
                  <MenuItem value="Union Bank">Union Bank</MenuItem>
                </Select>
              </FormControl>
              <FormControl className={classes.formControl}>
                <MyTextField
                  id="account-name"
                  type="text"
                  name="account_name"
                  required="required"
                  label="Account Name"
                  placeholder="Enter your account name"
                  value={accountName}
                  onChange={handleAccountNameChange}
                />
              </FormControl>

              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <FormControl className={classes.formControl}>
                    <MyTextField
                      id="account_number"
                      type="number"
                      name="account_number"
                      required="required"
                      label="Account Number"
                      placeholder="Enter you account number"
                      value={accountNumber}
                      onChange={handleAccountNumberChange}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl className={classes.formControl}>
                    <Select
                      labelId="account-type"
                      id="acount-type"
                      value={accountType}
                      onChange={handleAccountTypeChange}
                      variant="outlined"
                      style={{ width: "100% !important" }}
                      // margin="dense"
                      fullWidth
                    >
                      <MenuItem value="Savings">Savings</MenuItem>
                      <MenuItem value="Current">Current</MenuItem>
                      <MenuItem value="Other">Other</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid> */}
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
              {/* <FormControl
                className={clsx(classes.formControl, classes.recaptcha)}
              >
                <ReCAPTCHA sitekey={recaptchaKey} onChange={onRecaptcha} />
              </FormControl> */}
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
                {/* <Link to="/dashboard">
                  <MyButton progress={progress} style={{ margin: "100px 0px" }}>
                    Sign up
                  </MyButton>
                </Link> */}
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

          {/* <FormControl
            className={classes.formControl}
            style={{ marginBottom: "20px" }}
          >
            <Select
              labelId="bank-name"
              id="bank-name"
              value={bankName}
              onChange={handleBankNameChange}
              variant="outlined"
              style={{ width: "100% !important" }}
              // margin="dense"
              fullWidth
            >
              <MenuItem value="Select Bank">Select Bank</MenuItem>
              <MenuItem value="UBA">UBA</MenuItem>
              <MenuItem value="GT Bank">GT Bank</MenuItem>
              <MenuItem value="Zenith">Zenith</MenuItem>
              <MenuItem value="First Bank">First Bank</MenuItem>
              <MenuItem value="Keystone Bank">Keystone Bank</MenuItem>
              <MenuItem value="Access Bank">Access Bank</MenuItem>
              <MenuItem value="FCMB">FCMB</MenuItem>
              <MenuItem value="Fidelity">Fidelity</MenuItem>
              <MenuItem value="Polaris">Polaris</MenuItem>
              <MenuItem value="Eko Bank">Eko Bank</MenuItem>
              <MenuItem value="Wema Bank">Wema Bank</MenuItem>
              <MenuItem value="Heritage Bank">Heritage Bank</MenuItem>
              <MenuItem value="Sterling Bank">Sterling Bank</MenuItem>
              <MenuItem value="Standard Chartered Bank">
                Standard Chartered Bank
              </MenuItem>
              <MenuItem value="Stanbic IBTC">Stanbic IBTC Bank</MenuItem>
              <MenuItem value="Titan Bank">Titan Bank</MenuItem>
              <MenuItem value="Unity Bank">Unity Bank</MenuItem>
              <MenuItem value="Union Bank">Union Bank</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <MyTextField
              id="account-name"
              type="text"
              name="account_name"
              required="required"
              label="Account Name"
              placeholder="Enter your account name"
              value={accountName}
              onChange={handleAccountNameChange}
            />
          </FormControl>

          <Grid container spacing={3}>
            <Grid item xs={6}>
              <FormControl className={classes.formControl}>
                <MyTextField
                  id="account_number"
                  type="number"
                  name="account_number"
                  required="required"
                  label="Account Number"
                  placeholder="Enter your account number"
                  value={accountNumber}
                  onChange={handleAccountNumberChange}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl className={classes.formControl}>
                <Select
                  labelId="account-type"
                  id="acount-type"
                  value={accountType}
                  onChange={handleAccountTypeChange}
                  variant="outlined"
                  style={{ width: "100% !important" }}
                  // margin="dense"
                  fullWidth
                >
                  <MenuItem value="Savings">Savings</MenuItem>
                  <MenuItem value="Current">Current</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
           */}
          {/* <FormControl
                className={clsx(classes.formControl, classes.recaptcha)}
              >
                <ReCAPTCHA sitekey={recaptchaKey} onChange={onRecaptcha} />
              </FormControl> */}
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
                {/* <Link to="/dashboard">
                  <MyButton progress={progress} style={{ margin: "100px 0px" }}>
                    Sign up
                  </MyButton>
                </Link> */}
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
                  {/* <Link to="/dashboard">
                  <MyButton progress={progress} style={{ margin: "100px 0px" }}>
                    Sign up
                  </MyButton>
                </Link> */}
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

            {/* <FormControl
            className={classes.formControl}
            style={{ marginBottom: "20px" }}
          >
            <Select
              labelId="bank-name"
              id="bank-name"
              value={bankName}
              onChange={handleBankNameChange}
              variant="outlined"
              style={{ width: "100% !important" }}
              // margin="dense"
              fullWidth
            >
              <MenuItem value="Select Bank">Select Bank</MenuItem>
              <MenuItem value="UBA">UBA</MenuItem>
              <MenuItem value="GT Bank">GT Bank</MenuItem>
              <MenuItem value="Zenith">Zenith</MenuItem>
              <MenuItem value="First Bank">First Bank</MenuItem>
              <MenuItem value="Keystone Bank">Keystone Bank</MenuItem>
              <MenuItem value="Access Bank">Access Bank</MenuItem>
              <MenuItem value="FCMB">FCMB</MenuItem>
              <MenuItem value="Fidelity">Fidelity</MenuItem>
              <MenuItem value="Polaris">Polaris</MenuItem>
              <MenuItem value="Eko Bank">Eko Bank</MenuItem>
              <MenuItem value="Wema Bank">Wema Bank</MenuItem>
              <MenuItem value="Heritage Bank">Heritage Bank</MenuItem>
              <MenuItem value="Sterling Bank">Sterling Bank</MenuItem>
              <MenuItem value="Standard Chartered Bank">
                Standard Chartered Bank
              </MenuItem>
              <MenuItem value="Stanbic IBTC">Stanbic IBTC Bank</MenuItem>
              <MenuItem value="Titan Bank">Titan Bank</MenuItem>
              <MenuItem value="Unity Bank">Unity Bank</MenuItem>
              <MenuItem value="Union Bank">Union Bank</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <MyTextField
              id="account-name"
              type="text"
              name="account_name"
              required="required"
              label="Account Name"
              placeholder="Enter your account name"
              value={accountName}
              onChange={handleAccountNameChange}
            />
          </FormControl>

          <Grid container spacing={3}>
            <Grid item xs={6}>
              <FormControl className={classes.formControl}>
                <MyTextField
                  id="account_number"
                  type="number"
                  name="account_number"
                  required="required"
                  label="Account Number"
                  placeholder="Enter your account number"
                  value={accountNumber}
                  onChange={handleAccountNumberChange}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl className={classes.formControl}>
                <Select
                  labelId="account-type"
                  id="acount-type"
                  value={accountType}
                  onChange={handleAccountTypeChange}
                  variant="outlined"
                  style={{ width: "100% !important" }}
                  // margin="dense"
                  fullWidth
                >
                  <MenuItem value="Savings">Savings</MenuItem>
                  <MenuItem value="Current">Current</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
           */}
            {/* <FormControl
                className={clsx(classes.formControl, classes.recaptcha)}
              >
                <ReCAPTCHA sitekey={recaptchaKey} onChange={onRecaptcha} />
              </FormControl> */}
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
                  {/* <Link to="/dashboard">
                  <MyButton progress={progress} style={{ margin: "100px 0px" }}>
                    Sign up
                  </MyButton>
                </Link> */}
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
           <Grid item xs={6} md={3} >
             <TypeSelection
               image={"/assets/images/icons/food-help.png"}
               type="Food"
                action={setVolunteerType}
             />
           </Grid>
           <Grid item xs={6} md={3}>
             <TypeSelection
               image={"/assets/images/icons/education-help.png"}
               type="Education"
               action={setVolunteerType}
             />
           </Grid>
           <Grid item xs={6} md={3}>
             <TypeSelection
               image={"/assets/images/icons/health-help.png"}
               type="Health"
               action={setVolunteerType}
             />
           </Grid>
           <Grid item xs={6} md={3}>
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
               onClick={() => setPage(4)}
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
        selectedType === "Volunteer" &&
        volunteerType=== "Food" && (
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
                      id="email"
                      type="email"
                      name="email"
                      required="required"
                      label="Provide Email"
                      placeholder="Provide Email"
                      value={volunteer.email}
                      onChange={handleChangeVolunteer("email")}
                    />
                  </FormControl>
                  <FormControl className={classes.formControl}>
                    <MyTextField
                      id="state"
                      type="text"
                      name="state"
                      required="required"
                      label="Provide State"
                      placeholder="Provide State"
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
                      value={volunteer.lga}
                      onChange={handleChangeVolunteer("lga")}
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
                      onClick={() => setPage(5)}
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
        selectedType === "Volunteer" &&
        volunteerType=== "Food" && (
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
                    placeholder="Enter your highest Eduction Level"
                    value={volunteer.eduction_level}
                    onChange={handleChangeVolunteer("eduction_level")}
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
                    <MenuItem value="Select Title">What is your employment status</MenuItem>
                    <MenuItem value="Mr.">Employed</MenuItem>
                    <MenuItem value="Mrs.">Unemployed.</MenuItem>
                    <MenuItem value="Miss">Self Employed</MenuItem>
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
                    value={volunteer.guarantor_first_name}
                    onChange={handleChangeVolunteer("guarantor_first_name")}
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
                    <MenuItem value="Select Title">Relationship With Guarantor</MenuItem>
                    <MenuItem value="Mr.">Employer</MenuItem>
                    <MenuItem value="Mrs.">Family</MenuItem>
                    <MenuItem value="Miss">Others</MenuItem>
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
                    placeholder="Provide Phone Number"
                    value={volunteer.guarantor_address}
                    onChange={handleChangeVolunteer("guarantor's_address")}
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
                    value={volunteer.guarantor_work_details}
                    onChange={handleChangeVolunteer("guarantor_work_details")}
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                {/* <Link to="/dashboard">
                  <MyButton progress={progress} style={{ margin: "100px 0px" }}>
                    Sign up
                  </MyButton>
                </Link> */}
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
                    onClick={() => setPage(6)}
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
        selectedType === "Volunteer" &&
        volunteerType=== "Food" && (
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
                    value={volunteer.religious_group_name}
                    onChange={handleChangeVolunteer("religious_group_name")}
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
                {/* <Link to="/dashboard">
                  <MyButton progress={progress} style={{ margin: "100px 0px" }}>
                    Sign up
                  </MyButton>
                </Link> */}
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

      {/* <div className={classes.copyright}>
          <Container>
            <p>Copyright &copy; 2020 | All Rights Reserved | QCare.org</p>
          </Container>
        </div> */}
    </Fragment>
  );
};

export default Signup;
