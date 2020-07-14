import React from 'react'
import {Button} from "antd";
import {observer} from 'mobx-react'
import tabsStore from "../../store/TabsStore";  //引入状态管理文件 局部引入
import emitter from '../../util/event'   //引入 event
@observer
class AddTabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      panes:tabsStore.getPane().panes, //初始 tabs
    };
  }
  add = () => {
    var key = JSON.stringify(parseInt(this.state.panes[parseInt(this.state.panes.length)-1].key)+1)  // key值是panes数组最后一项的key键的值加一
    tabsStore.addTabs('导航'+key,'/login'+key,key) // 使用 状态管理的方法
    emitter.emit('key', key)   //兄弟之间传值

  };
  render() {
    return (
        <div style={{ marginBottom: 16 }}>
          <Button onClick={this.add}>ADD</Button>
        </div>
    )
  }
}
export {AddTabs as default}