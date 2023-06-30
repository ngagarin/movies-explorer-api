const clearToken = (req, res, next) => {
  res.clearCookie('jwt');
  next();
};

module.exports = {
  clearToken,
};
