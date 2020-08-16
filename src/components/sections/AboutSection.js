import React from "react";
import { Container, Typography, Slide } from "@material-ui/core";
import { FancyShape, useStyles } from "../../helpers";

const AboutSection = () => {
  const classes = useStyles();
  return (
    <section className={classes.about} id="about">
      <Container style={{ position: "relative" }}>
        <Slide in={true} direction="up" timeout={2000} mountOnEnter>
          <img
            src="/assets/images/young_mother.jpeg"
            alt=""
            className={classes.aboutImage}
            id="aboutImage"
          />
        </Slide>
        <Slide in={true} direction="right" timeout={2000} mountOnEnter>
          <div className={classes.aboutText}>
            <FancyShape style={{ display: "inline-block" }}>About</FancyShape>
            <Typography
              variant="h4"
              component="h6"
              style={{ marginTop: "30px" }}
            >
              The Charity that you can Trust.
            </Typography>
            <Typography
              variant="body1"
              component="p"
              style={{ marginTop: "30px", fontSize: "14px" }}
            >
              We are a Nigerian not-for-profit platform that allows people to
              get assistance for justified causes ranging from medical
              assistance, education support, food supplies to challenging
              circumstances like human rights advocacy. The initiative is
              currently fully funded by{" "}
              <a href="https://www.instiq.com">InstiQ</a> - A tech company that
              is currently revolutionizing African tech space with solution
              presence in about twenty(20) African countries. The company is
              committed to using part of her revenue and encourages others to
              partner with her in order to make significant impacts in the lives of people.
            </Typography>
          </div>
        </Slide>
        <Slide in={true} direction="right" timeout={2000} mountOnEnter>
          <div className={classes.aboutFooter}>
            <Stat
              src="/assets/images/icons/briefcase-icon.png"
              total="10+"
              label="Medical support"
            />
            <Stat
              src="/assets/images/icons/mortar-icon.png"
              total="20+"
              label="Educational supplies"
            />
            <Stat
              src="/assets/images/icons/balance-icon.png"
              total="0+"
              label="Human rights cases"
            />
            <Stat
              src="/assets/images/icons/spanner-icon.png"
              total="30+"
              label="Food"
            />
          </div>
        </Slide>
      </Container>
    </section>
  );
};

const Stat = (props) => {
  const theClasses = {
    root: {
      flex: 1,
      color: "white",
      textAlign: "center",
      margin: "0px 10px",
    },
    src: {
      display: "block",
      margin: "auto",
      width: "40px",
      marginBottom: 10,
    },
    p: {
      margin: 0,
      fontSize: 12,
    },
  };

  const { root, src, p } = theClasses;

  return (
    <div style={root}>
      <img style={src} src={props.src} alt="" />
      <p style={p}>{props.total}</p>
      <p style={p}>{props.label}</p>
    </div>
  );
};

export default AboutSection;
