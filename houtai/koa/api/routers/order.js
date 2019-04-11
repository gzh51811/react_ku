const Router = require('koa-router');
const db = require('../db/index');
// 创建路由
var router = new Router();

router.get('/', async (ctx, next) => {
    let { itemId } = ctx.request.body;
    // let data = { username: Date.now() }
    // console.log(data);
    let res1 = await db.find('list', { itemId });
    //console.log(name);

    ctx.body = res1;
});

module.exports = router;
