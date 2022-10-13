const {BookModel} = require("../model/bookModel");
const {validBook} = require("../validation/bookValid");

exports.bookCtrl = {
    getAll : async (req, res) => {
        let perPage = Math.min(req.query.perPage, 20) || 10;
        let page = req.query.page || 1;
        let sort = req.query.sort || "_id";
        let reverse = req.query.reverse == "yes" ? -1 : 1
        try {
            let books = await BookModel
                .find({})
                .limit(perPage)
                .skip((page - 1) * perPage)
                .sort({[sort]:reverse})
            res.json(books);
        }
        catch (err) {
            console.log(err);
            res.status(500).json({ err: err });
        }
    },
    search : async (req, res) => {
        let perPage = Math.min(req.query.perPage, 20) || 10;
        let page = req.query.page || 1;
        try {
            let searchQ = req.query.s;
            let searchReg = new RegExp(searchQ, "i");
            let books = await BookModel.find({ $or: [{ name: searchReg }, { info: searchReg }] })
                .limit(perPage)
                .skip((page - 1) * perPage)
            res.json(books);
        }
        catch (err) {
            console.log(err);
            res.status(500).json({ err: err });
        }
    },
    searchC : async (req, res) => {
        let perPage = Math.min(req.query.perPage, 20) || 10;
        let page = req.query.page || 1;
        try {
            let searchQ = req.params.catname;
            let searchReg = new RegExp(searchQ, "i");
            let books = await BookModel.find({ category: searchReg })
                .limit(perPage)
                .skip((page - 1) * perPage)
            res.json(books);
        }
        catch (err) {
            console.log(err);
            res.status(500).json({ err: err });
        }
    },
    price : async (req, res) => {
        let perPage = Math.min(req.query.perPage, 20) || 10;
        let page = req.query.page || 1;
        try {
            let min = req.query.min;
            let max = req.query.max;
            let books = await BookModel.find({ $and: [{ price: { $gte: min } }, { price: { $lte: max } }] })
                .limit(perPage)
                .skip((page - 1) * perPage)
            res.json(books);
        }
        catch (err) {
            console.log(err);
            res.status(500).json({ err: err });
        }
    },
    post :async (req, res) => {
        let validBody = validBook(req.body);
        if (validBody.error) {
            return res.status(400).json(validBody.error.details)
        }
        try {
            let book = new BookModel(req.body);
            book.user_id = req.tokenData._id;
            book.save();
            res.status(201).json(book);
        }
        catch (err) {
            console.log(err);
            res.status(500).json({ err: err });
        }
    },
    edit : async (req, res) => {
        try {
            let idEdit = req.params.idEdit;
            let data;
            if (req.tokenData.role === "admin") {
                data = await BookModel.updateOne({ _id: idEdit },req.body);
            }
            else {
                data = await BookModel.updateOne({ _id: idEdit, user_id: req.tokenData._id },req.body);
            }
            res.json(data);
        }
        catch (err) {
            console.log(err)
            res.status(400).json({ err })
        }
    },
    delete : async (req, res) => {
        try {
            let idDel = req.params.idDel;
            let data;
            if (req.tokenData.role === "admin") {
                data = await BookModel.deleteOne({ _id: idDel });
            }
            else {
                data = await BookModel.deleteOne({ _id: idDel, user_id: req.tokenData._id });
            }
            res.json(data);
        }
        catch (err) {
            console.log(err)
            res.status(400).json({ err })
        }
    }
}