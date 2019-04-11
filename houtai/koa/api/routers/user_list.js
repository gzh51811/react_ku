const Router = require('koa-router');
const db = require('../db');
// 创建路由
var router = new Router();
/**
 * ctx
 */
router.post('/', async (ctx, next) => {
    let { title } = ctx.request.body;

    var res = null;
    if (title == '推荐') {
        res = await db.find('user');
    } else {
        res = await db.find('rderform');
    }

    // console.log({title});
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


//10.3.137.91
//http://localhost:1812/order_list