const Koa = require('koa');
const Router = require('koa-router');
const koaBody = require('koa-body');
// 创建路由
var router = new Router();
// 引入页面路由
const order1=require('./order_list');
const list=require('./list');
const order2=require('./order_list1');
const order3=require('./order_list2');
const order4=require('./order_list4');
const zuce=require('./zuce');
const cart=require('./addcart');
const cart1=require('./cart');
const orderby1=require('./orderby');
const orderby2=require('./ordertime');
const lgin = require('./lgin');
const pwd = require('./pwd');
const updata = require('./updata');
const upcart = require('./upcart');
const delete1=require('./delete');
const chongfu=require('./chongfu');
router.use(koaBody({
    // 支持formdata
    multipart: true,
    // 文件支持
    formidable: {
        // 指定保存路径
        uploadDir: './uploads',
        keepExtensions: true,
        // 改文件名
        onFileBegin(filename, file) {
            // filename: 上传文件的原始名
            // file:文件信息对象
            //   * path:

            // file.path = './uploads/'+filename
        }
    }
}));
router.use('/list',list.routes());
router.use('/order_list',order1.routes());
router.use('/order_list1',order2.routes());
router.use('/order_list2',order3.routes());
router.use('/order_list4',order4.routes());
router.use('/zuce',zuce.routes());
router.use('/addcart',cart.routes());
router.use('/cart',cart1.routes());
router.use('/orderby',orderby1.routes());
router.use('/ordertime',orderby2.routes()); 
router.use('/lgin',lgin.routes());
router.use('/pwd',pwd.routes());
router.use('/updata',updata.routes());
router.use('/upcart',upcart.routes());
router.use('/delete',delete1.routes());
router.use('/chongfu',chongfu.routes());
module.exports = router;