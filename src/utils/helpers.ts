import bcrypt from "bcrypt-nodejs"
import { IncomingHttpHeaders } from "http";
const getToken = (headers: IncomingHttpHeaders) => {
  if (headers && headers.authorization) {
    const parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};

const hashPassword = (password: string) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

const comparePassword = (password1: string, password2: string, cb: Function) => {
  bcrypt.compare(password1, password2, (err, isMatch) => {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
}

const validateEmail = (email: string) => {
  const mailFormat: RegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;
  return mailFormat.test(email)
}

export { getToken, hashPassword, comparePassword, validateEmail }