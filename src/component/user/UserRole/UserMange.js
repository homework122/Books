
import React from 'react'
import {Layout,Input,Select,Button,Col,Row,Form,Table, Space,Modal,Switch,Radio,Upload, message,Pagination } from 'antd';
import { SearchOutlined,LoadingOutlined, PlusOutlined,HighlightTwoTone,UploadOutlined} from '@ant-design/icons';
import Axios from '../../../util/axios'
import Api from '../../../api/index'
import '../../../util/css/UserMange.css'
const { confirm } = Modal;
// const { Header, Content, Footer } = Layout;
const {Option} = Select;
var imgurl
// 图片上传数据
const props = {
  name: 'file',
  action: 'http://www.xiadachuan.cn/uploadfile.do',
  headers: {
    // authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      imgurl=info.file.response.newfilepath
      // this.setState({
      //   upImgUrl:imgurl
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

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}
// 图片上传之前的判断
function beforeUploadPicture(file) {
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

class RoleMange extends React.Component {


  //通过ref获取表单数据域
  formRef = React.createRef();//添加表单
  formUpdateRef = React.createRef();//更改表单
  //获得登录管理员的编号
  userLoginNo = JSON.parse(sessionStorage.getItem('user')).mgr_no
  constructor(){
    super()
    this.state = {
      btnSize:'small',//按钮大小
      visible:false,//添加表单是否可见
      updateVisible:false,//修改表单是否可见
      formRadioVal:1,//表单单选按钮的值
      loading: false,//上传头像加载
      //表格数据
      tableData : [],
      roleSelectList:[],//角色下拉列表
      page:1,//当前页数
      pagesize:3,//页容量
      total:0,//数据总条数
      upImgUrl:''
    }
  }
  //分页
  onPage = (page,pageSize) => {
    console.log('Page: ', page);
    console.log('pageSize: ', pageSize);
    new Promise(resolve => {
      this.setState({
        page: page,
      })
      resolve()
    }).then(()=>{
      this.getAllData()
    })

  }
  // 请求所有的数据
  getAllData(){
    // 请求数据
    Axios.post(Api.user.userData,{
      mgr_no:this.userLoginNo,
      page:this.state.page,
      pageSize:this.state.pagesize
    }).then((res)=>{
      console.log('用户管理所有数据',res);
      // let key = res.data.data.mgr_no.map((item)=>{
      //   return
      // })
      let data = res.data.data.map((item)=>{
        item['key'] =item.mgr_no;
        return item;
      })
      this.setState({
        tableData:data,
        total:res.data.count
      })
      console.log('表格数据',this.tableData);
    }).catch((err)=>{
      console.log(err);
      console.log('用户管理所有数据出错',err);
    })
  }
  // 获取角色管理下拉框的值
  getRoleSelect(){
    Axios.post(Api.user.roleData,{
      mgr_no:this.userLoginNo,
      page:1,
      pageSize:10},
    ).then((res)=>{
      console.log('角色列表',res);
      if(res.data.code == 200 ){
        this.setState({
          roleSelectList:res.data.data
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
  // 循环得到下拉列表
  bindSelectOption(selectList){
    let SelectList = selectList.map((item)=>{
      return <Option value={item.role_no}>{item.role_name}</Option>
    })
    return SelectList
  }
  // 数据请求
  componentWillMount=()=> {
   this.getAllData();//获取所有数据
   this.getRoleSelect();//
  }
  // 渲染数据
  // 删除弹框
  showDeleteConfirm() {
    confirm({
      title: '是否确认删除?',
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      // 点击确认触发
      onOk() {
        console.log('OK');
      },
      // 点击取消触发
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  // 修改弹框
  showUpdateConfirm(data) {
    let that = this
    console.log(data);
    console.log('11111',data.userRole);
    console.log('2222',data.mgr_name);
    confirm({
      icon: <HighlightTwoTone />,
      title: '修改',
      content:(
          <Form
              style={{marginLeft:'-12px'}}
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 14 }}
              layout="horizontal"
              onFinish={this.updateFinish}
              ref={this.formUpdateRef}
              initialValues={{
                userName: data.mgr_name,
                userRole:data.role_no,
              }}
          >
            <Form.Item name='userName' label="用户名">
              <Input  placeholder="large size"  />
            </Form.Item>
            <Form.Item name='userRole' label="用户角色">
              <Select value='userRole'>
                {this.bindSelectOption(this.state.roleSelectList)}
              </Select>
            </Form.Item>
          </Form>
      ),
      okText: '提交',
      cancelText: '取消',
      // 点击确认触发
      onOk() {
        // // 获得表单里面的数据
        let userName = that.formUpdateRef.current.getFieldsValue().userName
        let userRole = that.formUpdateRef.current.getFieldsValue().userRole
        let userState = that.formUpdateRef.current.getFieldsValue().userState
        // 发送修改请求
        Axios.post(Api.user.userUpdate,{
          mgr_no:parseInt(data.mgr_no),
          role_no:parseInt(userRole)
        }).then((res)=>{
          console.log('修改返回',res);
          if(res.data.code == 200){
            console.log('hshshhhsshhs')
   
            that.getAllData()
          }
        }).catch((err)=>{
          console.log('修改出错',err);
        })
        console.log('修改表单的是');
        console.log(userName, userRole, userState);
        console.log('OK');
      },
      // 点击取消触发
      onCancel() {
        console.log('Cancel');
      },
    });
  }

// 编辑
  update(text,record,index){
    this.showUpdateConfirm(record)
    console.log(text,record,index)

  }
  // 更新获取表单里面的数据
  updateFinish= values => {
    console.log('Received values of form: ', values);
  }
  // 编辑表单单选按钮
  getFormRadio = e =>{
    console.log('radio checked', e.target.value);
    this.setState({
      formRadioVal: e.target.value,
    });
  }
  // 删除
  del(text,record,index){
    this.showDeleteConfirm()
    console.log('删除1');
    console.log(text)
    console.log(record.mgr_name)
    console.log(index)
    // 根据id删除数据并重新渲染
    Axios.post(Api.user.userDel,{
      mgr_no:parseInt(this.userLoginNo),
      mgr_name:record.mgr_name
    }).then((res)=>{
      console.log('删除',res);
      if(res.data.code == 200){
        this.getAllData()
      }
    }).catch((err)=>{
      console.log('err',err);
    })
  }
  // 改变状态
  onChange(checked) {
    console.log(`switch to ${checked}`);
  }
  // 添加，修改
  editRole=()=>{
    this.setState({
      visible: true,
    })
  }
  // 图片上传
  handleChangePicture = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
          this.setState({
            imageUrl,
            loading: false,
          }),
      );
    }
  };
  // 添加表单提交信息
  handleOk = val => {
    // 获得表单里面的数据
    let userName = this.formRef.current.getFieldsValue().user_name
    let userRole = this.formRef.current.getFieldsValue().user_role
    let userState = this.formRef.current.getFieldsValue().user_state
    let userPwd = this.formRef.current.getFieldsValue().user_pwd
    let userTel = this.formRef.current.getFieldsValue().user_tel
    let userHeader = this.formRef.current.getFieldsValue().user_header
    // // // 添加表单提交数据
    Axios.post(Api.user.userAdd,{
      mgr_no:parseInt(this.userLoginNo),
      mgr_name:userName,
      mgr_pwd:parseInt(userPwd),
      mgr_call:userTel,
      mgr_img:imgurl,
      mgr_status:parseInt(userState),
      role_no:parseInt(userRole),
    }).then((res)=>{
      console.log('添加',res);
      if(res.data.code == 200){
        //重新请求数据
        this.getAllData();
      }
    }).catch((err)=>{
      console.log(err);
    })
    console.log('用户头像',userHeader);
    this.setState({
      visible: false,
    });
    // 获得表单里面的值
    // 发起请求
  };
  // 模态框消失
  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };
  // 改变状态
  handleSetStatus =(text,checked, record)=> {
    let st = text ? 1 : 0
    Axios.post(Api.user.userSetState, {
      mgr_no:parseInt(checked.mgr_no),
      mgr_status: parseInt(st)
    }).then((res) => {
      if(res.data.code == 200){
        this.getAllData()
      }
    }).catch((err) => {
      console.log('状态改变出错',err)
    })
  }
    render() {
    const columns = [
      {
        title: '用户ID',
        dataIndex: 'mgr_no',
        // render: text => <a>{text}</a>,
      },
      {
        title: '用户名',
        dataIndex: 'mgr_name',
      },
      {
        title: '状态',
        dataIndex: 'mgr_status',
        render: (text, record,index) => (
            <Space size="middle">
              <Switch checkedChildren="正常" unCheckedChildren="禁用" defaultChecked={text}  onClick={(checked)=>this.handleSetStatus(checked, record)}
              />
            </Space>
        ),

      },
      {
        title: '用户角色',
        dataIndex: 'role_no',
        render: (text, record,index) => (
               <Space size="middle">
                 {
                   ((txt)=>{
                     console.log('this.roleSelectList',this.roleSelectList);
                     for(let i=0;i<this.state.roleSelectList.length;i++){
                       if(txt == this.state.roleSelectList[i].role_no){
                         return this.state.roleSelectList[i].role_name
                       }
                     }
                   })(text)
                 }
               </Space>
        ),
      },
      {
        title: '用户电话',
        dataIndex: 'mgr_call',
      },
      {
        title: '用户头像',
        dataIndex: 'mgr_img',
        render: (text, record,index) => (
            <Space size="middle">
              <img src={text} alt=""/>
            </Space>
        ),
      },
      {
        title: '操作',
        dataIndex:'age',
        render: (text, record,index) => (
            <Space size="middle">
              <Button size='small' onClick={()=>this.update(text,record,index)} >编辑</Button>
              <Button type="primary" danger size='small' onClick={()=>this.del(text,record,index)}> 删除</Button>
            </Space>
        ),
      },
    ];//表格的列名
    const uploadButton = (
        <div>
          {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
          <div className="ant-upload-text">Upload</div>
        </div>
    );
    const { imageUrl } = this.state;

    return (
        <div>
          {/*搜索*/}
          <Layout>
            <Row className='searchRow'>
              <Col span={2} offset={22}>
                <Row style={{display:'flex',justifyContent:'space-between',marginBottom:'10px'}}>

                    <Button type="primary" size='middle' onClick={this.editRole}>
                      添加用户
                    </Button>
                </Row>
              </Col>
            </Row>
          </Layout>
          {/*表格*/}
          <Table columns={columns} dataSource={this.state.tableData} pagination={false}/>
          {/*添加用户*/}
          <Modal
              title="编辑用户信息"
              visible={this.state.visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
          >
            <Form
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
                ref={this.formRef}
                initialValues={{
                  user_name:'',
                  user_role:'',
                  user_state:-1
                }}

            >
              <Form.Item
              label='用户名'
              name='user_name'
              >
                <Input/>
              </Form.Item>
              <Form.Item
                  label='密码'
                  name='user_pwd'
              >
                <Input.Password/>
              </Form.Item>
              <Form.Item
                  label='电话号码'
                  name='user_tel'
              >
                <Input/>
              </Form.Item>
              <Form.Item
                  label='用户角色'
                  name='user_role'
              >
                <Select defaultValues='-1' >
                  {/*option for循环*/}
                  {this.bindSelectOption(this.state.roleSelectList)}
                  {/*<Option value="-1">全部</Option>*/}
                  {/*<Option value="2">普通管理员</Option>*/}
                  {/*<Option value="1">超级管理员</Option>*/}
                </Select>
              </Form.Item>
              <Form.Item
                  label='用户状态'
                  name='user_state'
              >
                <Radio.Group onChange={this.getFormRadio} value={this.state.formRadioVal}>
                  <Radio value={1}>正常</Radio>
                  <Radio value={2}>禁用</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item
               label='头像'
               name='user_header'
              >
                {/*<Upload*/}
                    {/*name="avatar"*/}
                    {/*listType="picture-card"*/}
                    {/*className="avatar-uploader"*/}
                    {/*showUploadList={false}*/}
                    {/*action="https://www.mocky.io/v2/5cc8019d300000980a055e76"*/}
                    {/*beforeUpload={beforeUploadPicture}*/}
                    {/*onChange={this.handleChangePicture}*/}
                {/*>*/}
                  {/*{imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}*/}
                {/*</Upload>*/}
                <Upload {...props}>
                  <Button>
                    <UploadOutlined />上传图片
                  </Button>
                </Upload>
              </Form.Item>
            </Form>
          </Modal>
          {/*分页*/}
          <Pagination showQuickJumper defaultCurrent={this.state.page}  defaultPageSize={this.state.pagesize} total={this.state.total}  onChange={this.onPage}/>







  </div>
    )
  }
}

export {RoleMange as default}