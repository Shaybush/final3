const mongoose = require('mongoose');
const Joi = require('joi');
// type pysic remote 
const bookSchema = new mongoose.Schema({
    name:String,
    author:String,
    type:{
        type:String,default:"physics"
    },
    info:String,
    category:String,
    img_url:String,
    price:Number,
    date_created:{
        type:Date,default:Date.now()
    },
    user_id:String
})

exports.BookModel = mongoose.model("books",bookSchema);

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