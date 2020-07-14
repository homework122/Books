import Axios from 'axios'
// Axios.defaults.baseURL="http://172.16.6.11:777"
Axios.defaults.baseURL= '/api'
Axios.defaults.headers.post["Content-Type"]="application/json"
 // Axios.defaults.headers.post["token"]="token"
// 拦截Axios发起的所有请求
Axios.interceptors.request.use(
    config=>{
      const token = window.sessionStorage.getItem("token")
      config.headers["token"] = token;
      // let token ="token"
      // config.headers.accessToken = token;
      // config.setHeaders([
      //   { token:token}
      //   // 在这里设置请求头与携带token信息
      // ])
      // config.headers.common['token'] = token;
      // config.headers.token= token
      // 在请求数据时，将token值添加到header中
      return config
    },
    err=>{
      return Promise.reject(err);
    }
);
// Axios.interceptors.request.use(
//     config => {
//       // const token = window.sessionStorage.getItem("token");
//       const token ="token"
//       if (token) {
//         // 判断是否存在token，如果存在的话，则每个http header都加上token
//         config.headers["token"] = token;
//       } else {
//         config.headers["token"] = token;
//       }
//       return config;
//     },
//     err => {
//       return Promise.reject(err);
//     }
// );
//拦截Axios发起的所有请求.
Axios.interceptors.response.use((config)=>{
  return config
});

export default  Axios