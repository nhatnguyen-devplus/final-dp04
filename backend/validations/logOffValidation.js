const Joi = require('joi').extend(require('@joi/date'))

const logOffReq = Joi.object({
  logofffrom: Joi.date().format('YYYY-MM-DD').required(),
  logoffto: Joi.date().format('YYYY-MM-DD').required(),
  reason: Joi.string().required(),
  quantity: Joi.required(),
  contentlog: Joi.string().required(),
  status: Joi.string().required(),
})

export const logOffValidation = {
  logOffReq,
}
