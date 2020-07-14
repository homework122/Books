
import { observable, action } from 'mobx'
class TabsStore  {
  

  @observable  panes = JSON.parse(sessionStorage.getItem('panes')) || [
    { title: '会员信息统计',url:'/index/sysIndex/userTotal',id:11, key: '1' },
  ];//初始标签显示几个
  @observable  activeKey = this.panes[0].key//激活的

  @action
  getPane(){
    return {
      panes:this.panes,
    }
  }
  // 获取激活的key
  getKey(){
    console.log('激活',this.activeKey)
    return  {
      activeKey:this.activeKey
    }
  }

  // 添加标签
  addTabs=(tit,url,id,key)=>{
      this.panes.push({ title: tit, url: url,id:id, key: key });
      this.activeKey = key
      sessionStorage.setItem('panes',JSON.stringify(this.panes))//数组

  }

  // 点击标签页显示
  setActiveTabs(activeIndex){
    this.activeKey = activeIndex
  }

// 判断panes中是否存在id
checkId(id,arr){
  let istrue = false
  for(let i=0;i<this.panes.length;i++){
    if(id == this.panes[i].id){
      istrue = true
    }
  }
  return istrue
}
  // 根据对象id获取url
  getUrl(id,arr){
    let url=''
    for(let i=0;i<arr.length;i++){
      if(id == arr[i].id){
        url = arr[i].url
      }
    }
    return url

  }
// 通过id获取key
getKey(id){
  let key='';
  for(let i=0;i<this.panes.length;i++){
    if(id == this.panes[i].id){
      key = this.panes[i].key
    }
  }
  return key
}

// 通过key获取url
  getKeyUrl(key,arr){
    let url=''
    for(let i=0;i<arr.length;i++){
      if(key == arr[i].key){
        url = arr[i].url
      }
    }
    return url

  }

  // 通过key获取下标
  getIndex(key){
    let index='';
    for(let i=0;i<this.panes.length;i++){
      if(key == this.panes[i].key){
        index = i;
      }
    }
    return index
  }


  // 移除标签
  // 从数组中移除数据
  removeTabs(targetKey){
    new Promise((resolve)=>{
      this.panes.forEach((pane, i) => {
        if (pane.key==targetKey){
          if (this.panes.length>1){
            if (i==0){
              this.panes.splice(i,1)
              resolve()
            }else {
              this.panes.splice(i,1)
              resolve()
            }
          }
        }
      });
     
    }).then(()=>{
      sessionStorage.setItem('panes',JSON.stringify(this.panes))//数组

    })

   
  }
}

const tabsStore = new TabsStore;

export default  tabsStore;
