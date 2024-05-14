const express = require("express");
const router = express.Router();

router.get("/",  function(req, res, next){
    res.render("users", {text: "You are so cool"})
})

module.exports = router;