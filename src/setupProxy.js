//引入依赖
const { createProxyMiddleware }  = require("http-proxy-middleware")

//添加代理
module.exports = function (app) {
    //"/api"是你接口地址的首个分发地址
    app.use('/game', createProxyMiddleware({ 
        target: 'http://43.154.239.90:8888',
        //target: 'http://43.154.154.22:8888',
        secure: false,
        changeOrigin: true, 
        pathRewrite: {
            "^/game": "/"
        },
    }));
    //"/api"是你接口地址的首个分发地址
    app.use('/file', createProxyMiddleware({ 
        target: 'http://43.154.239.90',
        //target: 'http://43.154.154.22',
        secure: false,
        changeOrigin: true, 
        pathRewrite: {
            "^/file": "/file"
        },
    }));
};