const Router = require('koa-router');
const db = require('../db/index_order');
// 创建路由
var router = new Router();
/**
 * ctx
 */
router.post('/', async (ctx, next) => {
    var res = await db.find('cart');
    if (res) {
        let { itemId, shuliang} = ctx.request.body;
        let res1 = await db.update('cart', {  itemId }, { $set: { "shuliang":  shuliang*1 } });
        let res23 = await db.find('cart');
        ctx.body = {
            arr: res,
            are: res23
        }
    } else {
        ctx.body = {
            code: 100,
            msg: 'fail'
        }
    }
});
module.exports = router;