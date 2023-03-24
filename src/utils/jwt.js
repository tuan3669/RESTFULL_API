const jwt = require('jsonwebtoken');
// const createError = require('http-errors');

require('dotenv').config();
const signAccessToken = async (data) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      data,
      process.env.JWT_SECRET,
      {
        expiresIn: '180s',
      },
      function (error, token) {
        if (error) reject(error);
        resolve(token);
      }
    );
  });
};
const verifyAccessToken = (req, res, next) => {
  try {
    const headers = req?.headers?.authorization;
    const token = headers?.split(' ')[1];
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decode;
    next();
  } catch (error) {
    return res.status(403).json({
      message: 'access token not valid or expired',
    });
  }
};

const checkPermission = (permission) => {
  return function (req, res, next) {
    if (!req.user) res.status(401);

    // admin thì cứ full
    if (req?.user?.role === 'admin' || (permission && req?.user?.permissions.includes(permission)))
      return next();
    return res.status(403).json({
      error: `permission invalid ,${permission} is required`,
    });
  };
};
const checkRole = (role) => {
  return function (req, res, next) {
    // admin thì full quyền
    if (!req.user) res.status(401);

    if (req?.user?.role === 'admin' || role === req?.user?.role) return next();
    return res.status(403).json({
      error: `role admin or ${role} required`,
    });
  };
};
module.exports = { signAccessToken, verifyAccessToken, checkRole, checkPermission };
