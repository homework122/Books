// 分类管理
import React, { Component } from 'react';
import { Table, Space, Button, Switch, Modal, message, Input, Pagination } from 'antd'
import { inject, observer } from 'mobx-react'
import Axios from './../../../util/axios'
import Api from './../../../api/index'
import {DeleteOutlined } from '@ant-design/icons'
const { confirm } = Modal; // 生成模态框
@inject('Types')
@observer
class ArticleClass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 1, // 当前页
            pageSize: 5, // 每页条数
            TypeList: [], // 分类列表
            Count: '', // 总条数
            visible: false, // 添加模态框
            addName: '' // 添加分类名
        }
    }
    getList() {
        this.props.Types.TypeList(this.state.current, this.state.pageSize).then((data) => {
            // console.log(data[1])
            this.setState({
                TypeList: data[0],
                Count: data[1]
            })
        })
    } // 获取表格数据
    del(text, record, index) {
        this.showDeleteConfirm(text, record, index)
    } // 删除按钮
    showDeleteConfirm(text, record, index) {
        confirm({
            title: '是否确认删除?',
            okText: '确认',
            okType: 'danger',
            cancelText: '取消',
            // 点击确认触发
            onOk() {
                // @ts-ignore
                Axios.post(Api.Types.TypeDel, {
                    arttype_no: record.arttype_no
                }).then((res) => {
                    message.success('删除成功');
                    window.location.reload()
                })
            },
            onCancel() { },
        });
    } // 删除弹框
    componentDidMount() {
        this.getList()
    }
    showModal = () => {
        this.setState({
            visible: true,
            addName: ''
        });
    }; // 模态显示
    handleOk = e => {
        if (!this.state.addName.trim()) {
            message.error('分类名不能为空');
        } else {
            this.props.Types.TypeAdd(this.state.addName).then((data) => {
                message.success('添加成功');
                this.setState({
                    visible: false,
                });
                this.getList()
            })

        }

    }; // 点击确定
    handleCancel = e => {
        this.setState({
            visible: false,
        });
    }; // 点击关闭
    AddNanme = (e) => {
        this.setState({
            addName: e.target.value
        })
    } // 添加名称改变
    onChangePage = page => {

        new Promise((resolve, reject) => {
            this.setState({
                current: page
            })
            resolve()
        }).then(() => {
            this.getList()
        })
    }; // 分页
    render() {
        const columns = [
            {
                title: '文章分类编号',
                dataIndex: 'arttype_no',
                width: 150,
                align: 'center'
            },
            {
                title: '文章分类名称',
                dataIndex: 'arttype_name',
                width: 150,
                align: 'center'
            },
            {
                title: '文章总数',
                dataIndex: 'article_sum',
                align: 'center'
            },
            {
                title: '是否删除',
                dataIndex: 'arttype_status',
                align: 'center',
                render: (val, record) => {
                    return (
                        <Switch
                            checkedChildren="开启"
                            // @ts-ignore
                            uncheckedChildren="OFF"
                            defaultChecked={val}
                            disabled={true}
                        />
                    )
                }
            },
            {
                title: '操作',
                dataIndex: 'address',
                align: 'center',
                render: (text, record, index) => (
                    <Space size="middle">
                        <p style={{
                            fontSize: '20px',
                            cursor: 'pointer',
                            color: '#2378f7'
                        }} onClick={() => this.del(text, record, index)}> <DeleteOutlined /></p>
                    </Space>
                )
            }
        ]; // 表格VM
        return (
            <div>
                {/* 添加开始 */}
                <Button type="primary" onClick={this.showModal} style={{ marginLeft:'90%',marginTop:'10px',marginBottom:'10px' }}>
                    添加分类
                </Button>
                <Modal
                    title="创建分类"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    okText='提交'
                    onCancel={this.handleCancel}
                    cancelText='关闭'
                >
                    <span>分类名：</span>
                    <Input name='typename' placeholder="请输入分类名" style={{ width: '300px', marginLeft: '30px' }} onChange={this.AddNanme} value={this.state.addName}/>
                </Modal>
                {/* 添加结束 */}
                {/* 表格部分 */}
                <Table pagination={false}
                    // @ts-ignore
                       columns={columns} dataSource={this.state.TypeList} scroll={{ y: 240 }} />
                {/* 表格部分 */}

                {/* 分页 */}
                <Pagination current={this.state.current} onChange={this.onChangePage} total={(Math.ceil(
                    // @ts-ignore
                    this.state.Count / this.state.pageSize)) * 10} showSizeChanger={false} style={{ marginTop: '20px' }} />
                {/* 分页 */}
            </div>
        );
    }
}

export default ArticleClass;