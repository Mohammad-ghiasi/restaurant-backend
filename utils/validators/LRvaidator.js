const Schema = require("validate");

const registerUserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    match: /^.{6,}$/, // Minimum 6 characters
    message: "Password must be at least 6 characters long.",
  },
  phonenumber: {
    type: String,
    required: true,
    match: /^09\d{9}$/, // Iranian phone number pattern
    message: "Phone number must be a valid Iranian mobile number.",
  },
});

const registerUserValidate = (obj) => {
  return registerUserSchema.validate(obj);
};

module.exports = registerUserValidate;
