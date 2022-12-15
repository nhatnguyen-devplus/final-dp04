import { workSpaceRepositories } from '../repositories'
import { NotiRepositories } from '../repositories/notiRepositories'

const createMany = async (userFrom, userTo, description) => {
  const workspace = await workSpaceRepositories.getList()

  const data = userTo.map((item) => {
    return {
      from: userFrom,
      to: item,
      description: description,
      hrchanel: workspace.hrchanel || null,
      dayoffchanel: workspace.dayoffchanel || null,
    }
  })

  await NotiRepositories.createMany(data)
}

export const notiService = {
  createMany,
}
