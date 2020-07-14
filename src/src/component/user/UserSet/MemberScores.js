import React from 'react'
import './memberScores.css'
import {
    Table,
    Space,
    Button,
    Modal,
    Input,
    Row,
    Col,
    DatePicker,
    Radio,
    InputNumber,
    Pagination,
    message
} from 'antd';
import {SearchOutlined,EditOutlined,EyeOutlined,CopyOutlined } from '@ant-design/icons';
import Axios from './../../../util/axios.js'
import Api from './../../../api/index'
// const { confirm } = Modal;
// const { Header, Footer, Sider, Content } = Layout;
const { TextArea } = Input;

class MemberScores extends React.Component {
    constructor(prors) {
        super(prors)
        this.state = {
            loading: false,
            loadinge: false,
            visible: false,
            visiblee:false,
            loadingg: false,
            selectedRowKeys: [],
            value: 'add',
            jifen:0,
            user_no:'',
            intlog_source:'',
            data:[],
            jiFenData:[],
            shuJuData:[],
            page:1,
            pagesize:3,
            total:0,
            dateString:'',
            arr:[]
        }
    }
    //加载数据
    componentWillMount() {
        this.axios()
    }
    axios=()=>{
        Axios.post(Api.user.integral,{
            page:this.state.page,
            pageSize:this.state.pageSize
        })
            .then((res)=>{
                console.log(res)
                if(res.status===200){
                    this.setState({
                        data : res.data.data,
                        total:res.data.count
                    })
                    // window.location.reload()
                }else{
                    console.log('获取失败')
                }

            }).catch((err)=>{
            console.log('出错')
        })
    }

    //修改积分单选框
    onChange = e => {
        console.log('radio checked', e.target.value);
        this.setState({
            value: e.target.value,
        });
    };
    //多选框
    onSelectChange = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    };
    //添加弹出框数据
    handleOk = () => {
        this.setState({ loading: true });
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
        Axios.post(Api.user.modify,{
            editMethod:this.state.value,
            number:this.state.jifen,
            intlog_comment:this.refs.texarea.state.value,
            user_no:this.state.user_no,
            intlog_source:this.state.intlog_source,
        }).then((res)=>{
            console.log(res)
            // window.location.reload()
        }).catch((err)=>{
            console.log(err)
            console.log('出错')
        })
        this.setState({ loadinge: true });
        setTimeout(() => {
            this.setState({ loadinge: false, visiblee: false });
        }, 3000);
    };
    handleCancell = () => {
        this.setState({ visiblee: false });
    };
    // 导出数据
    add(){
      console.log('123')
    }
    //积分明细
    mingxi=(text,record,index)=>{
        Axios.post(Api.user.personal,{
            user_no:record.user_no,
            page:this.state.page,
            pageSize:this.state.pageSize
        }).then((res)=>{
            this.setState({
                jiFenData:[{...res.data}],
                shuJuData:res.data.intlogs,
                visible: true,
            })
            }).catch((err)=>{
                console.log(err)
            console.log('出错')
        })
    }
    //修改
    xiugai=(text,record,index)=>{
        this.setState({
            visiblee: true,
            user_no:record.user_no,
            intlog_source:record.intlog_source,
        });

    }
    onChang=(value)=> {
        console.log('changed', value);
        this.setState({
            jifen:value
        })
    }
    //  客服微信弹出框
    click(){
        this.setState({
            visiblee: true,
        });
    }
    //筛选查询
    chaxun=()=>{
        Axios.post(Api.user.query,{
            user_phone:this.refs.user_selfvx.state.value,
            user_nickname:this.refs.user_nickname.state.value,
            user_registertime:this.state.dateString,
            page:this.state.page,
            pagesize:this.state.pageSize,
        }).then((res)=>{
            if(res.status===200){
                this.setState({
                    data : res.data.data,
                    total:res.data.count
                })

            }else{
                console.log('获取失败')
            }
        }).catch((err)=>{
            console.log('出错')
        })
    }
    //分页
    onChangeee = (page,pageSize) => {
        new Promise(resolve => {
            this.setState({
                page: page,
            })
            resolve()
        }).then(()=>{
                this.axios()
            }
        )
    }
    //分页结束
    //查询日期
    onChangeg=(value, dateString)=> {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
        this.setState({
            dateString:dateString
        })
    }
    onOke(value) {
        console.log('onOk: ', value);
    }
  render() {

      //多选框
      const { selectedRowKeys } = this.state;
      const rowSelection = {
          selectedRowKeys,
          onChange: this.onSelectChange,
          selections: [
              Table.SELECTION_ALL,
              Table.SELECTION_INVERT,
              {
                  key: 'odd',
                  text: 'Select Odd Row',
                  onSelect: changableRowKeys => {
                      let newSelectedRowKeys = [];
                      newSelectedRowKeys = changableRowKeys.filter((key, index) => {
                          if (index % 2 !== 0) {
                              return false;
                          }
                          return true;
                      });
                      this.setState({ selectedRowKeys: newSelectedRowKeys });
                  },
              },
              {
                  key: 'even',
                  text: 'Select Even Row',
                  onSelect: changableRowKeys => {
                      let newSelectedRowKeys = [];
                      newSelectedRowKeys = changableRowKeys.filter((key, index) => {
                          if (index % 2 !== 0) {
                              return true;
                          }
                          return false;
                      });
                      this.setState({ selectedRowKeys: newSelectedRowKeys });
                  },
              },
          ],
      };
      //查询日期
      const { visible, loading ,loadinge,visiblee} = this.state;
      //数据列表
      const columns = [
          {
              title: '用户ID',
              dataIndex: 'user_no',

          },
          {
              title: '会员等级',
              dataIndex: 'vip_name',

          },
          {
              title: '用户昵称',
              dataIndex: 'user_nickname',

          },
          {
              title: '用户手机号',
              dataIndex: 'user_phone',
          },
          {
              title: '用户总积分',
              dataIndex: 'user_integral',
          },

          {
              title: '用户可用积分',
              dataIndex: 'user_usableintegral',
          },
          {
              title: '操作',
              dataIndex: 'address',
              render: (text, record,index) => (
                  <Space size="middle" className='mingxi'>
                    <span onClick={()=>this.mingxi(text,record,index)}><EyeOutlined /></span>
                    <span onClick={()=>this.xiugai(text,record,index)}><EditOutlined /></span>
                  </Space>
              )
          }
      ];
      //积分明细列表
      const jiFen = [
          {
              title: '用户账号',
              dataIndex: 'user_no',

          },
          {
              title: '用户昵称',
              dataIndex: 'user_nickname',

          },
          {
              title: '会员等级',
              dataIndex: 'vip_name',
          }];
      //积分弹出框数据
      //积分明细列表
      const shuJu = [
          {
              title: '积分来源',
              dataIndex: 'intlog_source',
          },
          {
              title: '积分变化',
              dataIndex: 'intlog_change',
          },
          {
              title: '变化时间',
              dataIndex: 'intlog_time',
              //日期转换
              render: (value) => {
                  const obj = {
                      children: JSON.stringify(value).substring(1,11)
                  };
                  return obj;
              },
          },
   {
       title: '备注',
           dataIndex: 'intlog_comment',
   },];
      return (
        <div>
            {/*<h1>会员积分明细</h1>*/}
            {/*查询*/}
            <div className='query'>
                手机号： <Input ref='user_selfvx' placeholder="客服微信号" />
                用户昵称：<Input ref='user_nickname' placeholder="用户昵称" />
                注册时间： <DatePicker  onChange={this.onChangeg} onOk={this.onOke} style={{width:'200px',marginLeft: '10px'}} />
                <Button shape="circle" icon={<SearchOutlined />} size='middle' onClick={this.chaxun} />
            </div>
            <div style={{textAlign:'left'}}>
                <Row className="row">
                    <Col span={4} style={{marginTop:'5px'}}>
                        <p>
                            会员列表
                        </p>
                    </Col>
                    <Col span={3} offset={17} >
                        {/*<Button style={{marginRight:'30px'}}>批量删除</Button>*/}
                        <Button type="primary" onClick={this.add.bind(this)}><CopyOutlined />导出</Button>
                    </Col>
                </Row>

            </div>
            <Table pagination={false}  rowSelection={rowSelection} columns={columns} dataSource={this.state.data} />,
            <div>
                {/*积分明细*/}
                <Modal
                    visible={visible}
                    width="95%"
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
                        <Col span={24}>
                            <Row>
                                <Col span={24}>
                                    <Table pagination={false}  columns={jiFen} dataSource={this.state.jiFenData}  />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <div>
                        <div className='shu'>
                            <h3>数据</h3>
                        </div>
                        <hr/>
                        <Table pagination={false}  columns={shuJu} dataSource={this.state.shuJuData}  scroll={{ y: 240 }} />
                    </div>
                </Modal>
            </div>
            <div>
                {/*修改积分*/}
                <Modal
                    visible={visiblee}
                    width="40%"
                    title="修改积分"
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
                        <Col span={20}>
                            <Row className='col3'>
                                <Col span={5}>
                                    <div>
                                        <span>调整积分:</span>
                                    </div>
                                    <div className='fenshu'>
                                        <span>
                                            修改分数:
                                         </span>
                                    </div>
                                    <div>
                                        <span className='beizhu'>备注信息:</span>
                                    </div>
                                </Col>
                                <Col span={19}>
                                    <div className='texta'>
                                        <Radio.Group onChange={this.onChange} value={this.state.value} >
                                            <Radio value='add'>增加</Radio>
                                            <Radio value='reduce'>减少</Radio>
                                        </Radio.Group>
                                    </div>
                                    <div className='texta'>
                                        <InputNumber min={0} max={10000} defaultValue={this.state.jifen} onChange={this.onChang} size='small' className='col4' />
                                    </div>
                                    <div className='texta'>
                                        <TextArea ref='texarea' rows={5}/>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Modal>
            </div>
            <div>
                <Pagination showQuickJumper defaultCurrent={this.state.page}  defaultPageSize={this.state.pagesize} total={this.state.total}  onChange={this.onChangeee}/>
            </div>
        </div>
    )
  }
}

export {MemberScores as default}