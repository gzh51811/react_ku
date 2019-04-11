const Router = require('koa-router');
const db = require('../db/index_order');
// 创建路由
var router = new Router();
/**
 * ctx
 */
router.post('/', async (ctx, next) => {
    let { title } = ctx.request.body;
  //  let one=1*1;
   // var res = await db.find1('lister');
   var res =await db.find1('lister',{title});
   //console.log(res);
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