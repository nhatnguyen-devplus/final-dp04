import { TypeHistory } from '../constants/enum'
import { Helper, ResponseBase } from '../generals'
import { logOffRepositories, userRepositories, workSpaceRepositories } from '../repositories'
import { slackTemplate } from '../templates/slackTemplate'
import { WebClient } from '@slack/web-api'

const token = process.env.SLACK_TOKEN
const web = new WebClient(token)

const sendNotiLogOff = async (req) => {
  const workspace = await workSpaceRepositories.getList()
  const channels = workspace[0].hrchannel.concat(workspace[0].dayoffchannel)
  const user = await userRepositories.getOne(req.user)
  const logOff = await logOffRepositories.getOne(req.idlogoff)
  console.log(workspace)
  try {
    await Promise.all(
      channels.map(async (item) => {
        if (req.typelog === TypeHistory.CREATE) {
          await web.chat.postMessage({
            scopes: ['chat:write:bot'],
            text: slackTemplate.createRequest(req, user),
            channel: item.slackId,
          })
        } else if (req.typelog === TypeHistory.APPROVE) {
          await web.chat.postMessage({
            scopes: ['chat:write:bot'],
            text: slackTemplate.approve(req, user, logOff),
            channel: item.slackId,
          })
        } else {
          await web.chat.postMessage({
            scopes: ['chat:write:bot'],
            text: slackTemplate.anotherSTT(req, user, logOff),
            channel: item.slackId,
          })
        }
      })
    )
  } catch (err) {
    return Helper.responseJsonHandler(err, null, res)
  }
}

const getChannels = async (req, res) => {
  try {
    const result = await web.conversations.list()

    return ResponseBase.responseJsonHandler(result, res, 'Get list users')
  } catch (err) {
    return Helper.responseJsonHandler(err, null, res)
  }
}

export const slack = {
  getChannels,
  sendNotiLogOff,
}
