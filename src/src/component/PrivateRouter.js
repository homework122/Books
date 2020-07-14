import React from 'react'
import {Route} from 'react-router-dom'
import {inject,observer} from "mobx-react";
import loadable from '@loadable/component'
@inject('user')
@observer
class PrivateRouter extends React.Component {
  constructor(){
    super()
    this.state={
      routerList:[]
    }
  }
  // 动态生成路由
  bindRouter(list){
    let routerList = list.map((item)=>{
      if(item.chidPermissions.length === 0){
        return <Route key={item.permission_no} path={item.menu_url} component={loadable(()=>import(`./${item.component_path}`))}></Route>
      }else {
        return <Route key={item.permission_no} path={item.menu_url} render={()=>{
            let componentName = loadable(()=>import(`./${item.component_path}`));
            return <componentName>
              {this.bindRouter(item.chidPermissions)}
            </componentName>
        }}>
        </Route>

      }
    })
    return routerList
  }
  componentDidMount() {
    let routerList = this.bindRouter(this.props.user.user.permissionList)
    console.log('routerList',routerList);
    this.setState({
      routerList:routerList
    })
  }

  render() {
    return (
        <div>{this.state.routerList}</div>
    )
  }
}

export {PrivateRouter as default}