// 登录页
import React, { Component } from 'react';
import { Layout } from 'antd';
import { Form, Input, Button, Checkbox } from 'antd';
import '../util/css/Login.css'
const { Header, Footer, Content } = Layout;
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
      console.log('Success:', values);
      // 获取到数据后需要将值提到服务器端进行判断
      this.props.user.login().then((data)=>{
        console.log(data);
        // 登录成功跳转页面
        this.props.history.push('/index')
      }).catch((err)=>{
        console.log(err);
      })
    };
    const onFinishFailed = errorInfo => {
      console.log('Failed:', errorInfo);
    };
    return (
        <Layout>
          <Header>
            <h1>七猫小说后台管理系统</h1>
          </Header>
          <Content className='loginContent'>
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
                <Input />
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
                <Input.Password />
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
