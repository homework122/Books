// 任务列表
import React from 'react'
import { Table, Space,Button,Modal,Input, Form, Row, Col, Select, DatePicker, message,Switch,Pagination } from 'antd';

import moment from 'moment';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import 'moment/locale/zh-cn'



import axios from "../../../util/axios";
import api from '../../../api/index'

moment.locale('zh-cn')
const { confirm } = Modal;
const { Option } = Select;
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';
const { TextArea } = Input;


class TaskList extends React.Component {
    constructor(prors){
        super(prors)
        this.state={
            page:1, //显示页
            pagesize:5,//显示的条数
            count:0,// 总条数
            align:'center',
            data:[], //接收数据
            visible: false,
            upvisible: false,
            task_no:0,
            task_name:'',
            task_type:'',
            task_reward:'',
            task_time:[moment('', dateFormat)  ,moment('', dateFormat)] ,
            task_rules:'',
            task_isup:0,

        }
    }
    componentDidMount() {
        axios.post(api.task.taskList,{
            page: this.state.page,
            pagesize:this.state.pagesize
        }).then((res)=>{
            if (res.data.code==200){
                this.setState({
                    data:res.data.data,
                    count: res.data.count
                })
            }else {
                this.error('加载出错')
            }
        }).catch((err)=>{

            console.log('加载出错lll',err)
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
            task_no:record.task_no,
            task_name:record.task_name,
            task_type:record.task_type,
            task_reward:record. task_reward,
            task_time:[moment(record.task_starttime, dateFormat)  ,moment(record.task_endtime, dateFormat)] ,
            task_rules:record. task_rules,
            task_isup:record.task_isup,
        });
    }

    // 获取编辑表单数据并发起请求
    onFinish = values => {
        axios.post(api.task.updata,{
            task_no: this.state.task_no,
            task_name: values.task_name,
            task_type:values. task_type,
            task_reward:values.task_reward,
            task_isup:this.state.task_isup,
            task_starttime:values.task_time[0]._i,
            task_endtime:values.task_time[1]._i,
            task_rules:values.task_name
        }).then((res)=>{
            if (res.data.code==200){
                this.success(res.data.msg)
                axios.post(api.task.taskList,{
                    page: this.state.page,
                    pagesize:this.state.pagesize

                }).then((res)=>{
                    if (res.data.code==200){
                        this.setState({
                            data:res.data.data,
                            count: res.data.count
                        })
                    }else {
                        this.error('加载出错')
                    }
                }).catch((err)=>{
                    console.log(err)
                })

            }
        }).catch((err)=>{
            console.log(err)
        })
    }


    // 删除
    del(text,record,index){
        console.log(record.task_no)
        this.showDeleteConfirm(record.task_no)
    }
    // 删除弹框
    showDeleteConfirm(no) {
        let that = this
        confirm({
            title: '是否确认删除?',
            okText: '确认',
            okType: 'danger',
            cancelText: '取消',
            // 点击确认触发
            onOk() {
                axios.post(api.task.del,{
                    task_no:no,
                }).then((res)=>{
                    if (res.data.code==200){
                        that.success(res.data.msg)
                        axios.post(api.task.taskList,{
                            page: that.state.page,
                            pagesize:that.state.pagesize

                        }).then((res)=>{
                            if (res.data.code==200){
                                that.setState({
                                    data:res.data.data,
                                    count: res.data.count
                                })
                            }else {
                                this.error('加载出错')
                            }
                        }).catch((err)=>{
                            console.log(err)
                        })
                    }
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
        axios.post(api.task.isup,{
            task_no: record.task_no,
            task_isup:st

        }).then((res)=>{
           console.log(res)
        }).catch((err)=>{
            console.log(err)
        })


    }


    // 添加
    onAddFinish = values => {
        console.log('Received values of form: ', values);
        axios.post(api.task.add,{
            task_name:values.task_name,
            task_type:values. task_type,
            task_reward:values.task_reward,
            task_isup:1,
            task_starttime:values.task_time[0]._d ,
            task_endtime:values.task_time[1]._d,
            task_rules:values. task_rules,

        }).then((res)=>{
            if (res.data.code==200){
                this.success('添加成功')
                axios.post(api.task.taskList,{
                    page:1  ,
                    pagesize:this.state.pagesize

                }).then((res)=>{
                    if (res.data.code==200){
                        this.setState({
                            data:res.data.data,
                            count: res.data.count
                        })
                        this.success(res.data.msg)
                    }else {
                        this.error('加载出错')
                    }
                }).catch((err)=>{
                    console.log(err)
                })
            }
        }).catch((err)=>{
            console.log(err)
        })
    }


    // 分页操作
    onChangePage = page => {
        new Promise((resolve, reject) => {
            this.setState({
                page: page, // 改变值
            });
            resolve()
        }).then(() => {
            axios.post(api.task.taskList,{
                page: this.state.page,
                pagesize:this.state.pagesize

            }).then((res)=>{
                if (res.data.code==200){
                    this.setState({
                        data:res.data.data,
                        count: res.data.count
                    })
                    this.success(res.data.msg)
                }else {
                    this.error('加载出错')
                }
            }).catch((err)=>{
                console.log(err)
            })

        })
    };



    render() {
        const { visible} = this.state;
        const columns = [
            {
                title: '任务名称',
                dataIndex: 'task_name',
                width: 150,
                align:this.state.align,
            },
            {
                title: '任务类型',
                dataIndex: 'task_type',
                width: 150,
                align:this.state.align,
            },
            {
                title: '任务奖励',
                dataIndex: 'task_reward',
                align:this.state.align,
                width: 150,
            },
            {
                title: '有效期',
                dataIndex: 'task_starttime',
                colSpan: 2,
                align:this.state.align,
                width: 150,
                render: (value) => {
                    const obj = {
                        children: JSON.stringify(value).substring(1,11)
                    };
                    return obj;
                },
            },
            {
                colSpan: 0,
                dataIndex: 'task_endtime',
                align:this.state.align,
                width: 150,
                render: (value) => {
                    const obj = {
                        children: JSON.stringify(value).substring(1,11)
                    };
                    return obj;
                },
            },

            {
                title: '任务规则',
                dataIndex: 'task_rules',
                width: 150,
                align:this.state.align,
            },
            {
                title: '状态管理',
                dataIndex: 'task_isup',
                align:this.state.align,
                width: 150,
                render:(val, record) =>{
                    return(
                        <Switch
                            checkedChildren="ON"
                            uncheckedChildren="OFF"
                            defaultChecked={val}
                            onClick={(checked)=>this.handleSetStatus(checked, record)}
                        />
                    )
                }

            },
            {
                title: '操作',
                dataIndex: 'address',
                align:this.state.align,
                width: 150,
                render: (text, record,index) => (
                    <Space size="middle">
                        <Button size='small' onClick={()=>this.update(text,record,index)} >编辑</Button>
                        <Button type="primary" danger size='small' onClick={()=>this.del(text,record,index)}> 删除</Button>
                    </Space>
                )
            }
        ];



        return (
            <div>
                <Row>
                    <Col span={2} offset={22}>
                        <Button type="primary" onClick={this.showModal} style={{marginBottom:"10px"}}>添加任务</Button>
                        {/*添加弹框*/}
                        <Modal
                            visible={visible}
                            title="添加任务信息"
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
                                <Form.Item name='task_name' label="任务名称">
                                    <Input  placeholder="任务名称"  />
                                </Form.Item>
                                <Form.Item name='task_type' label="Select">
                                    <Select>
                                        <Option value="新手任务" >新手任务</Option>
                                        <Option value="日常任务" >日常任务</Option>
                                        <Option value="活动任务" >活动任务</Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item name='task_reward' label="任务奖励">
                                    <Input  placeholder="任务奖励" />
                                </Form.Item>
                                <Form.Item name='task_time' label="有效期">
                                    <RangePicker
                                        locale={locale}/>
                                </Form.Item>
                                <Form.Item name='task_rules' label="任务规则">
                                    <TextArea
                                        placeholder="任务规则"
                                        autoSize={{ minRows: 3, maxRows: 5 }}
                                    />
                                </Form.Item>
                                <Form.Item style={{margin:'20px 0 0 120px '}} >
                                    <Button key="back" onClick={this.handleCancel}>
                                        取消
                                    </Button>,
                                    <Button key="submit" type="primary" htmlType="submit"  onClick={this.handleOk}>
                                        提交
                                    </Button>
                                </Form.Item>

                            </Form>
                        </Modal>
                        {/*修改弹框*/}
                        <Modal
                            visible={this.state.upvisible}
                            title="修改任务信息"
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
                                    task_name:this.state.task_name,
                                    task_type:this.state.task_type,
                                    task_reward:this.state.task_reward,
                                    task_time:this.state. task_time,
                                    task_rules:this.state.task_rules,
                                }}
                            >
                                <Form.Item name='task_name' label="任务名称">
                                    <Input  placeholder="large size"  />
                                </Form.Item>
                                <Form.Item name='task_type' label="Select">
                                    <Select>
                                        <Option value="新手任务" >新手任务</Option>
                                        <Option value="日常任务" >日常任务</Option>
                                        <Option value="活动任务" >活动任务</Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item name='task_reward' label="任务奖励">
                                    <Input  placeholder="large size" />
                                </Form.Item>
                                <Form.Item name='task_time' label="有效期">
                                    <RangePicker
                                        locale={locale}/>
                                </Form.Item>
                                <Form.Item name='task_rules' label="任务规则">
                                    <TextArea
                                        placeholder="任务规则"
                                        autoSize={{ minRows: 3, maxRows: 5 }}
                                    />
                                </Form.Item>
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
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Table pagination={false} columns={columns} dataSource={this.state.data}   />
                        <Pagination
                            current={this.state.page} // 总条数 绑定state中的值
                            onChange={this.onChangePage}  // 改变页面是发生的函数
                            pageSize={this.state.pagesize}
                            total={this.state.count}
                            // 页码数量 = 向上取整（总条数/每页条数）X10
                            showSizeChanger={false} // 总条数超过多少条显示也换条数
                            style={{ marginTop: '20px' }}
                        />

                    </Col>
                </Row>
            </div>
        )
    }
}

export {TaskList as default}
