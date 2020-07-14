import React from 'react'
import {Button, Pagination, Space, Switch, Table} from 'antd';
import Axios from '../../../util/axios'
import Api from '../../../api/index'
class LoginLog extends React.Component {
  //获得登录管理员的编号
  userLoginNo = JSON.parse(sessionStorage.getItem('user')).mgr_no
  constructor(){
    super()
    this.state = {
      tableData:[],
      total:0,
      page:1,
      pagesize:10
    }
  }
  getAllData(){
    Axios.post(Api.user.loginLog,{
      mgr_no:parseInt(this.userLoginNo),
      page:this.state.page,
      pageSize:this.state.pagesize
    }).then((res)=>{
      if(res.data.code == 200){
        this.setState({
          tableData:res.data.data,
          total:res.data.count
        })
      }
      console.log('登录日志',res);
    }).catch((err)=>{
      console.log('登录日志出错',err);
    })
  }
  componentWillMount() {
     this.getAllData()
  }
  //分页
  onPage = (page,pageSize) => {
    console.log('Page: ', page);
    console.log('pageSize: ', pageSize);
    this.setState({
      page: page,
    })
    this.getAllData()
  }

  render() {
    const columns = [
      {
        title: '用户登录记录编号',
        dataIndex: 'log_no',
          align: 'center'
      },
      {
        title: '登录用户编号',
        dataIndex: 'mgr_no',
          align: 'center'
      },
      {
        title: '登录时间',
        dataIndex: 'log_time',
          align: 'center'
        // render: text => <a>{text}</a>,
      },
      {
        title: '登录IP',
        dataIndex: 'log_ip',
          align: 'center'
      },
      {
        title: '浏览器',
        dataIndex: 'log_brow',
          align: 'center'
      },
    ];//表格的列名
    return (
        <div>
          <Table columns={columns} dataSource={this.state.tableData} pagination={false}/>
          {/*分页*/}
          <Pagination showQuickJumper defaultCurrent={this.state.page}  defaultPageSize={this.state.pagesize} total={this.state.total}  onChange={this.onPage}/>

        </div>
    )
  }
}

export {LoginLog as default}