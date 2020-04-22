import { Routes } from "../constants";
import axios from "axios";
import { getToken } from "../helpers/utils";

const getAllCauses = async () => {
  return await axios
    .get(
      Routes.all_causes,

      { "Content-Type": "application/json" }
    )
    .then((res) => {
      console.log("All causes gotten", res.data.data);
      return res.data.data;
    })
    .catch((err) => {
      return err;
    });
};

const getAllCausesAsModerator = async () => {
  console.log("Moderator fetching causes");
  return await axios({
    method: "get",
    url: Routes.moderator_all_causes,

    headers: { "x-auth-token": getToken() },
  })
    .then((res) => {
      console.log("All causes gotten by moderator", res.data.data);
      return res.data.data;
    })
    .catch((err) => {
      console.log("Moderator fetching error", err.response);
      return err;
    });
};

const approveACause = async (id) => {
  console.log("Moderator Approving cause");
  return await axios({
    method: "put",
    url: Routes.approve_cause + (id ? id : ""),
    data: { isApproved: 1 },
    headers: { "x-auth-token": getToken() },
  })
    .then((res) => {
      console.log("Result of approving cause", res.data.data);
      return res;
    })
    .catch((err) => {
      console.log("Moderator approval error", err.response);
      return err.response;
    });
};

const rejectACause = async (reason) => {
  console.log("Moderator Rejecting a cause");
  return await axios({
    method: "put",
    url: Routes.approveACause,
    data: { isApproved: 0, reason_for_rejection: reason },
    headers: { "x-auth-token": getToken() },
  })
    .then((res) => {
      console.log("Result of rejecting cause", res.data.data);
      return res.data.data;
    })
    .catch((err) => {
      console.log("Moderator rejecting error", err.response);
      return err;
    });
};

const getCause = async (id) => {
  return await axios
    .get(
      `${Routes.get_cause}${id !== "úndefined" ? id : ""}`,

      { "Content-Type": "application/json" }
    )
    .then((res) => {
      console.log("The cause gotten", res.data.data);
      return res.data.data;
    })
    .catch((err) => {
      return err;
    });
};

const createCause = async (cause) => {
  let formData = new FormData();
  formData.append("cause_title", cause.causeTitle);
  formData.append("amount_required", parseInt(cause.amountRequired));
  formData.append("brief_description", cause.briefDescription);
  formData.append("charity_information", cause.charityInformation);
  formData.append("additional_information", cause.additionalInformation);
  formData.append("category", cause.category);
  formData.append("cause_photos", cause.uploadFiles.image1);
  if (cause.uploadFiles.image2) {
    formData.append("cause_photos", cause.uploadFiles.image2);
  }
  if (cause.uploadFiles.image3) {
    formData.append("cause_photos", cause.uploadFiles.image3);
  }
  if (cause.uploadFiles.image4) {
    formData.append("cause_photos", cause.uploadFiles.image4);
  }
  if (cause.uploadFiles.image5) {
    formData.append("cause_photos", cause.uploadFiles.image5);
  }
  if (cause.uploadFiles.image6) {
    formData.append("cause_photos", cause.uploadFiles.image6);
  }

  formData.append("cause_video", cause.uploadFiles.video1);
  formData.append("account_number", 1000000000);
  formData.append(
    "accept_comments_and_reviews",
    cause.causeOptions.enableComments
  );
  formData.append("watch_cause", cause.causeOptions.enableWatching);
  formData.append("cause_fund_visibility", cause.causeOptions.fundStatus);
  formData.append(
    "share_on_social_media",
    cause.causeOptions.socialMediaSharing
  );

  return await axios({
    method: "post",
    url: Routes.ceate_cause,
    data: formData,
    headers: {
      "Content-Type": "multipart/formdata",
      "x-auth-token": getToken(),
    },
  })
    .then((res) => {
      console.log("All causes gotten", res.data.data);
      return res;
    })
    .catch((err) => {
      return err;
    });
};

export {
  getAllCauses,
  createCause,
  getCause,
  getAllCausesAsModerator,
  approveACause,
  rejectACause,
};
