const createError = require('http-errors');
const User = require('../models/user');
const asyncHandler = require('express-async-handler');
const { registerValidation, loginValidation } = require('../utils/userValidate');
const { signAccessToken } = require('../utils/jwt');
const register = asyncHandler(async (req, res, next) => {
  const { email } = req.body;
  const { error } = registerValidation(req.body);

  if (error) {
    throw createError.BadRequest(error.details[0].message);
  }

  const isExist = await User.findOne({ email });
  if (isExist) throw createError.Conflict('email đã tồn tại rồi');
  const user = await User.create(req.body);
  res.status(201).json({
    code: 201,
    user,
  });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const { error } = loginValidation(req.body);

  if (error) {
    throw createError.BadRequest(error.details[0].message);
  }
  // /poppulated
  const user = await User.findOne({ email })
    .populate({
      path: 'roles',
      model: 'Role',
      select: 'name -_id',
      populate: {
        path: 'permissions',
        model: 'Permission',
        select: 'name -_id',
      },
    })
    .select('userName password roles _id');

  try {
    const userObject = user.toObject({ flattenMaps: true });

    const permissions = userObject.roles[0].permissions.map((per) => per.name);
    const formatUserData = {
      id: userObject._id,
      role: userObject.roles[0].name,
      permissions,
    };

    if (!user) throw createError.NotFound('Email này chưa đươc đăng ký');
    const checkPassword = await user.comparePassword(password);
    if (!checkPassword) throw createError.Unauthorized();
    const accessToken = await signAccessToken(formatUserData);
    res.status(200).json({
      code: 200,
      accessToken,
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = {
  register,
  login,
};
