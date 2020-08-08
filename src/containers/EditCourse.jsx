import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import CircularProgress from '@material-ui/core/CircularProgress';
import {
  Container,
  Grid,
  Typography,
  FormControl,
  Button,
  Checkbox,
  Paper,
  FormControlLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import { useStyles } from "../helpers";
import * as actions from '../store/actions/index';
import { Colors } from "../constants";
import { useLocation, useHistory, Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { PrimaryAppBar, MyTextField } from "../commons";
import { yourCauses, trendingCauses, followedCauses} from "../mock";
import { SlideableGridList, AddImage, AddCauseImage, AddVideo } from "../components";
import {
  isValidCauseTitle,
  isValidFunds,
  isValidBriefDescription,
} from "../helpers/validator";
import { createCause } from "../services/cause.service";
import { MyDialog, MyButton } from "../components";
import {getAuthenticatedUser} from "../helpers/utils";
import { AddProfileImage } from "../components";

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
    maxWidth: "600px",

    [theme.breakpoints.down('md')]:{
      width: "95% !important",

    }
  }
}));

const EditCause = (props) => {
  let user = JSON.parse(localStorage.getItem("user")).data;
  const token = JSON.parse(localStorage.getItem("user")).token;
  const [curUser, setCurUser] = useState(user);
  const singleCause = props.singleCauseDetails;
  const createdBy = props.createdBy;
  const cause_id = props.match.params.id;
  const[ editCause, setEditCause] = useState();
  useEffect(() => {
    const cause_id = props.match.params.id;
    props.getAsingleCauseDetails(token,cause_id);
    
  },[]);

  const classes = moreStyles();
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

  
  useEffect(() => {
    if (singleCause) {
      setEditCause({
        cause_title:singleCause.cause_title,
        brief_description:singleCause.brief_description,
        amount_required:singleCause.amount_required,
        category:singleCause.category,
        address:singleCause.address,
        local_government:singleCause.local_government,
        account_number:singleCause.account_number,
        bank:singleCause.bank,
        gender:singleCause.gender,
        title:singleCause.title,
        cause_photos:singleCause.cause_photos,
        cause_video:singleCause.cause_video,
        brief_presentation_of_cause:singleCause.brief_presentation_of_cause,
        first_name:singleCause.first_name,
        last_name:singleCause.last_name
      })
    };
    
  },[singleCause,createdBy,setEditCause]);
  console.log('lets start editing...',editCause)

  // const handleCategoryChange = (event) => {
  //   setCategory(event.target.value);
  // };

  const handleChangeEdit =  name => (e) => { 
    setEditCause({
      ...editCause,
      [name]: e.target.value
    });
 
 };

  const handleAddImageClick = (event) => {
    event.stopPropagation();
    console.log("Clicked", event.target);
    let fileInput = event.target.getElementsByTagName("input")[0];
    fileInput.click();
  };
 
  const handleSubmit = () => {
    editCause.uploadFiles = uploadFiles;
    props.onEditCause(token,cause_id,editCause);
    setTimeout(() => (window.location = "/dashboard/myCauses"), 1000);
  }

  return (
    <>
      <PrimaryAppBar />
      <MyDialog
        title={props.editStatus?props.editStatus:'Error'}
        openDialog={props.editStatus?true:false}
        positiveDialog={true}
        onClose={() => setOpenDialog(false)}
      >
        {props.editMessage?props.editMessage:'Network error'}
      </MyDialog>
      <Container style={{ marginTop: 150 }}>
        <Typography variant="h4" component="h4" className={classes.sectionHead} style={{textAlign: "center"}}>
          Good going, {getAuthenticatedUser().first_name}. 
        </Typography>
        <Typography variant="body1" component="p" className={classes.sectionSubhead} style={{textAlign: "center"}}>
          Start the process of adding a new cause
        </Typography>

        <Paper elevation={0} className={classes.causeCreation} style={{marginBottom: "100px"}}>
          <Typography variant="h6" component="h6" style={{textAlign: "center", fontWeight: "bold"}}>
            Edit Your Cause Details
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
                     value={editCause && editCause.cause_title}
                     onChange={handleChangeEdit("cause_title")}
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
                     value={editCause && editCause.brief_description}
                     onChange={handleChangeEdit("brief_description")}
                   />
                 </FormControl>
                 <FormControl className={classes.formControl}>
                  <Select
                  labelId="category"
                    id="category"
                    value={editCause && editCause.category}
                    onChange={handleChangeEdit("category")}
                    variant="outlined"
                   //style={{ width: "100% !important" }}
                    // margin="dense"
                    fullWidth
                  >
                    <MenuItem value="Food">Food</MenuItem>
                    <MenuItem value="Human Right">Human Rights</MenuItem>
                    <MenuItem value="Education">Education</MenuItem>
                    <MenuItem value="Health">Health</MenuItem>
                  </Select>
               </FormControl>
                 <Grid container spacing={3}>
                 <Grid
                  item
                  xs={12}
                  style={{
                    border: `2px dashed ${Colors.appRed}`,
                    marginBottom: "40px",
                  }}
                >
                  <AddProfileImage
                    image="/assets/images/icons/upload-image.png"
                    title="Upload picture*"
                    // text="This is image that will portray the cause."
                    style={{ alignSelf: "flex-start" }}
                    filename="image"
                    onClick={handleAddImageClick}
                    backgroundImage={uploadFiles.image1}
                    setImage={(file) => {
                      setUploadFiles({
                        ...uploadFiles,
                        image1: file,
                      });
                    }}
                  />
                </Grid>
                 </Grid>
                 <FormControl className={classes.formControl}>
                      <MyTextField
                        id="account_number"
                        type="text"
                        name="account_number"
                        required="required"
                        label="account number"
                        placeholder="account_no"
                        value={editCause && editCause.account_number}
                        onChange={handleChangeEdit("account_number")}
                      />
                    </FormControl>
                    {<FormControl className={classes.formControl}>
                      <MyTextField
                        id="bank"
                        type="text"
                        name="bank"
                        required="required"
                        label="bank"
                        placeholder="bank"
                        value={editCause && editCause.bank}
                        onChange={handleChangeEdit("bank")}
                      />
                    </FormControl>}
                    <FormControl className={classes.formControl}>
                      <MyTextField
                        id="amount_required"
                        type="number"
                        name="amount_required"
                        required="required"
                        label="amount required"
                        placeholder="amount required"
                        value={editCause && editCause.amount_required}
                        onChange={handleChangeEdit("amount_required")}
                      />
                    </FormControl>
                  <>
                    <Typography variant="h4" component="h4" className={classes.sectionHead}>
                      Third party Information
                    </Typography>
                  <FormControl className={classes.formControl}>
                  <Select
                    labelId="title-type"
                    id="title"
                    value={editCause && editCause.title}
                    onChange={handleChangeEdit("title")}
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
                        value={editCause && editCause.first_name}
                        onChange={handleChangeEdit("first_name")}
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
                        value={editCause && editCause.last_name}
                        onChange={handleChangeEdit("last_name")}
                      />
                    </FormControl>
                    <FormControl
                  className={classes.formControl}
                >
                  <Select
                    labelId="gender-type"
                    id="gender"
                    value={editCause && editCause.gender}
                    onChange={handleChangeEdit("gender")}
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
                        value={editCause && editCause.address}
                        onChange={handleChangeEdit("address")}
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
                        value={editCause && editCause.local_government}
                        onChange={handleChangeEdit("local_government")}
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
                        value={editCause && editCause.bank}
                        onChange={handleChangeEdit("bank")}
                      />
                    </FormControl>
                  </>
              </form>  
            </div>
            {props.loading && <CircularProgress disableShrink className={classes.Circular } className={classes.Circular }/>}
            <div style={{
                  marginTop: "30px",
                  marginBottom: "30px",
                  textAlign: "center"
                }}>
              <Button
                onClick={() => handleSubmit()}
                variant="contained"
                color="primary"
                style={{
                  //marginLeft: "auto",
                  color: "white",
                  //float: "right",
                }}
              >
                Update
              </Button>
            </div>
                    
        </Paper>
        </Container>
    </>
  );
};

const mapStateToProps = state => {
  return {
    loading : state.getMyCause.loading,
    singleCauseDetails: state.getMyCause.cause?state.getMyCause.cause.data[0]:null,
    createdBy: state.getMyCause.cause?state.getMyCause.cause.data[1]:null,
    causeError: state.getMyCause.error,
    editStatus: state.getMyCause.editStatus,
    editMessage: state.getMyCause.editMessage
  }
};

const mapDispatchToProps = dispatch => {
  return {
    getAsingleCauseDetails : (token,id) => dispatch(actions.checkCauseDetails(token,id)),
    onEditCause : (token,cause_id,cause) => dispatch(actions.editCause(token,cause_id,cause))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditCause);
