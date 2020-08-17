import React, { useState, useEffect } from "react";
import { Grid, Tabs, Tab, Container } from "@material-ui/core";
import { Colors } from "../../constants";
import { CauseItem } from "../";
import { getAllCauses } from "../../services/cause.service";
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import * as actions from '../../store/actions/index';

const CausesTabs = (props) => {
  const [tab, setTab] = useState(0);
  let [allCauses, setAllCauses] = useState([]);
  const causesByCategory = props.data;

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

  useEffect(() => {
    props.getAllCausesByCategory('Food');
  },[]);

  const handleTabChange = (value) => {
    setTab(value);
  };

  return (
    <Container>
      <Grid item md={12} style={{ marginBottom: "50px" }}>
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
          <Tab label="Food" style={{ textTransform: "none" }} onClick={() => props.getAllCausesByCategory('Food')}/>
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
                        boxSizing: "border-box",
                      }}
                    >
                      Many causes are currently undergoing review post launching
                      of this platform. This section will be updated.
                    </div>
                  )}
                </Grid>
              )}
              
      </Grid>
    </Container>
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

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(CausesTabs));
