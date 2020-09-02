import React from 'react';
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DashboardRoundedIcon from '@material-ui/icons/DashboardRounded';
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
        position: 'relative',
        left: '50%',
        top: '54px'
      }
  }));

const ViewALLCauses = () => {
    const classes = useStyles()
  return (
      <>
      <PrimaryAppBar/>
    <Zoom in={true} timeout={1000}>
      <div className={classes.root}>
        <div className={classes.icon}>
        <DashboardRoundedIcon 
          onClick={() => {
            window.location = `/dashboard`;
          }}
        />
        </div>
        <div className={classes.content}>
          <TableaCard
            title="Causes table"
            //subtitle="Une liste de toutes vos transactions jusqu'à présent"
          >
            <Grid container justify="center">
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
