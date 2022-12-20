import Joi from 'joi'

const checkUpdateReq = Joi.object({
  name: Joi.string().required().max(255),
  phone: Joi.string().required().max(10),
  email: Joi.string()
    .pattern(new RegExp(/^[a-zA-Z0-9.-_]+@[a-zA-Z0-9.-]+.[a-zA-Z.]*$/))
    .required()
    .max(255),
  role: Joi.string().required().valid('Staff', 'Admin'),
})

export const userValidation = {
  checkUpdateReq,
}
