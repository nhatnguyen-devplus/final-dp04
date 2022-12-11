import { RequestLogOff } from '../schemas/requestLogOff'

const create = (logOffCreateReq) => RequestLogOff.create(logOffCreateReq)

export const logOffRepositories = {
  create,
}
