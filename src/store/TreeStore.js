
import { observable, action } from 'mobx'
class TreeStore {


@observable selectKey = [];  选中的状态key
@action
// 添加Key
      addKey(arr){
      console.log('接收',arr)
       this.selectKey.concat(arr)
<<<<<<< HEAD
       sessionStorage.setItem('menluList',JSON.stringify(arr))
=======
>>>>>>> e1abf3390ed26d4d410366c9f49f11273fd1b0ec

    }
    // 获取selectKey
  get(){
<<<<<<< HEAD
    console.log('kkkkk', this.selectKey)
=======
>>>>>>> e1abf3390ed26d4d410366c9f49f11273fd1b0ec
  return this.selectKey
  }

}

const treeStore = new TreeStore;

export default treeStore;
