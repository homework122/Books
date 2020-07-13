
import React from 'react'
import {Layout, message, Modal, Pagination, Space, Switch} from 'antd';
import {Button, Col, DatePicker, Input, Row, Table } from "antd";
import {SearchOutlined} from '@ant-design/icons';
import Axios from './../../../util/axios.js'
import Api from './../../../api/index'
const { confirm } = Modal;

class ChangeCode extends React.Component {
    constructor(prors) {
        super(prors)
        this.state = {
            page:1,
            pagesize:3,
            total:0,
            // 数据
            data:[],
        }
    }
    //加载数据
    componentWillMount() {
        this.axios()
    }
    axios=()=>{
        Axios.post(Api.user.record,{
            page:this.state.page,
            pageSize:this.state.pagesize
        })
            .then((res)=>{
                console.log('积分00000',res)
                if(res.data.code===200){
                    console.log('积分',res.data.count)
                    this.setState({
                        data : res.data.data,
                        total:res.data.count
                    })
                    // window.location.reload()
                    message.success(res.data.message)
                    console.log('获取成功')
                }else{
                    console.log('获取失败')
                }

            }).catch((err)=>{
            console.log('出错')
        })
    }
    //分页
    onChangeee = (page, pageSize) => {
        console.log('Page: ', page);
        console.log('pageSize: ', pageSize);
        this.setState({
            page: page,
        })
        this.axios()
    }
    //分页结束
    //筛选查询
    chaxun=()=>{
        Axios.post(Api.user.Integralquery,{
            vip_name:this.refs.vip_name.state.value,
            user_name:this.refs.user_name.state.value,
            page:this.state.page,
            pageSize:this.state.pagesize
        }).then((res)=>{
            if(res.status===200){
                this.setState({
                    data : res.data.data,
                    total:res.data.count
                })
                // window.location.reload()
                message.success('查询成功')

            }else{
                console.log('获取失败')
            }
        }).catch((err)=>{
            console.log('出错')
        })
    }
    // 删除弹框
    showDeleteConfirm=(record)=> {
        var page=this.state.page
        var pagesize=this.state.pagesize
        confirm({
            title: '是否确认删除?',
            okText: '确认',
            okType: 'danger',
            cancelText: '取消',
            // 点击确认触发
            onOk(){
                Axios.post(Api.user.Pointsdeleted,{
                    uv_no:record.uv_no,
                    page:page,
                    pageSize:pagesize
                }) .then((res)=>{
                    console.log(res)
                    console.log('删除成功',res)
                    window.location.reload()
                    message.success(res.data.message)
                }).catch((err)=>{
                    console.log(err)
                    console.log('出错')
                })
            },
            // 点击取消触发
            onCancel() {
                console.log('Cancel');
            },
        });
    }
    // 删除
    del(text,record,index){
        this.showDeleteConfirm(record)
        console.log('删除',record)
        console.log(text,record,index)

    }
    render() {
        const columns = [
            {
                title: '序号',
                dataIndex: 'uv_no',

            },
            {
                title: '用户名称',
                dataIndex: 'user_name',

            },
            {
                title: '手机号',
                dataIndex: 'user_phone',

            },
            {
                title: '会员等级',
                dataIndex: 'vip_bf_no',
            },
            {
                title: '商品名称',
                dataIndex: 'vip_name',
            },
            {
                title: '购买时间',
                dataIndex: 'get_time',
                //日期转换
                render: (value) => {
                    const obj = {
                        children: JSON.stringify(value).substring(1,11)
                    };
                    return obj;
                },
            },
            {
                title: '操作',
                dataIndex: 'address',
                render: (text, record,index) => (
                    <Space size="middle">
                        <Button type="primary" danger size='small' onClick={()=>this.del(text,record,index)}> 删除</Button>
                    </Space>
                )
            }
        ];
        return (
            <div>
                <h2>兑换记录</h2>
                {/*查询*/}
                <div className='query'>
                    用户昵称： <Input ref='user_name' placeholder="用户昵称" />
                    商品名称：<Input ref='vip_name' placeholder="商品名称" />
                    <Button shape="circle" icon={<SearchOutlined />} size='size' onClick={this.chaxun} />
                </div>

                <Table pagination={false}  columns={columns} dataSource={this.state.data}  scroll={{ y: 240 }} />
                <div>
                    <Pagination showQuickJumper defaultCurrent={this.state.page} defaultPageSize={this.state.pagesize} total={this.state.total} onChange={this.onChangeee}/>
                </div>
            </div>
        )
    }
}

export {ChangeCode as default}