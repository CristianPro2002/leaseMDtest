const { response, resError, fileHelper } = require("../helpers");
require("dotenv").config();
const ProductsModel = require("../model/Products");

/**
 * @description
 * @route GET /api/v1/accounts/
 * @access public
 */
const getAccountsFisica = async (req, res, next) => {
  try {
    const responseData = await ProductsModel.getAccountsFisica();
    response(res, 200, responseData);
  } catch (error) {
    return resError(res, 500, error.message);
  }
};

/**
 * @description
 * @route GET /api/v1/accounts/
 * @access public
 */
const getAccountsMoral = async (req, res, next) => {
  try {
    const responseData = await ProductsModel.getAccountsMoral();
    response(res, 200, responseData);
  } catch (error) {
    return resError(res, 500, error.message);
  }
};

const updateAccount = async (req, res, next) => {
  try {
    const { id } = req.params;
    const responseData = await ProductsModel.updateAccount(id, req.body);
    response(res, 200, responseData);
  } catch (error) {
    return resError(res, 500, error.message);
  }
};

const updateAccountQa = async (req, res, next) => {
  try {
    const { id } = req.params;
    const responseData = await ProductsModel.updateAccountQa(id, req.body);
    response(res, 200, responseData);
  } catch (error) {
    return resError(res, 500, error.message);
  }
};

const getAccountsFisicaQa = async (req, res, next) => {
  try {
    const responseData = await ProductsModel.getAccountsFisicaQa();
    response(res, 200, responseData);
  } catch (error) {
    return resError(res, 500, error.message);
  }
};

const getAccountsMoralQa = async (req, res, next) => {
  try {
    const responseData = await ProductsModel.getAccountsMoralQa();
    response(res, 200, responseData);
  } catch (error) {
    return resError(res, 500, error.message);
  }
};

module.exports = {
  getAccountsFisica,
  getAccountsMoral,
  updateAccount,
  updateAccountQa,
  getAccountsFisicaQa,
  getAccountsMoralQa
};
