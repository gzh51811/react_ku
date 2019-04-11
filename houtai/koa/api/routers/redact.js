const Router = require('koa-router');
const db = require('../db');

// 创建路由
var router = new Router();


router.get('/', async (ctx, next) => {
    let { id, emil, name, time, key, age, address, secondCity } = ctx.query;
    var sql = { emil: emil, name: name, time: time, key: key };
    var sql2 = { key: key, name: name, age: age, secondCity: secondCity, address: address };

    var s = secondCity;
    var my = null;
    var sql = null;
    if (s) {
        my = 'rderform';
        sql = { key: key, name: name, age: age, secondCity: secondCity, address: address };
        // console.log(id, sql2)

    } else {
        my = 'user';
        sql = { emil: emil, name: name, time: time, key: key };
        // console.log(2)
        // 
    }

    var res = await db.update(my, { id, sql });

    ctx.body = res
});


module.exports = router;