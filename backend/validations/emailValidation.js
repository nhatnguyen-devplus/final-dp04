import Joi from 'joi'

const checkEmail = Joi.object({
  email: Joi.string()
    .pattern(new RegExp(/^[a-zA-Z0-9.-_]+@devplus.edu.v[n]$/))
    .required()
    .max(255),
})

export const emailValidation = {
    checkEmail,
}
