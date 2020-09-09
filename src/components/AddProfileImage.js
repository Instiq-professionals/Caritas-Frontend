import React, { Component } from "react";
import { Colors } from "../constants";
import { isAuthenticated, getAuthenticatedUser } from "../helpers/utils";

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
    cursor: "pointer",
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
  profileAvatar: {
    width: "100%",
    height: "100%",
    // position: "absolute",
    zIndex: 200,
  },
  profileAvatarMobile: {
    width: "100%",
    height: "100%",
    display: "block",
    margin: "auto",
    textAlign: "center",
    marginBottom: "80px",
  },
};

class AddProfileImage extends Component {
  constructor(props) {
    super(props);
    this.Ref = React.createRef();
    this.handleClick = this.handleClick.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.state = {
      image: props.image,
    };
  }

  handleClick() {
    this.Ref.current.click();
  }

  handleOnChange(event) {
    const TheFile = event.target.files[0];
    this.props.setImage(TheFile);
    // this.props.file = TheFile;

    if (TheFile) {
      var reader = new FileReader();

      reader.onload = () => {
        this.setState({
          image: reader.result,
        });
      };

      reader.readAsDataURL(event.target.files[0]);
    }
  }

  render() {
    const { item, title, text, img } = styles;
    return (
      <div
        style={{
          width: "100%",
          height: "336px",
          backgroundImage: this.state.backgroundImage,
          backgoundSize: "cover",
          backgroundRepeat: "no-repeat",
          overflow: "hidden",
          position: "relative",
        }}
        onClick={this.handleClick}
      >
        <img
          src={this.state.image?this.state.image:this.props.getImage}
          alt={isAuthenticated() ? getAuthenticatedUser().first_name : ""}
          style={
            window.innerWidth > 768
              ? styles.profileAvatar
              : styles.profileAvatarMobile
          }
        />

        {(this.state.image === "/assets/images/icons/upload-image.png" ||
          this.state.image === undefined) && (
          <p
            style={{
              position: "absolute",
              left: "0px",
              top: "45%",
              width: "100%",
              color: "#787878",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            Add photo
          </p>
        )}
        <input
          type="file"
          name={this.props.filename}
          style={{ display: "none" }}
          ref={this.Ref}
          onChange={this.handleOnChange}
        />
      </div>
    );
  }
}

export default AddProfileImage;
