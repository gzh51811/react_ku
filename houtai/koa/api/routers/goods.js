const Router = require('koa-router');

const db = require('../db/index');

// 创建路由
var router = new Router();


router.get('/', async (ctx, next) => {
    let { name,nickname2,nickname3,nickname4,nickname5,prefix,residence,residence2 } = ctx.query;
     console.log(ctx.query);
     let sql={name:name,nickname2:nickname2,nickname3:nickname3,nickname4:nickname4,nickname5:nickname5,prefix:prefix,residence:residence,residence2:residence2}
    let res = await db.insert('list', sql);
    ctx.body = res
});
module.exports = router;