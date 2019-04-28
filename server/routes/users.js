var express = require('express');
var router = express.Router();

//user controller functions
var userController = require("../controllers/users");


//Express user commands
router.get("/users",userController.getUser);

router.post("/users", userController.createUser);

router.post("/users/login", userController.loginUser);

module.exports = router;





