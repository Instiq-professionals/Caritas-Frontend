import React, {Fragment} from "react";
import { makeStyles } from "@material-ui/styles";
import { Grid, Typography } from "@material-ui/core";
import Minimal from "../components/Minimal";
import { PrimaryAppBar } from "../commons";

const useStyles = makeStyles(theme => ({
  root: {
    padding: 40
  },
  content: {
    paddingTop: 150,
    textAlign: "center"
  },
  image: {
    marginTop: 50,
    display: "inline-block",
    maxWidth: "100%",
    width: 560
  }
}));

const NotFound = () => {
  const classes = useStyles();

  return (
    <Fragment>
    <PrimaryAppBar
      position="fixed"
      className={classes.appbar}
    ></PrimaryAppBar>
    <Minimal>
      <div className={classes.root}>
        <Grid container justify="center" spacing={4}>
          <Grid item lg={6} xs={12}>
            <div className={classes.content}>
              <Typography variant="h3">
                404: The page you are looking for isn’t here
              </Typography>
              <Typography variant="subtitle2">
                You either tried some shady route or you came here by mistake.
                Whichever it is, try using the navigation
              </Typography>
              <img
                alt="Under development"
                className={classes.image}
                src="https://blog.architecting.it/wp-content/uploads/2016/02/404image.png"
              />
            </div>
          </Grid>
        </Grid>
      </div>
    </Minimal>
</Fragment>
  );
};

export default NotFound;
