import React from "react";
import { Carousel } from "react-responsive-carousel";
import { makeStyles } from "@material-ui/core/styles";


export default (props) => {
  return (
    <Carousel autoPlay>
      {props.children}
    </Carousel>
  );
}
