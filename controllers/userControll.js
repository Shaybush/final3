const {UserModel} = require("../model/userModel");
const bcrypt = require("bcrypt");

exports.userCtrl = {
    allUsers : async (req, res) => {
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
    },
    accountInfo : async (req, res) => {
        try {
            // req.tokenData._id -> comming from middleware auth
            let user = await UserModel.findOne({ _id: req.tokenData._id }, { password: 0 })
            res.json(user);
            //  res.json({msg:"all good 3333" , data:req.tokenData })
        }
        catch (err) {
            console.log(err)
            res.status(500).json({ msg: "err", err })
        }
    },
    editAdmin : async (req, res) => {
        try {
            let idEdit = req.params.idEdit;
            let data;
            if(req.tokenData.role === "admin"){
                data = await UserModel.updateOne({ _id: idEdit }, req.body)
            }
            else if (idEdit === req.tokenData._id){
                data = await UserModel.updateOne({ _id: idEdit }, req.body)
            }
            if(!data){
                return res.status(400).json({ err : "cannot delete user" })
            }
            let user = await UserModel.findOne({_id:idEdit});
            user.password = await bcrypt.hash(user.password, 10);
            await user.save()
            res.status(200).json({ msg: data })
        }
        catch (err) {
            console.log(err);
            res.status(400).json({ err })
        }
    },
    edit : async(req,res)=>{
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
            user.email = user.email.toLowerCase();
            await user.save()
            res.status(200).json({ msg: data })
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
            // delete user
            if (req.tokenData.role === "admin"){
                 data = await UserModel.deleteOne({ _id: idDel });
            }
            else if (idDel === req.tokenData._id){
                 data = await UserModel.deleteOne({ _id: idDel });
            }
            //delete books of that user
            if (!data) {
                return res.status(400).json({ err: "cannot delete user" })
            }
            // await BookModel.deleteMany({ user_id: idDel });
            res.json(200).json({msg:data + "user deleted"});
        }
        catch (err) {
            console.log(err);
            res.status(500).json({ err })
        }
    }
}