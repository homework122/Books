export default {
    updateLogin:'/mgr/editMe.do',//修改登录人员信息
    loginLog:'/mgr/loginData.do',//登录日志
    sysIndex:'/mgr/sysFirst.do',//系统首页
    signOut:'/mgr/logout.do',//退出登录
    userLogin : '/mgr/login.do',//登录接口
    userAdd:'/perm/addMgr.do',//添加管理员
    userDel:'/perm/delMgr.do',//删除管理员
    userData:'/perm/showAllManeger.do ',//用户管理所有数据接口
    userSetState:'/perm/chageMgrStatu.do',//改变用户状态
    userUpdate:'/perm/chgMgrRole.do',//修改用户
    roleData:'/perm/showAllRole.do ',//角色管理所有数据
    addRole:'/perm/addRole.do',//添加角色
    navList:'/set/queryNavigation.do',//导航列表
    searchNav:'/set/queryNavigationByNo.do',//搜索导航
    addNav:'/set/addNavigation.do',//添加导航
    editNav:'/set/editNavigation.do',//修改导航
    delNav:'/set/delNavigationByNo.do',//删除导航
    displayNav:'/set/editNavigationDisplayByNo.do',//导航是否显示
    serviceList:'/set/queryWaiter.do',//客服列表
    searchService:'/set/queryWaiterByNo.do',//搜索
    addService:'/set/addWaiter.do',//添加客服
    editService:'/set/editWaiter.do',//修改客服
    delService:'/set/editWaiterByNo.do',
    goodsList:"/integral/goodsList.do",//商品列表
    editGoods:'/integral/editGoods.do',//修改商品,
    delGoods:'/integral/delGoods.do', //下架商品
    searchGoods:'/integral/queryGoods.do',//搜索商品
    addGoods:'/integral/addGoods.do',//添加商品
    exchangeList:'/integral/exchangeList.do',//兑换记录
    delExchange:'/integral/ delExchangeList.do',//删除记录
    
  //会员等级设置
  Membership:'/huiyuan/selectAllVip.do',
  //会员等级设置添加
  members:'/huiyuan/addVipLevel.do',
//    会员等级设置删除
  del:'/huiyuan/deleteVipLevel.do',
//    会员管理列表
  Administration:'/huiyuan/selectAllVipManage.do',
//    会员管理列表会员信息
  information:'/huiyuan/viewVipXinXiByUser_no.do',
//    会员筛选
  screen:'/huiyuan/selectAllVipManageByScreen.do',
//    会员状态
  state:'/huiyuan/updateUser_status',
//    会员积分明细
  integral:'/huiyuan/selectVipUserIntegral.do',
//    个人积分明细
  personal:'/huiyuan/viewIntegralByUser_no.do',
//    修改积分
  modify:'/huiyuan/editIntegralByUser_no.do',
//    查询积分
  query:'/huiyuan/selectVipUserIntegralByScreen.do',
//    积分商城积分记录
  record:'/integral/exchangeList.do',
//    积分记录查询
  Integralquery:'/integral/queryExchangeList.do',
//    积分记录删除
  Pointsdeleted:'/integral/delExchangeList.do',
    opinion:'opinion/queryOpinion.do',

};