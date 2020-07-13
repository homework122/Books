import {observable,action} from 'mobx'
import Axios from '../util/axios'
import Api from '../api/index'
export default class AppStore{
    @observable ServiceList = sessionStorage.getItem("ServiceList")?JSON.parse(sessionStorage.getItem("ServiceList")):[]
                NavList = sessionStorage.getItem("NavList")?JSON.parse(sessionStorage.getItem("NavList")):[]
                ImgUrl=''
    @action

    
    getSevList=()=>{
        console.log("1111")
        let param = {
            "page":1,
            "pagesize":5
        }
        // /set/queryWaiter.do
        return new Promise((resolve,reject)=>{
            Axios.post(Api.url.serviceList,param
                )
                .then((res)=>{
                console.log(res)
                if(res.data.code===200){
                    console.log(res.data.data)
                    this.ServiceList = res.data.data;
                    console.log(this.ServiceList)
                    sessionStorage.setItem("ServiceList", JSON.stringify(res.data.data));
                    resolve('获取成功')
                }else{
                    reject('获取失败')
                }
            }).catch(res=>{
                console.log(res)
            })
        })
    }
    getImgUrl=(p)=>{
      this.ImgUrl = p
    }
    displayNav=(pm)=>{
        console.log("1111")
        let param = pm
        // /set/queryWaiter.do
        return new Promise((resolve,reject)=>{
            Axios.post(Api.url.displayNav,param
                )
                .then((res)=>{
                console.log(res)
                if(res.data.code===200){
                    console.log("修改成功")
                    this.forceUpdate();
                    resolve('修改成功')
                }else{
                    reject('修改失败')
                }
            }).catch(res=>{
                console.log(res)
            })
        })
    }
    getNavList=()=>{
        console.log("1111")
        let param = {
            "page":1,
            "pagesize":5
        }
        // /set/queryWaiter.do
        return new Promise((resolve,reject)=>{
            Axios.post(Api.url.navList,param
                )
                .then((res)=>{
                console.log(res)
                if(res.data.code===200){
                    this.NavList = res.data.data;
                    sessionStorage.setItem("NavList", JSON.stringify(res.data.data));
                    resolve('获取成功')
                }else{
                    reject('获取失败')
                }
            }).catch(res=>{
                console.log(res)
            })
        })
    }
    editSev=(pm)=>{
        console.log("1111")
        let param = pm
        // /set/queryWaiter.do
        return new Promise((resolve,reject)=>{
            Axios.post(Api.url.editService,param
                )
                .then((res)=>{
                console.log(res)
                if(res.data.code===200){
                    console.log("修改成功")
                    window.location.reload()
                    resolve('修改成功')
                }else{
                    reject('修改失败')
                }
            }).catch(res=>{
                console.log(res)
            })
        })
    }
    delNav=(pm)=>{
        console.log("1111")
        let param = pm
        // /set/queryWaiter.do
        return new Promise((resolve,reject)=>{
            Axios.post(Api.url.delNav,param
                )
                .then((res)=>{
                console.log(res)
                if(res.data.code===200){
                    console.log("删除成功")
                    window.location.reload()
                    resolve('删除成功')
                }else{
                    reject('删除失败')
                }
            }).catch(res=>{
                console.log(res)
            })
        })
    }
    addSev=(pm)=>{
        console.log("1111")
        let param = pm
        // /set/queryWaiter.do
        return new Promise((resolve,reject)=>{
            Axios.post(Api.url.addService,param
                )
                .then((res)=>{
                console.log(res)
                if(res.data.code===200){
                    console.log("修改成功")
                    window.location.reload()
                    resolve('修改成功')
                }else{
                    reject('修改失败')
                }
            }).catch(res=>{
                console.log(res)
            })
        })
    }
    addNav=(pm)=>{
        console.log("1111")
        let param = pm
        // /set/queryWaiter.do
        return new Promise((resolve,reject)=>{
            Axios.post(Api.url.addNav,param
                )
                .then((res)=>{
                console.log(res)
                if(res.data.code===200){
                    console.log("修改成功")
                    window.location.reload()
                    resolve('修改成功')
                }else{
                    reject('修改失败')
                }
            }).catch(res=>{
                console.log(res)
            })
        })
    }
    editNav=(pm)=>{
        console.log("1111")
        let param = pm
        // /set/queryWaiter.do
        return new Promise((resolve,reject)=>{
            Axios.post(Api.url.editNav,param
                )
                .then((res)=>{
                console.log(res)
                if(res.data.code===200){
                    console.log("修改成功")
                    window.location.reload()
                    resolve('修改成功')
                }else{
                    reject('修改失败')
                }
            }).catch(res=>{
                console.log(res)
            })
        })
    }
}