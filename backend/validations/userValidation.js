import Joi from 'joi'

const checkUpdateReq = Joi.object({
  name: Joi.string().required().max(255),
  phone: Joi.string()
    .pattern(new RegExp(/^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/))
    .required()
    .min(10)
    .max(10),
  email: Joi.string()
    .pattern(new RegExp(/^[a-zA-Z0-9.-_]+@[a-zA-Z0-9.-]+.[a-zA-Z.]*$/))
    .required()
    .max(255),
})

export const userValidation = {
  checkUpdateReq,
}
