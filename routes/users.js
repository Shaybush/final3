const express = require('express');
const { auth, admin } = require("../middleware/auth")
const { userCtrl } = require('../controllers/userControll');
const router = express.Router();
// get all users
router.get("/", admin, userCtrl.allUsers);
// show user info
router.get("/myInfo", auth,userCtrl.accountInfo )
// register user
router.post("/",userCtrl.register )
// login user and send token
router.post("/login",userCtrl.login)
//admin can set other user as admin
router.put("/setAdmin/:idEdit", auth, userCtrl.editAdmin)
router.put("/:idEdit",auth,userCtrl.edit)
// delete user and all his books 
router.delete("/:idDel", auth, userCtrl.delete)

module.exports = router;