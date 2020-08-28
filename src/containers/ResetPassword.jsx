import React, { Fragment, useState } from "react";
// import ReactDom from "react-dom";
import clsx from "clsx";
import {
  Grid,
  Container,
  FormControl,
  Typography,
  Zoom,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { PrimaryAppBar, MyTextField } from "../commons";
import { Link } from "react-router-dom";
import { Colors, recaptchaKey } from "../constants";
import { useParams } from "react-router";
import { verifyUserEmail } from "../services/user.service";
import { isValidPassword } from "../helpers/validator";
import { MyButton, MyDialog } from "../components";
import ReCAPTCHA from "react-google-recaptcha";
import { resetPassword } from "../services/user.service";

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
    padding: "200px 50px",
    backgroundImage: "url('/assets/images/auth-background.png')",
    backgroundPosition: "80% 150px",
    backgroundRepeat: "no-repeat",
    backgroundSize: "450px 450px",
  },
  authPage: {
    width: "100%",
    height: "100vh",
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
    [theme.breakpoints.down("md")]: {
      width: "100% !important",
      display: "block",
      margin: "auto",
    },
  },
}));

const ResetPassword = () => {
  const classes = useStyles();
  const token = useParams().token;
  const [message, setMessage] = useState("Hang on...");
  const [success, setSuccess] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  let [verified, setVerified] = useState(false);

  let [progress, setProgress] = useState(false);
  let [dialogTitle, setDialogTitle] = useState("");
  let [dialogMessage, setDialogMessage] = useState("");
  let [openDialog, setOpenDialog] = useState();
  let [positiveDialog, setPositiveDialog] = useState(true);
  let [errorMessage, setErrorMessage] = useState(true);

  const updatePassword = async (token) => {
    const response = await verifyUserEmail(token);
    if (response.status === 200) {
      setMessage("Congrats. Your Your password was changed successfully");
      setSuccess(true);
    } else {
      setMessage("Sorry, we couldn't change your password");
    }
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
  };

  const verifyPassword = () => {
    if (!isValidPassword(password.trim())) {
      setErrorMessage("Password is not valid. Must be at least 8 characters");
      return false;
    } else if (password.trim() !== confirmPassword.trim()) {
      setErrorMessage("Passwords don't match");
      return false;
    }
    return true;
  };

  const onRecaptcha = (value) => {
    //verified = value;
    if (value) {
      setVerified(true);
    }
  };

  const handleSubmit = async () => {
    setProgress(true);
    if (verifyPassword()) {
      //   Then we submit
      if (!verified) {
        setDialogTitle("Hold on!");
        setDialogMessage("Please verify you are human");
        setPositiveDialog(false);
        setOpenDialog(true);
        setProgress(false);
        return;
      }

      const result = await resetPassword(password, token);

      if (result.status && result.status === 200) {
        setProgress(false);
        setDialogTitle("Success");
        setDialogMessage("Password has been updated successfully");

        setPositiveDialog(true);

        setOpenDialog(true);

        setTimeout(function () {
          window.location = "/signin";
        }, 3000);
      } else {
        setProgress(false);
        //Don't make a call
        setDialogTitle("Failure...");
        setDialogMessage(result.data.message);

        setPositiveDialog(false);

        setOpenDialog(true);
      }
    } else {
      setProgress(false);
    }
  };

  return (
    <Fragment>
      <PrimaryAppBar />
      <Grid container className={classes.authPage}>
        <Grid item xs={12} md={6} className={classes.left}></Grid>
        <Grid item xs={12} md={6} className={classes.right}></Grid>
        <div
          style={{
            position: "absolute",
            width: "100%",
            top: 200,
          }}
        >
          <Container>
            <MyDialog
              title={dialogTitle}
              positiveDialog={positiveDialog}
              openDialog={openDialog}
              onClose={() => {
                setOpenDialog(false);
              }}
            >
              {dialogMessage}
            </MyDialog>
            <Grid container>
              <Grid item xs={12} md={6} className={classes.authLeft}>
                <Typography
                  variant="h5"
                  component="h5"
                  className={classes.formHeader}
                >
                  Choose a new password
                </Typography>
                <Typography
                  variant="body1"
                  component="p"
                  className={classes.formSubheader}
                >
                  Enter and confrim your password
                </Typography>
                <form action={"#"} method="POST" className={classes.form}>
                  <FormControl className={classes.formControl}>
                    <MyTextField
                      id="password"
                      type="password"
                      name="password"
                      required="required"
                      label="Enter password"
                      placeholder="Enter your new password"
                      onChange={handlePasswordChange}
                    />
                  </FormControl>

                  <FormControl className={classes.formControl}>
                    <MyTextField
                      id="confirm_password"
                      type="password"
                      name="confirm_password"
                      required="required"
                      label="Confirm password"
                      placeholder="Confirm your new password"
                      onChange={handleConfirmPassword}
                    />
                  </FormControl>
                  <FormControl
                    className={clsx(classes.formControl, classes.recaptcha)}
                  >
                    <ReCAPTCHA sitekey={recaptchaKey} onChange={onRecaptcha} />
                  </FormControl>
                  <MyButton
                    variant="contained"
                    color="primary"
                    className={classes.loginButton}
                    onClick={handleSubmit}
                  >
                    Change Password
                  </MyButton>
                </form>
                <p
                  style={{
                    color: Colors.appBlack,
                    marginTop: "50px",
                  }}
                  className={classes.alternate}
                >
                  I remember my details,{" "}
                  <Link
                    to="/signin"
                    style={{
                      color: Colors.appRed,
                      fontWeight: "bold",
                      display: "inline",
                    }}
                  >
                    Sign In instead
                  </Link>
                </p>
              </Grid>
              <Grid item xs={12} md={6}>
                <Zoom in={true} timeout={2000}>
                  <img
                    src="/assets/images/nurse.png"
                    alt=""
                    className={classes.authImage}
                  />
                </Zoom>
              </Grid>
            </Grid>
          </Container>
        </div>
        <div className={classes.copyright}>
          <Container>
            <p>Copyright &copy; 2020 | All Rights Reserved | QCare.org</p>
          </Container>
        </div>
      </Grid>
    </Fragment>
  );
};

export default ResetPassword;
