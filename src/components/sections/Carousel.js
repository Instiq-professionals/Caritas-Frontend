import React from "react";
import { Carousel } from "react-responsive-carousel";
import clsx from "clsx";
import { Paper, Slider, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Colors , baseUrl} from "../../constants";
import Naira from 'react-naira';

const useStyles = makeStyles((theme) => ({

}));

export default (props) => {
  const classes = useStyles();
  return (
    <Carousel autoPlay>
      {props.children}
    </Carousel>
  );
}
