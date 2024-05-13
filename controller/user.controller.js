const userService = require("../service/user.service")


class UserController {
  async userInfo(ctx, next) {

    // 使用正则表达式匹配name参数的值
    const regex = /name=([^&]+)/;
    const match = ctx.url.match(regex);

    // 如果匹配成功，match[1]将包含name参数的值
    const nameValue = match ? match[1] : null;
    const [result] = await userService.getUserInfoByName(nameValue)
    console.log(result)
    ctx.body = result
    await next()
  }
}

module.exports = new UserController()