const Joi = require("joi");

const productValidation = Joi.object({
      name: Joi.string().min(1).required(),
      price: Joi.number().precision(2).min(1).required(),
      quantity: Joi.number().required(),
      isAvailable: Joi.boolean().required()
  });

  const validateUpdateProduct = Joi.object({
        name: Joi.string().min(1),
        price: Joi.number().precision(2).min(1),
        quantity: Joi.number(),
        isAvailable: Joi.boolean()
});

module.exports = { 
  productValidation,
  validateUpdateProduct
 };
