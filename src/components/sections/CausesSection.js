import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Slide,
  Grid,
  Tabs,
  Tab,
  Zoom,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { FancyShape, useStyles } from "../../helpers";
import { Colors } from "../../constants";
import { Link } from "react-router-dom";
import { CauseItem } from "../";
import { getAllCauses } from "../../services/cause.service";
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import * as actions from '../../store/actions/index';

const causes = [
  {
    id: 2,
    image: "/assets/images/classroom1.png",
    category: "Health",
    title: "Saint Johns School Needs Renovation",
    currency: "$",
    contribution: 200000,
    target: 400000,
    desc: `Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                        sed diam nonumy eirmod tempor invidunt ut labore et
                        dolore magna aliquyam erat, sed diam voluptua.`,
  },
  {
    id: 3,
    image: "/assets/images/classroom1.png",
    category: "Health",
    title: "Saint Johns School Needs Renovation",
    currency: "$",
    contribution: 200000,
    target: 400000,
    desc: `Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                        sed diam nonumy eirmod tempor invidunt ut labore et
                        dolore magna aliquyam erat, sed diam voluptua.`,
  },
];

const CausesSection = (props) => {
  const classes = useStyles();
  useEffect(() => {
    props.getAllCausesByCategory('Food');
  },[]);

  const [tab, setTab] = useState(0);
  const [allCauses, setAllCauses] = useState([]);
  const causesByCategory = props.data;

  const handleTabChange = (value) => {
    setTab(value);
  };

  const fetchAllCauses = async () => {
    return await getAllCauses();
  };

  useEffect(() => {
    async function setTheCauses() {
      let returnedCauses = await fetchAllCauses();
      if (Array.isArray(returnedCauses)) setAllCauses(returnedCauses);
      else setAllCauses([]);
    }
    setTheCauses();
  }, []);
 console.log('gbilz.....',allCauses)
  return (
    <section className={classes.corona}>
      <Container>
        <Zoom in={true} timeout={3000} mountOnEnter>
          <Grid item container>
            <Grid item md={6} className={classes.causesSection}>
              <Typography
                variant="h6"
                component="h6"
                className={classes.sectionTitle}
              >
                Coronavirus Food &amp; Medical Assistance Relief
              </Typography>
              <Typography
                variant="body1"
                component="p"
                style={{ fontSize: 14, marginBottom: 32, marginTop: 32 }}
              >
                As COVID-19 continues to spread in Africa, more individuals and
                communities are feeling the impact on their daily lives. Beyond
                the global health crisis, the coronavirus is having a severe
                economic impact on individuals, small businesses, organizations,
                and governments. There is an urgent need for medical supplies,
                basic food items, financial support for families especially the
                indigent and the vulnerable in our communities. We are here to
                help, please register and log a case for food support to get
                speedy help from our QCare team. This is currently open to states
                with lockdown restrictions in Nigeria.
              </Typography>
              <Link to="/signup">
                <FancyShape>Sign Up to get Started</FancyShape>
              </Link>
            </Grid>
            <Grid item md={5} className={classes.justCoronaImage}>
              <img
                src="/assets/images/corona.png"
                alt=""
                style={{ width: "100%" }}
              />
            </Grid>
          </Grid>
        </Zoom>
        <Slide in={true} direction="up" timeout={3000} mountOnEnter>
          <Grid
            container
            style={{ paddingTop: "100px", paddingBottom: "200px" }}
          >
            <Typography
              variant="h6"
              component="h6"
              className={classes.sectionTitle}
            >
              Do the Five - Help stop Corona Virus
            </Typography>
            <Grid item xs={12} style={{ display: "flex", flexWrap: "wrap" }}>
              <Precautions
                src="/assets/images/icons/hands.png"
                body="HANDS"
                direction="Wash them often"
              />
              <Precautions
                src="/assets/images/icons/elbow.png"
                body="ELBOW"
                direction="Cough into it"
              />
              <Precautions
                src="/assets/images/icons/nosemask.jpeg"
                body="FACE"
                direction="Wear a nose mask"
              />
              <Precautions
                src="/assets/images/icons/distance.png"
                body="SPACE"
                direction="Keep safe distance"
              />
              <Precautions
                src="/assets/images/icons/home.png"
                body="HOME"
                direction="Stay if you can"
              />
            </Grid>
          </Grid>
        </Slide>
        <Slide in={true} direction="up" timeout={3000} mountOnEnter>
          <Grid container>
            <Grid item md={6}>
              <Typography
                variant="h6"
                component="h6"
                className={classes.sectionTitle}
                style={{ marginBottom: "0px" }}
              >
                Ongoing Causes
              </Typography>
              <Typography
                variant="body2"
                component="p"
                style={{ marginBottom: "50px" }}
              >
                Here are the top causes for today
              </Typography>
            </Grid>
            <Grid item sm={12} md={6} style={{ textAlign: "right" }}>
              <Link to="/causes" style={{ float: "right" }}>
                See all
              </Link>
            </Grid>
            <Grid
              item
              md={12}
              style={{ marginBottom: "50px", overflowX: "auto" }}
            >
              <Tabs
                value={tab}
                indicatorColor="primary"
                textColor={Colors.appBlack}
                onChange={(tab, index) => handleTabChange(index)}
              >
                <Tab label="All" style={{ textTransform: "none" }} />
                <Tab label="Education" style={{ textTransform: "none" }} onClick={() => props.getAllCausesByCategory('Education')}/>
                <Tab label="Health" style={{ textTransform: "none" }} onClick={() => props.getAllCausesByCategory('Health')}/>
                <Tab label="Human Rights" style={{ textTransform: "none" }} onClick={() => props.getAllCausesByCategory('Human Rights')} />
                <Tab label="Food" style={{ textTransform: "none" }}  onClick={() => props.getAllCausesByCategory('Food')}/>
              </Tabs>
              {tab === 0 && (
                <Grid
                  container
                  spacing={3}
                  style={{
                    padding: 50,
                    display: "flex",
                    flexWrap: "no-wrap !important",
                  }}
                >
                  {allCauses.map((cause, index) => (
                    <Grid item>
                      <CauseItem cause={cause} key={`cause-${cause._id}`}>
                        {cause.brief_description}
                      </CauseItem>
                    </Grid>
                  ))}
                  {allCauses.length === 0 && (
                    <div
                      style={{
                        backgroundColor: "rgba(255,255,255,.5)",
                        boxShadow: "2px 2px 5px rgba(0,0,0,.2)",
                        borderRadius: "10px",
                        padding: "16px",
                        width: "300px",
                        display: "block",
                        margin: "auto",
                        boxSizing: "border-box",
                      }}
                    >
                      Many causes are currently undergoing review post launching
                      of this platform. This section will be updated.
                    </div>
                  )}
                </Grid>
              )}
              {tab === 1 && (
                <Grid
                  container
                  spacing={3}
                  style={{
                    padding: 50,
                    display: "flex",
                    flexWrap: "no-wrap !important",
                  }}
                >
                  {causesByCategory.map((cause, index) => (
                    <Grid item>
                      <CauseItem cause={cause} key={`cause-${cause._id}`}>
                        {cause.brief_description}
                      </CauseItem>
                    </Grid>
                  ))}
                  {causesByCategory.length === 0 && (
                    <div
                      style={{
                        backgroundColor: "rgba(255,255,255,.5)",
                        boxShadow: "2px 2px 5px rgba(0,0,0,.2)",
                        borderRadius: "10px",
                        padding: "16px",
                        width: "300px",
                        display: "block",
                        margin: "auto",
                        boxSizing: "border-box",
                      }}
                    >
                      Many causes are currently undergoing review post launching
                      of this platform. This section will be updated.
                    </div>
                  )}
                </Grid>
              )}
              {tab === 2 && (
                <Grid
                  container
                  spacing={3}
                  style={{
                    padding: 50,
                    display: "flex",
                    flexWrap: "no-wrap !important",
                  }}
                >
                  {causesByCategory.map((cause, index) => (
                    <Grid item>
                      <CauseItem cause={cause} key={`cause-${cause._id}`}>
                        {cause.brief_description}
                      </CauseItem>
                    </Grid>
                  ))}
                  {causesByCategory.length === 0 && (
                    <div
                      style={{
                        backgroundColor: "rgba(255,255,255,.5)",
                        boxShadow: "2px 2px 5px rgba(0,0,0,.2)",
                        borderRadius: "10px",
                        padding: "16px",
                        width: "300px",
                        display: "block",
                        margin: "auto",
                      }}
                    >
                      Many causes are currently undergoing review post launching
                      of this platform. This section will be updated.
                    </div>
                  )}
                </Grid>
              )}
              {tab === 3 && (
                <Grid
                  container
                  spacing={3}
                  style={{
                    padding: 50,
                    display: "flex",
                    flexWrap: "no-wrap !important",
                  }}
                >
                  {causesByCategory.map((cause, index) => (
                    <Grid item>
                      <CauseItem cause={cause} key={`cause-${cause._id}`}>
                        {cause.brief_description}
                      </CauseItem>
                    </Grid>
                  ))}
                  {causesByCategory.length === 0 && (
                    <div
                      style={{
                        backgroundColor: "rgba(255,255,255,.5)",
                        boxShadow: "2px 2px 5px rgba(0,0,0,.2)",
                        borderRadius: "10px",
                        padding: "16px",
                        width: "300px",
                        display: "block",
                        margin: "auto",
                      }}
                    >
                      Many causes are currently undergoing review post launching
                      of this platform. This section will be updated.
                    </div>
                  )}
                </Grid>
              )}
              {tab === 4 && (
                <Grid
                  container
                  spacing={3}
                  style={{
                    padding: 50,
                    display: "flex",
                    flexWrap: "no-wrap !important",
                  }}
                >
                  {causesByCategory.map((cause, index) => (
                    <Grid item>
                      <CauseItem cause={cause} key={`cause-${cause._id}`}>
                        {cause.brief_description}
                      </CauseItem>
                    </Grid>
                  ))}
                  {causesByCategory.length === 0 && (
                    <div
                      style={{
                        backgroundColor: "rgba(255,255,255,.5)",
                        boxShadow: "2px 2px 5px rgba(0,0,0,.2)",
                        borderRadius: "10px",
                        padding: "16px",
                        width: "300px",
                        display: "block",
                        margin: "auto",
                      }}
                    >
                      Many causes are currently undergoing review post launching
                      of this platform. This section will be updated.
                    </div>
                  )}
                </Grid>
              )}
            </Grid>
          </Grid>
        </Slide>
      </Container>
    </section>
  );
};
const useStyles2 = makeStyles((theme) => ({
  rootClass: {
    width: "200px !important",
    color: "white",
    textAlign: "center",
    display: "inline !important",
    margin: "20px",
  },
  src: {
    display: "block",
    margin: "auto",
    height: "60px",
    marginBottom: 10,
  },
  body: {
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 12,
    color: "black",
    marginBottom: "0px",
  },
  direction: {
    margin: 0,
    fontSize: 10,
    color: Colors.appBlack,
  },
}));
const Precautions = (props) => {
  const classes = useStyles2();

  return (
    <div className={classes.rootClass}>
      <img className={classes.src} src={props.src} alt="" />
      <p className={classes.body}>{props.body}</p>
      <p className={classes.direction}>{props.direction}</p>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    loading : state.getAllCausesByCategory.loading,
    data: state.getAllCausesByCategory.causes?state.getAllCausesByCategory.causes.data:[],
    error: state.getAllCausesByCategory.error,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    getAllCausesByCategory : (category) => dispatch(actions.getAllCausesByCategory(category)),
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(CausesSection));
