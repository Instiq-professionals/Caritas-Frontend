import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import {
  Container,
  Grid,
  Paper
} from "@material-ui/core";
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { Colors } from "../constants";
//import { TransitionProps } from '@material-ui/core/transitions';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      position: 'relative',
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
      color:'white'
    },
    accountCreation:{
      marginTop: "50px", 
      backgroundColor: "white", 
      display: "block", 
      margin: "auto", 
      padding: "30px", 
      maxWidth: "90%",
  
      [theme.breakpoints.down('md')]:{
        width: "95% !important",
  
      }
    },
    textHeadingColor: {
      //fontSize: "18px",
    fontWeight: "bold",
    color: Colors.appRed,
    },
    textContent: {
      fontSize: "18px",
    //fontWeight: "bold",
    },
    spanText: {
      color: Colors.appRed,
    },
  }),
);

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Read Terms and Conditions
      </Button>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Close
            </Typography>
            <Typography variant="h6" className={classes.title}>
              Terms and conditions
            </Typography>
          </Toolbar>
        </AppBar>
        <Container style={{ marginTop:0 }}>
          <Paper elevation={0} className={classes.accountCreation} >
          <Grid container spacing={5}>
            <Grid item xs={12}>
            <Typography variant="h6"  className={classes.textHeadingColor}>
             General 
          </Typography>
          <Typography variant="small"  className={classes.textHContent}>
          This document states the terms and conditions (hereafter “Terms”) under 
          which individuals  (hereafter “User”) and organizations may use QCare.ng 
          (hereafter “the Foundation). The purpose of this document is to define the
           procedures regarding access and use of the Service on the Web App. 
          </Typography><br/>
          <Typography variant="small">
          The Service is provided through the following website 
          <a href="https://www.qcare.ng ">https://www.qcare.ng </a>
          </Typography><br/>
          <Typography variant="small">
          These terms constitute a binding agreement between the User and or 
          Organization and the service provider – 
          <span className={classes.spanText}>QCare Foundation </span>
          (hereafter “the Foundation “) and are deemed accepted by the User 
          and or Organization each time that the User or organization uses or 
          accesses the Service on the QCare Web App. Website Standard Terms and 
          Conditions written on this webpage shall manage User's or organization ‘s 
          use of the Service on the web App. 
          </Typography><br/>
          <Typography variant="small">
          That a volunteer is an approved user who hath herein indicated interest in helping to 
          advance the cause for which the QCare Foundation was established. 
          </Typography><br/>
          <Typography variant="small">
          The Foundation reserves the right to amend the terms at any point in time by posting 
          an updated version to this web page. Users and or organizations  should visit this 
          page periodically to review the most current terms because these are binding to the
           Users and organizations
          </Typography><br/>
          <Typography variant="small">
          Minors or people below 18 years old are not allowed to use the Service. 
          </Typography><br/>
            </Grid>
            <Grid item xs={12}>
            <Typography variant="h6"  className={classes.textHeadingColor}>
            Accessing the service 
          </Typography>
          <Typography variant="small"  className={classes.textHContent}>
          The rights to access and use of the Service on the QCare web App are exclusive.  
          </Typography><br/>
          <Typography variant="small">
          The User is not allowed to transfer, sell, or assign any rights and obligations
           to the service to any third party. 
          </Typography><br/>
          <Typography variant="small">
          The user or organization shall only have access to just a cause once in every Ninety days cycle.
          </Typography><br/>
          <Typography variant="small">
          To limit the risk of piracy and theft, the Company reserves the right to limit access to parts or 
          whole of the Service. This includes, but is not limited to the possibility of introducing daily download limits. 
          </Typography><br/>
            </Grid>
            <Grid item xs={12}>
            <Typography variant="h6"  className={classes.textHeadingColor}>
            Registration and password 
          </Typography>
          <Typography variant="small"  className={classes.textHContent}>
          Customer is responsible for keeping his/her login email and password confidential.   
          </Typography><br/>
          <Typography variant="small">
          In case of any unauthorized use of is/her registration, Customer will notify the Qcare Foundation mmediately.  
          </Typography><br/>
            </Grid>
            <Grid item xs={12}>
            <Typography variant="h6"  className={classes.textHeadingColor}>
            Customer information on Qcare.ng  
          </Typography>
          <Typography variant="small"  className={classes.textHContent}>
          The User or organization who seeks to apply for a cause or event or intervention undertakes the responsibility 
          to regularly update and provide accurate information  on the service that directly concerns User.  User or 
          organization is entitled to access and rectify any personal information that it provides to the Service as a result of using the Service.   
          </Typography><br/>
            </Grid>
            <Grid item xs={12}>
            <Typography variant="h6"  className={classes.textHeadingColor}>
            Disclaimer of warranty  
          </Typography>
          <Typography variant="small"  className={classes.textHContent}>
          QCare Foundation undertakes to do its utmost to ensure that its service is operational seven (7) days a week, twenty-four (24) hours 
          a day within the limits set out herein. However, the Foundation cannot guarantee that the website will be available or that the website 
          will run problem free.   
          </Typography><br/>
          <Typography variant="small"  className={classes.textHContent}>
          User Or Organization is solely responsible for usage they make of the service of the Web App including the use of the information provided.    
          </Typography><br/>
          <Typography variant="small"  className={classes.textHContent}>
          The Foundation cannot be held legally responsible, either from an express or tacit obligation or any direct or indirect damages caused by usage of
           the services of the web App.     
          </Typography><br/>
          <Typography variant="small"  className={classes.textHContent}>
          The Foundation reserves the right to temporarily interrupt or restrict the use of the service for any reason. User or Organization  exonerates the 
          Company from any 
          liability in the case of the service not being operational.     
          </Typography><br/>
          <Typography variant="small"  className={classes.textHContent}>
          The Foundation is  entitled to amend the characteristics of the service offered to the Users or organizations under any circumstances and without prior notice.     
          </Typography><br/>
          <Typography variant="small"  className={classes.textHContent}>
          The Foundation is not able to guarantee that the service is free from viruses and/or other malicious software. It is up to the User or organization to take any necessary 
          measures in order to protect their own data and/or software from being infected by any malicious software downloaded by means of the Service.     
          </Typography><br/>
          <Typography variant="small"  className={classes.textHContent}>
          Since the Foundation collects data from multiple external sources which the Foundation does not control, the Foundation cannot take responsibility for any inaccuracies.     
          </Typography><br/>
          <Typography variant="small"  className={classes.textHContent}>
          The Foundation is not responsible for any errors and or omissions of information on the service provided on the platform.       
          </Typography><br/>
          <Typography variant="small"  className={classes.textHContent}>
          The Foundation  is not liable for any transaction entered into between its users or organizations and/ or between its users and a third party. 
          Under no circumstances shall the Foundation be  a party to the contract.      
          </Typography><br/>
          <Typography variant="small"  className={classes.textHContent}>
          The foundation  does not guarantee any minimum level of orders, income or results of any kind.     
          </Typography><br/>
            </Grid>
            <Grid item xs={12}>
            <Typography variant="h6"  className={classes.textHeadingColor}>
            Links to other sites 
          </Typography>
          <Typography variant="small"  className={classes.textHContent}>
          QCare Foundation can insert hyperlinks and references to other sites on the Web App.  
          </Typography><br/>
          <Typography variant="small">
          QCare Foundation cannot control the sites of third parties referred to on the Web App and 
          is not responsible for the contents that appear on the sites of these third parties.  
          </Typography><br/>
            </Grid>
            <Grid item xs={12}>
            <Typography variant="h6"  className={classes.textHeadingColor}>
            Termination by the Foundation  
          </Typography>
          <Typography variant="small"  className={classes.textHContent}>
          The QCare Foundation has the right to cancel any user's or organisation’s request for a cause or event.
           This will happen in case a User Or Organization violates any applicable law or regulation or uses the Foundation’s web app to  
          express defamatory, obscene, threatening, abusive or hateful language or when they make any inappropriate use of the Foundation's service.   
          </Typography><br/>
          <Typography variant="small">
          In case of a termination, QCare Foundation is not liable to any user or organization under any circumstances.   
          </Typography><br/>
            </Grid>
            <Grid item xs={12}>
            <Typography variant="h6"  className={classes.textHeadingColor}>
            License  
          </Typography>
          <Typography variant="small"  className={classes.textHContent}>
          User  grants the QCare Foundation worldwide rights to use their details. These rights primarily include the rights to adapt 
          the information to be included in the database and
           to communicate the information to the public in any way that the Foundation considers necessary, mainly through the internet.    
          </Typography><br/>
          <Typography variant="small">
          Trademarks and logos of Users and of other organizations who have benefited from causes or events or interventions through the QCare
           Foundation can be displayed on the website, as well as be included in promotional material of the Foundation.    
          </Typography><br/>
            </Grid>
            <Grid item xs={12}>
            <Typography variant="h6"  className={classes.textHeadingColor}>
            Contents of the site  
          </Typography>
          <Typography variant="small"  className={classes.textHContent}>
          A User  is not allowed to make any copies, reproductions, transmissions etc. of any part or whole of the service and the information 
          contained therein whether in print or soft copies without the prior written permission of the QCare Foundation.     
          </Typography><br/>
          <Typography variant="small">
          QCare Foundation  reserves the right to remove offensive, malicious, inaccurate or otherwise misleading information published by the User on the website.    
          </Typography><br/>
            </Grid>
            <Grid item xs={12}>
            <Typography variant="h6"  className={classes.textHeadingColor}>
            Testimonial submission  
          </Typography>
          <Typography variant="small"  className={classes.textHContent}>
          If you submit a testimonial to us, then you agree that we may publish your testimonial, together with your name/company name or logo of the company you 
          represent at the moment, on this website, as we may determine in our sole discretion.      
          </Typography><br/>
          <Typography variant="small">
          You further agree that we may edit the testimonial and publish edited or partial versions of the testimonial. However, we will never edit a testimonial in 
          such a way as to create a misleading impression of your views.     
          </Typography><br/>
            </Grid>
            <Grid item xs={12}>
            <Typography variant="h6"  className={classes.textHeadingColor}>
            Settlement of disputes  
          </Typography>
          <Typography variant="small"  className={classes.textHContent}>
          These Terms constitute the entire agreement between QCare Foundation and the User in relations to User’s use of the Service, and supersede 
          all prior agreements and understandings.
           These Terms will be governed by and interpreted in accordance with the laws of The Federal Republic of Nigeria for the resolution of any disputes.       
          </Typography><br/>
          <Typography variant="small">
          Any failure to exercise the rights granted herein does not mean that the QCare Foundation waives its rights to enforce these rights.      
          </Typography><br/>
          <Typography variant="small">
          Should any dispute arise from this contractual relationship, all parties hereby undertake to seek a friendly settlement before going to court.      
          </Typography><br/>
          <Typography variant="small">
          Should the parties not reach a friendly settlement, they hereby accept to submit their actions to the exclusive jurisdiction of the courts of The Federal Republic of Nigeria.      
          </Typography><br/>
            </Grid>
            <Grid item xs={12}>
            <Typography variant="h6"  className={classes.textHeadingColor}>
            Correspondence  
          </Typography>
          <Typography variant="small"  className={classes.textHContent}>
          Any correspondence should be addressed to:       
          </Typography><br/>
          <Typography variant="small">
          INSIQ Professional Services Limited,      
          </Typography><br/>
          <Typography variant="small">
          59A Akinogunmade Davies Close      
          </Typography><br/>
          <Typography variant="small">
          Gbagada phase II Estate      
          </Typography><br/>
          <Typography variant="small">
          Gbagada Lagos      
          </Typography><br/>
            </Grid>
          </Grid>
          </Paper>
        </Container>
      </Dialog>
    </div>
  );
}
