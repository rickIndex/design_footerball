const Router = require('@koa/router');
const userController = require('../controller/user.controller');


const router = new Router({ prefix: '/user' })

router.get('/userInfo', userController.userInfo)

module.exports = router;