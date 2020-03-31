import React, { useState } from "react";
import { Grid, Tabs, Tab, Container } from "@material-ui/core";
import { Colors } from "../../constants";
import { CauseItem } from "../";
import { causes } from "../../mock.js";

const CausesTabs = () => {
  const [tab, setTab] = useState(0);

  const handleTabChange = value => {
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
          <Tab label="Education" style={{ textTransform: "none" }} />
          <Tab label="Health" style={{ textTransform: "none" }} />
          <Tab label="Human Rights" style={{ textTransform: "none" }} />
          <Tab label="Infrastructure" style={{ textTransform: "none" }} />
        </Tabs>
        {tab === 0 && (
          <Grid
            container
            spacing={3}
            style={{
              padding: 50,
              display: "flex",
              flexWrap: "no-wrap !important"
            }}
          >
            {causes.map((cause, index) => (
              <Grid item>
                <CauseItem cause={cause}>{cause.desc}</CauseItem>
              </Grid>
            ))}
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default CausesTabs;
