const { APP_HOST, APP_PORT } = require("../env")
const uploadService = require("../service/upload.service")
const userService = require("../service/user.service")

class UploadController {
  async avatar(ctx, next) {
    const { filename, mimetype, size } = ctx.avatarInfo
    const { id } = ctx.userInfo
    const result = await uploadService.insertAvatarFile(filename, mimetype, size, id)
    if (result.insertId) {
      const avatar = `${APP_HOST}:${APP_PORT}/file/${filename}`
      await userService.updateUserAvatar(avatar, id)
    }
    ctx.body = 'upload avatar'

    await next()
  }
}

module.exports = new UploadController()