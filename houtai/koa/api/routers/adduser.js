const Router = require('koa-router');

const db = require('../db');

// 创建路由
var router = new Router();


router.get('/', async (ctx, next) => {
    let { name, email, password, time, key, important } = ctx.query;
    let sql = { name: name, emil: email, password: password, time: time, key: key, important: important };
    var res = await db.insert('user', sql);
    ctx.body = res
});


module.exports = router;