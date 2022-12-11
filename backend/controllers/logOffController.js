const { Helper, ResponseBase } = require('../generals')
const { logOffService } = require('../services')

const create = async (req, res) => {
  const logOffCreateReq = req.body
  try {
    const newLogOff = await logOffService.create(logOffCreateReq)
    return ResponseBase.responseJsonHandler(newLogOff, res, 'Create log off')
  } catch (error) {
    return Helper.responseJsonHandler(error, null, res)
  }
}

export const logOffController = {
  create,
}
