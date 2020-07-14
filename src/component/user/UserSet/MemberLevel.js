import React from 'react'
import Axios from './../../../util/axios.js'
import Api from './../../../api/index'
<<<<<<< HEAD
import {Table, Space, Button, Modal, Input, Row, Col, Switch, Pagination,Radio,Avatar} from 'antd';
import {  UsergroupAddOutlined,DeleteOutlined  } from '@ant-design/icons';
import { Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import './MemberLevel.css';
const { confirm } = Modal;
const { TextArea } = Input;
var imgurl

const props = {
    name: 'file',
    action: "http://www.xiadachuan.cn/uploadfile.do",
    headers: {
        // authorization: 'authorization-text',
    },
    onChange(info) {
        if (info.file.status !== 'uploading') {
            imgurl=info.file.response.newfilepath
            // this.setState({
            //     list.user_img:imgurl
            // })
            console.log('图片',imgurl)
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
};
=======
import {Table, Space, Button, Modal, Input, Row, Col, Switch, Pagination,Radio} from 'antd';
// import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import './MemberLevel.css';
const { confirm } = Modal;
const { TextArea } = Input;
>>>>>>> e1abf3390ed26d4d410366c9f49f11273fd1b0ec
class MemberLevel extends React.Component {
    constructor(prors) {
        super(prors)
        this.state = {
            loading: false,
            visible: false,
            loadingg: false,
            // 数据
             data : [],
            //会员有效期
            value: 1,
        //    滑块开关
            switch:1,
            page:1,
            pageSize:3,
            total:0,
            imageUrl:'',
        }
    }
    //初始请求

    componentWillMount(){
        this.axios()

    }
    axios=()=>{
        Axios.post(Api.user.Membership,{
            page:this.state.page,
            pageSize:this.state.pageSize
        })
            .then((res)=>{
                console.log(res)
                if(res.status===200){
<<<<<<< HEAD
=======
                    console.log(res.data)
>>>>>>> e1abf3390ed26d4d410366c9f49f11273fd1b0ec
                    this.setState({
                        data : res.data,
                        total:res.count
                    })
                    console.log('获取成功')
                }else{
                    console.log('获取失败')
                }

            }).catch((err)=>{
            console.log('出错')
        })
    }
    //添加弹出框数据
    handleOk = () => {
        console.log('图片',this.state.imageUrl)
            Axios.post(Api.user.members,
                {vip_name:this.refs.membershipLevel.state.value,
                vip_level_desc:this.refs.textarea.state.value,
                vip_itg:parseInt(this.refs.integral.state.value),
                vip_xiaofei:parseInt(this.refs.consumption.state.value),
                vip_validity_no:parseInt(this.state.value),
                vip_moren: parseInt(this.state.switch),
                vip_img_url:''
                }) .then((res)=>{
<<<<<<< HEAD
                this.success(res.data.msg)
=======
>>>>>>> e1abf3390ed26d4d410366c9f49f11273fd1b0ec
                console.log(res)
                console.log('添加成功')
                this.setState({
                    data:[...this.state.data,res.data]
                })
                window.location.reload()
            }).catch((err)=>{
                console.log(err)
                console.log('出错')
            })



        this.setState({ loading: true });
        setTimeout(() => {
            this.setState({ loading: false, visible: false });
        }, 3000);
    };

    handleCancel = () => {
        this.refs.membershipLevel.state.value='';
        this.refs.textarea.state.value='';
        this.refs.integral.state.value='';
        this.refs.consumption.state.value='';
        this.setState({ visible: false });
    };
    //会员有效期
    onChangee = e => {
        console.log('radio checked', e.target.value);
        this.setState({
            value: e.target.value,
        });
        console.log('有效期',e.target.value)
    };
    //滑块开关
   onChange=checked=>{
       if(checked===true){
           this.setState({
               switch:1
           })
       }else {
           this.setState({
               switch:2
           })
       }
    }
    //添加弹框
    add(){
        this.setState({
            visible: true,
        });

    }
    // 删除弹框
    showDeleteConfirm=(record)=> {
        confirm({
            title: '是否确认删除?',
            okText: '确认',
            okType: 'danger',
            cancelText: '取消',
            // 点击确认触发
            onOk() {
                Axios.post(Api.user.del,{
                    vip_no:record.vip_no
                }) .then((res)=>{
                    console.log('删除成功')
                    window.location.reload()
                }).catch((err)=>{
                    console.log(err)
                    console.log('出错')
                })

                console.log('OK');
            },
            // 点击取消触发
            onCancel() {
                console.log('Cancel');
            },
        });
    }
<<<<<<< HEAD
    error = (val) => {
        message.error(val);
    };
    // 成功提示
    success = (val) => {
        message.success(val);
    };
=======
>>>>>>> e1abf3390ed26d4d410366c9f49f11273fd1b0ec
    // 删除
    del(text,record,index){
        this.showDeleteConfirm(record)
        console.log('删除',record)
        console.log(text,record,index)

    }
<<<<<<< HEAD
=======
  //  图片上传
    getBase64(img, callback) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    beforeUpload(file) {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    }
    handleChange = info => {
        if (info.file.status === 'uploading') {
            this.setState({ loadingg: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            this.getBase64(info.file.originFileObj, imageUrl =>
                this.setState({
                    imageUrl,
                    loadingg: false,
                }),
            );
        }
    };
>>>>>>> e1abf3390ed26d4d410366c9f49f11273fd1b0ec
    //分页
    onChangeee = (page, pageSize) => {
        console.log('Page: ', page);
        console.log('pageSize: ', pageSize);
<<<<<<< HEAD
        new Promise(resolve => {
            this.setState({
                page: page,
            })
            resolve()
        }).then(()=>{
                this.axios()
            }
        )
=======
        this.setState({
            page: page,
        })
        this.axios()
>>>>>>> e1abf3390ed26d4d410366c9f49f11273fd1b0ec
    }
    //分页结束
  render() {

<<<<<<< HEAD
=======
      //图片上传
      const uploadButton = (
          <div>
              {this.state.loadingg ? <LoadingOutlined /> : <PlusOutlined />}
              <div className="ant-upload-text">上传</div>
          </div>
      );
      const { imageUrl } = this.state;
>>>>>>> e1abf3390ed26d4d410366c9f49f11273fd1b0ec
      //图片上传结束
      const { visible, loading } = this.state;
      const columns = [
          {
              title: '等级名称',
              dataIndex: 'vip_name',

          },
          {
              title: '等级图标',
              dataIndex: 'vip_img_url',
              render: (text, record,index) => (
                  // console.log(text)
                  <Space size="middle">
                      <img src={text} style={{height:'50px',width:'50px'}} alt='图片'/>
                  </Space>
              )
          },
          {
              title: '会员有效期',
              dataIndex: 'validity_desc',
          },
          {
              title: '会员等级说明',
              dataIndex: 'vip_level_desc',
          },
          {
              title: '操作',
              dataIndex: 'address',
              render: (text, record,index) => (
<<<<<<< HEAD
                  <Space >
                      <p  className='delHuiYuan'  onClick={()=>this.del(text,record,index)}><DeleteOutlined /></p>
=======
                  <Space size="middle">
                      <Button type="primary" danger size='small' onClick={()=>this.del(text,record,index)}>删除</Button>
>>>>>>> e1abf3390ed26d4d410366c9f49f11273fd1b0ec
                  </Space>
              )
          }
      ];
    return (
        <div >
<<<<<<< HEAD
           {/*<h1>会员等级设置</h1>*/}
           <div style={{textAlign:'right',marginBottom:'10px'}}>
               <div onClick={this.add.bind(this)}  className='addHuiYuan'> <UsergroupAddOutlined /></div>
           </div>
            <Table pagination={false} columns={columns} dataSource={this.state.data} />,
            <div >
=======

           <h1>会员等级设置</h1>
            {/*pagination={false} //取消页码 true 显示页码*/}
           {/*dataSource={data} //数据*/}
           <div style={{textAlign:'right',marginBottom:'10px'}}>
               <Button onClick={this.add.bind(this)} type='primary' size='middle'>添加会员等级</Button>
           </div>
            <Table pagination={false} columns={columns} dataSource={this.state.data}  scroll={{ y: 240 }} />,
            <div className="grade">
>>>>>>> e1abf3390ed26d4d410366c9f49f11273fd1b0ec
                <Modal
                    visible={visible}
                    width="60%"
                    title="添加会员等级"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>
                            取消
                        </Button>,
                        <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
                            确定
                        </Button>,
                    ]}
                >
                    <Row className='col'>
                        <Col span={12}>
                            <Row>
                                <Col span={6}>
                                    <div>
                                        <span>会员等级名称:</span>
                                    </div>
                                   <div>
                                       <span>积分满足点:</span>
                                   </div>
                                    <div>
                                        <span>消费满足点:</span>
                                    </div>
                                    <div>
                                        <span>会员有效期:</span>
                                    </div>
                                    <div>
                                        <span>是否默认等级:</span>
                                    </div>
                                </Col>
                                <Col span={18} >
                                    <div>
                                        <Input ref='membershipLevel' placeholder="会员等级名称" />
                                    </div>
                                 <div>
                                     <Input ref='integral' placeholder="积分满足点" />
                                 </div>
                                    <div>
                                        <Input ref='consumption' placeholder="消费满足点" />
                                    </div>
                                    <div className='radio'>
                                        <Radio.Group onChange={this.onChangee} value={this.state.value}>
                                            <Radio value={1}>一年</Radio>
                                            <Radio value={2}>永久</Radio>
                                        </Radio.Group>
                                    </div>
                                    <div>
                                        <Switch  checkedChildren="开启" unCheckedChildren="关闭" defaultChecked
                                        onChange={this.onChange}
                                        />
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={12}>
                            <Row className='col2'>
                                <Col span={6}>
                                    <div>
                                        <span>会员等级说明:</span>
                                    </div>
                                    <div>
                                        <span>等级图标:</span>
                                    </div>
                                </Col>
                                <Col span={18} >
                                    <div>
                                        <TextArea ref='textarea' rows={4} cols={3} />
                                    </div>
<<<<<<< HEAD
                                    <div style={{marginBottom:"40px",color:"blue",marginLeft:'10px',}}>
                                        {/*<Avatar src={imgurl}/>*/}
                                        <Upload {...props} >
                                                {/*<UploadOutlined />*/}
                                                上传图片
=======
                                    <div>
                                        {/*图片上传*/}
                                        <Upload
                                            name="avatar"
                                            listType="picture-card"
                                            className="avatar-uploader"
                                            showUploadList={false}
                                            action="http://www.xiadachuan.cn/uploadfile.do"
                                            beforeUpload={this.beforeUpload}
                                            onChange={this.handleChange}
                                        >
                                            {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
>>>>>>> e1abf3390ed26d4d410366c9f49f11273fd1b0ec
                                        </Upload>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Modal>
            </div>
            <div>
                <Pagination showQuickJumper defaultCurrent={this.state.page} defaultPageSize={this.state.pagesize} total={this.state.data.length} onChange={this.onChangeee}/>
            </div>
        </div>
    )
  }
}

export {MemberLevel as default}