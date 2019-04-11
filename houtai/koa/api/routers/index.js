const Koa = require('koa');
const Router = require('koa-router');
const koaBody = require('koa-body');

// 创建路由
var router = new Router();

// 引入页面路由
const registryRouter = require('./registry');
const loginRouter = require('./login');
const tokenverifyRouter = require('./tokenverify');
const listersRouter = require('./user_list');
const userdels = require('./userdel');
const redacts = require('./redact');
const addusers = require('./adduser');
const userimport = require('./userimport');
const goodsRouter = require('./goods');
const cartRouter = require('./cart');
const order = require('./order');


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

router.use('/registry', registryRouter.routes())
router.use('/login', loginRouter.routes())
router.use('/tokenverify', tokenverifyRouter.routes())
router.use('/listers', listersRouter.routes())
router.use('/userdel', userdels.routes());
router.use('/redact', redacts.routes());
router.use('/adduser', addusers.routes());
router.use('/userimport', userimport.routes());
router.use('/goods',goodsRouter.routes())
router.use('/cart',cartRouter.routes())
router.use('/order',order.routes())

module.exports = router;