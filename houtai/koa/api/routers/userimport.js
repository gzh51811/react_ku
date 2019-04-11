const Router = require('koa-router');
const ObjectId = require('mongodb').ObjectId;

const db = require('../db');

// 创建路由
var router = new Router();
router.get('/', async (ctx, next) => {
    let { id } = ctx.query;
    let sql = { _id: ObjectId(id) };
    var res = await db.find('user', sql);
    var now = res[0].important;
    if (now == true) {
        res = true;
    }
    else {
        res = false;
    }
    console.log(now)
    ctx.body = res
});

module.exports = router;