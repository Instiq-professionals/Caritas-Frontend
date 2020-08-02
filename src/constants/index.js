const host =
  process.env.NODE_ENV == "development"
    ? "http://localhost:5000/api/"
    : "https://www.qcare.ng/api/";
const baseUrl =
  process.env.NODE_ENV == "development"
    ? "http://localhost:5000/"
    : "https://www.qcare.ng/";
const recaptchaKey = "6LcZFewUAAAAADBST21gzdTFt-BBdFdlDk2H5UEY"; //shouldn't be here
const recaptchaSecret = "6LcZFewUAAAAAEMwQ7Q4eCOm5L2NyFsG-ij2CR3w"; //this too
const Colors = {
  appBackground: "#FFF5F4",
  appRed: "#FC636B",
  appGreen: "#3BE8B0",
  appOrange: "#FFB900",
  appBlue: "#0E2DD6",
  appBlack: "#707070",
  active: "#349EE8",
  navItems: "#3A3A3A",
};

const Routes = {
  register: host + "users/register",
  login: host + "users/login",

  get_all_volunteers_for_approval: host + "users/volunteer_applicants",
  get_volunteer_details_for_approval: host + "users/volunteer_profile/",
  approve_volunteer: host + "users/approve/",
  disapprove_volunteer: host + "users/disapprove/",

  review_cause: host + "cause/review_causes",
  review_a_single_cause: host + "cause/review/",

  create_cause: host + "cause/create",
  all_causes: host + "cause",
  get_all_causes_by_a_user: host + 'cause/my_causes',
  get_cause: host + "cause/", //the cause id must be appended
  moderator_all_causes: host + "cause/approve_causes",
  approve_cause: host + "cause/approve/", //the cause id must be appended
  reject_cause: host + "cause/disapprove/", //the caue id is appended

  verify_email: host + "users/confirm_email/", //the verification token must be appended
  forgot_password: host + "users/forgot_password",
  reset_password: host + "users/update_password/", //the reset password token must be appended
  get_profile: host + "users/profile",
  update_profile: host + "users/profile/update",
  moderator_all_users: host + "users",
  create_success_story: host + "success_stories/create",
};

const Actions = {
  show: "SHOW",
  hide: "HIDE",
  navigate: "NAVIGATE",
  collapse: "COLLAPSE",
  switchTab: "SWITCHTAB",
};

export { Colors, Actions, Routes, baseUrl, recaptchaKey };
