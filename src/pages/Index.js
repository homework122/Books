import React from 'react'
import {Layout,Row,Col,message,Avatar} from 'antd';
import {Route} from 'react-router-dom'
import { TeamOutlined,ContainerOutlined,ArrowUpOutlined,ArrowDownOutlined  } from '@ant-design/icons';
import LeftMenu from './../component/LeftMenu'
import PrivateRouter from './../component/PrivateRouter'
import '../util/css/Index.css'
import Axios from '../util/axios'
import Api from '../api/index'
import echarts from 'echarts/lib/echarts'
import  'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import AddTab from '../component/tab/addTabs'
import TabsT from '../component/tab/TabsT'

import ReactDOM from "react-dom";
import Home from "../component/user/Home/SystemIndex";
// const { SubMenu } = Menu;
const { Content, Sider,Header } = Layout;
// react函数式组件
// function Clock(props){
//   return (
//       <div>
//         <span>{props.date.toLocaleTimeString()}</span>
//       </div>
//   )
// }
// function run(){
//   ReactDOM.render(
//       <Clock date={new Date()}/>,
//       document.querySelector(".setTime")
//   )
// }

class Index extends React.Component {
  //获得登录管理员的编号
  userLogin = JSON.parse(sessionStorage.getItem('user'))
  // 获得本周日期数组
  weekDate = []
  weekData = []
  constructor(){
    super()
    this.state = {
      todayNew: 0,//今日新增
      yestodayNew: 0,//昨日新增
      compareToLastMonth: "",//同比上月
      weekNew: 0,//本周新增会员
      compareToLastWeek: "",//同比上周
      monthNew: 0,//本月新增
      vip_sum: 0,//会员总数
      daysData:[],//近一周

    }
  }
  // 获得本周数据数组
  // 退出登录
  signOut = ()=>{
    sessionStorage.clear()
    Axios.post(Api.user.signOut,{
       mgr_no:parseInt(this.userLogin.mgr_no)
    }).then((res)=>{
      // if(res.data.code == 200){
      //   message.success(res.data.msg)
        console.log('退出登录',res);
        this.props.history.push('/login')
      // }
        }).catch((err)=>{
      console.log('退出登录出错',err);
    })

  }
  // 获得当前时间
  componentWillMount() {
    // 请求数据
    Axios.post(Api.user.sysIndex,{
      // mgr_no:parseInt(this.userLogin.mgr_no)
    }).then((res)=>{
      console.log('系统首页数据',res);
      if(res.data.code == 200 ){
        this.setState({
          todayNew: res.data.data.todayNew,//今日新增
          yestodayNew: res.data.data.yestodayNew,//昨日新增
          compareToLastMonth: res.data.data.compareToLastMonth,//同比上月
          weekNew: res.data.data.weekNew,//本周新增会员
          compareToLastWeek:res.data.data.compareToLastWeek,//同比上周
          monthNew: res.data.data.monthNew,//本月新增
          vip_sum: res.data.data.vip_sum,//会员总数
          daysData:res.data.data.daysData,//近一周的数据
        })
        console.log('ceshi',this.state.todayNew);
        console.log('benzhou',this.state.daysData);
      }
    }).then(()=>{
      this.state.daysData.forEach((item)=>{
        this.weekDate.push(item.daliy)
        this.weekData.push(item.cont)
      })
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('main'));
      // 绘制图表
      myChart.setOption({
        tooltip: {},
        xAxis: {
          data: this.weekDate
        },
        yAxis: {},
        series: [{
          name: '会员数',
          type: 'line',
          data: this.weekData
        }]
      });
    }).catch((err)=>{
      console.log(err);
    })
  }
  render() {
    return (
        <Layout>
          <Header className='indexHead'>
            <Row >
              <Col span={5} style={{textAlign:'left !important'}}>
<<<<<<< HEAD
                <h2 style={{color: 'white'}}>七毛后台管理系统</h2>
=======
                <h2>七毛小说后台管理系统</h2>
>>>>>>> e1abf3390ed26d4d410366c9f49f11273fd1b0ec
              </Col>
              <Col  span={19} >
                <Row style={{textAlign:'right !important'}} >
                  {/*时间*/}
                  <Col className='setTime' offset={18} span={2}>
                    {new Date().toLocaleDateString()}
                  </Col>
                  {/*头像*/}
                  <Col  span={2}>
                    欢迎{this.userLogin.mgr_name}
                  </Col>
                  <Col span={1}>
                    <Avatar src={this.userLogin.mgr_img} />
                  </Col>
                  {/*退出*/}
                  <Col span={1} onClick={this.signOut} className='loginOut'>退出</Col>
                </Row>
              </Col>
            </Row>
          </Header>
          <Layout>
<<<<<<< HEAD
            <Sider width={200} className="site-layout">
              {/*这里写一个组件，根据数据生成Menu*/}
              <LeftMenu className="site-layout" history={this.props.history} />
=======
            <Sider width={200} className="site-layout-background">
              {/*这里写一个组件，根据数据生成Menu*/}
              <LeftMenu  history={this.props.history} />
>>>>>>> e1abf3390ed26d4d410366c9f49f11273fd1b0ec
            </Sider>
            <Layout style={{ padding: '0 24px 24px' }}>
              <Content
                  className="site-layout-background"
                  style={{
                    padding: 24,
                    margin: 0,
                    minHeight: 280,
                  }}
              >

                {/*标签页*/}
              
                <TabsT history={this.props.history}></TabsT>
                {/*显示Route*/}
                {/*左边内容*/}
                {/*路由跳转后的页面*/}
                {/* <Route path="/index/sysIndex" component={Home}/> */}
                {/* <PrivateRouter/> */}
              </Content>
            </Layout>
          </Layout>
        </Layout>
    )
  }

}

export {Index as default}