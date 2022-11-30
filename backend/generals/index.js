export class Helper {
  static responseJsonHandler(error, data, expressResponse) {
    let obj = { error: error, data: data }
    if (obj.error) {
      expressResponse.json(obj.error)
    } else {
      expressResponse.json(obj.data)
    }
  }
}

export class ResponseBase {
  static responseJsonHandler(data, expressResponse, str) {
    expressResponse.json({
      status: 200,
      message: str + ' Successful',
      data: data,
    })
  }
}
