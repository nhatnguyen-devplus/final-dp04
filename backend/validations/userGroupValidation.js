import Joi, { any } from 'joi'

const createUserGroup = Joi.object({
  name: Joi.string().required().max(255),
  staffs: Joi.any(),
  masters: Joi.any(),
})

export const userGroupValidation = {
  createUserGroup,
}
