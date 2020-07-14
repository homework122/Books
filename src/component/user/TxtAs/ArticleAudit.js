// 审核
import React, { Component } from 'react';
import { Table, Space, Button, Modal, message, Pagination } from 'antd'
import { inject, observer } from 'mobx-react'
<<<<<<< HEAD
import { SearchOutlined ,EditOutlined ,EyeOutlined} from '@ant-design/icons';
=======
>>>>>>> e1abf3390ed26d4d410366c9f49f11273fd1b0ec

@inject('Audit')
@observer
class Audit extends Component {
    state = {
        current: 1, // 当前页
        pagesize: 5, // 总条数
        AuditList: [], // 分类数组
        Count: 0, // 总条数
        visible2: false, // 详情模态框
        Specific: '', // 详情
        visible3: false, // 审核框
        AuditId:-1, // 审核ID
    }
    getList() {
        this.props.Audit.getList(this.state.current, this.state.pagesize).then((data) => {
            // console.log(data)
            this.setState({
                AuditList: data[0],
                Count: data[1]
            })
        })
    } // 获取列表
    showConfirm(text, record, index) {
        this.setState({
            visible2: true,
        })
        this.props.Audit.AuditSpecific(record.art_no).then((data) => {
            this.setState({
                Specific: data.data.data[0]
            })
        })
    } // 查看详情
    handleCancel2 = e => {
        this.setState({
            visible2: false,
        });
    }; // 关闭查看
    audit(text, record, index) {
        new Promise((resolve,reject)=>{
            this.setState({ AuditId:record.art_no, })
            resolve()
        }).then(()=>{ this.setState({ visible3: true });})

    }
    handleCancelS = e => {
        this.setState({
            visible3: false,
        });
    }; // 关闭审核
    Pass=()=> {
        this.props.Audit.PassTxt(this.state.AuditId).then((data)=>{
            message.success('审核完毕');
        })
        window.location.reload()
    } // 通过审核
    NoPass=() =>{
        this.props.Audit.NoPassTxt(this.state.AuditId).then((data)=>{
            message.success('审核完毕');
        })
        window.location.reload()
    } // 审核驳回
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
    componentDidMount() {
        this.getList()
    }
    render() {
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
<<<<<<< HEAD
                    <Space size="middle" style={{cursor: 'pointer',
                        color: '#2378f7',
                        fontSize:'15px' }}
                    >
                        <span  onClick={() => this.showConfirm(text, record, index)} ><EyeOutlined /></span>
                        <span  onClick={() => this.audit(text, record, index)}><EditOutlined /></span>
=======
                    <Space size="middle">
                        <Button size='small' onClick={() => this.showConfirm(text, record, index)} >详情</Button>
                        <Button type="primary" danger size='small' onClick={() => this.audit(text, record, index)}>审核/复审</Button>
>>>>>>> e1abf3390ed26d4d410366c9f49f11273fd1b0ec
                    </Space>
                )
            }
        ]; // 表格数据栏
        return (
            <div>
                {/* 表格部分 */}
                <Table pagination={false}
                    // @ts-ignore
                       columns={columns} dataSource={this.state.AuditList} scroll={{ y: 240 }} />
                {/* 表格部分 */}
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
                {/* 审核模态框 */}
                <Modal
                    title="审核结果"
                    visible={this.state.visible3}
                    onCancel={this.handleCancelS}
                    footer={false}
                >
                    <Button type="primary" danger style={{ position:'relative',left:'30px' }} onClick={ this.NoPass }>驳回</Button>
                    <Button style={{ position:'absolute',right:'50px'}} onClick={ this.Pass }>通过</Button>
                </Modal>
                {/* 审核模态框 */}
                {/* 分页 */}
                <Pagination current={this.state.current} onChange={this.onChangePage} total={(Math.ceil(this.state.Count / this.state.pagesize)) * 10} showSizeChanger={false} style={{ marginTop: '20px' }} />
                {/* 分页 */}
            </div>
        );
    }
}

export default Audit;