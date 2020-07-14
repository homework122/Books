// 意见管理
import React,{ useState } from 'react'
import { Table, Space,Button,Modal,Input, Form, Row, Col, Select, DatePicker } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
<<<<<<< HEAD
import { HighlightTwoTone,EyeOutlined,DeleteOutlined } from '@ant-design/icons';
=======
import { HighlightTwoTone } from '@ant-design/icons';
>>>>>>> e1abf3390ed26d4d410366c9f49f11273fd1b0ec
import moment from 'moment';
import {inject,observer} from 'mobx-react'
import axios from '../../../util/axios'
import api from '../../../api/index'
import locale from 'antd/lib/date-picker/locale/zh_CN';
import 'moment/locale/zh-cn'
import OPinion from "../../../api/opinion";
import { Pagination } from 'antd'; // 引入组件

moment.locale('zh-cn')
const { TextArea } = Input;
const { confirm } = Modal;
const { Option } = Select;
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';
@inject('Op','Opchaxun')
@observer
class TaskList extends React.Component {
    constructor(prors){
        super(prors)
        this.state={
            SelectName:'',// 搜索名
            current:1, // 当前页
            pagesize:5 ,//每页条
            dataq:[], // 列表数组
            total:0,
            page:1,
            user_phone:'',
            user_nickname:'',
            Count:0
        }
    }
    //分页
    onChangeee = (page,pageSize) => {
        console.log('Page: ', page);
        console.log('pageSize: ', pageSize);
        this.setState({
            page: page,
        })
        axios.post('/opinion/queryOpinion.do',{
            'page': this.state.page,
            'pageSize':this.state.pagesize
        }).then((res)=>{
            console.log("hahha",res.data)
            if (res.data.code){
                this.setState({
                    dataq:res.data.data,
                    total:res.data.count
                })
            }else {
                this.error('加载出错')
            }
        }).catch((err)=>{
            console.log(err)
        })

    }
    // 删除弹框
    showDeleteConfirm() {
        confirm({
            title: '是否确认删除?',
            okText: '确认',
            okType: 'danger',
            cancelText: '取消',
            // 点击确认触发
            onOk() {
                console.log('点击确认触发');
            },
            // 点击取消触发
            onCancel() {
                console.log(' 点击取消触发');
            },
        });
    }
    // 编辑弹框
    showUpdateConfirm(data) {
        confirm({
            icon: <HighlightTwoTone />,
            title: '查看详情',
            content:(
                <Form
                    style={{marginLeft:'-12px'}}
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 14 }}
                    layout="horizontal"
                    onFinish={this.onFinish}
                    initialValues={{
                        user_nickname: data.user_nickname,
                        opinion_time:data.opinion_time,
                        opinion_msg:data.opinion_msg,
                    }}
                >
                    <Form.Item name='user_nickname' label="投诉人">
                        <Input  placeholder="large size"  />
                    </Form.Item>

                    <Form.Item name='opinion_msg' label="意见">
                        <TextArea
                            autoSize={{ minRows: 3, maxRows: 5 }}
                            style={{height:'100px'}}
                            placeholder="large size" />
                    </Form.Item>
                    <Form.Item name='opinion_time' label="提交时间">
                        <Input    placeholder="large size"/>
                    </Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                </Form>

            ),
            okText: '提交',
            cancelText: '取消',
            // 点击确认触发
            onOk() {
                console.log('编辑成功');
            },
            // 点击取消触发
            onCancel() {
                console.log('Cancel');
            },
        });
    }
    // 获取表单数据
    onFinish = values => {
        console.log('Received values of form: ', values);
    }
    // 编辑
    update(text,record,index){
        this.showUpdateConfirm(record)
        console.log(text,record,index)
    }
    // 删除
    del(text,record,index){
        this.showDeleteConfirm()
        console.log(text,record,index)
    }
    // 搜索手机号
    selectNanme = (e) => {
        this.setState({
            SelectName: e.target.value

        })
    }
    SelectBut() {
        console.log(this.state.SelectName)
        console.log("搜索手机号的结果")
        this.props.Opchaxun.caxunList(this.state.SelectName).then((data) => {
            this.setState({
                dataq:data.data.data, // 改变显示表格的值
                Count:data.data.count // 改变页码总条数
            })
            console.log(this.state.dataq)
        })

    }
    //搜索昵称
    selectNanme2 = (e) => {
        this.setState({
            SelectName: e.target.value

        })
    }
    SelectBut2() {
        console.log(this.state.SelectName)
        console.log("搜索昵称的结果")
        console.log(this.props.Opchaxun)
        this.props.Opchaxun.caxunList(this.state.SelectName).then((data) => {
            this.setState({
                dataq:data.data.data, // 改变显示表格的值
                Count:data.data.count // 改变页码总条数
            })
        })
    }
    //请求后台
    componentDidMount(){
        axios.post('/opinion/queryOpinion.do',{
            'page': this.state.page,
            'pageSize':this.state.pagesize
        }).then((res)=>{
            console.log(res.data)
            if (res.data.code){
                this.setState({
                    dataq:res.data.data,
                    total:res.data.count

                })
            }else {
                this.error('加载出错')
            }
        }).catch((err)=>{
            console.log(err)
        })
    }
    render() {
        const columns = [
            {
                title: '用户ID',
                dataIndex: 'opinion_no',
<<<<<<< HEAD
    },
            {
                title: '用户手机号',
                dataIndex: 'user_phone',

=======
                width: 150,
            },
            {
                title: '用户手机号',
                dataIndex: 'user_phone',
                width: 150,
>>>>>>> e1abf3390ed26d4d410366c9f49f11273fd1b0ec
            },
            {
                title: '用户昵称',
                dataIndex: 'user_nickname',
            },
            {
                title: '提交时间',
                dataIndex: 'opinion_time',
                render: (value) => {
                    const obj = {
                        children: JSON.stringify(value).substring(1,11)
                    };
                    return obj;
                },
            },
            {
                title: '意见和建议',
                dataIndex: 'opinion_msg',
            },

            {
                title: '操作',
                dataIndex: 'address',
                render: (text, record,index) => (
<<<<<<< HEAD
                    <Space size="middle" style={{
                        cursor: 'pointer',
                        color:' #2378f7',
                        fontSize: '15px'
                    }}>
                        <span  onClick={()=>this.update(text,record,index)} ><EyeOutlined/></span>
                        <span onClick={()=>this.del(text,record,index)}><DeleteOutlined /></span>
=======
                    <Space size="middle">
                        <Button size='small' onClick={()=>this.update(text,record,index)} >查看</Button>
                        <Button type="primary" danger size='small' onClick={()=>this.del(text,record,index)}> 删除</Button>
>>>>>>> e1abf3390ed26d4d410366c9f49f11273fd1b0ec
                    </Space>
                )
            }
        ];
        return (
            //搜索
            <div>
                <Row>
<<<<<<< HEAD
                    <Col span={24} style={{
                        marginBottom:"20px"
                    }}>
                        <Input  name='username'
                                placeholder=" 请输入用户手机号查询"
                                style={{ width: '200px', float: 'left' ,marginRight:"20px"}}
=======
                    <Col span={24}>
                        <Input  name='username'
                                placeholder=" 请输入用户手机号查询"
                                style={{ width: '300px', float: 'left' }}
>>>>>>> e1abf3390ed26d4d410366c9f49f11273fd1b0ec
                                onChange={this.selectNanme} />
                        <Input
                            name='username2'
                            placeholder="请输入用户昵称查询"
<<<<<<< HEAD
                            style={{ width: '200px', float: 'left',marginRight:"20px" }}
=======
                            style={{ width: '300px', float: 'left' }}
>>>>>>> e1abf3390ed26d4d410366c9f49f11273fd1b0ec
                            onChange={this.selectNanme2} />
                        <Button shape="circle"
                                icon={<SearchOutlined />}
                                size='small'
                                style={{ float: 'left', marginLeft: '10px', marginTop: '5px' }}
                                onClick={this.SelectBut.bind(this)} />
                        <Button
                            shape="circle"
                            icon={<SearchOutlined />}
                            size='small'
                            style={{ float: 'left', marginLeft: '10px', marginTop: '5px' }}
                            onClick={this.SelectBut2.bind(this)} />
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Table pagination={false} columns={columns} dataSource={this.state.dataq}  scroll={{ y: 240 }} />,
                    </Col>
                </Row>
                <Pagination
                    showQuickJumper
                    defaultCurrent={this.state.current}
                    defaultPageSize={this.state.pagesize}
                    total={this.state.total}  onChange={this.onChangeee}/>
            </div>
        )
    }
}

export {TaskList as default}
