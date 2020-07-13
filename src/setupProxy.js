
const { createProxyMiddleware } = require('http-proxy-middleware');   //引入
module.exports = function(app){
  app.use(
      createProxyMiddleware(
          '/api',{      //使用/api替换http://地址
              target:'http://www.xiadachuan.cn',
            changeOrigin:true,    //changeOrigin默认是false：请求头中host仍然是浏览器发送过来的host,
                                  // 如果设置成true：发送请求头中host会设置成target·
            pathRewrite: {
              '^/api': '',        //将api代理到target网址，必写，不写会直接代理到http://111.229.83.241:9601/api
            },
            secure: false, // 是否验证证书
          })
      // createProxyMiddleware(
      //     '/apc',{      //使用/apc替换http://任务管理地址
      //       target:'http://www.xiadachuan.cn:8082',
      //       changeOrigin:true,    //changeOrigin默认是false：请求头中host仍然是浏览器发送过来的host,
      //                             // 如果设置成true：发送请求头中host会设置成target·
      //       pathRewrite: {
      //         '^/apc': '',        //将api代理到target网址，必写，不写会直接代理到http://111.229.83.241:9601/api
      //       },
      //       secure: false, // 是否验证证书
      //     }),
//       createProxyMiddleware(
//           '/apl',{      //使用/apc替换http://任务管理地址
//               target:'http://123.56.114.184:8081',
//               changeOrigin:true,    //changeOrigin默认是false：请求头中host仍然是浏览器发送过来的host,
//                                     // 如果设置成true：发送请求头中host会设置成target·
//               pathRewrite: {
//                   '^/apl': '',        //将api代理到target网址，必写，不写会直接代理到http://111.229.83.241:9601/api
//               },
//               secure: false, // 是否验证证书
//           }),
//       // createProxyMiddleware(
//       //   '/apc',{      //使用/apc替换http://任务管理地址
//       //       target:'http://172.16.6.12:8888/',
//       //       changeOrigin:true,    //changeOrigin默认是false：请求头中host仍然是浏览器发送过来的host,
//       //                             // 如果设置成true：发送请求头中host会设置成target·
//       //       pathRewrite: {
//       //           '^/apc': '',        //将api代理到target网址，必写，不写会直接代理到http://111.229.83.241:9601/api
//       //       },
//       //       secure: false, // 是否验证证书
//       //   }),
//       createProxyMiddleware(
//           '/apt',{      //使用/apc替换http://任务管理地址
//               target:'http://www.xiadachuan.cn',
//               changeOrigin:true,    //changeOrigin默认是false：请求头中host仍然是浏览器发送过来的host,
//                                     // 如果设置成true：发送请求头中host会设置成target·
//               pathRewrite: {
//                   '^/apt': '',        //将api代理到target网址，必写，不写会直接代理到http://111.229.83.241:9601/api
//               },
//               secure: false, // 是否验证证书
//           }),
//       createProxyMiddleware(
//           '/apw',{      //使用/apc替换http://任务管理地址
//               target:"http://172.16.6.15:8888",
//               changeOrigin:true,    //changeOrigin默认是false：请求头中host仍然是浏览器发送过来的host,
//                                     // 如果设置成true：发送请求头中host会设置成target·
//               pathRewrite: {
//                   '^/apw': '',        //将api代理到target网址，必写，不写会直接代理到http://111.229.83.241:9601/api
//               },
//               secure: false, // 是否验证证书
//           })
// )
  )
};

