const express = require("express");
const { getAccountsFisica, getAccountsMoral, updateAccount} = require("../../controllers/traduction.controller");
const { upload } = require("../../middleware/uploadFile");
const router = express.Router();

router.get("/fisica", getAccountsFisica);

router.get("/moral", getAccountsMoral);

router.put("/:id", updateAccount);



module.exports = router;