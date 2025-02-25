const express = require("express");
const { getAccounts, updateAccount} = require("../../controllers/traduction.controller");
const { upload } = require("../../middleware/uploadFile");
const router = express.Router();

router.get("/", getAccounts);

router.put("/:id", updateAccount);



module.exports = router;