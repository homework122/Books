import React from 'react'

class LeftMenu extends React.Component {
  constructor(){
    super();
    this.state={
      leftMenu:[]
    }
  }
  componentWillMount() {
    // 请求菜单数据

  }

  // 生成左边菜单
  bindMenu(menulist){

  }

  render() {
    return (
        <div > </div>
  )
  }
}

export {LeftMenu as default}