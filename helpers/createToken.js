const {config} =require('../config/secret');
const jwt = require('jsonwebtoken');

exports.createToken = (_id,role) => {
    return jwt.sign({_id,role},config.tokenSecret,{expiresIn:"60mins"})
}