import Axios from 'axios'
Axios.defaults.baseURL = "http://localhost:8888"
// 拦截Axios发起的所有请求，通过dispatch修改isLoading为true
Axios.interceptors.request.use(
    config => {
        //需要把token添加到header中
        return config;
    },
    err => {
        return Promise.reject(err);
    });
//拦截Axios发起的所有响应，通过dispatch修改isLoading为false
Axios.interceptors.response.use((config) => {
    //需要将token 存起来
    return config
})

export default Axios