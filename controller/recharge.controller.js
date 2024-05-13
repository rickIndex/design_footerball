const rechargeService = require("../service/recharge.service")
const userService = require("../service/user.service")
const { tokenGenerate, tokenParse } = require("../utils/tokenHandlers")

class RechargeController {
  async recharge(ctx, next) {
    const { id, name } = ctx.userInfo
    const { amount, status, orderNo } = ctx.orderInfo

    console.log('cccc', ctx.userInfo.id)
    console.log('bbbbbb', id, amount, status, orderNo)
    const result = await rechargeService.recharge(amount, orderNo, id, status)
    console.log('aaaa', result)
    if (result.insertId) {
      if (status) {
        const [userInfo] = await userService.getUserInfoByName(name)
        const newAmount = (+userInfo.amount) + amount
        await userService.updateUserAmount(newAmount, id)
        const token = tokenGenerate({ id, name, newAmount })
        console.log('token', token)
        ctx.body = {
          message: '充值成功',
          token
        }
        await next()
      } else {
        ctx.status = 400
        ctx.body = '充值失败'
        await next()
      }
    }
  }
}

module.exports = new RechargeController()