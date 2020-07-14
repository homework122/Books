import React from 'react'
import {inject,observer} from 'mobx-react'
import {  Menu } from 'antd';
import {Link} from 'react-router-dom'
import { UserOutlined } from '@ant-design/icons';
import emitter from '../util/event'
import tabsStore from '../store/TabsStore';
const { SubMenu } = Menu;
@inject('user')
@observer
class LeftMenu extends React.Component {
  rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];
  constructor(props){
    super(props);
    this.state={
      leftMenu:[],
      openKeys: ['sub1'],
      panes:tabsStore.getPane().panes, //初始 tabs
    }
  }

  add = (tit,url,id) => {
    
    if(tabsStore.checkId(id)){
      this.props.history.push(tabsStore.getUrl(id,tabsStore.panes))
      emitter.emit('key', tabsStore.getKey(id))
      sessionStorage.setItem('activeKey',tabsStore.getKey(id))
     
    }else{

      var key = JSON.stringify(parseInt(this.state.panes[parseInt(this.state.panes.length)-1].key)+1)  // key值是panes数组最后一项的key键的值加一
      tabsStore.addTabs(tit,url,id,key) // 使用 状态管理的方法
      emitter.emit('key', key)   //兄弟之间传值
      sessionStorage.setItem('activeKey',key)
    }



  };


  onOpenChange = openKeys => {
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  };
  // 生成左边菜单
  bindMenu(menulist){
    let MenuList= menulist.map((item)=>{
      if(item.chidPermissions.length===0){  //没有子菜单
        return <Menu.Item key={item.permission_no} onClick={()=>this.add(item.menu_name,item.menu_url,item.menu_id)} ><Link to={item.menu_url}>{item.menu_name}</Link></Menu.Item>
      }
      else{
        return <SubMenu key={item.permission_no} icon={<UserOutlined />} title={item.menu_name}>
       {this.bindMenu(item.chidPermissions)}
        </SubMenu>
      }

    })
    return MenuList
  }
  componentWillMount() {
    console.log("will mount")
    // console.log(JSON.parse(this.props.user.user.permissionList))
    // let menuList = window.sessionStorage.getItem('user')?(JSON.parse(window.sessionStorage.getItem('user'))):[];
    // console.log('类相关',typeof menuList);
    let leftMenu = this.bindMenu(this.props.user.user.permissionList);
    this.setState({
      leftMenu:leftMenu
    })
  }

  

  





  render() {
    return (
    //     mode="inline"
    // defaultSelectedKeys={['1']}
    // defaultOpenKeys={['sub1']}
    // style={{ height: '100%', borderRight: 0 }}
        <Menu
            mode="inline"
            openKeys={this.state.openKeys}
            onOpenChange={this.onOpenChange}
            style={{ height: '100%', borderRight: 0 }}
        >
          {this.state.leftMenu}
        </Menu>
  )
  }
}

export {LeftMenu as default}