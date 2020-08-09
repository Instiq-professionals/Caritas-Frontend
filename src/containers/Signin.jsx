import React, { Fragment, useState } from "react";
// import ReactDom from "react-dom";
import clsx from "clsx";
import {
  Grid,
  Container,
  FormControl,
  Typography,
  Button,
  Zoom,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { PrimaryAppBar, MyTextField } from "../commons";
import { Link } from "react-router-dom";
import { Colors, recaptchaKey } from "../constants";
import { MyButton, MyDialog } from "../components";
import { signinUser } from "../services/user.service";
import { isValidEmail, isValidPassword } from "../helpers/validator";
import ReCAPTCHA from "react-google-recaptcha";

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
    textAlign: "center",
    [theme.breakpoints.down("md")]: {
      textAlign: "center",
    },
  },
  formByLine: {
    marginLeft: "30px",
    textAlign: "center",
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
    height: "120vh",
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
}));

const Signin = () => {
  const classes = useStyles();
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [errorMessage, setErrorMessage] = useState("");
  let [successMessage, setSuccessMessage] = useState(false);
  let [progress, setProgress] = useState(false);
  let [dialogTitle, setDialogTitle] = useState("");
  let [dialogMessage, setDialogMessage] = useState("");
  let [openDialog, setOpenDialog] = useState();
  let [positiveDialog, setPositiveDialog] = useState(true);

  let [verified, setVerified] = useState(false);

  const handleSubmit = async (event) => {
    if (event) event.preventDefault();

    progress === false ? setProgress(true) : setProgress(progress);

    if (validateLogin()) {
      //Here we submit shit...

      if (!verified) {
        setDialogTitle("Hold on!");
        setDialogMessage("Please verify you are human");

        setPositiveDialog(false);

        setOpenDialog(true);

        setTimeout(function () {
          window.location.reload();
        }, 2000);

        return;
      }

      let outcome = await signinUser({
        email: email,
        password: password,
      });

      setProgress(false);

      console.log(outcome);

      if (outcome && outcome.status === 200) {
        setErrorMessage("");
        setEmail("");
        setPassword("");

        setErrorMessage("");
        setSuccessMessage(true);

        setTimeout(() => (window.location = "/dashboard"), 3000);
      } else if (outcome && outcome.status === 206) {
        setProgress(false);
        setDialogTitle("Unverified...");
        setDialogMessage(
          "Your account has not been verified. Please check your email for a verification link"
        );

        setPositiveDialog(false);

        setOpenDialog(true);
        return;
      } else if (outcome.message) {
        setSuccessMessage(false);
        if (outcome.message.includes("400"))
          setErrorMessage("Invalid credentials");
        else setErrorMessage(outcome.message);
      }
    }
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value.trim());
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value.trim());
  };

  const validateLogin = () => {
    if (!isValidEmail(email)) {
      setErrorMessage("Ïnvalid email address");
      setProgress(false);
      return;
    }
    if (!isValidPassword(password)) {
      setErrorMessage("Ïnvalid password");
      setProgress(false);
      return;
    }

    return true;
  };

  const onRecaptcha = (value) => {
    //verified = value;
    if (value) {
      setVerified(true);
    }
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
            Welcome back...
          </Typography>
          <Typography
            variant="body1"
            component="p"
            className={classes.formSubheader}
          >
            Signin to continue
          </Typography>
          <form action={"#"} method="POST" className={classes.form}>
            <div style={{ color: "red", textAlign: "center", margin: 16 }}>
              {errorMessage}
            </div>
            {successMessage && (
              <div
                style={{
                  borderRadius: 10,
                  color: "white",
                  backgroundColor: Colors.appRed,
                  textAlign: "center",
                  margin: "16px 0px",
                  padding: 15,
                }}
              >
                Login Successful...
              </div>
            )}
            <FormControl className={classes.formControl}>
              <MyTextField
                id="email"
                type="text"
                name="username"
                required="required"
                label="Email address/Phone number"
                placeholder="Enter email address or phone number"
                value={email}
                onChange={handleEmailChange}
              />
            </FormControl>

            <FormControl className={classes.formControl}>
              <MyTextField
                id="password"
                type="password"
                name="password"
                required="required"
                label="Password"
                placeholder="Enter your password"
                value={password}
                onChange={handlePasswordChange}
              />
            </FormControl>

            <FormControl
              style={{
                width: "100%",
                textAlign: "right",
                marginBottom: 10,
              }}
            >
              <Link
                to="/recover-password"
                style={{
                  float: "right",
                  marginBottom: "15px",
                  fontSize: "12px",
                }}
              >
                Forgot password
              </Link>
            </FormControl>

            <FormControl
              className={clsx(classes.formControl, classes.recaptcha)}
            >
              <ReCAPTCHA sitekey={recaptchaKey} onChange={onRecaptcha} />
            </FormControl>

            <MyButton processing={false} onClick={handleSubmit}>
              Sign in
            </MyButton>
          </form>
          <p
            style={{
              color: Colors.appBlack,
              marginTop: "50px",
            }}
            className={classes.alternate}
          >
            Don't have an account?{" "}
            <Link
              to="/signup"
              style={{
                color: Colors.appRed,
                fontWeight: "bold",
                display: "inline",
              }}
            >
              Sign up
            </Link>
          </p>
        </div>
      </Container>

      {/* <div className={classes.copyright}>
          <Container>
            <p>Copyright &copy; 2020 | All Rights Reserved | QCare.org</p>
          </Container>
        </div> */}
    </Fragment>
  );
};

export default Signin;
