const Joi = require("joi");

const orderValidation = Joi.object({
      product: Joi.string().min(1),
      items: Joi.array(),
      user: Joi.string(),
      totalAmount: Joi.number().precision(2).min(1)
  });

  const validateUpdateOrder = Joi.object({
        product: Joi.string().min(1),
        items: Joi.array(),
        user: Joi.string(),
        totalAmount: Joi.number().precision(2).min(1)
});

module.exports = { 
  orderValidation,
  validateUpdateOrder
 };
