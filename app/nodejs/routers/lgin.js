const Router = require('koa-router');
const db = require('../db/index_order');
// 创建路由
var router = new Router();
/**
 * ctx
 */
router.post('/', async (ctx, next) => {
    let {  phone} = ctx.request.body;
    var res =await db.find('user1',{phone});
    if (res) {
        ctx.body = {
            are:res.length,
            arr: res
        }
    } else {
        ctx.body = {
            code: 100,
            msg: 'fail'
        }
    }
});
module.exports = router;