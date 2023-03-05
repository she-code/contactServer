const express = require("express");
const userController = require("../controllers/userController");
const authenticateJwt = require("../middelwares/authenticateJwt");
const router = express.Router();
router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/me", authenticateJwt, userController.me);

module.exports = router;
