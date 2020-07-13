import {action} from 'mobx'
import Axios from '../util/axios'
import Api from '../api/index'
export default class TxtsStore{
    @action
    TxtList=(Page,PageSize)=>{
        return new Promise((resolve,reject)=>{
            // @ts-ignore
            Axios.post(Api.Txts.TxtList,
                {page:Page,pageSize:PageSize}
            )
                .then((res)=>{
                    resolve([res.data.data,res.data.count])
                })
        })
    }
    TxtSpecific=(Id)=>{
        return new Promise((resolve,reject)=>{
            // @ts-ignore
            Axios.post(Api.Txts.TxtSpecific,
                {art_no:Id}
            )
                .then((res)=>{
                    resolve(res)
                })
        })
    }
    TxtDel=(Id)=>{
        return new Promise((resolve,reject)=>{
            // @ts-ignore
            Axios.post(Api.Txts.TxtDel,
                {art_no:Id}
            )
                .then((res)=>{
                    resolve(res)
                })
        })
    }
    TxtSearch=(Name)=>{
        return new Promise((resolve,reject)=>{
            // @ts-ignore
            Axios.post(Api.Txts.TxtSearch,
                {art_title:Name}
            )
                .then((res)=>{
                    resolve(res)
                })
        })
    }
    SAdd = () =>{
        return new Promise((resolve,reject)=>{
            // @ts-ignore
            Axios.post(Api.Txts.SAddz,{}
            )
                .then((res)=>{
                    resolve(res.data.data)
                })
        })
    }
    TxtAdds = (From,img) =>{
        return new Promise((resolve,reject)=>{
            // @ts-ignore
            Axios.post(Api.Txts.TxtAdd,
                { art_title:From.txt_name,
                    art_img:img,
                    arttype_no:From.txt_type,
                    art_author:From.txt_name2,
                    charge_no:Number(From.txt_Mon),
                    art_text:From.txt_test,
                    art_score:From.txt_num
                }
            )
                .then((res)=>{
                    resolve(res)
                })
        })
    }
}