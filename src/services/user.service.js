import { Routes } from "../constants";
import axios from "axios";
import { getToken } from "../helpers/utils";

const registerUser = async (user, image, role) => {
  var formData = new FormData();

  formData.append("reg_credential", user.reg_credential);
  formData.append("first_name", user.firstName);
  formData.append("last_name", user.lastName);
  formData.append("email", user.email);
  formData.append("phone_number", user.phone);
  formData.append("password", user.password);
  formData.append("role", role);
  formData.append("address", user.address);
  formData.append("title", user.title);
  formData.append("photo", image);
  formData.append("date_of_birth", user.dob);

  return await axios({
    method: "post",
    data: formData,
    url: Routes.register,
    // headers: {"x-auth-token": token}
  })
    .then((res) => {
      console.log({status:res.data.status,message:res.data.message});
      return {
        status:res.data.status,
        message:res.data.message
      };
    })
    .catch((err) => {
      console.log({status:err.response.data.status,message:err.response.data.message});
      return {
        status:err.response.data.status,
        message:err.response.data.message
      };
    });
};

const signinUser = async (user) => {
  return await axios
    .post(
      Routes.login,
      { email: user.email, password: user.password },
      { "Content-Type": "application/json" }
    )
    .then((res) => {
      console.log("response", res);
      console.log("Gotten token", res.headers["x-auth-token"]);
      if (res.status === 200) {
        res.data.token = res.headers["x-auth-token"];
        localStorage.setItem("user", JSON.stringify(res.data));
      }
      return res;
    })
    .catch((err) => {
      console.log(err.response);
      return err;
    });
};

const verifyUserEmail = async (token) => {
  return await axios
    .put(Routes.verify_email + token, { "Content-Type": "application/json" })
    .then((res) => {
      console.log("response", res);
      return res;
    })
    .catch((err) => {
      console.log(err.response);
      return err.response;
    });
};

const forgotPassword = async (email) => {
  return await axios
    .post(Routes.forgot_password, { email: email })
    .then((res) => {
      console.log("response", res);
      return res;
    })
    .catch((err) => {
      console.log(err.response);
      return err.response;
    });
};

const resetPassword = async (password, token) => {
  return await axios
    .put(Routes.reset_password + token, { password: password })
    .then((res) => {
      console.log("response", res);
      return res;
    })
    .catch((err) => {
      console.log(err.response);
      return err.response;
    });
};

const getProfile = async (token) => {
  return await axios({
    method: "get",
    url: Routes.get_profile,
    headers: { "x-auth-token": token },
  })
    .then((res) => {
      console.log("response", res);
      return res;
    })
    .catch((err) => {
      console.log(err.response);
      return err.response;
    });
};

const updateProfile = async (token, profile) => {
  let formData = new FormData();
  for (let x in profile) {
    formData.append([x], profile[x]);
  }

  return await axios({
    method: "post",
    data: formData,
    url: Routes.update_profile,
    headers: { "x-auth-token": token },
  })
    .then((res) => {
      console.log("response", res);
      return res;
    })
    .catch((err) => {
      console.log(err.response);
      return err.response;
    });
};

const createSuccessStory = async (cause_id, success_story) => {
  return await axios({
    method: "post",
    data: { testimonial: success_story, cause_id: cause_id },
    url: Routes.create_success_story,
    headers: { "x-auth-token": getToken() },
  })
    .then((res) => {
      console.log("response", res);
      return res;
    })
    .catch((err) => {
      console.log(err.response);
      return err.response;
    });
};

export {
  registerUser,
  signinUser,
  verifyUserEmail,
  forgotPassword,
  resetPassword,
  getProfile,
  updateProfile,
  createSuccessStory,
};
