const multer = require('@koa/multer')
const { v4 } = require('uuid')
const path = require('node:path')
const { AVATR_IS_REQUIRED } = require('../error/errorTypes')

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './uploads')
    },
    filename: (req, file, cd) => {
      cd(null, v4() + path.extname(file.originalname),)
    }
  })
})

const uploadAvatar = upload.single('avatar')

const verifyUploadAvatar = async (ctx, next) => {
  const { file } = ctx.request

  console.log(file)

  if (!file) {
    return ctx.app.emit('error', new Error(AVATR_IS_REQUIRED), ctx)
  }

  ctx.avatarInfo = file

  await next()
}


module.exports = {
  uploadAvatar,
  verifyUploadAvatar
}