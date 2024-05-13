const fileService = require("../service/file.service")

const verifyRead = async (ctx, next) => {
  const { filename } = ctx.request.params

  // console.log(filename)

  const [fileInfo] = await fileService.getFileInfoByFileName(filename)

  console.log(fileInfo)

  ctx.fileInfo = fileInfo

  await next()
}

module.exports = {
  verifyRead
}