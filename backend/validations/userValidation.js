import Joi from 'joi'
import { Role } from '../constants/enum'

const checkUpdateReq = Joi.object({
  name: Joi.string().required().max(255),
  phone: Joi.string().required().max(10),
  email: Joi.string()
    .pattern(new RegExp(/^[a-zA-Z0-9.-_]+@devplus.edu.v[n]$/))
    .required()
    .max(255),
  role: Joi.string().required().valid('Staff', 'Admin'),
})

export const userValidation = {
  checkUpdateReq,
}
