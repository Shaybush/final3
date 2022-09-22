const express = require('express');
const { UserModel, validUser, createToken, validLogin } = require('../model/userModel')
const { BookModel } = require('../model/bookModel')
const { auth, admin } = require("../middleware/auth")
const bcrypt = require('bcrypt')
const router = express.Router();
// get all users
router.get("/", async (req, res) => {
    let perPage = Math.min(req.query.perPage, 20) || 10;
    let page = req.query.page || 1;
    let sort = req.query.sort || "_id";
    let reverse = req.query.reverse == "yes" ? -1 : 1;
    try {
        let users = await UserModel
            .find({}, { password: 0 })
            .limit(perPage)
            .skip((page - 1) * perPage)
            .sort({ [sort]: reverse })
        res.json(users);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ err: err });
    }
})
// show user info
router.get("/myInfo", auth, async (req, res) => {
    try {
        // req.tokenData._id -> מגיע מפונקציית האוט שנמצאת בשרשור
        let user = await UserModel.findOne({ _id: req.tokenData._id }, { password: 0 })
        res.json(user);
        //  res.json({msg:"all good 3333" , data:req.tokenData })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ msg: "err", err })
    }
})
// register user
router.post("/", async (req, res) => {
    let validBody = validUser(req.body);
    if (validBody.error) {
        return res.status(400).json(validBody.error.details);
    }
    try {
        let user = new UserModel(req.body);
        user.password = await bcrypt.hash(user.password, 10);
        await user.save();
        user.password = "*****";
        res.status(201).json(user);
    }
    catch (err) {
        if (err.code == 11000) {
            return res.status(500).json({ msg: "Email already in system, try log in", code: 11000 })
        }
        console.log(err);
        res.status(500).json({ err: err });
    }
})
// login user and send token
router.post("/login", async (req, res) => {
    let validBody = validLogin(req.body);
    if (validBody.error) {
        return res.status(400).json(validBody.error.details);
    }
    try {
        let user = await UserModel.findOne({ email: req.body.email });
        if (!user) {
            return res.status(401).json({ msg: "Password or email is worng ,code:1" })
        }
        let authPassword = await bcrypt.compare(req.body.password, user.password);
        if (!authPassword) {
            return res.status(401).json({ msg: "Password or email is worng ,code:2" })
        }
        let newToken = createToken(user._id, user.role);
        res.json({ token: newToken });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ err: err });
    }
})
//admin can set other user as admin
router.put("/setAdmin/:idEdit", admin, async (req, res) => {
    try {
        let idEdit = req.params.idEdit;
        let data = await UserModel.updateOne({ _id: idEdit }, req.body)
        res.status(200).json({ msg: data })
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ err })
    }
})
router.put("/:idEdit",auth,async(req,res)=>{
    try {
        let idEdit = req.params.idEdit;
        let data;
        if (req.tokenData.role === "admin") {
            data = await UserModel.updateOne({ _id: idEdit },req.body);
        }
        else {
            data = await UserModel.updateOne({ _id: idEdit,_id: req.tokenData._id },req.body);
        }
        let user = await UserModel.findOne({_id:idEdit});
        user.password = await bcrypt.hash(user.password, 10);
        await user.save()
        res.json(data);
    }
    catch (err) {
        console.log(err)
        res.status(400).json({ err })
    }
})
// delete user and all his books 
router.delete("/:idDel", admin, async (req, res) => {
    try {
        let idDel = req.params.idDel;
        // delete user
        let data = await UserModel.deleteOne({ _id: idDel });
        //delete books of that user
        if (!data) {
            return res.status(400).json({ err: "cannot delete user" })
        }
        await BookModel.deleteMany({ user_id: idDel });
        res.json(200).json(data);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ err })
    }
})

module.exports = router;