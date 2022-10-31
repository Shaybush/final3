const {UserModel} = require("../model/userModel");
const bcrypt = require("bcrypt");
const {createToken} = require("../helpers/createToken");
const {UserValid} = require("../validation/userValid")
exports.authCtrl = {
    register : async (req, res) => {
        let validBody = UserValid.user(req.body);
        if (validBody.error) {
            return res.status(400).json(validBody.error.details);
        }
        try {
            let user = new UserModel(req.body);
            user.password = await bcrypt.hash(user.password, 10);
            user.email = user.email.toLowerCase();
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
    },
    login : async (req, res) => {
        let validBody = UserValid.login(req.body);
        if (validBody.error) {
            return res.status(400).json(validBody.error.details);
        }
        try {
            let user_email = req.body.email.toLowerCase();
            let user = await UserModel.findOne({ email: user_email });
            if (!user) {
                return res.status(401).json({ msg: "Password or email is worng ,code:1" })
            }
            let authPassword = await bcrypt.compare(req.body.password, user.password);
            if (!authPassword) {
                return res.status(401).json({ msg: "Password or email is worng ,code:2" })
            }
            let newToken = createToken(user._id, user.role);
            res.json({ token: newToken, role : user.role});
        }
        catch (err) {
            console.log(err);
            res.status(500).json({ err: err });
        }
    }
}