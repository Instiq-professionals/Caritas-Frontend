const isValidFirstName = (firstName) => {
  return /^[a-zA-Z]{2,}$/.test(firstName);
};

const isValidLastName = (lastName) => {
  return /^[a-zA-Z]+$/.test(lastName);
};

const isValidEmail = (email) => {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const isValidPassword = (password) => {
  return /^(.){4,}$/.test(password);
};

const isValidCauseTitle = (title) => {
  return /^.{5,}$/.test(title);
};

const isValidBriefDescription = (briefDescription) => {
  return /^.{5,}$/.test(briefDescription);
};

const isValidFunds = (funds) => {
  return /^[\d]{4,}$/.test(funds);
};

const isValidPhoneNumber = (phone) => {
  return /^(\+234)?(0)?[\d]{10}|(234)?(0)?[\d]{10}|[0][\d]{10}$/.test(phone);
};

const isValidVolunteer = (volunteerParameters) => {
  return /^[a-zA-Z]+$/.test(volunteerParameters);
}

export {
  isValidFirstName,
  isValidLastName,
  isValidEmail,
  isValidPassword,
  isValidCauseTitle,
  isValidBriefDescription,
  isValidFunds,
  isValidPhoneNumber,
  isValidVolunteer
};
