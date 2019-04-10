const Router = require('koa-router');
const db = require('../db/index_order');
// 创建路由
var router = new Router();
/**
 * ctx
 */
router.post('/', async (ctx, next) => {
    let { itemId } = ctx.request.body;
    var res = await db.find('cart', { itemId });
    if (res) {
        console.log('ip:',res[0].shuliang);
        let shuliang1 = res[0].shuliang*1+1;
        let res1 = await db.update('cart', { itemId }, { $set: { "shuliang": shuliang1 } });
        let res23 = await db.find('cart');
        ctx.body = {
            are: res.length,
            arr: res23
        }
    } else {
        ctx.body = {
            code: 100,
            msg: 'fail'
        }
    }
});
module.exports = router;