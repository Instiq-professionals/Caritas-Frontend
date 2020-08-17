import React, { Fragment, useState } from "react";
// import ReactDom from "react-dom";
import clsx from "clsx";
import {
  Grid,
  Container,
  TextField,
  FormControl,
  Typography,
  Button,
  Zoom,
  Select,
  MenuItem,
  Avatar,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { PrimaryAppBar, MyTextField } from "../commons";
import { Link } from "react-router-dom";
import { Colors, recaptchaKey, baseUrl } from "../constants";
import { registerUser } from "../services/user.service";
import {
  isValidFirstName,
  isValidLastName,
  isValidEmail,
  isValidPassword,
} from "../helpers/validator";
import { MyButton, MyDialog } from "../components";
import ReCAPTCHA from "react-google-recaptcha";
import { getAuthenticatedUser, getToken, processPhoto } from "../helpers/utils";
import { getProfile, updateProfile } from "../services/user.service";
import { useEffect } from "react";
import { AddProfileImage } from "../components";

const useStyles = makeStyles((theme) => ({
  content: {
    marginTop: 100,
  },
  formControl: {
    width: `100%  !important`,
    display: "block",
  },
  recaptcha: {
    marginTop: 15,
    marginBottom: 15,
    textAlign: "center !important",
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
  profileAvatar: {
    width: 200,
    height: 200,
    position: "absolute",
    zIndex: 200,

    [theme.breakpoints.down("md")]: {
      position: "static",
      display: "block",
      margin: "0px auto 50px auto",
    },
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
    width: "600px !important",
    display: "block",
    margin: "auto",
    [theme.breakpoints.down("md")]: {
      width: "100% !important",
      marginBottom: "100px",
    },
  },
}));

const Profile = () => {
  const classes = useStyles();
  let [profile, setProfile] = useState({
    photo: "",
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    account_type: "",
    address: "",
    bank_name: "",
    account_name: "",
    account_number: "",
  });

  let [errorMessage, setErrorMessage] = useState("");
  let [progress, setProgress] = useState(false);
  let [dialogTitle, setDialogTitle] = useState("");
  let [dialogMessage, setDialogMessage] = useState("");
  let [openDialog, setOpenDialog] = useState();
  let [positiveDialog, setPositiveDialog] = useState(true);

  let [verified, setVerified] = useState(false);

  useEffect(function () {
    const getTheProfile = async () => {
      let profile = await getProfile(getToken());
      if (profile.status === 200) {
        setProfile(profile.data.data);
      } else {
        console.log("error getting profile", profile.response.message);
      }
    };
    getTheProfile();
  }, []);

  const handleChange = (field, event) => {
    setProfile({ ...profile, [field]: event.target.value });
  };

  const handleAddImageClick = (event) => {
    event.stopPropagation();
    console.log("Clicked", event.target);
    let fileInput = event.target.getElementsByTagName("input")[0];
    fileInput.click();
  };

  const handleSubmit = async (event) => {
    if (event) event.preventDefault();

    progress === false ? setProgress(true) : setProgress(progress);

    if (validateSignup()) {
      //Here we submit shit...
      if (!verified) {
        setDialogTitle("Hold on!");
        setDialogMessage("Please verify you are human");
        setPositiveDialog(false);
        setOpenDialog(true);
        return;
      }
      let outcome = await updateProfile(getToken(), profile);
      setProgress(false);
      console.log(outcome);
      if (outcome && outcome.status === 200) {
        setErrorMessage("");
        setDialogTitle("Update Successful");
        setDialogMessage("Profile updated successfully");
        setPositiveDialog(true);
        setOpenDialog(true);
        setTimeout(() => (window.location = "/dashboard"), 5000);
      } else if (outcome && outcome.status === 206) {
        setErrorMessage("");
        setDialogTitle("No Update");
        setDialogMessage("There is nothing to update");
        setPositiveDialog(true);
        setOpenDialog(true);
      } else if (outcome.message) {
        setDialogTitle("Update failed");
        setDialogMessage(outcome.data.message);
        setPositiveDialog(false);
        setOpenDialog(true);
      }
    }
  };

  const onRecaptcha = (value) => {
    //verified = value;
    if (value) {
      setVerified(true);
    }
  };

  const validateSignup = () => {
    if (!isValidFirstName(profile.first_name)) {
      setErrorMessage("Ïnvalid First name");
      setProgress(false);
      return;
    }
    if (!isValidLastName(profile.last_name)) {
      setErrorMessage("Ïnvalid Last name");
      setProgress(false);
      return;
    }
    if (profile.bank_name === "Select Bank") {
      setErrorMessage("Please select your bank");
      setProgress(false);
      return;
    }
    if (profile.account_name === "") {
      setErrorMessage("Your account name is empty");
      setProgress(false);
      return;
    }
    if (profile.account_number === "") {
      setErrorMessage("Your account number is empty");
      setProgress(false);
      return;
    }
    if (!isValidEmail(profile.email)) {
      setErrorMessage("Ïnvalid email address");
      setProgress(false);
      return;
    }

    return true;
  };
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
      <PrimaryAppBar />
      <Grid container className={classes.authPage}>
        <Container style={{ marginTop: "200px" }}>
          <Grid container>
            <AddProfileImage
              onClick={handleAddImageClick}
              image={
                typeof profile.image == String
                  ? processPhoto(profile.image)
                  :  profile.image
              }
              setImage={(file) => {
                setProfile({
                  ...profile,
                  photo: file,
                });
              }}
            />
            <form action={"#"} method="POST" className={classes.form}>
              <div style={{ color: "red", textAlign: "center", margin: 16 }}>
                {errorMessage}
              </div>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <FormControl className={classes.formControl}>
                    <MyTextField
                      id="first_name"
                      type="text"
                      name="first_name"
                      required="required"
                      label="First name"
                      placeholder="Enter your first name"
                      value={profile.first_name}
                      onChange={() => handleChange("first_name", window.event)}
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
                      value={profile.last_name}
                      onChange={() => handleChange("last_name", window.event)}
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <FormControl className={classes.formControl}>
                <MyTextField
                  id="email"
                  type="email"
                  name="email"
                  required="required"
                  label="Email"
                  placeholder="Enter email address"
                  value={profile.email}
                  onChange={() => handleChange("email", window.event)}
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
                  value={profile.phone_number}
                  onChange={() => handleChange("phone_number", window.event)}
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
                  value={profile.address}
                  onChange={() => handleChange("address", window.event)}
                />
              </FormControl>

              <FormControl
                className={classes.formControl}
                style={{ marginBottom: "20px" }}
              >
                <Select
                  labelId="bank-name"
                  id="bank-name"
                  value={profile.bank_name}
                  onChange={(event) =>
                    setProfile({ ...profile, bank_name: event.target.value })
                  }
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
                  value={profile.account_name}
                  onChange={() => handleChange("account_name", window.event)}
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
                      value={profile.account_number}
                      onChange={() =>
                        handleChange("account_number", window.event)
                      }
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl className={classes.formControl}>
                    <Select
                      labelId="account-type"
                      id="acount-type"
                      value={profile.account_type}
                      onChange={() => (event) =>
                        setProfile({
                          ...profile,
                          account_type: event.target.value,
                        })}
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

              <FormControl
                className={clsx(classes.formControl, classes.recaptcha)}
              >
                <ReCAPTCHA sitekey={recaptchaKey} onChange={onRecaptcha} />
              </FormControl>
              <MyButton onClick={handleSubmit} progress={progress}>
                Update
              </MyButton>
            </form>
          </Grid>
        </Container>
      </Grid>
    </Fragment>
  );
};

export default Profile;
