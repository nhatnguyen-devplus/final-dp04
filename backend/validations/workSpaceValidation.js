import Joi from 'joi'

const workSpaceReq = Joi.object({
  name: Joi.any(),
  hrchannel: Joi.array().items().required(),
  dayoffchannel: Joi.array().items().required(),
})

export const workSpaceValidation = {
  workSpaceReq,
}
