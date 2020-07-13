// 任务列表
import React from 'react'
import { Table, Space,Button,Modal,Input, Form, Row, Col, Select, DatePicker, message,Switch } from 'antd';
import axios from "../../../util/axios";
import Api from '../../../api/index'
import { Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';


var ImgUrl=''
const { confirm } = Modal;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const ImgProps = {
    name: 'file',
    action: 'http://172.16.6.16:8888/uploadfile.do',
    headers: {
      // authorization: 'authorization-text',
    },
    onChange (info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file.response.newfilepath);
         window.sessionStorage.setItem('imgUrl',info.file.response.newfilepath)
        let imgUrl=info.file.response.newfilepath
        ImgUrl=imgUrl
        // this.setState({
        //     wait_logo:imgUrl
        // })
        console.log(ImgUrl)
         console.log(info.fileList)
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      }
    
  };


class ServiceMange extends React.Component {
    constructor(prors){
        super(prors)
        this.state={
            page:1,
            pagesize:20,
            align:'center',
            data:[], //接收数据
            visible: false,
            upvisible: false,
            wait_no:0,
            wait_name:'',
            wait_phone:'',
            wait_desc:'',
            wait_status:'',
            wait_logo:''
        }
    }
    componentDidMount() {
        axios.post(Api.user.serviceList,{
            page: this.state.page,
            pagesize:this.state.pagesize

        }).then((res)=>{
            console.log(res.data)
            if (res.data.code==200){
                this.setState({
                    data:res.data.data
                })
                this.success(res.data.msg)
            }else {
                this.error('加载出错')
            }
        }).catch((err)=>{
            console.log(err)
        })
    }

    // 错误提示
   error = (val) => {
        message.error(val);
    };
    // 成功提示
    success = (val) => {
        message.success(val);
    };
     弹框显示
    showModal = () => {
        this.setState({
            visible: true,
        });
    };
    hideModal = () => {
        this.setState({
            visible: false,
            upvisible: false,
        });
    };

     // 点击确认
    handleOk = () => {
        this.setState({
            visible: false,
            upvisible: false,
        });

    };

    // 点击取消
    handleCancel = ()=> {
        this.setState({
            visible: false,
            upvisible: false,
        });
    };



    // 编辑
    update(text,record,index){
        this.setState({
            upvisible: true,
            wait_no:record.wait_no,
            wait_name:record.wait_name,
            wait_logo:record.wait_logo,
            wait_phone:record.wait_phone,
            wait_desc:record.wait_desc,
            wait_isup:record.wait_isup
        });
    }

    // 获取编辑表单数据并发起请求
    onFinish = values => {
        console.log(values)
        let wait_logo=ImgUrl!=''?ImgUrl:values.wait_logo
        console.log(values)
        axios.post(Api.user.editService,{
            wait_no: values.wait_no,
            wait_name: values.wait_name,
            wait_logo:wait_logo,
            wait_phone:values.wait_phone,
            wait_desc:values.wait_desc,
            wait_isup:this.state.wait_isup
        }).then((res)=>{
            if (res.data.code==200){
                this.success(res.data.msg)
                window.location.reload()
            }else{
                window.location.reload()
            }
        }).catch((err)=>{
            console.log(err)
        })
    }


    // 删除
    // del(text,record,index){
    //     console.log(record.wait_no)
    //     this.showDeleteConfirm(record.wait_no)
    // }
    // // 删除弹框
    // showDeleteConfirm(no) {
    //     console.log(no)
    //     confirm({
    //         title: '是否确认删除?',
    //         okText: '确认',
    //         okType: 'danger',
    //         cancelText: '取消',
    //         // 点击确认触发
    //         onOk() {
    //             axios.post(Api.user.delNav,{
    //                 nav_no:no,
    //             }).then((res)=>{
    //                 window.location.reload()
    //                 console.log(res)
    //             }).catch((err)=>{
    //                 console.log(err)
    //             })
    //         },
    //         // 点击取消触发
    //         onCancel() {
    //             console.log('Cancel');
    //         },
    //     });
    // }
    // 滑块
    handleSetStatus=(checked, record)=>{
        let st = checked ? 1 : 0
        console.log(checked)
        axios.post(Api.user.delService,{
            wait_no: record.wait_no,
            wait_isup:st
        }).then((res)=>{
           console.log(res)
           window.location.reload()
        }).catch((err)=>{
            console.log(err)
        })


    }


    // 添加
    onAddFinish = values => {
        console.log(values);
        axios.post(Api.user.addService,values).then((res)=>{
            if (res.data.code==200){
                this.success('添加成功')
                console.log(res)
                window.location.reload()
            }
            console.log(res)
        }).catch((err)=>{
            console.log(err)
        })
    }


    render() {
        const { visible} = this.state;
        const columns = [
            {
                title: '客户Id',
                dataIndex: 'wait_no',
            },
            {
                title: '客户名称',
                dataIndex: 'wait_name',
                width: 150,
            },
            {
                title: '头像',
                dataIndex: 'wait_logo',
                width: 150,
                render:(r) => {

                    // for(let i=0 ;i<this.state.ServiceList.length;i++){
                        return <img src={r} alt="" style={{width:'50px',height:'50px'}}/>}
                 
            },
            {
                title: '微信号',
                dataIndex: 'wait_phone',
            },
            {
                title: '客服介绍',
                dataIndex: 'wait_desc',
            },
            {
                title: '状态',
                dataIndex: 'wait_isup',
                key:'wait_isup',
                render:(o,record,index) =>{
                    console.log(o)
                  return(
                    <Switch
                    checkedChildren="ON"
                    uncheckedchildren="OFF"
                    defaultChecked={o}
                    onClick={(checked)=>this.handleSetStatus(checked,record,index)}
                    />
                  )
                }
            },
            {
                title: '操作',
                dataIndex: 'address',
                render: (text, record,index) => (
                    <Space size="middle">
                        <Button size='small' onClick={()=>this.update(text,record,index)} >编辑</Button>

                        {/* <Button type="primary" danger size='small' onClick={()=>this.del(text,record,index)}> 删除</Button> */}
                    </Space>
                )
            }
        ];



        return (
            <div>
                <Row>
                    <Col span={2} offset={22}>
                        <Button type="primary" onClick={this.showModal} className='btnMgBottom'>添加</Button>
                        {/*添加弹框*/}
                        <Modal
                            visible={visible}
                            title="添加客服信息"
                            onCancel={this.hideModal}
                            footer={null}

                        >
                            <Form
                                style={{marginLeft:'-12px'}}
                                labelCol={{ span: 6 }}
                                wrapperCol={{ span: 14 }}
                                layout="horizontal"
                                onFinish={this.onAddFinish}
                            >
                              <Form.Item name='wait_name' label="客服名称">
                           <Input  placeholder="large size"  />
                       </Form.Item>
                       {/* <Form.Item name='wait_logo' label="客服头像">
                       <Input  placeholder="large size"  />
                       </Form.Item> */}
                       <Form.Item name='wait_phone' label="手机号">
                           <Input  placeholder="large size" />
                       </Form.Item>
                       <Form.Item name='wait_desc' label="客服介绍">
                           <Input  placeholder="large size"/>
                       </Form.Item>
                      
                                <Form.Item  style={{margin:'20px 0 0 120px'}}>
                                    <Button key="back" onClick={this.handleCancel } className='btnMgRight'>
                                        取消
                                    </Button>
                                    <Button key="submit" type="primary" htmlType="submit"  onClick={this.handleOk}>
                                        提交
                                    </Button>
                                </Form.Item>

                            </Form>
                        </Modal>
                        {/*修改弹框*/}
                        <Modal
                            visible={this.state.upvisible}
                            title="修改客服信息"
                            footer={null}
                            onCancel={this.hideModal}
                        >
                            <Form
                                style={{marginLeft:'-12px'}}
                                labelCol={{ span: 6 }}
                                wrapperCol={{ span: 14 }}
                                layout="horizontal"
                                onFinish={this.onFinish}
                                initialValues={{
                
                                    wait_name: this.state.wait_name,
                                    wait_logo:this.state.wait_logo,
                                    wait_phone:this.state.wait_phone,
                                    wait_desc:this.state.wait_desc,
                                    wait_no:this.state.wait_no,
                                    wait_isup:this.state.wait_isup
                                }}
                            >
                                  <Form.Item name='wait_no' label="客服ID">
                           <Input  placeholder="large size" disabled="disabled" />
                       </Form.Item>
                       <Form.Item name='wait_name' label="客服名称">
                           <Input  placeholder="large size"  />
                       </Form.Item>
                       <Form.Item name='wait_logo' label="客服头像">
                       <Upload {...ImgProps}>
                        <Button>
                        <UploadOutlined /> 请选择头像
                        </Button>
                         </Upload>,
                       </Form.Item>
                       <Form.Item name='wait_phone' label="手机号">
                           <Input  placeholder="large size" />
                       </Form.Item>
                       <Form.Item name='wait_desc' label="客服介绍">
                           <Input  placeholder="large size"/>
                       </Form.Item>
                       {/* <Form.Item name='nav_display' label="是否显示">
                           <Input  placeholder="large size"/>
                       </Form.Item> */}
                       {/* <Form.Item name='nav_sort' label="排序号">
                           <Input  placeholder="large size"/>
                       </Form.Item> */}
                                <Form.Item style={{margin:'20px 0 0 120px'}} >
                                    <Button key="back" onClick={this.handleCancel} className='btnMgRight'>
                                        取消
                                    </Button>
                                    <Button key="submit" type="primary" htmlType="submit"  onClick={this.handleOk}>
                                        提交
                                    </Button>
                                </Form.Item>

                            </Form>
                        </Modal>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Table pagination={false} columns={columns} dataSource={this.state.data}  scroll={{ y: 240 }} />,
                    </Col>
                </Row>
            </div>
        )
    }
}

export {ServiceMange as default}
