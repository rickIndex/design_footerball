const wrapperMiddleware = async (ctx) => {
  const { body, status } = ctx

  ctx.body = {
    code: status === 200 ? 200 : -1,
    data: body,
    message: status == 200 ? 'success' : ctx.message
  }
}

module.exports = {
  wrapperMiddleware
}