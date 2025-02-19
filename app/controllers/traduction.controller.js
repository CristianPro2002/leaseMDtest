const { response, resError, fileHelper } = require("../helpers");
require("dotenv").config();
const ProductsModel = require("../model/Products");

/**
 * @description
 * @route GET /api/v1/accounts/
 * @access public
 */
const getAccounts = async (req, res, next) => {
  try {
    const responseData = await ProductsModel.getAccounts();
    response(res, 200, responseData);
  } catch (error) {
    return resError(res, 500, error.message);
  }
};

module.exports = {
  getAccounts,
};
