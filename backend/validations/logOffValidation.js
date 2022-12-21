const Joi = require('joi').extend(require('@joi/date'))

const logOffReq = Joi.object({
  logofffrom: Joi.date().format('YYYY-MM-DD').required(),
  logoffto: Joi.date().format('YYYY-MM-DD').required(),
  reason: Joi.string().required(),
  quantity: Joi.number().integer().required(),
  contentlog: Joi.string().required(),
  status: Joi.any(),
  time: Joi.any(),
  comment: Joi.any(),
})

export const logOffValidation = {
  logOffReq,
}
