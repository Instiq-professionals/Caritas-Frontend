const host =
  process.env.NODE_ENV == "development"
    ? "http://localhost:5000/api/"
    : "https://www.qcare.ng/api/";
const baseUrl =
  process.env.NODE_ENV == "development"
    ? "http://localhost:5000/api/"
    : "https://www.qcare.ng/api/";
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
  user_home: host + "users/home",

  get_all_volunteers_for_approval: host + "users/volunteer_applicants",
  get_volunteer_details_for_approval: host + "users/volunteer_profile/",
  approve_volunteer: host + "users/approve/",
  disapprove_volunteer: host + "users/disapprove/",

  review_cause: host + "cause/review_causes",
  review_a_single_cause: host + "cause/review/", //the cause id must be appended
  approve_cause: host + "cause/approve/",  //the cause id must be appended
  disapprove_cause: host + "cause/disapprove/", //the cause id must be appended

  create_cause: host + "cause/create",
  all_causes: host + "cause",
  get_all_causes_by_a_user: host + 'cause/my_causes',
  delete_cause: host + 'cause/delete/', //the cause id must be appended
  edit_cause: host + 'cause/edit/', //the cause id must be appended
  get_cause: host + "cause/", //the cause id must be appended
  moderator_all_causes: host + "cause/approve_causes",
  fetch_all_causes_for_approval: host + "cause/approve",
  approve_cause: host + "cause/approve/", //the cause id must be appended
  disapprove_cause: host + "cause/disapprove/", //the cause id is appended
  get_causes_to_be_resolved: host + "cause/resolve",
  get_cause_to_be_resolved: host + "cause/resolve/",  //the cause id is appended
 
  verify_email: host + "users/confirm_email/", //the verification token must be appended
  forgot_password: host + "users/forgot_password",
  reset_password: host + "users/update_password/", //the reset password token must be appended
  get_profile: host + "users/profile",
  update_profile: host + "users/profile/update",
  moderator_all_users: host + "users",
  
  get_causes_by_category: host + "cause/category/",  //the cause category is appended
  create_success_story: host + "success_stories/create/", //requires the auth token 
  get_my_success_stories: host + "success_stories/my_stories", //requires the auth token 
  edit_my_success_story: host + "success_stories/edit/", //the story id must be appended
  delete_my_success_story: host + "success_stories/delete", //the story id must be appended
  get_all_success_stories: host + "success_stories/", //does not require authentication
  get_single_success_story: host + "success_stories/story/", //the cause_id must be appended and it requires no authentication

  create_an_event: host + "events", //This endpoint is for the creation of events. It is only accessible to volunteers,C.Leaders, Directors and the Chairman
  fetch_events_for_approval: host + "events/approve", //This endpoint is available only to C.Leaders
  approval_event_by_cLeader: host + "events/approve/", //the id of the event must be appended
  disapproval_event_by_cLeader: host + "events/disapprove/", //the id of the event must be appended

  fetch_all_events_by_user: host + "events/my_events",
  fetch_all_single_event: host + "events/", //This endpoint does not require authentication, the id must be appended
  edit_event: host + "events/edit/", //event creator only, the id must be appended
  delete_event: host + "events/delete/", //event creator only, the id must be appended

  close_event: host + "events/close/", //director only, the id of the event must be appended
  fetch_all_closed_event: host + "events/closed", //requires authentication

  fetch_all_event: host + "events", //This endpoint fetches all approved events and it doesnt require authentication
};

const Actions = {
  show: "SHOW",
  hide: "HIDE",
  navigate: "NAVIGATE",
  collapse: "COLLAPSE",
  switchTab: "SWITCHTAB",
};

export { Colors, Actions, Routes, baseUrl, recaptchaKey };
