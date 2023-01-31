const Joi = require("joi");


const loginValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required().min(5),
});


const validateUser = Joi.object({
      firstName: Joi.string().min(1).required(),
      lastName: Joi.string().min(1).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(5).max(15).required(),
      country: Joi.string().min(2).required(),
      city: Joi.string().min(2).required(),
      zip: Joi.string().min(3),
      phone: Joi.string().required(),
      company: Joi.string().required()
  });

  const validateUpdateUser = Joi.object({
    firstName: Joi.string().min(1),
    lastName: Joi.string().min(1),
    email: Joi.string().email(),
    password: Joi.string().min(5).max(15),
    country: Joi.string().min(2),
    city: Joi.string().min(2),
    zip: Joi.string().min(3),
    phone: Joi.string(),
    company: Joi.string()
});

module.exports = { 
  loginValidation,
  validateUser,
  validateUpdateUser
 };
