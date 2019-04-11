const Router = require('koa-router');
const db = require('../db/index');
// 创建路由
var router = new Router();

router.get('/', async (ctx, next) => {
  let { id,name } = ctx.query;
    // console.log(ctx.query);
    // let{name}=ctx.request.body.params;
    // let res=await db.find('lister',{name});
    ctx.body = res;
});

module.exports = router;