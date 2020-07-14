// 登录页
import React, { Component } from 'react';
import { Layout } from 'antd';
import { Form, Input, Button, Checkbox,message } from 'antd';
import {inject,observer} from "mobx-react";
import '../util/css/Login.css'
const { Header, Footer, Content } = Layout;
//style
@inject('user')
@observer
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  // 重置表单
  render() {
    const layout = {
      labelCol: {
        span: 8,
      },
      wrapperCol: {
        span: 16,
      },
    };
    const tailLayout = {
      wrapperCol: {
        offset: 8,
        span: 16,
      },
    };
    const onFinish = values => {
      // console.log('Success:', values);
      // 获取到数据后需要将值提到服务器端进行判断
      // 获取用户名和密码的值，并将值传递过去
      // console.log(values.username);
      // console.log(values.password);
      this.props.user.login(values.username,values.password).then((data)=>{
        console.log(data);
        // 登录成功跳转页面
        this.props.history.push('/index/sysIndex/userTotal')
        message.success(data)
      }).catch((err)=>{
        console.log(err);
      })
    };
    const onFinishFailed = errorInfo => {
      console.log('Failed:', errorInfo);
    };
    return (
        <Layout  className='loginContent'>
          <Header style={{background:'none'}} className='loginHead'>
            <h1>七毛后台管理系统</h1>
          </Header>
          <Content className='formBox'>
            <Form
                {...layout}
                name="basic"
                initialValues={{
                  remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
              <Form.Item
                  label="Username"
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: '请输入用户名',
                    },
                  ]}
              >
                <Input ref="userInput"/>
              </Form.Item>

              <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: '请输入你的密码',
                    },
                  ]}
              >
                <Input.Password ref="pwdInput"/>
              </Form.Item>

              <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Content>
          <Footer>备案号&copy;w218第五组</Footer>
        </Layout>
    );
  }
}

export default Login;
