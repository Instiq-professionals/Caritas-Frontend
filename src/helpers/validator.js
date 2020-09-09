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

const isValidPhoneOrEmail = (regCredentials) => {
  const validEmail = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
  const validPhone = /^(\+234)?(0)?[\d]{10}|(234)?(0)?[\d]{10}|[0][\d]{10}$/;

  if(regCredentials.match(validEmail)){
    // return as email
    return validEmail.test(String(regCredentials).toLowerCase())
  }
  if(regCredentials.match(validPhone)){
    // return as phone
    return validPhone.test(regCredentials)
  }

  return false
  // return re.test(String(email).toLowerCase());
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
  isValidPhoneOrEmail,
  isValidVolunteer
};
