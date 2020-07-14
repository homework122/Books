
import { observable, action } from 'mobx'
class TreeStore {


@observable selectKey = [];  选中的状态key
@action
// 添加Key
      addKey(arr){
      console.log('接收',arr)
       this.selectKey.concat(arr)
       sessionStorage.setItem('menluList',JSON.stringify(arr))

    }
    // 获取selectKey
  get(){
    console.log('kkkkk', this.selectKey)
  return this.selectKey
  }

}

const treeStore = new TreeStore;

export default treeStore;
