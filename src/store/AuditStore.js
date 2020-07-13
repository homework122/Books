import { action } from 'mobx'
import Axios from '../util/axios'
import Api from '../api/index'
export default class TxtsStore {
    @action
    getList = (Page, PageSize) => {
        return new Promise((resolve, reject) => {
            // @ts-ignore
            Axios.post(Api.Audit.AuditList,
                { page: Page, pageSize: PageSize }
            )
                .then((res) => {
                    resolve([res.data.data, res.data.count])
                })
        })
    }
    AuditSpecific = (Id) => {
        return new Promise((resolve,reject)=>{
            // @ts-ignore
            Axios.post(Api.Audit.AuditSpecific,
                { art_no: Id })
                .then((res) => {
                    resolve(res)
                })
        })
    }
    PassTxt =(Id) => {
        return new Promise((resolve,reject)=>{
            // @ts-ignore
            Axios.post(Api.Audit.Pass,
                { art_no: Id })
                .then((res) => {
                    // console.log(res)
                    resolve(res)
                })
        })
    }
    NoPassTxt =(Id) => {
        return new Promise((resolve,reject)=>{
            // @ts-ignore
            Axios.post(Api.Audit.NoPass,
                { art_no: Id })
                .then((res) => {
                    // console.log(res)
                    resolve(res)
                })
        })
    }
}