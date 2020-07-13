// 任务列表
import React from 'react'
import { Table, Space,Button,Modal,Input, Form, Row, Col, Select, DatePicker, message,Switch } from 'antd';
import axios from "../../../util/axios";
import Api from '../../../api/index'
const { confirm } = Modal;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

class ProductList extends React.Component {
    
    constructor(prors){
        super(prors)
        this.state={
            page:1,
            pagesize:20,
            align:'center',
            data:[], //接收数据
            visible: false,
            upvisible: false,
            vip_no:0,
            vip_name:'',
            vip_img_url:'',
            vip_itg:'',
            nav_position:'' ,
            nav_sort:'',
            nav_display:0,
            dataUp:[],
        }
    }
    componentDidMount() {
        axios.post(Api.user.goodsList,
       
          {
            "page":this.state.page,
            "pageSize":this.state.pagesize
          }
          ).then((res)=>{
            console.log(res.data)
            if (res.data.code==200){
                this.setState({
                    data:res.data.data
                })
                this.success(res.data.msg)
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
     //添加弹框显示
    showModal = () => {
        this.setState({
            visible: true,
        });
        axios.post(Api.user.checkGoods,
       
          {
            "page":this.state.page,
            "pageSize":this.state.pagesize
          }
          ).then((res)=>{
            console.log(res.data)
            if (res.data.code==200){
                this.setState({
                  dataUp:res.data.data
                })
                this.success(res.data.msg)
            }else {
                this.error('加载出错')
            }
        }).catch((err)=>{
            console.log(err)
        })
        
    };
    hideModal = () => {
        this.setState({
            visible: false,
            upvisible: false,
        });
    };

     // 点击确认
    handleOk = () => {
        this.setState({
            visible: false,
            upvisible: false,
        });

    };

    // 点击取消
    handleCancel = ()=> {
        this.setState({
            visible: false,
            upvisible: false,
        });
    };



    // 编辑
    update(text,record,index){
        this.setState({
            upvisible: true,
            vip_no:record.vip_no,
            vip_itg:record.vip_itg,
        });
    }

    // 获取编辑表单数据并发起请求
    onFinish = values => {
        console.log(values)
        // let obj ={
        //     vip_no: values.vip_no,
        //     vip_itg:values.vip_itg,
        // }
        axios.post(Api.user.editGoods,{
          vip_no: values.vip_no,
          vip_itg:parseInt(values.vip_itg),
        }).then((res)=>{
            if (res.data.code==200){
                this.success(res.data.msg)
                window.location.reload()
            }else{
    
                window.location.reload()
            }
        }).catch((err)=>{
            console.log(err)
        })
    }


    // 删除
    del(text,record,index){
        console.log(record.vip_no)
        this.showDeleteConfirm(record.vip_no)
    }
    delUp(text,record,index){
      console.log(record.vip_no)
      axios.post(Api.user.addGoods,{
        vip_no:[parseInt(record.vip_no)],
    }).then((res)=>{
      console.log(res)
        window.location.reload()
       
    }).catch((err)=>{
        console.log(err)
    })
    }
    // 删除弹框
    showDeleteConfirm(no) {
        console.log(no)
        confirm({
            title: '是否确认删除?',
            okText: '确认',
            okType: 'danger',
            cancelText: '取消',
            // 点击确认触发
            onOk() {
                axios.post(Api.user.delGoods,{
                    vip_no:no,
                }).then((res)=>{
                    window.location.reload()
                    console.log(res)
                }).catch((err)=>{
                    console.log(err)
                })
            },
            // 点击取消触发
            onCancel() {
                console.log('Cancel');
            },
        });
    }
    // 滑块
    handleSetStatus=(checked, record)=>{
        let st = checked ? 1 : 0
        axios.post(Api.user.displayNav,{
            vip_no: record.vip_no,
            nav_display:st

        }).then((res)=>{
           console.log(res)
        }).catch((err)=>{
            console.log(err)
        })


    }


    // 添加
    // onAddFinish = values => {
    //     console.log(values);

    //     let navObj = {vip_name,nav_position} 
    //     axios.post(Api.url.addNav,navObj).then((res)=>{
    //         if (res.data.code==200){
    //             this.success('添加成功')
    //             console.log(res)
               
    //             window.location.reload()
    //         }
    //         console.log(res)
    //     }).catch((err)=>{
    //         console.log(err)
    //     })
    // }


    render() {
        const { visible} = this.state;
        const columns = [
            {
                title: '商品编号',
                dataIndex: 'vip_no',
                key:'vip_no',
                width: 150,
            },
            {
                title: '商品名称',
                dataIndex: 'vip_name',
                width: 150,
                key:'vip_name',
            },
            {
                title: '商品图片',
                dataIndex: 'vip_img_url',
                width: 150,
                key:'vip_img_url',
                render:(r) =>{
                    // for(let i=0 ;i<this.state.NavList.length;i++){
                        return <img src={r} alt="" style={{width:'50px',height:'50px'}}/>}
                // }
            },
            {
              title: '使用积分值',
              dataIndex: 'vip_itg',
              width: 150,
              key:'vip_itg',
          },
            {
                title: '操作',
                dataIndex: 'address',
                key:'address',
                render: (text, record,index) => (
                    <Space size="middle">
                        <Button size='small' onClick={()=>this.update(text,record,index)} >编辑</Button>

                        <Button  size='small' onClick={()=>this.del(text,record,index)}> 下架</Button>
                    </Space>
                )
            }
        ];
        const columnsUp = [
          {
              title: '商品编号',
              dataIndex: 'vip_no',
              key:'vip_no',
              width: 150,
          },
          {
              title: '商品名称',
              dataIndex: 'vip_name',
              width: 150,
              key:'vip_name',
          },
          {
              title: '商品图片',
              dataIndex: 'vip_img_url',
              width: 150,
              key:'vip_img_url',
              render:(r) =>{
                  // for(let i=0 ;i<this.state.NavList.length;i++){
                      return <img src={r} alt="" style={{width:'50px',height:'50px'}}/>}
              // }
          },
          {
            title: '使用积分值',
            dataIndex: 'vip_itg',
            width: 150,
            key:'vip_itg',
        },
          {
              title: '操作',
              dataIndex: 'address',
              key:'address',
              render: (text, record,index) => (
                  <Space size="middle">
                      <Button size='small' onClick={()=>this.update(text,record,index)} >编辑</Button>

                      <Button  size='small' onClick={()=>this.delUp(text,record,index)}> 上架</Button>
                  </Space>
              )
          }
      ];



        return (
            <div>
                <Row>
                    <Col span={24}>
                        <Button type="primary" onClick={this.showModal}>添加</Button>
                        {/*添加弹框*/}
                        <Modal
                            visible={visible}
                            title="添加导航信息"
                            onCancel={this.hideModal}
                            footer={null}

                        >
                           <Table pagination={false} columns={columnsUp} dataSource={this.state.dataUp}  />,
                        </Modal>
                        {/*修改弹框*/}
                        <Modal
                            visible={this.state.upvisible}
                            title="修改信息"
                            footer={null}
                            onCancel={this.hideModal}
                        >
                            <Form
                                style={{marginLeft:'-12px'}}
                                labelCol={{ span: 6 }}
                                wrapperCol={{ span: 14 }}
                                layout="horizontal"
                                onFinish={this.onFinish}
                                initialValues={{
                                    vip_no: this.state.vip_no,
                                    vip_itg:this.state.vip_itg,
                          
                                }}
                            >
                                 <Form.Item name='vip_no' label="商品编号">
                           <Input  placeholder="large size" disabled="disabled" />
                       </Form.Item>
                       <Form.Item name='vip_itg' label="商品价值积分">
                           <Input  placeholder="large size"  />
                       </Form.Item>
                       {/* <Form.Item name='nav_display' label="是否显示">
                           <Input  placeholder="large size"/>
                       </Form.Item> */}

                                <Form.Item style={{margin:'20px 0 0 120px '}} >
                                    <Button key="back" onClick={this.handleCancel}>
                                        取消
                                    </Button>
                                    <Button key="submit" type="primary" htmlType="submit"  onClick={this.handleOk}>
                                        提交
                                    </Button>
                                </Form.Item>

                            </Form>
                        </Modal>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Table pagination={false} columns={columns} dataSource={this.state.data}  />,
                    </Col>
                </Row>
            </div>
        )
    }
}

export {ProductList as default}
