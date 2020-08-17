import React from "react";
import { Container, Typography, Grid } from "@material-ui/core";
import { FancyShape, FancyButton, useStyles } from "../../helpers";
import { HowItWorks } from "../";
import { Colors } from "../../constants";
import { Link } from "react-router-dom";

const HowItWorksSection = () => {
  const classes = useStyles();
  return (
    <section className={classes.howItWorks}>
      <Container>
        <FancyShape>How it works</FancyShape>
        <Typography
          variant="body1"
          component="p"
          style={{
            marginTop: 10,
            fontSize: "12px",
            width: "300px",
            marginBottom: "50px",
          }}
        >
          Here is how charity projects are vetted and Approved on QCare.
          <br />
          <span style={{ color: Colors.appRed }}>Please note:</span> For food
          support during COVID-19 pandemic, the initiative is fully sponsored by
          InstiQ hence approval is done immediately after the cause is uploaded
          and the beneficiaries will receive help.
        </Typography>
        <Grid container spacing={4} style={{ display: "flex" }}>
          <Grid item xs={4}>
            <HowItWorks
              image="/assets/images/icons/account-icon.png"
              step="Create An Account."
            />
          </Grid>
          <Grid item xs={4}>
            <HowItWorks
              image="/assets/images/icons/upload-icon.png"
              step="Upload A Cause Or Event"
            />
          </Grid>
          <Grid item xs={4}>
            <HowItWorks
              image="/assets/images/icons/category-icon.png"
              step="The Cause Get Reviewed"
            />
          </Grid>
          <Grid item xs={4}>
            <HowItWorks
              image="/assets/images/icons/vote-icon.png"
              step="Upon Review by our professionals within 24 Hours"
            />
          </Grid>
          <Grid item xs={4}>
            <HowItWorks
              image="/assets/images/icons/notification.png"
              step="You will get notification of Approval message"
            />
          </Grid>
          <Grid item xs={4}>
            <HowItWorks
              image="/assets/images/icons/help.png"
              step="Help is delivereed to you"
            />
          </Grid>
          <Grid item xs={6} md={4} style={{ marginLeft: "30px" }}>
            <Typography
              variant="h5"
              component="h5"
              style={{ fontWeight: "bold", marginBottom: "10px" }}
            >
              Have a Cause in Mind?
            </Typography>
            <Typography
              variant="body1"
              component="p"
              style={{ fontSize: "10px", marginBottom: "10px" }}
            >
              Tell your story or stories of people in your community that needs
              urgent help. All you need to do is to share the details after
              registration on this platform. We are committed to impacting your
              lives positively.
            </Typography>
            <Link to="/signup">
              <FancyButton
                label="Sign Up to get Started"
                style={{ width: "100% !important" }}
              />
            </Link>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
};

export default HowItWorksSection;
