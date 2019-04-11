const Router = require('koa-router');
const db = require('../db/index_order');
// 创建路由
var router = new Router();
/**
 * ctx
 */
router.post('/', async (ctx, next) => {
    let { itemId } = ctx.request.body;
    
    // var res = await collection.aggregate('list', { $match: { "items.itemId": itemId } }, { $project: { _id: 0, timestamp: "$timestamp", items: { $filter: { input: "$items", as: "items", cond: { $eq: ["$$items.itemId", itemId] } } } } }).toArray();
    var res = await db.aggregate('list', [{ $match: { "items.itemId": itemId }},
     { $project: {
         items: { $filter: { 
             input: "$items", 
             as: "name",
            cond: { $eq: ["$$name.itemId", itemId] } } },
            _id: 0,
         } }
        ]);
    // console.log({ $match: { "items.itemId": itemId }},{ $project: { _id: 0,items: { $filter: { input: "$items", as: "items", cond: { $eq: ["$$items.itemId", itemId] } } } } });
    console.log(res);
    if (res) {
        ctx.body = {
            data: res
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