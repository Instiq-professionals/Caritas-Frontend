import React, { Component } from "react";
import { Paper, Hidden } from "@material-ui/core";
import { Colors } from "../constants";
import { makeStyles } from "@material-ui/core/styles";
// import "../add_cause.module.css";

const styles = {
  item: {
    width: "250px",
    height: "160px",
    display: "inline-flex",
    flexDirection: "column",
    borderRadius: "10px",
    cursor: "pointer",
    marginRight: "20px",
    marginBottom: "20px",
  },
  img: {
    height: "60px",
    display: "block",
    marginLeft: "auto",
    marginTop: "30px",
    marginRight: "auto",
  },
  "item:hover": {
    //   boxShadow: "0px 0px 10px 15px rgba(255, 0, 0, .9) !important",
    backgroundColor: Colors.appRed,
  },

  "item:hover p": {
    color: "white",
  },
  title: {
    fontSize: "10px",
    textAlign: "center",
    marginTop: "0px",
    color: Colors.appRed,
  },
  text: {
    fontSize: "10px",
    textAlign: "center",
    marginTop: "0px",
  },
};

class AddVideo extends Component {
  constructor(props) {
    super(props);
    this.Ref = React.createRef();
    this.handleClick = this.handleClick.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.state = {
      backgroundImage: "url(/assets/images/empty.png)",
    };
  }

  handleClick() {
    this.Ref.current.click();
  }

  handleOnChange(event) {
    const TheFile = event.target.files[0];
    this.props.setImage(TheFile);

    if (TheFile) {
      var reader = new FileReader();

      reader.onload = () => {
        this.setState({
          backgroundImage: "/assets/images/video.png",
        });
      };

      reader.readAsDataURL(event.target.files[0]);
    }
  }

  render() {
    const { item, title, text, img } = styles;
    return (
      <Paper style={item} onClick={this.handleClick}>
        <div
          style={{
            width: "100%",
            height: "100%",
            backgroundImage: this.state.backgroundImage,
            backgoundSize: "cover",
            backgroundRepeat: "no-repeat",
            overflow: "hidden",
          }}
        >
          <img
            src={this.state.backgroundImage}
            style={{ width: "100%" }}
            alt=""
          />
          <img style={img} src={this.props.image} alt="" />
          <p style={title}>{this.props.title}</p>
          <p style={text}>{this.props.text}</p>
          <input
            type="file"
            name={this.props.filename}
            style={{ display: "none" }}
            ref={this.Ref}
            onChange={this.handleOnChange}
          />
        </div>
      </Paper>
    );
  }
}

export default AddVideo;
