module.exports = function errorMiddleware(err, req, res, next) {
    console.error(err.message);
    res.status(404).send('Lỗi! Không tìm thấy trang.');
};
