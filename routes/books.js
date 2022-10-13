const express = require('express');
const { bookCtrl } = require('../controllers/bookControll');
const { auth } = require("../middleware/auth");
const router = express.Router();
//get all the books 
router.get("/", bookCtrl.getAll)
// smart search url/search?s=""
router.get("/search", bookCtrl.search)
// search by category
router.get("/category/:catname", bookCtrl.searchC)
// url/prices?min=10&max=40
router.get("/price", bookCtrl.price)
// post book with token
router.post("/", auth, bookCtrl.post)
// edit book with token
router.put("/:idEdit", auth, bookCtrl.edit)
// delete book with token
router.delete("/:idDel", auth, bookCtrl.delete)

module.exports = router;