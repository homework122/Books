// 文章管理
import React, { Component } from 'react';
import { Input, Select } from 'antd';
import { Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import {
    Form,
    DatePicker
} from 'antd';
import { Table, Space, Pagination, message, Upload } from 'antd';
import { inject, observer } from 'mobx-react'
import { UploadOutlined } from '@ant-design/icons';

import Axios from '../../../util/axios'
import Api from '../../../api/index'


const { confirm } = Modal; // 生成模态框
const { Option } = Select; // 选择器
var Img = ''
@inject('Txts')
@inject('Types')
@observer
class TxtList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            SelectName: '', // 搜索名
            visible: false, // 添加模态框显示
            visible2: false, // 查看模态框
            current: 1, // 当前页
            pagesize: 5, // 每页条数
            TxtList: [], // 文章列表
            Count: 0, //总条数
            Specific: '', // 详情
            props: {
                name: 'file',
                action: 'http://www.xiadachuan.cn/uploadfile.do',
                headers: {
                    // authorization: 'authorization-text',
                },
                onChange(info) {
                    if (info.file.status !== 'uploading') {
                        console.log(info.file.response.newfilepath)
                        Img = info.file.response.newfilepath
                    }
                    if (info.file.status === 'done') {
                        message.success(`${info.file.name} file uploaded successfully`);
                    } else if (info.file.status === 'error') {
                        message.error(`${info.file.name} file upload failed.`);
                    }
                },
            }, // 上传图片
            TypeList: '', // 类型列表
        }
    }
    selectNanme = (e) => {
        this.setState({
            SelectName: e.target.value
        })
    } // 搜索名称改变
    SelectBut() {
        this.props.Txts.TxtSearch(this.state.SelectName).then((data) => {
            this.setState({
                TxtList: data.data.data,
                Count: data.data.count
            })
        })
    } //发送请求搜索
    showModal = () => {
        new Promise((resolve, reject) => {
            this.props.Txts.SAdd().then((data) => {
                this.setState({
                    TypeList: data
                })
                resolve()
            })
        }).then(() => {
            this.setState({
                visible: true,
            })
        })
    } // 添加模态框显示
    handleOk = () => {
        this.setState({
            visible: false
        });
    } // 提交
    handleCancel = () => {
        this.setState({
            visible: false,
        });
    } // 关闭模态框
    showDeleteConfirm(text, record, index) {
        confirm({
            title: '是否确认删除?',
            okText: '确认',
            okType: 'danger',
            cancelText: '取消',
            // 点击确认触发
            onOk() {
                // @ts-ignore
                Axios.post('/apz'+Api.Txts.TxtDel, {
                    art_no: record.art_no
                }).then((res) => {
                    message.success('删除成功');
                    window.location.reload()
                })
            },
            onCancel() { },
        });
    } // 删除弹框
    showConfirm(text, record, index) {
        this.setState({
            visible2: true,
        })
        this.props.Txts.TxtSpecific(record.art_no).then((data) => {
            this.setState({
                Specific: data.data.data[0]
            })
        })
    } // 查看详情
    handleOk2 = e => {
        this.setState({
            visible2: false,
        });
    }; // 确定查看
    handleCancel2 = e => {
        this.setState({
            visible2: false,
        });
    }; // 关闭查看
    update(text, record, index) {
        this.showConfirm()
        console.log(text, record, index)
    } // 编辑
    del(text, record, index) {
        this.showDeleteConfirm(text, record, index)
    } // 删除按钮
    onFinish = values => {
        values.txt_Mon=parseInt(values.txt_Mon)
        new Promise((resolve, reject) => {
            this.props.Txts.TxtAdds(values,Img).then((data)=>{
                message.success('添加成功')
            })
            resolve()
        }).then(()=>{
            this.setState({
                visible:false
            })
        })
    } // 获取表单数据
    onChangePage = page => {
        new Promise((resolve, reject) => {
            this.setState({
                current: page,
            });
            resolve()
        }).then(() => {
            this.props.Txts.TxtList(this.state.current, this.state.pagesize).then((data) => {
                this.setState({
                    TxtList: data[0],
                    Count: data[1]
                })
            })
        })
    }; // 分页
    componentDidMount() {
        this.props.Txts.TxtList(this.state.current, this.state.pagesize).then((data) => {
            this.setState({
                TxtList: data[0],
                Count: data[1]
            })
        })
    }

    render() {
        const { visible } = this.state // 绑定模态框
        const columns = [
            {
                title: '文章编号',
                dataIndex: 'art_no',
                width: 150,
                align: 'center'
            },
            {
                title: '文章标题',
                dataIndex: 'art_title',
                width: 150,
                align: 'center'
            },
            {
                title: '文章图片',
                dataIndex: 'art_img',
                render: (r) => {
                    return <img src={r} alt="" style={{ width: '50px', height: '50px' }} />
                },
                align: 'center'
            },
            {
                title: '文章分类名称',
                dataIndex: 'arttype_name',
                align: 'center'
            },
            {
                title: '是否收费',
                dataIndex: 'charge_name',
                align: 'center'
            },
            {
                title: '审核状况',
                dataIndex: 'audit_name',
                align: 'center'
            },
            {
                title: '操作',
                dataIndex: 'address',
                align: 'center',
                render: (text, record, index) => (
                    <Space size="middle">
                        <Button size='small' onClick={() => this.showConfirm(text, record, index)} >详情</Button>
                        <Button type="primary" danger size='small' onClick={() => this.del(text, record, index)}> 删除</Button>
                    </Space>
                )
            }
        ]; // 表格数据栏
        return (
            <div>
                {/* 搜索栏开始 */}
                <div style={{ fontSize: '20px', overflow: 'hidden', backgroundColor: 'rgba(0,0,0,.3)', height: '35px', lineHeight: '35px', color: 'white' }}><span style={{ float: 'left', marginLeft: '20px' }}>搜索添加</span></div>
                <div style={{ border: '1px solid black ', padding: '10px', borderTop: 'none', overflow: 'hidden', marginBottom: '30px' }}>
                    {/* 模态框按钮 */}
                    <Button type="primary" onClick={this.showModal} style={{ float: 'right', marginRight: '20px' }}>
                        添加
                    </Button>
                    {/* 按钮结束 */}
                    <Input name='username' placeholder="商品名" style={{ width: '300px', float: 'left' }} onChange={this.selectNanme} />

                    <Button shape="circle" icon={<SearchOutlined />} size='small' style={{ float: 'left', marginLeft: '10px', marginTop: '5px' }} onClick={this.SelectBut.bind(this)} />
                </div>
                {/* 搜索栏结束 */}
                {/* 表格部分 */}
                <Table pagination={false}
                    // @ts-ignore
                       columns={columns} dataSource={this.state.TxtList} scroll={{ y: 240 }} />
                {/* 表格部分 */}
                {/* 模态框 */}
                <Modal
                    title="添加文章"
                    visible={visible}
                    okText='提交'
                    cancelText='关闭'
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={ false }
                >
                    {/* 添加表单 */}
                    <Form
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 14 }}
                        layout="horizontal"
                        onFinish={this.onFinish}
                        initialValues={{
                            remember: true, // 验证
                            txt_name: '',
                            txt_img: '',
                            txt_type: '',
                            txt_name2: '',
                            txt_Mon:'',
                            txt_test:'',
                            txt_num:''
                        }}
                    >
                        <Form.Item
                            name='txt_name' label="文章标题"
                            rules={[{ required: true, message: '文章标题不能为空' }]}>
                            <Input placeholder="请输入文章标题" />
                        </Form.Item>
                        <Form.Item
                            name='txt_img' label="文章图片">
                            <Upload {...this.state.props}>
                                <Button>
                                    <UploadOutlined /> 上传图片
                                </Button>
                            </Upload>
                        </Form.Item>
                        <Form.Item
                            name='txt_type' label="文章分类"
                            rules={[{ required: true, message: '文章类型不能为空' }]}>
                            <Select style={{ width: 120 }}>
                                {this.state.TypeList.length && this.state.TypeList.map((item) => (
                                    <option value={item.arttype_no}>{item.arttype_name}</option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name='txt_name2' label="文章作者"
                            rules={[{ required: true, message: '文章作者不能为空' }]}>
                            <Input placeholder="请输入文章作者" />
                        </Form.Item>
                        <Form.Item
                            name='txt_Mon' label="收费"
                            rules={[{ required: true, message: '必须选择类型' }]}>
                            <Select style={{ width: 120 }}>
                                <Option value="1">收费</Option>
                                <Option value="2">免费</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name='txt_test' label="文章正文"
                            rules={[{ required: true, message: '文章必须有内容' }]}>
                            <Input/>
                        </Form.Item>
                        <Form.Item
                            name='txt_num' label="兑换积分"
                            rules={[{ required: true, message: '输入兑换积分' }]}>
                            <Input/>
                        </Form.Item>
                        <Button type="primary" htmlType="submit"
                                className="login-form-button">
                            创建
                        </Button>
                    </Form>
                    {/* 添加表单 */}
                </Modal>
                {/* 模态框 */}
                {/* 查看模态框 */}
                <Modal
                    title="文章详情"
                    visible={this.state.visible2}
                    footer={null}
                    style={{ overflow: 'hidden' }}
                    onCancel={this.handleCancel2}
                >
                    <div>
                        <p style={{ fontSize: '18px', textAlign: 'center', lineHeight: '50%' }}>{this.state.Specific.
                            // @ts-ignore
                            art_title} </p>
                        <span style={{ textAlign: 'center', marginLeft: '40px' }}>文章作者：{this.state.Specific.
                            // @ts-ignore
                            art_author}</span>
                        <span style={{ marginLeft: '10px', textAlign: 'center' }}>文章分类：{this.state.Specific.
                            // @ts-ignore
                            arttype_name}</span>
                        <span style={{ marginLeft: '10px', textAlign: 'center' }}>文章时间：{this.state.Specific.
                            // @ts-ignore
                            art_time}</span>
                        <hr></hr>
                        <div style={{ width: '90%', margin: 'auto', border: '1px solid rgba(0,0,0,.3)' }}>
                            {this.state.Specific.
                                // @ts-ignore
                                art_text}
                        </div>
                        <hr></hr>
                        <p>评论：</p>
                        <span style={{ marginLeft: '20px' }}>{this.state.Specific.
                            // @ts-ignore
                            user_name}</span>
                        <span style={{ marginLeft: '20px' }}>{this.state.Specific.
                            // @ts-ignore
                            comment_text}</span>
                    </div>
                    <Button onClick={this.handleCancel2} style={{ marginLeft: '85%' }}>关闭</Button>
                </Modal>
                {/* 查看模态框 */}
                {/* 分页 */}
                <Pagination current={this.state.current} onChange={this.onChangePage} total={(Math.ceil(this.state.Count / this.state.pagesize)) * 10} showSizeChanger={false} style={{ marginTop: '20px' }} />
                {/* 分页完 */}
            </div>
        );
    }
}

export default TxtList;