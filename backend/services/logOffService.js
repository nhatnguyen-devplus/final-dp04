import { logOffRepositories } from '../repositories'

const create = async (requestLogOff) => {
  try {
    return logOffRepositories.create(requestLogOff)
  } catch (error) {
    throw error
  }
}

export const logOffService = {
  create,
}
