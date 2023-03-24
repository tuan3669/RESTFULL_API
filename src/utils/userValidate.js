const Joi = require('joi');

const registerValidation = (data) => {
  const userSchema = Joi.object({
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'vn'] } })
      .required(),
    password: Joi.string().min(3).required(),
    userName: Joi.string().required(),
    roles: Joi.string(),
  });
  return userSchema.validate(data);
};
const loginValidation = (data) => {
  const userSchema = Joi.object({
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'vn'] } })
      .required(),
    password: Joi.string().min(3).required(),
  });
  return userSchema.validate(data);
};

module.exports = {
  registerValidation,
  loginValidation,
};
