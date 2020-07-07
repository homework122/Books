import Axios from 'axios'
Axios.defaults.baseURL="http://172.16.6.168:8888"
//拦截Axios发起的所有请求
Axios.interceptors.request.use(
    config=>{
      // 在请求数据时，将token值添加到header中
      return config
    },
    err=>{
      return Promise.reject(err);
    }
);
//拦截Axios发起的所有请求.
Axios.interceptors.response.use((config)=>{
  return config
});

export default  Axios