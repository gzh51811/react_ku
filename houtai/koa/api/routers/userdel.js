const Router = require('koa-router');
const ObjectId = require('mongodb').ObjectId;

const db = require('../db');

// 创建路由
var router = new Router();



router.get('/', async (ctx, next) => {
    let { id ,lis} = ctx.query;
    // console.log(id);
    let sql = { _id: ObjectId(id) };
    var res = null;
	if(lis){
		res=await db.delete(lis, sql);
		console.log(lis,sql)
	}else{
		res=await db.delete('user', sql);
	}
    ctx.body = res
});

module.exports = router;