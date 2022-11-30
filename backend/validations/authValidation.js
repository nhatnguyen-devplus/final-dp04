import Joi from 'joi'

const checkCreateReq = Joi.object({
  name: Joi.string().required().max(255),
  phone: Joi.string().required().max(10),
  email: Joi.string()
    .pattern(new RegExp(/^[a-zA-Z0-9.-]+@[a-zA-Z0-9.-]+.[a-zA-Z.]*$/))
    .required()
    .max(255),
  password: Joi.string().required().min(6).max(12),
})

export const authValidation = {
  checkCreateReq,
}
