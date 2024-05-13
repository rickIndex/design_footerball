const connection = require('../sql')
class OrderService {
  //创建订单
  async create(status, orderNo, userId, stadiumId, amount) {
    const statement = 'INSERT INTO `order` (`status`, orderNo, userId, stadiumId, amount) VALUES (?, ?, ?, ?, ?);'
    const [result] = await connection.execute(statement, [status, orderNo, userId, stadiumId, amount])
    return result
  }

  //得到用户是否已存在订单
  async getOrderList(userId, stadiumId) {
    const statement = 'SELECT * FROM `order` WHERE userId = ? AND stadiumId = ? AND status = 1;'
    const [result] = await connection.execute(statement, [userId, stadiumId])
    return result
  }

  //得到所有的订单项
  async getAllList() {
    const statement = 'SELECT * FROM `order`;'
    const [result] = await connection.execute(statement)
    return result
  }

  async userList(userId) {
    const statement = `SELECT 
        o.id, o.\`status\`, o.orderNo, o.amount, o.createAt, o.updateAt,
        JSON_OBJECT('id', s.id, 'name', s.name, 'address', s.address) stadium
      FROM \`order\` o 
      LEFT JOIN \`user\` u ON o.userId = u.id
      LEFT JOIN \`stadium\` s ON o.stadiumId = s.id
      WHERE userId = ?
      ORDER BY o.createAt DESC;
    `;
    const [result] = await connection.execute(statement, [userId]);
    return result;
  }

  async getOrderInfoByOrderNo(orderNo) {
    const statement = 'SELECT * FROM `order` WHERE orderNo = ?;'
    const [result] = await connection.execute(statement, [orderNo])
    return result
  }


  async finish(orderNo) {
    const statement = 'UPDATE `order` SET status = ? WHERE orderNo = ?;'
    const [result] = await connection.execute(statement, [0, orderNo])
    return result
  }
}

module.exports = new OrderService()