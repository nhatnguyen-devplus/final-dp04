import Joi from 'joi'

const createUserGroup = Joi.object({
  name: Joi.string().required().max(255),
})

export const userGroupValidation = {
  createUserGroup,
}
