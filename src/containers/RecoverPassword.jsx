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
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { PrimaryAppBar, MyTextField } from "../commons";
import { Link } from "react-router-dom";
import { Colors, recaptchaKey } from "../constants";
import { MyButton, MyDialog } from "../components";
import ReCAPTCHA from "react-google-recaptcha";
import { isValidEmail } from "../helpers/validator";
import { forgotPassword } from "../services/user.service";

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
    display: "block",
    margin: "auto",
    [theme.breakpoints.down("md")]: {
      width: "100% !important",
    },
  },
}));

const RecoverPassword = () => {
  let [email, setEmail] = useState("");
  let [progress, setProgress] = useState(false);
  let [dialogTitle, setDialogTitle] = useState("");
  let [dialogMessage, setDialogMessage] = useState("");
  let [openDialog, setOpenDialog] = useState();
  let [positiveDialog, setPositiveDialog] = useState(true);

  let [verified, setVerified] = useState(false);
  const classes = useStyles();

  const handleEmailChange = (event) => {
    setEmail(event.target.value.trim());
  };

  const onRecaptcha = (value) => {
    //verified = value;
    if (value) {
      setVerified(true);
    }
  };

  const handleSubmit = async () => {
    setProgress(true);
    if (isValidEmail(email)) {
      //Make a call.
      if (!verified) {
        setDialogTitle("Hold on!");
        setDialogMessage("Please verify you are human");
        setPositiveDialog(false);
        setOpenDialog(true);
        setProgress(false);
        return;
      }

      const result = await forgotPassword(email);

      if (result.status && result.status === 200) {
        setProgress(false);
        setDialogTitle("Success");
        setDialogMessage(
          "Please check your email for instructions on how to change your password."
        );

        setPositiveDialog(true);

        setOpenDialog(true);
      } else {
        setProgress(false);
        //Don't make a call
        setDialogTitle("Failure...");
        setDialogMessage(result.data.message);

        setPositiveDialog(false);

        setOpenDialog(true);
      }
    }
  };

  return (
    <Fragment>
      <Container>
        <img
          src="/logo-dark.svg"
          alt=""
          style={{ display: "block", margin: "100px auto 50px auto", width: "80px" }}
        />

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

        <div style={{ textAlign: "center" }}>
          <Typography
            variant="h5"
            component="h5"
            className={classes.formHeader}
          >
            Reset your password here...
          </Typography>
          <Typography
            variant="body1"
            component="p"
            className={classes.formSubheader}
          >
            Enter email to reset your password
          </Typography>
          <form action={"#"} method="POST" className={classes.form}>
            <FormControl className={classes.formControl}>
              <MyTextField
                id="email"
                type="email"
                name="email"
                required="required"
                label="Enter email"
                placeholder="Enter your email"
                onChange={handleEmailChange}
              />
            </FormControl>
            <FormControl
              className={clsx(classes.formControl, classes.recaptcha)}
            >
              <ReCAPTCHA sitekey={recaptchaKey} onChange={onRecaptcha} />
            </FormControl>
            <Button
              variant="contained"
              color="primary"
              className={classes.loginButton}
              onClick={handleSubmit}
            >
              Send Recovery Link
            </Button>
          </form>
          <p
            style={{
              color: Colors.appBlack,
              marginTop: "50px",
            }}
            className={classes.alternate}
          >
            I remember my credentials,{" "}
            <Link
              to="/signin"
              style={{
                color: Colors.appRed,
                fontWeight: "bold",
                display: "inline",
              }}
            >
              Sign In Instead
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

export default RecoverPassword;
