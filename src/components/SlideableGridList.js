import React from "react";
import clsx from "clsx";
import {
  Grid,
  GridList,
  GridListTile,
  GridListTileBar,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { AddItem } from "./";
import { baseUrl } from "../constants";
import { Link } from "react-router-dom";
import { processPhoto } from "../helpers/utils";

const useStyles = makeStyles((theme) => ({
  listImage: {
    height: "100%",
  },
  gridlist: {
    flexWrap: "nowrap",
    padding: "50px 0px 0px 0px",
    overflowX: "hidden",
  },
  listTile: {
    borderRadius: "15px",
    overflow: "hidden",
    margin: "0px 5px",
  },
  listTileAdd: {
    display: "flex",
    width: "250px",
    height: "100%",
    alignItems: "center",
    boxShadow: "2px 2px 5px rgba(0,0,0,.2) !important",
    padding: "20px",
  },
  titlebar: {
    backgroundColor: "transparent",
    textShadow: "0px 0px 8px rgba(0,0,0,.9)",
  },
  scrollButton: {
    position: "absolute",
    padding: "5px",
    borderRadius: "50%",
    boxShadow: "2px 2px 8px rgba(0,0,0,.5) !important",
    backgroundColor: "white",
    display: "inline-block",
    width: "20px",
    height: "20px",
    textAlign: "center",
    top: "90px",
    "&:hover": {
      boxShadow: "0px 0px 5px 5px rgba(255,0,0,.2)",
    },
    cursor: "pointer",
  },
  scrollLeft: { left: "-10px" },
  scrollRight: { left: "calc(100% - 5px)" },
}));

const SlideableGridList = (props) => {
  const classes = useStyles();
  const isEmpty = props.causes.length === 0;
  return (
    <Grid container>
      <Grid item xs={12} style={{ position: "relative" }}>
        <GridList
          cellHeight={130}
          className={classes.gridlist}
          cols={props.cols}
        >
          {!isEmpty &&
            props.causes.map((aCause, index) => (
              <GridListTile
                key={`gridlist-${index}`}
                className={classes.listTile}
              >
                <Link to={"/cause/" + aCause._id}>
                  <img
                    // src={processPhoto(aCause.cause_photos[0])}
                    src={baseUrl + aCause.cause_photos}
                    alt={aCause.cause_title}
                    className={classes.listImage}
                  />
                </Link>
                <GridListTileBar
                  key={`gridlist-${index}`}
                  title={aCause.cause_title}
                  className={classes.titlebar}
                />
              </GridListTile>
            ))}
          {isEmpty && (
            // <GridListTile key={`gridlist-add`}>
            <AddItem label={props.label} />
            // </GridListTile>
          )}
        </GridList>
        {!isEmpty && (
          <>
            <div className={clsx(classes.scrollLeft, classes.scrollButton)}>
              <img
                src="/assets/images/icons/scrollleft.png"
                alt="scroll left"
              />
            </div>
            <div className={clsx(classes.scrollRight, classes.scrollButton)}>
              <img
                src="/assets/images/icons/scrollright.png"
                alt="scroll right"
              />
            </div>
          </>
        )}
      </Grid>
    </Grid>
  );
};

export default SlideableGridList;
