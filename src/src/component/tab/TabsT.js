import React from 'react';
import { Tabs } from 'antd';
import {observer} from 'mobx-react'
import tabsStore from "../../store/TabsStore";  //引入状态管理文件 局部引入
import emitter from '../../util/event'   //引入 event
import RouterList from '../../component/PrivateRouter'
const { TabPane } = Tabs;
@observer
class TabsT extends React.Component {
  constructor(props) {
    super(props);
// 接收A组件传的值
    emitter.on('key', opt => {
      // 参数
      this.setState({
        activeKey: opt
      })
    })
//初始数据
    this.state = {
      panes:tabsStore.getPane().panes,
      activeKey:sessionStorage.getItem('activeKey') || tabsStore.getKey().activeKey,
    };
  }

  componentDidMount() {
    console.log('初始化',sessionStorage.getItem('activeKey'))
  }

//点击对应的标签页的显示
  onChange =( activeKey) => {
  

    tabsStore.setActiveTabs(activeKey)
    this.setState({ activeKey });

    this.props.history.push(tabsStore.getKeyUrl(activeKey,tabsStore.panes))
    
    // 跳转
    
  };
  // 叉掉标签页
  onEdit = (targetKey) => {
    this.remove(targetKey)
  };

//移除
  remove = (targetKey) => {

    new Promise((resolve)=>{
       //判断移除项是否是激活状态
    // 存在
      if (this.state.activeKey==targetKey){
        let index = tabsStore.getIndex(targetKey)
        // 删除的上一个数组对象的key
        let key = tabsStore.panes[index-1].key
        console.log("A",tabsStore.panes)
        console.log("B",tabsStore.panes[index-1])

       this.onChange(key)

        resolve()
  
      }else{
        resolve()
      }
    }).then(()=>{
      tabsStore.removeTabs(targetKey)
    })
   
    

  };

  render() {
    return (
        <div>
          <Tabs
              hideAdd
              onChange={this.onChange}
              activeKey={this.state.activeKey}
              type="editable-card"
              onEdit={this.onEdit}
          >
            {this.state.panes.map(pane => (
                <TabPane tab={pane.title} key={pane.key}>
                  <RouterList></RouterList>
                </TabPane>
            ))}
          </Tabs>
        </div>
    )
  }
}

export {TabsT as default}