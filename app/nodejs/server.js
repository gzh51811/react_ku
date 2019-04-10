const Koa = require('koa');
const static = require('koa-static');
const cors = require('koa2-cors');
// 路由
const routers = require('./routers');

// 创建koa应用
const app = new Koa();//app.context
app.use(cors());
app.context.myname = 'vuepr';

// 创建静态资源服务
app.use(static('../'));
// 处理status为404或null时，完善response信息
app.use(routers.allowedMethods());
app.use(routers.routes());
// 监听端口
app.use(cors({
    origin: function (ctx) {
        if (ctx.url === '/test') {
            return false;
        }
        return 'http://localhost:9001';
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));
app.listen(1814,()=>{
    console.log('server is running on http://localhost:1814');
});