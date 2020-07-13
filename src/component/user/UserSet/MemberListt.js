import React from 'react'
import Axios from './../../../util/axios.js'
import Api from './../../../api/index'
import {DatePicker, Form,Select,Table, Space, Button, Modal, Input, Row, Col, Switch, Pagination, Radio, Layout, Upload, message} from 'antd';
// import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
// import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import './MenbetList.css'
import moment from 'moment';
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
class MemberListt extends React.Component {
    constructor(prors) {
        super(prors)
        this.state = {
            loading: false,
            visible: true,
            list: [],
            // imageUrl:''
        }
    }
    componentWillMount() {
        var list={
            user_img:'iii',
            mgr_no:'uuuuu',
            mgr_name:'yyyy',
            Mgr_old:'eeeeee',
            //新密码
            mgr_pwd:0,
            //确认密码
            Confirm_pwd:0,
            Mgr_call:'lll',
            role_no:'ggggg',
        }

        this.setState({
            list:{...list}
        })
        console.log('123',this.state.list)
    }


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
    //  图片上传
    getBase64(img, callback) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    beforeUpload(file) {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    }
    handleChange = info => {
        if (info.file.status === 'uploading') {
            this.setState({ loadingg: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            this.getBase64(info.file.originFileObj, imageUrl =>
                this.setState({
                    imageUrl,
                    loadingg: false,
                }),
            );
        }
    };

    render() {
        const {visible, loading} = this.state;
        //图片上传
        const uploadButton = (
            <div>
                {this.state.loadingg ? <LoadingOutlined /> : <PlusOutlined />}
                <div className="ant-upload-text">上传</div>
            </div>
        );
        const { imageUrl } = this.state;
        //图片上传结束
        return (
            <div>
                <div className="grade">
                    <div className='tu'>
                        <div><img src={this.state.list.mgr_img}
                                  style={{width: '80px', height: '80px', borderRadius: '50%'}}/></div>
                        <br/>
                        <div>222{this.state.list.mgr_name}</div>
                        <div onClick={this.xiugai}>修改</div>
                    </div>
                    <div className='leibiao'>
                        <div>
                            <Row className='cont'>
                                <Col span={3}>用户编号:</Col>
                                <Col span={9}>222{this.state.list.mgr_no}</Col>
                                <Col span={3}>用户名字:</Col>
                                <Col span={9}>222{this.state.list.mgr_name}</Col>
                            </Row>
                        </div>
                        <div>
                            <div>
                                <Row className='cont'>
                                    <Col span={3}>用户电话:</Col>
                                    <Col span={9}>222{this.state.list.mgr_phone}</Col>
                                    <Col span={3}>用户角色:</Col>
                                    <Col span={9}>222{this.state.list.role_no}</Col>
                                </Row>
                            </div>
                            <div>
                                <Row className='cont'>
                                    <Col span={3}>用户状态:</Col>
                                    <Col span={9}>222{this.state.list.mgr_status}</Col>
                                    <Col span={3}>密码:</Col>
                                    <Col span={9}>2222{this.state.list.mgr_pwd}</Col>
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
                    //初始数据， initialValues 的key 与Form.Item 的name 的要一样
                                         initialValues={{
                                             user_img:'http://120.79.74.129/group1/M00/00/00/rBJrKF8FKj6AZ6N3AAB88mSKJZg077.jpg',
                                             mgr_no:this.state.list.mgr_no,
                                             mgr_name:this.state.list.mgr_name,
                                             Mgr_old:this.state.list.Mgr_old,
                                             //新密码
                                             mgr_pwd:'',
                                             //确认密码
                                             Confirm_pwd:'',
                                             Mgr_call:this.state.list.Mgr_call,
                                             role_no:this.state.list.role_no,

                                         }}
                >
                    <Form.Item name='user_img' label="用户头像">
                        {/*图片上传*/}
                        <Upload
                            name="avatar"
                            listType="picture-card"
                            className="avatar-uploader"
                            showUploadList={false}
                            action="http://www.xiadachuan.cn/uploadfile.do"
                            beforeUpload={this.beforeUpload}
                            onChange={this.handleChange}
                        >
                            {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
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

export {MemberListt as default}