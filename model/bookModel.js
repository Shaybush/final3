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