import React from 'react'
import Axios from './../../../util/axios.js'
import Api from './../../../api/index'
import {DatePicker, Form,Select,Table, Space, Button, Modal, Input, Row, Col, Switch, Pagination, Radio, Layout,Avatar} from 'antd';
// import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import './MenbetListt.css'
import moment from 'moment';

import { UploadOutlined } from '@ant-design/icons';

// 设置中文操作
import locale from 'antd/lib/date-picker/locale/zh_CN';
import 'moment/locale/zh-cn'
moment.locale('zh-cn')
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';
const {Sider, Content} = Layout;
// const { confirm } = Modal;
const { TextArea } = Input;
const { Option } = Select;
var imgurl

const props = {
  name: 'file',
  action: 'http://www.xiadachuan.cn:8082/uploadfile.do',
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
class UserSet extends React.Component {
  formRef = React.createRef();
  // 登录时的账号
  userLogin = JSON.parse(sessionStorage.getItem('user'))
  constructor(prors) {
    super(prors)
    this.state = {
      loading: false,
      visible: false,
      list: this.userLogin,
    }
  }
  // componentWillMount() {
  //   Axios.post(Api.user.login,
  //       {
  //         mgr_name:'admin',
  //         mgr_pwd:123
  //       }) .then((res)=>{
  //     console.log(res)
  //     console.log('成功')
  //     this.setState({
  //       list:res.data.data
  //     })
  //
  //     // window.location.reload()
  //     message.success(res.data.msg)
  //   })
  //       .catch((err)=>{
  //         console.log(err)
  //         console.log('出错')
  //       })
  // }


  //修改
  xiugai=()=>{
    this.setState({
      visible:true,
    })

  }
  //修改数据
  onFinish = values => {
    console.log('Received values of form: ', values);
    const arr=values
    this.handleOk(values)
    this.setState({
      list:arr
    })
  }
  //添加弹出框数据
  handleOk = (values) => {
    // var values=this.state.list
    console.log('values=',values)
    console.log('mgr_pwd=',values.mgr_pwd)
    console.log('Confirm_pwd=',values.Confirm_pwd)
    if(values.mgr_pwd==values.Confirm_pwd){
      Axios.post(Api.user.updateLogin,
          {
            // mgr_call: values.Mgr_call,
            // mgr_img: "string",
            // mgr_name: "string",
            // mgr_no: 0,
            // mgr_pwd: "string",
            // mgr_status: 0,
            // pwd_old: "string",
            // role_no: 0
            mgr_no:values.mgr_no,
            mgr_name:values.mgr_name,
            mgr_pwd:values.mgr_pwd,
            pwd_old:values.Mgr_old,
            mgr_call:values.Mgr_call,
            mgr_img:imgurl?imgurl:this.state.list.mgr_img,
            mgr_status:parseInt(values.mgr_status),
            role_no:parseInt(values.role_no),
          }) .then((res)=>{
        console.log(res)
        if(res.data.code == 200){
          message.success(res.data.msg)
        }
        // window.location.reload()
      }).catch((err)=>{
        console.log(err)
        console.log('出错')
      })
      this.setState({loading: false, visible: false});
    }else if(values.mgr_pwd==''&&values.Confirm_pwd==''){
      this.setState({loading: false, visible: false});
    }else {
      message.warning('请修改密码保持一致')

    }



  };


  handleCancel = () => {
    this.setState({visible: false});
  };
  render() {
    //重置表单

    const {visible, loading} = this.state;

    return (
        <div>
          <div className="grade">
            <div className='tu'>
              <div><img src={this.state.list.mgr_img}
                        style={{width: '80px', height: '80px', borderRadius: '50%'}}/></div>
              <br/>
              <div>{this.state.list.mgr_name}</div>
              <div onClick={this.xiugai}>修改</div>
            </div>
            <div className='leibiao'>
              <div>
                <Row className='cont'>
                  <Col span={3}>用户编号:</Col>
                  <Col span={9}>{this.state.list.mgr_no}</Col>
                  <Col span={3}>用户名字:</Col>
                  <Col span={9}>{this.state.list.mgr_name}</Col>
                </Row>
              </div>
              <div>
                <div>
                  <Row className='cont'>
                    <Col span={3}>用户电话:</Col>
                    <Col span={9}>{this.state.list.mgr_call}</Col>
                    <Col span={3}>用户角色:</Col>
                    <Col span={9}>{this.state.list.role_no}</Col>
                  </Row>
                </div>
                <div>
                  <Row className='cont'>
                    <Col span={3}>用户状态:</Col>
                    <Col span={9}>{this.state.list.mgr_status}</Col>
                    <Col span={3}>密码:</Col>
                    <Col span={9}>{this.state.list.mgr_pwd}</Col>
                  </Row>
                </div>
              </div>
            </div>
          </div>
          <Modal
              visible={visible}
              width="40%"
              title="修改信息"
              onOk={this.handleOk}
              onCancel={this.handleCancel}
              footer={null}
          >
            <Form
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
                onFinish={this.onFinish}
                ref={this.formRef}
                //初始数据， initialValues 的key 与Form.Item 的name 的要一样
                initialValues={{
                  user_img:imgurl?imgurl:this.state.list.mgr_img,
                  mgr_no:this.state.list.mgr_no,
                  mgr_name:this.state.list.mgr_name,
                  Mgr_old:'',
                  //新密码
                  mgr_pwd:'',
                  //确认密码
                  Confirm_pwd:'',
                  Mgr_call:this.state.list.mgr_call,
                  role_no:this.state.list.role_no,

                }}
            >
              <Form.Item name='user_img' label="用户头像">
                {/*图片上传*/}
                <Avatar src={imgurl?imgurl:this.state.list.mgr_img}/>
                <Upload {...props}>
                  <Button>
                    <UploadOutlined />上传图片
                  </Button>
                </Upload>
              </Form.Item>
              <Form.Item name='mgr_no' label="管理员编号">
                <Input  placeholder=""  />
              </Form.Item>
              <Form.Item name='mgr_name' label="用户名字">
                <Input  placeholder=""  />
              </Form.Item>
              <Form.Item name='Mgr_old' label="用户旧密码">
                <Input.Password  placeholder=""  />
              </Form.Item>
              <Form.Item name='mgr_pwd' label="用户新密码">
                <Input.Password  placeholder="请输入新密码"  />
              </Form.Item>
              <Form.Item name='Confirm_pwd' label="确认密码">
                <Input.Password  placeholder="请输入确认密码"  />
              </Form.Item>
              <Form.Item name='Mgr_call' label="用户电话号码">
                <Input  placeholder=""  />
              </Form.Item>

              <Form.Item name='role_no' label="用户角色编号">
                <Input  placeholder=""  />
              </Form.Item>
              <div className='button'>
                {/*点击执行onFinish 方法*/}
                <Button key="back" onClick={this.handleCancel}>
                  取消
                </Button>
                <Button  type="primary"  className="login-form-button" loading={loading}  htmlType="submit" >
                  确定
                </Button>
              </div>
            </Form>
          </Modal>
        </div>
    )
  }
}

export {UserSet as default}