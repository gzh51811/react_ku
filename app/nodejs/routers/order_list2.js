const Router = require('koa-router');
const db = require('../db/index_order');
// 创建路由
var router = new Router();
/**
 * ctx
 */
router.post('/', async (ctx, next) => {
    let { itemId } = ctx.request.body;
    var res =await db.find('list',{'items.itemId':itemId});
    if (res) {
        ctx.body = {
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