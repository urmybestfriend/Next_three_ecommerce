import Joi from "joi-browser"

export const validation = (formdata, schema) => {
  const result = Joi.validate(formdata, schema, { abortEarly: false })
  if (!result.error) return null

  const errors = {}
  for (let item of result.error.details) errors[item.path[0]] = item.message
  return errors
}

module.exports = validation
