
import {observable,action} from 'mobx'
import Axios from '../util/axios.js'
import Api from '../api/index'
import {message} from 'antd';
export default class UserStore{
    //user 的值等于存取到sessionStorage,存取是必须是json格式。获取出来用JSON.parse()转成字符串
    //使用三目判断sessionStorage是否为空，不是则转成字符串。空则为空数字
    @observable user = sessionStorage.getItem("user")?JSON.parse(sessionStorage.getItem("user")):[]
    @observable isLogin = false;
    @observable token = ""
    @observable menuList = []
    @action
    login =(name,pwd)=>{
        return new Promise((resolve,reject)=>{
            // console.log('方法')
            Axios.post(Api.user.userLogin,
                {mgr_name:name,mgr_pwd:pwd}
                ).then((res)=>{
                console.log(res)
                if(res.status == 200){
                    if(res.data.code===200){
                        console.log('返回来的数据',res.data.data)
                        this.user = res.data.data;
                        this.token = res.data.token;
                        sessionStorage.setItem('token',JSON.stringify(res.data.data.token))
                        sessionStorage.setItem('user',JSON.stringify(res.data.data))
                        resolve('登录成功')
                    }else if(res.data.code===500){
                        message.error(res.data.msg)
                        reject('登录失败')
                    }
                }

            }).catch((err)=>{
                console.log('报错')
                console.log(err)
            })
        })
    }
}