const Router = require('koa-router');
const db = require('../db/index_order');
// 创建路由
var router = new Router();
/**
 * ctx
 */
router.post('/', async (ctx, next) => {
    let { itemId,imageUrl,name, minPrice, zongjia,shuliang} = ctx.request.body;
    var res =await db.insert('cart',{ itemId,imageUrl,name, minPrice, zongjia,shuliang});
    if (res) {
        ctx.body = {
            are:res.length,
        }
    } else {
        ctx.body = {
            code: 100,
            msg: 'fail'
        }
    }
});
module.exports = router;