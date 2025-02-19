const response = (res, statusCode, data) => {
    res.status(statusCode).json({
        error: false,
        statusCode,
        data,
    });
};

module.exports = response;