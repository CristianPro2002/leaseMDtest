const resError = (res, statusCode = 400, message) => {
    res.status(statusCode).json({
        error: true,
        statusCode,
        message,
    });
};

module.exports = resError;