const errorHandler = (err, req, res, next) => {
    const status = req.statusCode || 500;
    res.status(status);
    res.send({
        status,
        message: err.message,
        stack: process.env.NODE_ENV !== 'production' ? err.stack : null
    });
};
export default errorHandler;
//# sourceMappingURL=errorHandler.js.map