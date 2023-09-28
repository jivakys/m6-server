const express = require("express");
const authController = require("../controllers/authController");
const router = express.Router();
const auth = require("../utils/auth");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/user", auth, authController.getUser);
module.exports = router;
