const express = require("express");
const { getAccountsFisica, getAccountsMoral, updateAccount, getAccountsFisicaQa, getAccountsMoralQa, updateAccountQa } = require("../../controllers/traduction.controller");
const { upload } = require("../../middleware/uploadFile");
const router = express.Router();

router.get("/fisica", getAccountsFisica);

router.get("/moral", getAccountsMoral);

router.put("/:id", updateAccount);

router.get("/fisica/qa", getAccountsFisicaQa);

router.get("/moral/qa", getAccountsMoralQa);

router.put("/qa/:id", updateAccountQa);



module.exports = router;