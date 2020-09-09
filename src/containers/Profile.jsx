import React, { Fragment, useState } from "react";
// import ReactDom from "react-dom";
import clsx from "clsx";
import {
  Grid,
  Container,
  FormControl,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { PrimaryAppBar, MyTextField } from "../commons";
import { Colors, recaptchaKey, baseUrl } from "../constants";
import {
  isValidFirstName,
  isValidLastName,
  isValidEmail,
} from "../helpers/validator";
import { MyButton, MyDialog } from "../components";
import ReCAPTCHA from "react-google-recaptcha";
import {  getToken, processPhoto } from "../helpers/utils";
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
    middle_name: "",
    email: "",
    phone_number: "",
    account_type: "",
    address: "",
    date_of_birth: "",
    local_govt: "",
    state: "",
    title: "",
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
          <Grid container >
            <AddProfileImage
              onClick={handleAddImageClick}
              getImage={baseUrl + profile.photo}
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
                <Grid item xs={6}>
                  <FormControl className={classes.formControl}>
                    <MyTextField
                      id="middle_name"
                      type="text"
                      name="middle_name"
                      required="required"
                      label="middle name"
                      placeholder="Enter your middle name"
                      value={profile.middle_name}
                      onChange={() => handleChange("middle_name", window.event)}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
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
              </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                <FormControl className={classes.formControl}>
                  <MyTextField
                    id="dob"
                    type="date"
                    name="dob"
                    required="required"
                    label="Date of birth"
                    placeholder="Enter your date of birth"
                    value={profile.date_of_birth}
                    onChange={() => handleChange("date_of_birth", window.event)}
                  />
                </FormControl>
                </Grid>
                <Grid item xs={6}>
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
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={6}>
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
                </Grid>
                <Grid item xs={6}>
                <FormControl className={classes.formControl}>
                <MyTextField
                  id="state"
                  type="text"
                  name="state"
                  required="required"
                  label="state"
                  placeholder="Enter your state"
                  value={profile.state}
                  onChange={() => handleChange("state", window.event)}
                />
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
