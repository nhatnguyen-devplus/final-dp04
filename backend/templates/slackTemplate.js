import moment from 'moment'

const createRequest = (req, user) => {
  return `New request ${req.contentlog}\n>*Name*: ${user.name} \n>*From*: ${moment(req.logofffrom).format(
    'DD/MM/YYYY'
  )}\n>*To*: ${moment(req.logoffto).format('DD/MM/YYYY')}\n>*Reason*: ${req.reason}`
}

const approve = (req, user, logOff) => {
  return `${user.name} ${req.typelog} ${logOff.user.name}'s request\n>*Name*: ${user.name} \n>*From*: ${moment(
    req.logofffrom
  ).format('DD/MM/YYYY')}\n>*To*: ${moment(req.logoffto).format('DD/MM/YYYY')}\n>*Reason*: ${
    logOff.reason
  }\n*Approval:* ${logOff.approval.length}/${logOff.masters.length}`
}

const anotherSTT = (req, user, logOff) => {
  return `${user.name} ${req.typelog} ${logOff.user.name}'s request\n>*Name*: ${user.name} \n>*From*: ${moment(
    req.logofffrom
  ).format('DD/MM/YYYY')}\n>*To*: ${moment(req.logoffto).format('DD/MM/YYYY')}\n>*Reason*: ${
    logOff.reason
  }\n*Comment* ${req.reason}`
}

export const slackTemplate = {
  approve,
  createRequest,
  anotherSTT,
}
