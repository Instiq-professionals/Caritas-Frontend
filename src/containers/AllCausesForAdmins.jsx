import React from 'react';
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ArrowBackSharpIcon from '@material-ui/icons/ArrowBackSharp';
import { Colors } from "../constants";
import Zoom from "@material-ui/core/Zoom";
import { PrimaryAppBar, TableaCard } from "../commons";
import {  AdminsCausesTable } from "../components";

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop:120,
        marginRight:'2%',
        marginLeft:'2%',
          "& .MuiGrid-justify-xs-center": {
        justifyContent: 'start'
    },
      },
      content: {
        marginTop: theme.spacing(2),
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        padding: theme.spacing(2),
      },
      icon: {
        paddingTop:20
      }
  }));

const ViewALLCauses = () => {
    const classes = useStyles()
  return (
      <>
      <PrimaryAppBar/>
    <Zoom in={true} timeout={1000}>
      <div className={classes.root}>
        <div className={classes.content}>
          <TableaCard
            title="Causes table"
            subtitle="Listing all causes"
          >
            <Grid container justify="center">
            <Grid item sm={12}>
              <div className={classes.icon}>
                <ArrowBackSharpIcon
                  onClick={() => {
                    window.location = `/dashboard`;
                  }}
                />
             </div>
              </Grid>
              <Grid item sm={12} style={{ minHeight: 400 }}>
                <Typography variant="h3" align="center">
                  <AdminsCausesTable />
                </Typography>
              </Grid>
            </Grid>
          </TableaCard>
        </div>
      </div>
    </Zoom>
    </>
  )
}

export default ViewALLCauses
