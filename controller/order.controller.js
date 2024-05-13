const orderService = require("../service/order.service")
const userService = require("../service/user.service")

class OrderController {
  async create(ctx, next) {
    console.log(ctx.orderInfo, ctx.userInfo)
    const { status, orderNo, stadiumId } = ctx.orderInfo
    const { id: userId } = ctx.userInfo
    await orderService.create(status, orderNo, userId, stadiumId, 15)
    ctx.body = orderNo
    await next()
  }
  async finish(ctx, next) {
    const { orderNo } = ctx.orderInfo
    const { name, id } = ctx.userInfo
    const result = await orderService.finish(orderNo)

    if (result.affectedRows) {
      const [userInfo] = await userService.getUserInfoByName(name)
      await userService.updateUserAmount((+userInfo.amount) - 15, id)
    }
    ctx.body = 'order finish'
    await next()
  }
  async userList(ctx, next) {
    const { id } = ctx.userInfo
    console.log(id)
    const result = await orderService.userList(id)
    ctx.body = result;
    await next()
  }
}

module.exports = new OrderController()