import Joi from 'joi'
const checkEmail = Joi.object({
  email: Joi.string()
    .pattern(new RegExp(/^[a-zA-Z0-9.-_]+@devplus.edu.v[n]$/))
    .required()
    .max(255),
  iss: Joi.any(),
  azp: Joi.any(),
  aud: Joi.any(),
  sub: Joi.any(),
  hd: Joi.any(),
  email_verified: Joi.any(),
  at_hash: Joi.any(),
  name: Joi.string().required().max(255),
  picture: Joi.string(),
  given_name: Joi.any(),
  family_name: Joi.any(),
  locale: Joi.any(),
  iat: Joi.any(),
  exp: Joi.any(),
  jti: Joi.any(),
})
export const emailValidation = {
  checkEmail,
}
