import  React from 'react'
import  {Layout,Row,Col,Avatar} from 'antd'
import { TeamOutlined,ContainerOutlined,ArrowUpOutlined,ArrowDownOutlined  } from '@ant-design/icons';
import '../../../util/css/Index.css'
import Axios from '../../../util/axios'
import Api from '../../../api/index'
import echarts from 'echarts/lib/echarts'
import  'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
const { Content, Sider,Header } = Layout;
class UserTotal extends React.Component{
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
        <div>
          {/*会员总览*/}
          <Layout>
            <Row>
              <TeamOutlined></TeamOutlined>
              <span style={{display:'inline-block',marginLeft:'20px'}}>会员总览</span>
            </Row>
            <Row gutter={16} className="userTotal">
              <Col span={5} offset={1} className="gutter-row borderBox">
                <p>{this.state.todayNew}</p>
                <p>今日新增</p>
              </Col>
              <Col span={5} offset={1} className="gutter-row borderBox">
                <p>{this.state.yestodayNew}</p>
                <p>昨日新增</p>
              </Col >
              <Col span={5} offset={1} className="gutter-row borderBox">
                <p>{this.state.monthNew}</p>
                <p>本月新增</p>
              </Col>
              <Col span={5} offset={1} className="gutter-row borderBox">
                <p>{this.state.vip_sum}</p>
                <p>会员总数</p>
              </Col>
            </Row>
          </Layout>
          {/*会员统计*/}
          <Layout style={{marginTop:'20px'}}>
            <Row style={{marginTop:'20px'}}>
              <ContainerOutlined />
              <span style={{display:'inline-block',marginLeft:'20px'}}>会员统计</span>
            </Row>
            {/*折线图部分*/}
            <Row style={{marginTop:'20px'}}>
              <Col span={4}>
                {/*本月新增*/}
                <div>
                  <p>本月新增</p>
                  <p>{this.state.monthNew}</p>
                  <p>{(()=>{
                    if(this.state.compareToLastMonth.indexOf('-')>=0){
                      return <div><ArrowDownOutlined /> {this.state.compareToLastMonth.split("-")[1]}</div>
                    }else{

                      return <div><ArrowUpOutlined /> {this.state.compareToLastMonth}</div>
                    }
                  })()}同比上月</p>1
                </div>
                {/*本周新增*/}
                <div>
                  <p>本周新增</p>
                  <p>{this.state.weekNew}</p>
                  <p>
                    {(()=>{
                      if(this.state.compareToLastWeek.indexOf('-')>=0){
                        return <div><ArrowDownOutlined /> {this.state.compareToLastWeek.split("-")[1]}</div>
                      }else{

                        return <div><ArrowUpOutlined /> {this.state.compareToLastWeek}</div>
                      }
                    })()}
                    同比上周</p>
                </div>
              </Col>
              <Col span={20}>
                <div id="main" style={{ width: 900, height: 400 }}></div>
              </Col>
            </Row>
          </Layout>
        </div>
    )
  }
}
export {UserTotal as default}