import {action} from 'mobx'
import Axios from '../util/axios'
import Api from '../api/index'
export default class TypesStore{
    @action
    TypeList=(Page,PageSize)=>{
        return new Promise((resolve,reject)=>{
            // @ts-ignore
            Axios.post(Api.Types.TypeList,
                {page:Page,pageSize:PageSize}
            )
                .then((res)=>{
                    // console.log(res)
                    resolve([res.data.data,res.data.count])
                })
        })
    }
    TypeAdd=(Name)=>{
        return new Promise((resolve,reject)=>{
            // @ts-ignore
            Axios.post(Api.Types.TypeAdd,
                {arttype_name:Name}
            )
                .then((res)=>{
                    // console.log(res)
                    resolve(res)
                })
        })
    }
}