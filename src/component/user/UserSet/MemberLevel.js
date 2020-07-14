import React from 'react'
import Axios from './../../../util/axios.js'
import Api from './../../../api/index'
import {Table, Space, Button, Modal, Input, Row, Col, Switch, Pagination,Radio,Avatar} from 'antd';
import {  UsergroupAddOutlined,DeleteOutlined  } from '@ant-design/icons';
import { Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import './MemberLevel.css';
const { confirm } = Modal;
const { TextArea } = Input;
var imgurl

const props = {
    name: 'file',
    action: "http://www.xiadachuan.cn/uploadfile.do",
    headers: {
        // authorization: 'authorization-text',
    },
    onChange(info) {
        if (info.file.status !== 'uploading') {
            imgurl=info.file.response.newfilepath
            // this.setState({
            //     list.user_img:imgurl
            // })
            console.log('图片',imgurl)
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
};
class MemberLevel extends React.Component {
    constructor(prors) {
        super(prors)
        this.state = {
            loading: false,
            visible: false,
            loadingg: false,
            // 数据
             data : [],
            //会员有效期
            value: 1,
        //    滑块开关
            switch:1,
            page:1,
            pageSize:3,
            total:0,
            imageUrl:'',
        }
    }
    //初始请求

    componentWillMount(){
        this.axios()

    }
    axios=()=>{
        Axios.post(Api.user.Membership,{
            page:this.state.page,
            pageSize:this.state.pageSize
        })
            .then((res)=>{
                console.log(res)
                if(res.status===200){
                    this.setState({
                        data : res.data,
                        total:res.count
                    })
                    console.log('获取成功')
                }else{
                    console.log('获取失败')
                }

            }).catch((err)=>{
            console.log('出错')
        })
    }
    //添加弹出框数据
    handleOk = () => {
        console.log('图片',this.state.imageUrl)
            Axios.post(Api.user.members,
                {vip_name:this.refs.membershipLevel.state.value,
                vip_level_desc:this.refs.textarea.state.value,
                vip_itg:parseInt(this.refs.integral.state.value),
                vip_xiaofei:parseInt(this.refs.consumption.state.value),
                vip_validity_no:parseInt(this.state.value),
                vip_moren: parseInt(this.state.switch),
                vip_img_url:''
                }) .then((res)=>{
                this.success(res.data.msg)
                console.log(res)
                console.log('添加成功')
                this.setState({
                    data:[...this.state.data,res.data]
                })
                window.location.reload()
            }).catch((err)=>{
                console.log(err)
                console.log('出错')
            })



        this.setState({ loading: true });
        setTimeout(() => {
            this.setState({ loading: false, visible: false });
        }, 3000);
    };

    handleCancel = () => {
        this.refs.membershipLevel.state.value='';
        this.refs.textarea.state.value='';
        this.refs.integral.state.value='';
        this.refs.consumption.state.value='';
        this.setState({ visible: false });
    };
    //会员有效期
    onChangee = e => {
        console.log('radio checked', e.target.value);
        this.setState({
            value: e.target.value,
        });
        console.log('有效期',e.target.value)
    };
    //滑块开关
   onChange=checked=>{
       if(checked===true){
           this.setState({
               switch:1
           })
       }else {
           this.setState({
               switch:2
           })
       }
    }
    //添加弹框
    add(){
        this.setState({
            visible: true,
        });

    }
    // 删除弹框
    showDeleteConfirm=(record)=> {
        confirm({
            title: '是否确认删除?',
            okText: '确认',
            okType: 'danger',
            cancelText: '取消',
            // 点击确认触发
            onOk() {
                Axios.post(Api.user.del,{
                    vip_no:record.vip_no
                }) .then((res)=>{
                    console.log('删除成功')
                    window.location.reload()
                }).catch((err)=>{
                    console.log(err)
                    console.log('出错')
                })

                console.log('OK');
            },
            // 点击取消触发
            onCancel() {
                console.log('Cancel');
            },
        });
    }
    error = (val) => {
        message.error(val);
    };
    // 成功提示
    success = (val) => {
        message.success(val);
    };
    // 删除
    del(text,record,index){
        this.showDeleteConfirm(record)
        console.log('删除',record)
        console.log(text,record,index)

    }
    //分页
    onChangeee = (page, pageSize) => {
        console.log('Page: ', page);
        console.log('pageSize: ', pageSize);
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
  render() {

      //图片上传结束
      const { visible, loading } = this.state;
      const columns = [
          {
              title: '等级名称',
              dataIndex: 'vip_name',

          },
          {
              title: '等级图标',
              dataIndex: 'vip_img_url',
              render: (text, record,index) => (
                  // console.log(text)
                  <Space size="middle">
                      <img src={text} style={{height:'50px',width:'50px'}} alt='图片'/>
                  </Space>
              )
          },
          {
              title: '会员有效期',
              dataIndex: 'validity_desc',
          },
          {
              title: '会员等级说明',
              dataIndex: 'vip_level_desc',
          },
          {
              title: '操作',
              dataIndex: 'address',
              render: (text, record,index) => (
                  <Space >
                      <p  className='delHuiYuan'  onClick={()=>this.del(text,record,index)}><DeleteOutlined /></p>
                  </Space>
              )
          }
      ];
    return (
        <div >
           {/*<h1>会员等级设置</h1>*/}
           <div style={{textAlign:'right',marginBottom:'10px'}}>
               <div onClick={this.add.bind(this)}  className='addHuiYuan'> <UsergroupAddOutlined /></div>
           </div>
            <Table pagination={false} columns={columns} dataSource={this.state.data} />,
            <div >
                <Modal
                    visible={visible}
                    width="60%"
                    title="添加会员等级"
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
                        <Col span={12}>
                            <Row>
                                <Col span={6}>
                                    <div>
                                        <span>会员等级名称:</span>
                                    </div>
                                   <div>
                                       <span>积分满足点:</span>
                                   </div>
                                    <div>
                                        <span>消费满足点:</span>
                                    </div>
                                    <div>
                                        <span>会员有效期:</span>
                                    </div>
                                    <div>
                                        <span>是否默认等级:</span>
                                    </div>
                                </Col>
                                <Col span={18} >
                                    <div>
                                        <Input ref='membershipLevel' placeholder="会员等级名称" />
                                    </div>
                                 <div>
                                     <Input ref='integral' placeholder="积分满足点" />
                                 </div>
                                    <div>
                                        <Input ref='consumption' placeholder="消费满足点" />
                                    </div>
                                    <div className='radio'>
                                        <Radio.Group onChange={this.onChangee} value={this.state.value}>
                                            <Radio value={1}>一年</Radio>
                                            <Radio value={2}>永久</Radio>
                                        </Radio.Group>
                                    </div>
                                    <div>
                                        <Switch  checkedChildren="开启" unCheckedChildren="关闭" defaultChecked
                                        onChange={this.onChange}
                                        />
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={12}>
                            <Row className='col2'>
                                <Col span={6}>
                                    <div>
                                        <span>会员等级说明:</span>
                                    </div>
                                    <div>
                                        <span>等级图标:</span>
                                    </div>
                                </Col>
                                <Col span={18} >
                                    <div>
                                        <TextArea ref='textarea' rows={4} cols={3} />
                                    </div>
                                    <div style={{marginBottom:"40px",color:"blue",marginLeft:'10px',}}>
                                        {/*<Avatar src={imgurl}/>*/}
                                        <Upload {...props} >
                                                {/*<UploadOutlined />*/}
                                                上传图片
                                        </Upload>
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

export {MemberLevel as default}