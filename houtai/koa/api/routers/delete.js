const Router = require('koa-router');
const db = require('../db/index_user');
// 创建路由
var router = new Router();
/**
 * ctx               regtime,
 */

router.post('/', async (ctx, next) => {
    // 解构request.body;
    let { username } = ctx.request.body;
    console.log(username);
    // let data = { username: Date.now() }
    // let { username, password, gender, niname, email, note, phonenum } = ctx.request.body;
    // let data = { username: Date.now() };

    let res = await db.delete('user', { "username": username });
    //console.log(data);

    ctx.body = res;
    console.log(res);

})


module.exports = router;