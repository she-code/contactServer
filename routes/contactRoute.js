const express = require("express");
const contactController = require("../controllers/contactController");
const authenticateJwt = require("../middelwares/authenticateJwt");
const router = express.Router();

router.post("/create", authenticateJwt, contactController.createContact);
router.patch("/:id/update", authenticateJwt, contactController.updateContact);
router.delete("/:id/delete", authenticateJwt, contactController.deleteContact);
router.get(
  "/getAllContacts",
  authenticateJwt,
  contactController.getAllContactsByCreator
);
router.get("/:id", authenticateJwt, contactController.getContact);
module.exports = router;
