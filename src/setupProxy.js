const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app){
    app.use(createProxyMiddleware("/api", {
          target: "http://www.xiadachuan.cn:8082",
          changeOrigin: true,
          pathRewrite:{
              "^/api":""
          }
        }))
}