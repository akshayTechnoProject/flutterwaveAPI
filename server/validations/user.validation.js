const Joi = require('joi');

const createUser = {
  body: Joi.object().keys({
    name : Joi.string().required(),
    username : Joi.string().required(),
    country_code : Joi.string().required(),
    phone_number : Joi.string().required(),
    email : Joi.string().email().required(),
    password : Joi.string().min(6).required(),
  }),
};

module.exports = {
  createUser,
};