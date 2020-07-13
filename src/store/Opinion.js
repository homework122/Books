import {observable,action} from 'mobx'
import Axios from '../util/axios'
import Api from '../api/index'
export default class Opinion{
    @action
    List=(Page,Pagesize)=>{
        // let p ={
        // 'page':Page,'pageSize':Pagesize
        // }
        return new Promise((resolve,reject)=>{
            Axios.post(Api.OPinion.OpList,{
                    'page':Page,'pageSize':Pagesize
                }
                 //  传参
            )
                .then((res)=>{
                    console.log(res)
                    // if(res.data.returnCode===200){
                    //     console.log(res.data.data)
                    //     this.user = res.data.data;
                    //     this.token = res.data.token;
                    //     resolve('登录成功')
                    // }else{
                    //     reject('登录失败')
                    // }
                })
        })
    }
}