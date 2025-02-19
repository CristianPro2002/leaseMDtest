const express = require("express");
const { getAccounts} = require("../../controllers/traduction.controller");
const { upload } = require("../../middleware/uploadFile");
const router = express.Router();

router.get("/", getAccounts);



module.exports = router;