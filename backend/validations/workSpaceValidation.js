import Joi from 'joi'

const workSpaceReq = Joi.object({
  name: Joi.string().required().max(255),
  hrchannel: Joi.array().items().required(),
  dayoffchannel: Joi.array().items().required(),
})

export const workSpaceValidation = {
  workSpaceReq,
}
