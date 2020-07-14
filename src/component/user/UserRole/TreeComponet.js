import React from 'react'
import { Tree } from 'antd';
import  treeStore from '../../../store/TreeStore'
const { TreeNode } = Tree;


class Demo extends React.Component {
  constructor(props){
    super(props)
    this.state={
      autoExpandParent:true,
      expandedKeys:[],  //展开指定的树节点
      checkedKeys:[],
      selectedKeys:[],//设置选中的树节点
      treeData:[],//数据
      menuData:[],
      children:[],
      isdata:false,
      isdisabled:true, //禁用子节点
      isLevel:[], //存取点击的一级选项
    }
  }

  componentDidMount() {
    new Promise((resolve, reject) =>{
      this.setState({

        menuData:JSON.parse(sessionStorage.getItem("user")).permissionList

      })
      resolve()
    } ).then(()=>{
      new Promise((resolve, reject) =>{
        this.setData(this.state.menuData)
        resolve()
      } ).then(()=>{
        console.log(this.state.treeData)
        this.setState({
          isdata:true
        })
      })
    })
  }
  setData(val){
    for (let i=0; i<val.length;i++) {
      this.setData({
        treeData: this.state.treeData.push({
          title: val[i].menu_name,
          key: val[i].permission_no,
          children: []
        })
      })

      if (val[i].chidPermissions && val[i].chidPermissions.length>0){
        for (let j=0 ;j<val[i].chidPermissions.length;j++){
          this.setState({
            'this.state.treeData[i].children':this.state.treeData[i].children.push({
              title: val[i].chidPermissions[j].menu_name,
              key: val[i].chidPermissions[j].permission_no,
              disabled: this.state.isdisabled,
              disableCheckbox:true
            })
          })
        }

      }
    }
  }

  // 展开/收起节点时触发
  onExpand =(expandedKeys) => {
    console.log('onExpand', expandedKeys);
    this.setState({
      expandedKeys:expandedKeys,
    })
  }
  onCheck = (checkedKeys,info )=> {
    new Promise((resolve, reject) => {
      this.setState({
        checkedKeys:this.uniq(this.state. checkedKeys.concat(checkedKeys.checked)),
        selectedKeys:this.uniq(this.state.selectedKeys.concat(checkedKeys.checked)),
      })
      this.childrenDisabled(info.node.children)

      // 判断一级选项是否被选中
      if(info.node.children){
        // 判断是否点击的是一级选项
        this.setState({
          isLevel:this.uniq(this.state.isLevel.concat(checkedKeys.checked))
        })

        if(this.checkArr(info.node.key,this.state.isLevel)){
          console.log(2)
          // 移除一级选项
          this.setState({
            checkedKeys:this.remove(this.state.checkedKeys,info.node.key),
            selectedKeys: this.remove(this.state.selectedKeys,info.node.key),
            isLevel: this.remove(this.state.isLevel,info.node.key)
          })
          // 移除二级选中状态
          new Promise(resolve1 => {
            let chilArr = this.getLevelChilKey(info.node.key,this.state.treeData)
            resolve1(chilArr)
          }).then((valArr)=>{
            for (let i=0; i<valArr.length;i++){
              this.setState({
                checkedKeys:   this.remove(this.state.checkedKeys,valArr[i].key),
                selectedKeys: this.remove(this.state.selectedKeys,valArr[i].key)
              })
            }
          })
          this.childeenIsDisabled(info.node.children)
        }
      }
      resolve()
    }).then(()=>{
      console.log('选中1',this.state.selectedKeys)
    })
  };
  onSelect = (selectedKeys, info) => {
    new Promise((resolve, reject) => {
      // 判断是否点击一级选项
      // 判断是否有children
      if (info.node.children){
        // 判断是否点击一级选项
        // 是
        if(this.checkLevelOne(selectedKeys)){
          // 设置它下面的子选项可用
          this.childrenDisabled(info.node.children)
        }

        // 判断isLevel是否从复选框选中
        if(this.checkArr(info.node.key,this.state.isLevel)){
          this.setState({
            isLevel: this.remove(this.state.isLevel,info.node.key)
          })

        }else {
          this.setState({
            isLevel:this.state.isLevel.concat(selectedKeys)
          })
        }

      }
      // 启用切换到禁用
      if(this.checkISLevelOne(info.node.key,this.state.isLevel)){
        let indexVal = this.getIndex(info.node.key,this.state.treeData)
        this.childeenIsDisabled(info.node.children)
        // 一级选项
        this.setState({
          isLevel: this.remove(this.state.isLevel,info.node.key)
        })
      }

      // 所有元素
      // 判断点击元素是否一点击
      if(this.checkArr(selectedKeys,this.state.checkedKeys)){
        // 已点击
        // 取消选中状态
        this.setState({
          checkedKeys:   this.remove(this.state.checkedKeys,selectedKeys),
          selectedKeys: this.remove(this.state.selectedKeys,info.selectedNodes[0].key)
        })
      }else { //没点击 添加选中状态
        this.setState({
          checkedKeys:this.state.checkedKeys.concat(selectedKeys),
        })

        if (info.selectedNodes.length==0){
          this.setState({
            selectedKeys:[],
            checkedKeys:[]
          })
        }else {
          this.setState({
            selectedKeys:this.state.selectedKeys.concat(info.selectedNodes[0].key)
          })

        }
      }

      resolve()
    }).then(()=>{
      console.log( '选择中2', this.state.selectedKeys)
      treeStore.addKey( this.state.selectedKeys)

    })

  };

  // 检查数组是否存在改值
  checkArr(val,arr){
    let istrue=false
    for (let i=0;i<arr.length;i++){
      if (val==arr[i]){
        istrue = true
      }
    }
    return istrue
  }
// 移除指定的元素
  remove(arr, item) {
    var result=[];
    for(var i=0; i<arr.length; i++){
      if(arr[i]!=item){
        result.push(arr[i]);
      }
    }
    return result;
  }
  获取两数组不同元素
  getArrDifference(arr1, arr2) {
    return arr1.concat(arr2).filter(function(v, i, arr) {
      return arr.indexOf(v) === arr.lastIndexOf(v);
    });
  }

  // 获取一级选项key
  getLevelOne(arr){
    var newArr=[]
    for (let i=0; i<arr.length;i++){
      newArr.push( arr[i].key)
    }
    return newArr
  }

  // 判断是否点了一级选项
  checkLevelOne(val){
    var istrue = true

    for (let i; i<this.getLevelOne(this.state.treeData).length;i++){
      if (val== this.getLevelOne()[i]){
        istrue = false
      }
    }
    return istrue

  }

  // 设置子节点是启用
  childrenDisabled(arr){
    for(let i=0; i<arr.length; i++){
      arr[i].disabled = false
    }
  }

  // 判断一级选项是否已点击
  checkISLevelOne(val,arr){
    var istrue = false
    for(let i=0;i<arr.length;i++){
      if(val==arr[i]){
        istrue = true
      }
    }
    return istrue
  }

  // 获取选项在数组的下标
  getIndex(val,arr){
    for (let i=0; i<arr.length;i++){
      if (val == arr[i].key){
        return i
      }
    }
  }

  // 设置子节点是禁用
  childeenIsDisabled(arr){
    for (let i=0; i<arr.length;i++){
      arr[i].disabled = true

    }
  }

  // 判断一级选项下有哪些子选项的key
  getLevelChilKey(LevelKey,arr){
    let newArr
    for(let i=0;i<arr.length;i++){
      if (LevelKey==arr[i].key){
        newArr=arr[i].children
      }
    }
    return newArr

  }

  // 数组去重
  uniq(array){
    var temp = []; //一个新的临时数组
    for(var i = 0; i < array.length; i++){
      if(temp.indexOf(array[i]) == -1){
        temp.push(array[i]);
      }
    }
    return temp;
  }

  render() {
    return (
        <Tree
            checkable
            onExpand={this.onExpand}
            expandedKeys={this.state.expandedKeys}
            autoExpandParent={this.state.autoExpandParent}  //是否自动展开父节点
            checkedKeys={this.state.checkedKeys}
            onCheck={this.onCheck}
            onSelect={this.onSelect}
            selectedKeys={this.state.selectedKeys}
            treeData={this.state.isdata?this.state.treeData:null}
            checkStrictly={true}

        />
    )
  }
}

export {Demo as default}
