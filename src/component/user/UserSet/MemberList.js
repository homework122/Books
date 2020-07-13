import React from 'react'
import {Layout, message, Pagination} from 'antd';
import { Table, Space,Button,Modal,Input,Row, Col,Switch,DatePicker  } from 'antd';
import {SearchOutlined} from '@ant-design/icons';
import './MenbetList.css'
import Axios from './../../../util/axios.js'
import Api from './../../../api/index'
const {  Sider, Content } = Layout;


class MemberList extends React.Component {
    constructor(prors) {
        super(prors)
        this.state = {
            loading: false,
            loadinge: false,
            visible: false,
            visiblee:false,
            loadingg: false,
            selectedRowKeys: [],
            page:1,
            pageSize:3,
            total:0,
            // 数据
            data:[],
        //    客服微信号
            weixin:'',
            mincheng:'客服',
        //    会员信息
            list:[],
            user_registertime:'',
        //    查询日期
            dateString:'',
            switch:2
        }
    }
    //加载数据
    componentWillMount() {
        this.axios()
    }
axios=()=>{
    Axios.post(Api.user.Administration,{
        page:this.state.page,
        pageSize:this.state.pageSize
    })
        .then((res)=>{
            console.log(res)
            if(res.status===200){
                console.log(res.data)
                this.setState({
                    data : res.data.data,
                    total:res.data.count
                })
                // window.location.reload()
                message.success(res.data.message)
                console.log('获取成功')
            }else{
                console.log('获取失败')
            }

        }).catch((err)=>{
        console.log('出错')
    })
}
    //多选框
    onSelectChange = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    };

    //添加弹出框数据
    handleOk = () => {
        this.setState({ loading: false ,visible: false });
        setTimeout(() => {
            this.setState({ loading: false, visible: false });
        }, 3000);
    };

    handleCancel = () => {
        this.setState({ visible: false });
    };
    //客服微信弹出框
    // //客服微信弹出框
    handleOke = () => {
        this.setState({ loadinge: true });
        setTimeout(() => {
            this.setState({ loadinge: false, visiblee: false });
        }, 3000);
    };
    handleCancell = () => {
        this.setState({ visiblee: false });
    };
    //添加弹框
    chakan=(text,record,index)=>{
        this.setState({
            visible: true,
        });
        Axios.post(Api.user.information,{
            user_no:record.user_no
        }).then((res)=>{
                console.log(res)
                if(res.status===200){
                    console.log(res.data)
                    this.setState({
                        list : res.data,
                        user_registertime:JSON.stringify(res.data.user_registertime).substring(1,11)
                    })
                    console.log('获取成功')
                }else{
                    console.log('获取失败')
                }

            }).catch((err)=>{
            console.log('出错')
        })
    }
    //添加
    add(){
        console.log('123')
    }
    dell(text,record,index){
        this.showDeleteConfirm()
        console.log(text,record,index)
    }

// 编辑
    update(text,record,index){
        console.log(text,record,index)
    }
    //筛选查询
    chaxun=()=>{
        Axios.post(Api.user.screen,{
            user_selfvx:this.refs.user_selfvx.state.value,
            user_nickname:this.refs.user_nickname.state.value,
            user_registertime:this.state.dateString,
            page:this.state.page,
            pagesize:this.state.pageSize
        }).then((res)=>{
            console.log(res)
            if(res.status===200){
                console.log(res.data)
                this.setState({
                    data : res.data.data,
                    total:res.data.count
                })
                // window.location.reload()
                message.success(res.data.message)

            }else{
                console.log('获取失败')
            }
        }).catch((err)=>{
            console.log('出错')
        })
    }
  //  客服微信弹出框
    click=(text,record,index)=>{
        this.setState({
            visiblee: true,
            weixin:record.user_selfvx
        });
    }
    //分页
    onChangeee = (page, pageSize) => {
        console.log('Page: ', page);
        console.log('pageSize: ', pageSize);
        this.setState({
            page: page,
        })
        this.axios()
    }
    //分页结束
    //查询日期
    onChange=(value, dateString)=> {
        console.log('Selected Time: ', JSON.stringify(value).substring(1,11));
        console.log('Formatted Selected Time: ', dateString);
       this.setState({dateString:dateString})
    }
    onOk(value) {
        console.log('onOk: ', value);
    }

    //滑块开关
    onChangee=(checked)=>{
        console.log('ssss',checked)
        if(checked){
            console.log('1')
            this.setState({
                switch:1
            })
        }else {
            this.setState({
                switch:2
            })
        }
        console.log('switch=',this.state.switch)
    }
    onSwitch=(text,record,index)=>{
        console.log(text)
        console.log('9999999',record)
        console.log(index)
        console.log('000000=',this.state.switch)
        Axios.post(Api.user.state,
            {user_no:record.user_no,
                user_status:this.state.switch
            }) .then((res)=>{
            console.log(res)
            console.log('成功')
            // window.location.reload()
            message.success(res.data.message)
        }).catch((err)=>{
            console.log(err)
            console.log('出错')
        })
    }
  render() {
      //多选框
      // const { selectedRowKeys } = this.state;
      // const rowSelection = {
      //     selectedRowKeys,
      //     onChange: this.onSelectChange,
      //     selections: [
      //         Table.SELECTION_ALL,
      //         Table.SELECTION_INVERT,
      //         {
      //             key: 'odd',
      //             text: 'Select Odd Row',
      //             onSelect: changableRowKeys => {
      //                 let newSelectedRowKeys = [];
      //                 newSelectedRowKeys = changableRowKeys.filter((key, index) => {
      //                     if (index % 2 !== 0) {
      //                         return false;
      //                     }
      //                     return true;
      //                 });
      //                 this.setState({ selectedRowKeys: newSelectedRowKeys });
      //             },
      //         },
      //         {
      //             key: 'even',
      //             text: 'Select Even Row',
      //             onSelect: changableRowKeys => {
      //                 let newSelectedRowKeys = [];
      //                 newSelectedRowKeys = changableRowKeys.filter((key, index) => {
      //                     if (index % 2 !== 0) {
      //                         return true;
      //                     }
      //                     return false;
      //                 });
      //                 this.setState({ selectedRowKeys: newSelectedRowKeys });
      //             },
      //         },
      //     ],
      // };
      //查询日期
      const { visible, loading ,loadinge,visiblee} = this.state;
      const columns = [
          {
              title: '用户ID',
              dataIndex: 'user_no',

          },
          {
              title: '用户手机',
              dataIndex: 'user_phone',

          },
          {
              title: '用户昵称',
              dataIndex: 'user_nickname',

          },
          {
              title: '会员等级',
              dataIndex: 'vip_name',
          },
          {
              title: '注册时间',
              dataIndex: 'user_registertime',
              //日期转换
              render: (value) => {
                  const obj = {
                      children: JSON.stringify(value).substring(1,11)
                  };
                  return obj;
              },
          },
          {
              title: '专属客服微信号',
              dataIndex: 'user_selfvx',
              render: (text, record,index) => (
                  <Space size="middle">
                      <p onClick={()=>this.click(text,record,index)}>{text}</p>
                  </Space>
              )
          },
          {
              title: '可用积分',
              dataIndex: 'user_usableintegral',
          },
          {
              title: '账户启用状态',
              dataIndex: 'user_status',
              render: (text, record,index) => (
                  <Space size="middle">
                      <Switch checkedChildren="开启" unCheckedChildren="关闭" defaultChecked={text} onClick={()=>this.onSwitch(text, record,index)} onChange={this.onChangee}/>
                  </Space>
              )
          },
          {
              title: '操作',
              dataIndex: 'address',
              render: (text, record,index) => (
                  <Space size="middle">
                      <Button type="primary" danger size='small' onClick={()=>this.chakan(text,record,index)}> 查看</Button>
                  </Space>
              )
          }
      ];
      return (
          <div >
              <h1>会员管理列表</h1>
              {/*查询*/}
              <div className='query'>
              客服微信号： <Input ref='user_selfvx' placeholder="客服微信号" />
                用户昵称：<Input ref='user_nickname' placeholder="用户昵称" />
                注册时间： <DatePicker  onChange={this.onChange} onOk={this.onOk} style={{width:'250px',marginLeft: '30px'}} />
                  <Button shape="circle" icon={<SearchOutlined />} size='size' onClick={this.chaxun} />
              </div>
              <div style={{textAlign:'left'}}>
                  <Row className="row">
                      <Col span={4} style={{marginTop:'5px'}}>
                        <p>
                          会员列表
                        </p>
                      </Col>
                      <Col span={18} offset={20} style={{marginTop:'-80px',marginRight:'30px'}}>
                          {/*<Button style={{marginRight:'30px'}}>批量删除</Button>*/}
                          <Button  onClick={this.add.bind(this)}>导出数据</Button>
                      </Col>
                  </Row>
              </div>
              <Table pagination={false}  columns={columns} dataSource={this.state.data}  scroll={{ y: 240 }} />
              <div className="grade">
                  <Modal
                      visible={visible}
                      width="90%"
                      title="用户信息"
                      onOk={this.handleOk}
                      onCancel={this.handleCancel}
                      footer={[
                          <Button key="back" onClick={this.handleCancel}>
                              取消
                          </Button>,
                          <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
                              确定
                          </Button>,
                      ]}
                  >
                      <Row className='col'>
                          <Col span={5}>
                              <div className='tu'>
                                  <div><img src='http://120.79.74.129/group1/M00/00/00/rBJrKF8FKj6AZ6N3AAB88mSKJZg077.jpg' style={{width:'80px',height:'80px',borderRadius:'50%'}} /></div><br/>
                                  <div>{this.state.list.user_name}</div>
                                  <div>vip{this.state.list.vip_no}</div>
                              </div>
                          </Col>
                          <Col span={19}>
                              <Row>
                                  <Col span={24}>
                                      <Layout>
                                          <Content style={{backgroundColor: 'white'}}>
                                              <div>
                                                  <div >
                                                      <Row className='cont'>
                                                          <Col span={3}>微信OpenID:</Col>
                                                          <Col span={9}>{this.state.list.user_vx}</Col>
                                                          <Col span={3}>生日:</Col>
                                                          <Col span={9}>{this.state.list.user_borth}</Col>
                                                      </Row>
                                                  </div>
                                                  <div >
                                                      <Row className='cont'>
                                                          <Col span={3}>昵称:</Col>
                                                          <Col span={9} >{this.state.list.user_nickname}</Col>
                                                          <Col span={3}>个性签名:</Col>
                                                          <Col span={9}><div>{this.state.list.user_personalwrite}</div></Col>
                                                      </Row>
                                                  </div>
                                                  <div >
                                                      <Row className='cont'>
                                                          <Col span={3}>性别:</Col>
                                                          <Col span={9}>{this.state.list.user_sex}</Col>
                                                          <Col span={3}>注册时间:</Col>
                                                          <Col span={9}>{this.state.user_registertime}</Col>
                                                      </Row>
                                                  </div>
                                                  <div >
                                                      <Row className='cont'>
                                                          <Col span={3}>手机号:</Col>
                                                          <Col span={9}>{this.state.list.user_phone}</Col>
                                                          <Col span={3}>专属客服:</Col>
                                                          <Col span={9}>{this.state.list.user_selfvx}</Col>
                                                      </Row>
                                                  </div>
                                              </div>
                                          </Content>
                                      </Layout>
                                  </Col>
                              </Row>
                          </Col>
                      </Row>
                      <Row className='tongji'>
                          <Col span={24}>
                              <div>
                                  <h4>统计信息</h4>
                                  <hr/>
                                  <table style={{width:'100%'}}>
                                      <th>{'可用积分'}</th>
                                      <th>{'收藏'}</th>
                                      <th>{'评'}</th>
                                      <tbody>
                                      <td>{this.state.list.user_usableintegral}</td>
                                      <td>{this.state.list.user_collection}</td>
                                      <td>{this.state.list.user_evaluate}</td>
                                      </tbody>
                                  </table>
                              </div>
                          </Col>
                      </Row>
                  </Modal>
              </div>
              <div>
                  <Modal
                      visible={visiblee}
                      width="30%"
                      title="指定专属客服"
                      onOk={this.handleOke}
                      onCancel={this.handleCancell}
                      footer={[
                          <Button key="back" onClick={this.handleCancell}>
                              取消
                          </Button>,
                          <Button key="submit" type="primary" loading={loadinge} onClick={this.handleOke}>
                              确定
                          </Button>,
                      ]}
                  >
                      <Row>
                          <Col span={12}>
                              <Row className='col3'>
                                  <Col span={10}>
                                      <div>
                                          <span>客服微信号:</span>
                                      </div>
                                      <div>
                                          <span>客服名称:</span>
                                      </div>
                                  </Col>
                                  <Col span={14}>
                                      <div>
                                          <Input  name='weixin' value={this.state.weixin} placeholder="客服微信号" disabled/>
                                      </div>
                                      <div>
                                          <Input  value={this.state.mincheng} placeholder="客服名称" disabled/>
                                      </div>
                                  </Col>
                              </Row>
                          </Col>
                      </Row>
                  </Modal>
              </div>
              <div>
                  <Pagination showQuickJumper defaultCurrent={this.state.page} defaultPageSize={this.state.pagesize} total={this.state.data.length} onChange={this.onChangeee}/>
              </div>
          </div>
      )
  }

}

export {MemberList as default}