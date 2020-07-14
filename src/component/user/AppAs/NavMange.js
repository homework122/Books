// 任务列表
import React from 'react'
import { Table, Space,Button,Modal,Input, Form, Row, Col, Select, DatePicker, message,Switch } from 'antd';
import axios from "../../../util/axios";
import Api from '../../../api/index'
import { Upload } from 'antd';
<<<<<<< HEAD
import { UploadOutlined,EditOutlined ,DeleteOutlined} from '@ant-design/icons';
=======
import { UploadOutlined } from '@ant-design/icons';
>>>>>>> e1abf3390ed26d4d410366c9f49f11273fd1b0ec


var ImgUrl=''
const { confirm } = Modal;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const ImgProps = {
    name: 'file',
<<<<<<< HEAD
    action: "http://www.xiadachuan.cn/uploadfile.do",
=======
    action: 'http://172.16.6.16:8888/uploadfile.do',
>>>>>>> e1abf3390ed26d4d410366c9f49f11273fd1b0ec
    headers: {
      // authorization: 'authorization-text',
    },
    onChange (info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file.response.newfilepath);
         window.sessionStorage.setItem('imgUrl',info.file.response.newfilepath)
        let imgUrl=info.file.response.newfilepath
        ImgUrl=imgUrl
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

class Test extends React.Component {
    
    constructor(prors){
        super(prors)
        this.state={
            page:1,
            pagesize:20,
            align:'center',
            data:[], //接收数据
            visible: false,
            upvisible: false,
            nav_no:0,
            nav_name:'',
            nav_icon:'',
            nav_link:'',
            nav_position:'' ,
            nav_sort:'',
            nav_display:0,
<<<<<<< HEAD
            istrue:false,
=======
>>>>>>> e1abf3390ed26d4d410366c9f49f11273fd1b0ec

        }
    }
    componentDidMount() {
      
        axios.post(Api.user.navList,{
            page: this.state.page,
            pagesize:this.state.pagesize

        }).then((res)=>{
            console.log(res.data)
            if (res.data.code==200){
                this.setState({
                    data:res.data.data
                })
<<<<<<< HEAD

=======
                this.success(res.data.msg)
>>>>>>> e1abf3390ed26d4d410366c9f49f11273fd1b0ec
            }else {
                this.error('加载出错')
            }
        }).catch((err)=>{
            console.log(err)
        })
    }
    getImgUrl=(url)=>{
        this.state.nav_icon=url
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
<<<<<<< HEAD
            istrue:false
=======
>>>>>>> e1abf3390ed26d4d410366c9f49f11273fd1b0ec
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
<<<<<<< HEAD
            istrue:false
=======
>>>>>>> e1abf3390ed26d4d410366c9f49f11273fd1b0ec
        });
    };



    // 编辑
    update(text,record,index){
<<<<<<< HEAD
       new Promise(resolve => {
           this.setState({
               upvisible: true,
               nav_no:record.nav_no,
               nav_name:record.nav_name,
               nav_icon:record.nav_icon,
               nav_link:record.nav_link,
               nav_position:record.nav_position,
               nav_sort:record. nav_sort,
               nav_display:record.nav_display,
           });
           resolve()
       }).then(()=>{
           this.setState({
               istrue:true
           })
       })
=======
        this.setState({
            upvisible: true,
            nav_no:record.nav_no,
            nav_name:record.nav_name,
            nav_icon:record.nav_icon,
            nav_link:record.nav_link,
            nav_position:record.nav_position,
            nav_sort:record. nav_sort,
            nav_display:record.nav_display,
        });
>>>>>>> e1abf3390ed26d4d410366c9f49f11273fd1b0ec
    }

    // 获取编辑表单数据并发起请求
    onFinish = values => {
        console.log(values)
        console.log(ImgUrl)
        console.log(values.nav_icon)
        let nav_icon=ImgUrl!=''?ImgUrl:values.nav_icon
        console.log(nav_icon)
        let obj ={
            nav_no: this.state.nav_no,
            nav_name: values.nav_name,
            nav_icon: nav_icon,
            nav_link:values.nav_link,
            nav_position:this.state.nav_position,
            nav_sort:values.nav_sort,
            nav_display:this.state.nav_display
        }
        axios.post(Api.user.editNav,obj).then((res)=>{
            if (res.data.code==200){
                this.success(res.data.msg)
                // window.sessionStorage.removeItem('imgUrl')
                // window.location.reload()
                ImgUrl=''
               
            }else{
                window.sessionStorage.removeItem('imgUrl')
                window.location.reload()
            }
<<<<<<< HEAD
            this.setState({
                istrue:false
            })
=======
>>>>>>> e1abf3390ed26d4d410366c9f49f11273fd1b0ec
        }).catch((err)=>{
            console.log(err)
        })
    }


    // 删除
    del(text,record,index){
        console.log(record.nav_no)
        this.showDeleteConfirm(record.nav_no)
    }
    // 删除弹框
    showDeleteConfirm(no) {
        console.log(no)
        confirm({
            title: '是否确认删除?',
            okText: '确认',
            okType: 'danger',
            cancelText: '取消',
            // 点击确认触发
            onOk() {
                axios.post(Api.user.delNav,{
                    nav_no:no,
                }).then((res)=>{
<<<<<<< HEAD
                    this.success(res.data.msg)
=======
>>>>>>> e1abf3390ed26d4d410366c9f49f11273fd1b0ec
                    window.location.reload()
                    console.log(res)
                }).catch((err)=>{
                    console.log(err)
                })
            },
            // 点击取消触发
            onCancel() {
                console.log('Cancel');
            },
        });
    }
    // 滑块
    handleSetStatus=(checked, record)=>{
        let st = checked ? 1 : 0
        axios.post(Api.user.displayNav,{
            nav_no: record.nav_no,
            nav_display:st

        }).then((res)=>{
<<<<<<< HEAD
            this.success(res.data.msg)
=======
>>>>>>> e1abf3390ed26d4d410366c9f49f11273fd1b0ec
           console.log(res)
        }).catch((err)=>{
            console.log(err)
        })


    }


    // 添加
    onAddFinish = values => {
        console.log(values);
        let nav_name =values.nav_name
        let nav_position = values.nav_position
        let nav_icon =  ImgUrl
        let navObj = {nav_name,nav_position,nav_icon} 
        axios.post(Api.user.addNav,navObj).then((res)=>{
            if (res.data.code==200){
                this.success('添加成功')
                console.log(res)
<<<<<<< HEAD
                this.success(res.data.msg)
=======
>>>>>>> e1abf3390ed26d4d410366c9f49f11273fd1b0ec
                ImgUrl=''
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
                title: '导航编号',
                dataIndex: 'nav_no',
                key:'nav_no',
            },
            {
                title: '导航名称',
                dataIndex: 'nav_name',
                width: 150,
                key:'nav_name',
            },
            {
                title: '导航图标',
                dataIndex: 'nav_icon',
                width: 150,
                key:'nav_icon',
                render:(r) =>{
                    // for(let i=0 ;i<this.state.NavList.length;i++){
                        return <img src={r} alt="" style={{width:'50px',height:'50px'}}/>}
                // }
            },
            // {
            //     title: '是否显示',
            //     dataIndex: 'nav_display',
            // },
            {
              title: '是否显示',
              dataIndex: 'nav_display',
              key:'nav_display',
              render:(o,record,index) =>{
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
<<<<<<< HEAD
                title: '放置',
=======
                title: '放置位置',
>>>>>>> e1abf3390ed26d4d410366c9f49f11273fd1b0ec
                dataIndex: 'nav_position',
                key:'nav_position',
            },
            {
                title: '操作',
                dataIndex: 'address',
                key:'address',
                render: (text, record,index) => (
<<<<<<< HEAD
                    <Space size="middle"
                           style={{cursor: 'pointer',
                               color: '#2378f7',
                               fontSize:'15px' }}
                    >
                        <span  onClick={()=>this.update(text,record,index)} ><EditOutlined /></span>

                        <span  onClick={()=>this.del(text,record,index)}><DeleteOutlined /></span>
=======
                    <Space size="middle">
                        <Button size='small' onClick={()=>this.update(text,record,index)} >编辑</Button>

                        <Button type="primary" danger size='small' onClick={()=>this.del(text,record,index)}> 删除</Button>
>>>>>>> e1abf3390ed26d4d410366c9f49f11273fd1b0ec
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
                            title="添加导航信息"
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
                                <Form.Item name='nav_name' label="导航名称">
                           <Input  placeholder="large size"  />
                       </Form.Item>
                       <Form.Item name='nav_icon' label="导航图标">
                       <Upload {...ImgProps}>
                        <Button>
                        <UploadOutlined /> 请选择头像
                        </Button>
                         </Upload>,
                       </Form.Item>
                       {/* <Form.Item name='nav_link' label="链接地址">
                           <Input  placeholder="large size" />
                       </Form.Item> */}
                       <Form.Item name='nav_position' label="放置位置">
                           <Input  placeholder="large size"/>
                       </Form.Item>
                                <Form.Item style={{margin:'20px 0 0 120px '}} >
                                    <Button key="back" onClick={this.handleCancel}>
                                        取消
                                    </Button>,
                                    <Button key="submit" type="primary" htmlType="submit"  onClick={this.handleOk}>
                                        提交
                                    </Button>,
                                </Form.Item>

                            </Form>
                        </Modal>
                        {/*修改弹框*/}
<<<<<<< HEAD
                    {
                        this.state.istrue &&  <Modal
=======
                        <Modal
>>>>>>> e1abf3390ed26d4d410366c9f49f11273fd1b0ec
                            visible={this.state.upvisible}
                            title="修改导航信息"
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
                                    nav_no: this.state.nav_no,
                                    nav_name: this.state.nav_name,
                                    nav_icon:this.state.nav_icon,
                                    nav_link:this.state.nav_link,
                                    nav_position:this.state.nav_position,
                                    nav_sort:this.state.nav_sort,
                                    nav_display:this.state.nav_display
                                }}
                            >
<<<<<<< HEAD
                                <Form.Item name='nav_no' label="导航ID">
                                    <Input  placeholder="large size" disabled="disabled" />
                                </Form.Item>
                                <Form.Item name='nav_name' label="导航名字">
                                    <Input  placeholder="large size"  />
                                </Form.Item>
                                <Form.Item name='nav_icon' label="导航图标">
                                    <Upload {...ImgProps}>
                                        <Button>
                                            <UploadOutlined /> 请选择头像
                                        </Button>
                                    </Upload>,
                                </Form.Item>
                                <Form.Item name='nav_position' label="放置位置">
                                    <Input  placeholder="large size" />
                                </Form.Item>
                                {/* <Form.Item name='nav_display' label="是否显示">
=======
                                 <Form.Item name='nav_no' label="导航ID">
                           <Input  placeholder="large size" disabled="disabled" />
                       </Form.Item>
                       <Form.Item name='nav_name' label="导航名字">
                           <Input  placeholder="large size"  />
                       </Form.Item>
                       <Form.Item name='nav_icon' label="导航图标">
                       <Upload {...ImgProps}>
                        <Button>
                        <UploadOutlined /> 请选择头像
                        </Button>
                         </Upload>,
                       </Form.Item>
                       <Form.Item name='nav_position' label="放置位置">
                           <Input  placeholder="large size" />
                       </Form.Item>
                       {/* <Form.Item name='nav_display' label="是否显示">
>>>>>>> e1abf3390ed26d4d410366c9f49f11273fd1b0ec
                           <Input  placeholder="large size"/>
                       </Form.Item> */}

                                <Form.Item style={{margin:'20px 0 0 120px '}} >
                                    <Button key="back" onClick={this.handleCancel}>
                                        取消
                                    </Button>
                                    <Button key="submit" type="primary" htmlType="submit"  onClick={this.handleOk}>
                                        提交
                                    </Button>
                                </Form.Item>

                            </Form>
                        </Modal>
<<<<<<< HEAD
                    }
=======
>>>>>>> e1abf3390ed26d4d410366c9f49f11273fd1b0ec
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

export {Test as default}
