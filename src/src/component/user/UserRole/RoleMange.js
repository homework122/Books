import React, { useState } from 'react';
import {Button, Col, Input, Layout, Modal, Radio, Row, Select, Space, Switch, Table, Upload,Form,Tree} from "antd";
import Axios from "../../../util/axios";
import Api from '../../../api/index'
import TreeDemo from './TreeComponet'
import {inject,observer} from "mobx-react";
import  treeStore from '../../../store/TreeStore'
const { TreeNode } = Tree;
@inject('user')
@observer
class RoleMange extends React.Component {
  //获得登录管理员的编号
  userLoginNo = JSON.parse(sessionStorage.getItem('user')).mgr_no
  //通过ref获取表单数据域
  formRef = React.createRef();//添加表单
  constructor(){
    super()
    this.state = {
      visible:false,//添加表单的显示隐藏
      tableData:[],//表格数据
    }
  }
  // 获得所有数据
  getAllData(){
    // const token = window.localStorage.getItem("token")
    Axios.post(Api.user.roleData,{
      mgr_no:this.userLoginNo,
      page:1,
      pageSize:10},
    ).then((res)=>{
      console.log('角色列表',res);
      if(res.data.code == 200 ){
        this.setState({
          tableData:res.data.data
        })
      }
     else {
        console.log(res);
      }
      console.log(res);
    })
        .catch((err)=>{
      console.log('角色列表出错',err);
    })
  }
  componentWillMount() {
    this.getAllData()
  }
  // 添加表单成功
  handleOk = val => {
    console.log('hahaha',val);
    console.log('获得mobx中的值',[...this.props.user.menuList]);
    this.setState({
      visible: false,
    });
    // 获得表单里面的值
    let roleName = this.formRef.current.getFieldsValue().role
    let roleState = this.formRef.current.getFieldsValue().user_state
    let menuList = [...this.props.user.menuList]
    console.log(roleName,roleState)
    console.log('get',treeStore.get())
    console.log('get1',JSON.parse(sessionStorage.getItem('menluList')))
    // 发起请求
    Axios.post(Api.user.addRole,{
      role_name:roleName,
      role_status:parseInt(roleState),
      menuList:JSON.parse(sessionStorage.getItem('menluList'))
    }).then((res)=>{
      console.log('添加返回',res);
      if(res.data.code == 200){
           this.getAllData();
      }
    }).catch((err)=>{
      console.log('添加出错',err);
    })

  };
  // 添加表单模态框消失
  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };
  // 显示添加角色菜单
  editRole=()=>{
    this.setState({
      visible: true,
    })
  }
  render() {
    const columns = [
      {
        title: '角色ID',
        dataIndex: 'role_no',
        // render: text => <a>{text}</a>,
      },
      {
        title: '角色名称',
        dataIndex: 'role_name',
      },
      {
        title: '角色状态',
        dataIndex: 'role_status',
        render: (text, record,index) => (
            <Space size="middle">
              {function(txt){
                if(txt == 1){
                  return '启用'
                }else if(txt == 0){
                  return '禁用'
                }
              }
              (text)}
            </Space>
        ),
      },
    ];//表格的列名
    return (
        <div>
          {/*搜索*/}
          <Layout>
            <Row className='searchRow'>
              <Col span={2} offset={22}>
                <Row style={{display:'flex',justifyContent:'space-between',marginBottom:'10px'}}>

                  <Button type="primary" size={this.state.btnSize} onClick={this.editRole}>
                    添加角色
                  </Button>
                </Row>
              </Col>
            </Row>
          </Layout>
          {/*表格*/}
          <Table columns={columns} dataSource={this.state.tableData} />
          {/*添加用户*/}
          <Modal
              title="添加角色"
              visible={this.state.visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
          >
            <Form
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
                onFinish={this.handleOk}
                ref={this.formRef}
                initialValues={{
                  user_name:'',
                  user_role:'',
                  user_state:-1
                }}

            >
              <Form.Item
                  label='角色'
                  name='role'
              >
                <Input/>
              </Form.Item>
              <Form.Item
                  label='权限'
                  name='user_pwd'
              >
               {/*树形控件*/}
                <TreeDemo getTreeData={this.handleOk}></TreeDemo>
              </Form.Item>
              <Form.Item
                  label='角色状态'
                  name='user_state'
              >
                <Radio.Group onChange={this.getFormRadio} value={this.state.formRadioVal}>
                  <Radio value={1}>正常</Radio>
                  <Radio value={2}>禁用</Radio>
                </Radio.Group>
              </Form.Item>
            </Form>
          </Modal>
        </div>
    )
  }
}

export {RoleMange as default}