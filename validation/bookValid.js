const Joi = require('joi');

exports.validBook = _reqBody =>{
    let joiSchema = Joi.object({
        name:Joi.string().min(2).max(200).required(),
        author:Joi.string().min(2).max(200).required(),
        type:Joi.string().min(2).max(200).allow(null,""),
        info:Joi.string().min(2).max(3000).required(),
        category:Joi.string().min(2).max(200).required(),
        price:Joi.number().min(2).max(200).required(),
        img_url:Joi.string().min(2).max(3000).allow(null,""),
    })
    return joiSchema.validate(_reqBody);
}