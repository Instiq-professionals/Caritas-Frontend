import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import {
  Container,
  Grid,
  Typography,
  FormControl,
  Button,
  Paper,
  Select,
  MenuItem,
} from "@material-ui/core";
import { Colors } from "../constants";
import { Link } from "react-router-dom";
import { PrimaryAppBar, MyTextField } from "../commons";
import { AddCauseImage } from "../components";
import { cLeader,Volunteer, userIsModerator, userIsAnAdmin } from "../helpers/utils";
import { createCause } from "../services/cause.service";
import { MyDialog } from "../components";
import {getAuthenticatedUser} from "../helpers/utils";

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
    maxWidth: "600px",

    [theme.breakpoints.down('md')]:{
      width: "95% !important",

    }
  }
}));

const AddCause = () => {
  let user = JSON.parse(localStorage.getItem("user")).data;
  const [curUser, setCurUser] = useState(user);
  console.log('checking...',curUser.role[1])

  const classes = moreStyles();
  let [page, setPage] = useState(1);
  const peopleThatCanCreateACauseForAthirdParty = cLeader() || Volunteer() || userIsModerator() || userIsAnAdmin();

  let [causeTitle, setCauseTitle] = useState("");
  let [amountRequired, setAmountRequired] = useState("");
  let [acountNumber, setAccountNumber] = useState("");
  let [bank, setBank] = useState("");
  let [briefDescription, setBriefDescription] = useState("");
  let [charityInformation, setCharityInformation] = useState("");
  let [additionalInformation, setAdditionalInformation] = useState("");
  let [causeOptions, setCauseOptions] = useState({
    enableComments: false,
    enableWatching: true,
    fundStatus: true,
    socialMediaSharing: true,
    agreeToTandC: false,
  });
  let [uploadFiles, setUploadFiles] = useState({
    image1: null,
    image2: null,
    image3: null,
    image4: null,
    image5: null,
    image6: null,
    video1: null,
  });

  let [openDialog, setOpenDialog] = useState(false);
  let [dialogMessage, setDialogMessage] = useState("");
  let [dialogTitle, setDialogTitle] = useState("");
  let [positiveDialog, setPositiveDialog] = useState(false);
  let [selectedType, setSelectedType] = useState("Food");
  let [selectedOwner, setSelectedOwner] = useState("Self");
  let [thirdParty,  setThirdParty] = useState({
    title: "Select Title",
    first_name: "",
    middle_name: "",
    last_name: "",
    gender: "Select Gender",
    phone_no: "",
    bank: "",
    account_number: "",
    amount_required: "",
    address: "",
    local_government: "",
    occupation: ""
  })

 const thirdPartyCreator = () => {
  setSelectedOwner('Third Party');
  setSelectedType(curUser.role[1])
 };
  const handleCauseTitleChange = (event) => {
    setCauseTitle(event.target.value);
  };

  const handleTitleChange = (event) => {
    setThirdParty({ ...thirdParty, title: event.target.value });
  };

  const handleFirstNameChange = (event) => {
    setThirdParty({...thirdParty, first_name: event.target.value});
  }

  const handleLastNameChange = (event) => {
    setThirdParty({...thirdParty, last_name: event.target.value});
  }

  const handleGenderChange = (event) => {
    setThirdParty({ ...thirdParty, gender: event.target.value });
  };


  const handleAddressChange = (event) => {
    setThirdParty({...thirdParty, address: event.target.value});
  }

  const handleLocalGovernmentChange = (event) => {
    setThirdParty({...thirdParty, local_government: event.target.value});
  }


  const handleOccupationChange = (event) => {
    setThirdParty({...thirdParty, occupation: event.target.value});
  }

  const handleBriefDescriptionChange = (event) => {
    setBriefDescription(event.target.value);
  };


  const checkImageUpload = () => {
    if (uploadFiles.image1 === null) {
      setPositiveDialog(false);
      setDialogTitle("Wait a minute");
      setDialogMessage(`You must upload at least one image for your cause`);
      setOpenDialog(true);
      return;
    }else
      setPage(4);
  }

  const handleSubmit = async () => {
    // setPage(3);
    // if (!causeOptions.agreeToTandC) {
    //   setPositiveDialog(false);
    //   setDialogTitle("Terms and Conditions");
    //   setDialogMessage(
    //     `To be able to upload this cause, you must agree to the terms and conditions`
    //   );
    //   setOpenDialog(true);
    //   return;
    // }

    if(causeTitle === ''){
      setPositiveDialog(false);
      setDialogTitle("Hold on!");
      setDialogMessage(
        `The cause title cannot be empty`
      );
      setOpenDialog(true);
      return;
    }

    if(briefDescription === ''){
      setPositiveDialog(false);
      setDialogTitle("Hold on!");
      setDialogMessage(
        `Please enter a brief description for your cause to continue.`
      );
      setOpenDialog(true);
      return;
    }

    if(selectedOwner === "Third Party" && thirdParty.first_name === ''){
      setPositiveDialog(false);
      setDialogTitle("Hold on!");
      setDialogMessage(
        `Please enter your first name for your cause to continue.`
      );
      setOpenDialog(true);
      return;
    }

    if(selectedOwner === "Third Party" && thirdParty.last_name === ''){
      setPositiveDialog(false);
      setDialogTitle("Hold on!");
      setDialogMessage(
        `Please enter your last name for your cause to continue.`
      );
      setOpenDialog(true);
      return;
    }

    if(selectedOwner === "Third Party" && thirdParty.gender === 'Select Gender'){
      setPositiveDialog(false);
      setDialogTitle("Hold on!");
      setDialogMessage(
        `Please select your gender for your cause to continue.`
      );
      setOpenDialog(true);
      return;
    }

    if(selectedOwner === "Third Party" && thirdParty.title === 'Select Title'){
      setPositiveDialog(false);
      setDialogTitle("Hold on!");
      setDialogMessage(
        `Please select your title for your cause to continue.`
      );
      setOpenDialog(true);
      return;
    }

    if(selectedOwner === "Third Party" && acountNumber === ''){
      setPositiveDialog(false);
      setDialogTitle("Hold on!");
      setDialogMessage(
        `Please enter your account number.`
      );
      setOpenDialog(true);
      return;
    }

    if(selectedOwner === "Third Party" && bank === ''){
      setPositiveDialog(false);
      setDialogTitle("Hold on!");
      setDialogMessage(
        `Please enter your bank name`
      );
      setOpenDialog(true);
      return;
    }

    if(selectedOwner === "Third Party" && amountRequired === ''){
      setPositiveDialog(false);
      setDialogTitle("Hold on!");
      setDialogMessage(
        `Enter your amount.`
      );
      setOpenDialog(true);
      return;
    }

    if(selectedOwner === "Third Party" && thirdParty.address === ''){
      setPositiveDialog(false);
      setDialogTitle("Hold on!");
      setDialogMessage(
        `Address is requirred..`
      );
      setOpenDialog(true);
      return;
    }

    if(selectedOwner === "Third Party" && thirdParty.local_government=== ''){
      setPositiveDialog(false);
      setDialogTitle("Hold on!");
      setDialogMessage(
        `Local government is requirred..`
      );
      setOpenDialog(true);
      return;
    }

    if(selectedOwner === "Third Party" && thirdParty.occupation === ''){
      setPositiveDialog(false);
      setDialogTitle("Hold on!");
      setDialogMessage(
        `Occupation is requirred.`
      );
      setOpenDialog(true);
      return;
    }

    let cause = {};
    cause.category = selectedType;
    cause.causeTitle = causeTitle;
    cause.amountRequired = amountRequired;
    cause.bank = bank;
    cause.acountNumber = acountNumber;
    cause.briefDescription = briefDescription;
    cause.charityInformation = charityInformation;
    cause.additionalInformation = additionalInformation;
    cause.causeOptions = causeOptions;
    cause.uploadFiles = uploadFiles;
    if(selectedOwner === "Third Party"){
      cause.thirdParty = thirdParty;
    }

    if (cause.uploadFiles.image1 === null) {
      setPositiveDialog(false);
      setDialogTitle("Upload Failure");
      setDialogMessage(`You must upload at least one image for your cause`);
      setOpenDialog(true);
      return;
    }
    

    let outcome = await createCause(cause);

    if (outcome.status === 200) {
      setPage(5);
    } else {
      setPositiveDialog(false);
      setDialogTitle("Upload Failure");
      setDialogMessage(
        `There was an error uploading your cause ${
          outcome.response.data.message
            ? "," + outcome.response.data.message
            : "Image file too large"
        }`
      );
      setOpenDialog(true);
    }
    // console.log("Result of creating cause", outcome);
    // console.log("Error from creating cause", outcome.response);
  };

  const handleAddImageClick = (event) => {
    event.stopPropagation();
    console.log("Clicked", event.target);
    let fileInput = event.target.getElementsByTagName("input")[0];
    fileInput.click();
  };

  const CauseSelection = (props) => {
    const useStyles = makeStyles((theme) => ({
      root: {
        display: "flex",
        flexDirection: "column",
        padding: "20px",
        alignItems: "center",
        cursor: "pointer",
        boxShadow:
          props.type === selectedType
            ? "0px 0px 20px rgba(252, 99, 107, 0.7)"
            : "none",
        backgroundColor:
          props.type === selectedType
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
          setSelectedType(props.type);
        }}
      >
        <img src={props.image} alt="" style={{ height: "80px" }} />
        <p style={{ textAlign: "center" }}>{props.type}</p>
      </div>
    );
  };

  const CauseOwnerSelection = (props) => {
    const useStyles = makeStyles((theme) => ({
      root: {
        display: "flex",
        flexDirection: "column",
        padding: "20px",
        alignItems: "center",
        cursor: "pointer",
        boxShadow:
          props.type === selectedOwner
            ? "0px 0px 20px rgba(252, 99, 107, 0.7)"
            : "none",
        backgroundColor:
          props.type === selectedOwner
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
          setSelectedOwner(props.type);
        }}
      >
        <img src={props.image} alt="" style={{ height: "80px" }} />
        <p style={{ textAlign: "center" }}>{props.type}</p>
      </div>
    );
  };

  return (
    <>
      <PrimaryAppBar />
      <MyDialog
        title={dialogTitle}
        openDialog={openDialog}
        positiveDialog={positiveDialog}
        onClose={() => setOpenDialog(false)}
      >
        {dialogMessage}
      </MyDialog>
      {page === 1 && (
        <Container style={{ marginTop: 150 }}>
        <Typography variant="h4" component="h4" className={classes.sectionHead} style={{textAlign: "center"}}>
          Good going, {getAuthenticatedUser().first_name}. 
        </Typography>
        <Typography variant="body1" component="p" className={classes.sectionSubhead} style={{textAlign: "center"}}>
          Start the process of adding a new cause
        </Typography>

        <Paper elevation={0} className={classes.causeCreation} style={{marginBottom: "100px"}}>
          <Typography variant="h6" component="h6" style={{textAlign: "center", fontWeight: "bold"}}>
            Who is this cause for?
          </Typography>
          <Grid container spacing={5} style={{marginTop: "30px"}}>
            <Grid item  xs={!peopleThatCanCreateACauseForAthirdParty? 12:6} sm={!peopleThatCanCreateACauseForAthirdParty? 12:6}>
              <CauseOwnerSelection type="Self" image={'/assets/images/icons/user-type.png'} />
            </Grid>
           {peopleThatCanCreateACauseForAthirdParty && <Grid item sm={6} onClick={() => thirdPartyCreator()}>
              <CauseOwnerSelection type="Third Party" image={'/assets/images/icons/third-party-icon.png'} />
            </Grid>}
            
            <div style={{textAlign: "center", width: "100%"}} >
              <Button
                  onClick={() => setPage(2)}
                  variant="contained"
                  color="primary"
                  style={{
                    margin: "30px auto",
                    color: "white",
                    paddingLeft: "30px",
                    paddingRight: "30px"                    
                  }}
                >
                  Next
              </Button>
            </div>
          </Grid>
          
        </Paper>
      </Container>
      )}
      {page === 2 && (
        <Container style={{ marginTop: 150 }}>
          <Typography variant="h4" component="h4" className={classes.sectionHead} style={{textAlign: "center"}}>
            Good going, {getAuthenticatedUser().first_name}. 
          </Typography>
          <Typography variant="body1" component="p" className={classes.sectionSubhead} style={{textAlign: "center"}}>
            Start the process of adding a new cause
          </Typography>

          <Paper elevation={0} className={classes.causeCreation} style={{marginBottom: "100px"}}>
            <Typography variant="h6" component="h6" style={{textAlign: "center", fontWeight: "bold"}}>
              What help are you requesting for?
            </Typography>
            <Grid container spacing={5} style={{marginTop: "30px"}}>
              <Grid item sm={6} md={3} >
                <CauseSelection type="Food" image={'/assets/images/icons/food-help.png'} />
              </Grid>
              <Grid item sm={6} md={3}>
                <CauseSelection type="Education" image={'/assets/images/icons/education-help.png'} />
              </Grid>
              <Grid item sm={6} md={3}>
                <CauseSelection type="Health" image={'/assets/images/icons/health-help.png'} />
              </Grid>
              <Grid item sm={6} md={3}>
                <CauseSelection type="Human Rights" image={'/assets/images/icons/human-rights-help.png'} />
              </Grid>

              <div style={{
                    marginTop: "30px",
                    marginBottom: "30px",
                    width: "100%"
                  }}>
                <Button
                  onClick={() => setPage(1)}
                  variant="contained"
                  color="default"
                  
                >
                  Back
                </Button>
                <Button
                  onClick={() => setPage(3)}
                  variant="contained"
                  color="primary"
                  style={{
                    marginLeft: "auto",
                    color: "white",
                    float: "right",
                  }}
                >
                  Continue
                </Button>
              </div>

            </Grid>
            
          </Paper>
        </Container>
      )}
      {page === 3 && (

        <Container style={{ marginTop: 150 }}>
          <Typography variant="h4" component="h4" className={classes.sectionHead} style={{textAlign: "center"}}>
            Good going, {getAuthenticatedUser().first_name}. 
          </Typography>
          <Typography variant="body1" component="p" className={classes.sectionSubhead} style={{textAlign: "center"}}>
            Start the process of adding a new cause
          </Typography>

          <Paper elevation={0} className={classes.causeCreation} style={{marginBottom: "100px"}}>
            <Typography variant="h6" component="h6" style={{textAlign: "center", fontWeight: "bold"}}>
              Upload Cause Photo
            </Typography>
            
              
              <div style={{width: "100%", textAlign: "center", marginTop: "30px"}} >
                  <AddCauseImage
                    image="/assets/images/icons/upload.png"
                    title="Upload image or photo"
                    text="Max file size (1MB)"
                    style={{ alignSelf: "flex-start" }}
                    filename="image1"
                    onClick={handleAddImageClick}
                    backgroundImage={uploadFiles.image1}
                    setImage={(file) => {
                      setUploadFiles({
                        ...uploadFiles,
                        image1: file,
                      });
                    }}
                  />
              </div>

              <div style={{
                    marginTop: "30px",
                    marginBottom: "30px",
                  }}>
                <Button
                  onClick={() => setPage(2)}
                  variant="contained"
                  color="default"
                  
                >
                  Back
                </Button>
                <Button
                  onClick={checkImageUpload}
                  variant="contained"
                  color="primary"
                  style={{
                    marginLeft: "auto",
                    color: "white",
                    float: "right",
                  }}
                >
                  Continue
                </Button>
              </div>
                      
          </Paper>
        </Container>
      )}
      {page === 4 && (
        <Container style={{ marginTop: 150 }}>
        <Typography variant="h4" component="h4" className={classes.sectionHead} style={{textAlign: "center"}}>
          Good going, {getAuthenticatedUser().first_name}. 
        </Typography>
        <Typography variant="body1" component="p" className={classes.sectionSubhead} style={{textAlign: "center"}}>
          Start the process of adding a new cause
        </Typography>

        <Paper elevation={0} className={classes.causeCreation} style={{marginBottom: "100px"}}>
          <Typography variant="h6" component="h6" style={{textAlign: "center", fontWeight: "bold"}}>
            Finalize Your Cause Details
          </Typography>          
            
            <div style={{width: "100%", textAlign: "center", marginTop: "30px"}} >

              <form action="#" method="POST" className={classes.form}>
                  <FormControl className={classes.formControl}>
                   <MyTextField
                     id="cause_title"
                     type="text"
                     name="cause_title"
                     required="required"
                     label="Title of your Cause"
                     placeholder="Provide a Title for your cause"
                     value={causeTitle}
                     onChange={handleCauseTitleChange}
                   />
                 </FormControl>

                 <FormControl className={classes.formControl}>
                   <MyTextField
                     id="description"
                     type="text"
                     name="description"
                     required="required"
                     label="Brief description"
                     placeholder="Provide a brief description for the  Cause"
                     multiline={true}
                     rows={3}
                     value={briefDescription}
                     onChange={handleBriefDescriptionChange}
                   />
                 </FormControl>

                 {selectedOwner !== "Third Party" && (
                   <>
                   <FormControl className={classes.formControl}>
                      <MyTextField
                        id="account_number"
                        type="text"
                        name="account_number"
                        required="required"
                        label="account number"
                        placeholder="account_no"
                        value={acountNumber}
                        onChange={(e) => setAccountNumber(e.target.value)}
                      />
                    </FormControl>
                    <FormControl className={classes.formControl}>
                      <MyTextField
                        id="amount_required"
                        type="Number"
                        name="amount_required"
                        required="required"
                        label="amount required"
                        placeholder="amount required"
                        value={amountRequired}
                        onChange={(e) => setAmountRequired(e.target.value)}
                      />
                    </FormControl>
                    <FormControl className={classes.formControl}>
                      <MyTextField
                        id="bank"
                        type="text"
                        name="bank"
                        required="required"
                        label="bank"
                        placeholder="bank"
                        value={bank}
                        onChange={(e) => setBank(e.target.value)}
                      />
                    </FormControl>
                   </>
                 )}
                {selectedOwner == "Third Party" && (
                  <>
                    <Typography variant="h4" component="h4" className={classes.sectionHead}>
                      Third party Information
                    </Typography>
                  <FormControl className={classes.formControl}>
                  <Select
                    labelId="title-type"
                    id="title"
                    value={thirdParty.title}
                    onChange={handleTitleChange}
                    variant="outlined"
                    //style={{ width: "100% !important" }}
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
                        placeholder="First name"
                        value={thirdParty.first_name}
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
                        placeholder="Last name"
                        value={thirdParty.last_name}
                        onChange={handleLastNameChange}
                      />
                    </FormControl>
                    <FormControl
                  className={classes.formControl}
                >
                  <Select
                    labelId="gender-type"
                    id="gender"
                    value={thirdParty.gender}
                    onChange={handleGenderChange}
                    variant="outlined"
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
                        id="address"
                        type="text"
                        name="address"
                        required="required"
                        label="Address"
                        placeholder="Address"
                        value={thirdParty.address}
                        onChange={handleAddressChange}
                      />
                    </FormControl>
                    <FormControl className={classes.formControl}>
                      <MyTextField
                        id="local_government"
                        type="text"
                        name="local_government"
                        required="required"
                        label="local government"
                        placeholder="local government"
                        value={thirdParty.local_government}
                        onChange={handleLocalGovernmentChange}
                      />
                    </FormControl>
                    <FormControl className={classes.formControl}>
                      <MyTextField
                        id="occupation"
                        type="text"
                        name="occupation"
                        required="required"
                        label="occupation"
                        placeholder="occupation"
                        value={thirdParty.occupation}
                        onChange={handleOccupationChange}
                      />
                    </FormControl>
                    <FormControl className={classes.formControl}>
                      <MyTextField
                        id="bank"
                        type="text"
                        name="bank"
                        required="required"
                        label="bank"
                        placeholder="bank"
                        value={bank}
                        onChange={(e) => setBank(e.target.value)}
                      />
                    </FormControl>
                    <FormControl className={classes.formControl}>
                      <MyTextField
                        id="account_number"
                        type="text"
                        name="account_number"
                        required="required"
                        label="account number"
                        placeholder="account_no"
                        value={acountNumber}
                        onChange={(e) => setAccountNumber(e.target.value)}
                      />
                    </FormControl>
                    <FormControl className={classes.formControl}>
                      <MyTextField
                        id="amount_required"
                        type="number"
                        name="amount_required"
                        required="required"
                        label="amount required"
                        placeholder="amount required"
                        value={amountRequired}
                        onChange={(e) => setAmountRequired(e.target.value)}
                      />
                    </FormControl>
                  </>
                )}

                 {/* <FormControlLabel
                    className={classes.checkbox}
                    style={{ marginTop: "20px" }}
                    control={
                      <Checkbox
                        checked={causeOptions.agreeToTandC}
                        // onChange={handleChange}
                        name="agreeToTandC"
                        onChange={handleCheck}
                      />
                    }
                    label={`I agree to the terms and conditions.`}
                  />
                  <p style={{textAlign: "center", color: Colors.appRed}}><a href="#" 
                    style={{color: "inherit", fontWeight: "bold", fontSize: 14}}>Read full T&amp;C’s</a></p> */}
              </form>
                  
            </div>

            <div style={{
                  marginTop: "30px",
                  marginBottom: "30px",
                }}>
              <Button
                onClick={() => setPage(3)}
                variant="contained"
                color="default"
                
              >
                Back
              </Button>
              <Button
                onClick={handleSubmit}
                variant="contained"
                color="primary"
                style={{
                  marginLeft: "auto",
                  color: "white",
                  float: "right",
                }}
              >
                Submit
              </Button>
            </div>
                    
        </Paper>
        </Container>
      )}
      {page === 5 && <SuccessUpload />}
    </>
  );
};

const SuccessUpload = () => {
  const classes = moreStyles();
  return (
    <Container style={{ marginTop: "200px" }}>
      <Paper className={classes.successBox}>
        <img src="/assets/images/icons/success_icon.png" alt="" />
        <Typography variant="h6" component="h6" className={classes.sectionHead}>
          Upload Successful
        </Typography>
        <Link to="/dashboard">
          <u>
            {/* Cause will be displayed once it has been approved. Return to your
            dashboard and await approval. */}
            Return to your dashboard and await approval
          </u>
        </Link>
      </Paper>
    </Container>
  );
};

export default AddCause;
