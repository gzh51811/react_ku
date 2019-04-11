const Router = require('koa-router');
const db = require('../db/index_order');
// 创建路由
var router = new Router();
/**
 * ctx
 */
router.post('/', async (ctx, next) => {
    let { phone,pwd} = ctx.request.body;
    var res =await db.insert('user1',{ phone,pwd});
    if (res) {
        ctx.body = {
            are:res.length,
            //arr: res
        }
    } else {
        ctx.body = {
            code: 100,
            msg: 'fail'
        }
    }
});
module.exports = router;