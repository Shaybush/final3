const jwt = require("jsonwebtoken");
const { config } = require('../config/secret');
const { UserModel } = require("../model/userModel");
/** check if the user got token */
exports.auth = async (req, res, next) => {
  let token = req.header("x-api-key")
  if (!token) {
    return res.status(401).json({ msg: "You need to send token to this endpoint url 2222" })
  }
  try {
    let tokenData = jwt.verify(token, config.tokenSecret);
    req.tokenData = tokenData
    next()
  }
  catch (err) {
    return res.status(401).json({ msg: "Token not valid or expired 22222" })
  }
}
/** check if the user is admin */
exports.admin = async (req, res, next) => {
  let token = req.header("x-api-key")
  if (!token) {
    return res.status(401).json({ msg: "You need to send token to this endpoint url 2222" })
  }
  try {
    let decodeToken = jwt.verify(token, config.tokenSecret);
    // req.decodeToken = decodeToken
    if (decodeToken.role !== 'admin') {
      return res.status(400).json({ err: "not an admin" })
    }
    req.decodeToken = decodeToken;
    next();
  }
  catch (err) {
    return res.status(401).json({ msg: "user is not admin" })
  }
}