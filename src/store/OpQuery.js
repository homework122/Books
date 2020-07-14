import {observable,action} from 'mobx'
import Axios from '../util/axios'
import Api from '../api/index'
export default class OpQuery{
    @action
    caxunList=(user_phone,user_nickname)=>{

        return new Promise((resolve,reject)=>{
            Axios.post(Api.OPinion.OpQuery,{
                    'user_phone':user_phone,
                    'user_nickname':user_nickname
                }
                //  传参
            )
                .then((res)=>{
                    // console.log(res)
                    //返回 resolve(res)给opinionAs界面 渲染界面
                    resolve(res)
                })
        })
    }
}