
import { observable, action } from 'mobx'
class TreeStore {


@observable selectKey = [];  选中的状态key
@action
// 添加Key
      addKey(arr){
      console.log('接收',arr)
       this.selectKey.concat(arr)

    }
    // 获取selectKey
  get(){
  return this.selectKey
  }

}

const treeStore = new TreeStore;

export default treeStore;
