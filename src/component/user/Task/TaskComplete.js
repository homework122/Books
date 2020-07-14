// 任务列表
import React from 'react'
import {
    Table,
    Button,
    Input,
    Row,
    Col,
    message,
    Pagination
} from 'antd';
import {SearchOutlined} from '@ant-design/icons'
import moment from 'moment';
import 'moment/locale/zh-cn'



import axios from "../../../util/axios";
import api from '../../../api/index'

moment.locale('zh-cn')



class TaskList extends React.Component {
    constructor(prors){
        super(prors)
        this.state={
            page:1,
            pagesize:5,
            count:0,
            data:[], //接收数据
            align:'center',
            SelectVal:'',//搜索用户名
            SelecP:'', //搜索电话
        }
    }
    componentDidMount() {
        axios.post(api.task.taskCompleteList,{
            page: this.state.page,
            pagesize:this.state.pagesize

        }).then((res)=>{
            if (res.data.code==200){
                console.log(res)
                this.setState({
                    data:res.data.data,
                    count:res.data.count
                })
  
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

    // 搜索
    selectName = (e) => {
        this.setState({
            SelectVal: e.target.value
        })
    }
    selectPhone = (e) => {
        this.setState({
            SelectP: e.target.value
        })
    }
    SelectBut() {
        console.log(  this.state.SelectVal)
        console.log(  this.state.SelectP)
        axios.post(api.task.search,{
            page:this.state.page,
            pagesize:this.state.pagesize,
            user_phone:this.state.SelecP,
            user_nickname:this.state.SelectVal,

        }).then((res)=>{
            console.log(res)
            if (res.data.code==200){
                this.setState({
                    data:res.data.data
                })
                this.success(res.data.msg)
            }else {
                this.error(res.data.msg)
            }
        }).catch((err)=>{
            console.log(err)
        })
    }
// 分页
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

        const columns = [
            {
                title: '手机号',
                dataIndex: 'user_phone',
                width: 150,
                align:this.state.align
            },
            {
                title: '用户名',
                dataIndex: 'user_nickname',
                width: 150,
                align:this.state.align
            },

            {
                title: '任务名称',
                dataIndex: 'task_name',
                width: 150,
                align:this.state.align
            },
            {
                title: '任务奖励',
                dataIndex: 'task_reward',
                width: 150,
                align:this.state.align
            },
            {
                title: '完成时间',
                dataIndex: 'taskrec_completetime',
                width: 150,
                align:this.state.align,
                render: (value) => {
                    const obj = {
                        children: JSON.stringify(value).substring(1,11)
                    };
                    return obj;
                },
            },
        ];
        return (
            <div>
                <Row>
                    <Col span={24}>
                        <div style={{ border: '1px solid black ', padding: '10px', borderTop: 'none', overflow: 'hidden', marginBottom: '30px' }}>
                            <Input name='username' placeholder="用户名" style={{ width: '150px', float: 'left' }} onChange={this.selectName} />
                            <Input name='phone' placeholder="电话" style={{ width: '150px', float: 'left', marginLeft:'20px' }} onChange={this.selectPhone} />
                            <Button shape="circle" icon={<SearchOutlined />} size='small' style={{ float: 'left', marginLeft: '10px', marginTop: '5px' }} onClick={this.SelectBut.bind(this)} />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Table pagination={false} columns={columns} dataSource={this.state.data}  scroll={{ y: 240 }} />
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
