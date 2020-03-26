var bcrypt = require('bcrypt-nodejs');
const getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};

const hashPassword = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}

const comparePassword = function (password1, password2,cb) {
  bcrypt.compare(password1, password2, function (err, isMatch) {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
}

const validateEmail=function (email) {
  const mailFormat=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;
  return mailFormat.test(email)
}

module.exports = { getToken, hashPassword, comparePassword ,validateEmail }