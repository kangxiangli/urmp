export const CONTEXT = '';
export const SERVERURL = CONTEXT + '/static/data/server.json';
export const LOGIN =CONTEXT + '/login/submit';//登录
//export const LOGOUT = CONTEX + '/logout';//退出
export const REGISTER = CONTEXT + '/api/register';//register
export const CHANGE_PWD = CONTEXT + '/cd/sys/user/updatePwd';//修改密码。
export const USER_NAME = CONTEXT + '/login/fuser';//获取用户名
//菜单导航
export const TEST_DATA = CONTEXT + '/static/data/data.json';
//资源管理-列表
export const RES_TREE_LIST_GET = CONTEXT + '/cd/sys/res/fresList';//获取tree资源
export const RES_TABLE_LIST_GET = CONTEXT + '/cd/sys/res/fchildList';//获取资源列表
export const RES_SEL_GET = CONTEXT + '/cd/sys/res/get';//获取下拉资源列表
export const RES_NODE_GET = CONTEXT + '/cd/sys/res/getById';//获取下拉资源列表
export const RES_SAVE = CONTEXT + '/cd/sys/res/save';//保存资源
export const GET_DATA_RESOURCE_SEARCH = CONTEXT + '/cd/sys/res/search';//查询资源
export const RES_DEL = CONTEXT + '/cd/sys/res/delById';//删除资源
//组织机构管理
export const ORG_TREE_LIST_GET = CONTEXT + '/cd/urmp/org/forgList';//获取tree组织机构
export const ORG_TABLE_LIST_GET = CONTEXT + '/cd/urmp/org/getSubsetList';//获取组织机构列表
export const ORG_SEL_GET = CONTEXT + '/cd/urmp/org/searchAll';//获取下拉组织机构列表
export const ORG_NODE_GET = CONTEXT + '/cd/urmp/org/get';//获取组织机构信息
export const ORG_SAVE = CONTEXT + '/cd/urmp/org/save';//保存组织机构
export const ORG_DATA_RESOURCE_SEARCH = CONTEXT + '/cd/sys/res/search';//查询组织机构
export const ORG_DEL = CONTEXT + '/cd/urmp/org/delAll';//删除组织机构
export const ORG_ISENABLE = CONTEXT + '/cd/urmp/org/isEnable';//启用组织机构
export const ORG_USER_GET_EXIT = CONTEXT + '/cd/sys/orgUser/getExist';//启用组织机构
export const ORG_USER_GET_SAVE = CONTEXT + '/cd/sys/orgUser/save';//启用组织机构


//角色管理-列表
export const GET_DATA_CHARACTER_GET = CONTEXT + '/cd/sys/role/get';//获取修改角色信息
export const GET_DATA_CHARACTER_SAVE = CONTEXT + '/cd/sys/role/save';//保存资源
export const GET_DATA_CHARACTER_SEARCH = CONTEXT + '/cd/sys/role/sel';//查询资源
export const GET_DATA_CHARACTER_DEL = CONTEXT + '/cd/sys/role/del';//删除资源
//角色管理-列表-选择角色
export const GET_DATA_CHARACTER_ALL = CONTEXT + '/cd/sys/relRoleUser/getAllUser';//所有的
export const GET_DATA_CHARACTER_ISEXIST = CONTEXT + '/cd/sys/relRoleUser/getExist';//存在的
export const GET_DATA_CHARACTER_SAVEUSER = CONTEXT + '/cd/sys/relRoleUser/saveUser';//保存
export const GET_DATA_CHARACTER_SAVERES = CONTEXT + '/cd/sys/roleRes/save';//角色保存资源

//角色管理-列表-选择权限
export const GET_DATA_CHARACTER_PORWER = CONTEXT + '/cd/sys/roleRes/getAllandSel';//所有的

//用户管理-列表
export const GET_DATA_CUSTOMER_GET = CONTEXT + '/cd/sys/user/getById/p';//获取修改角色信息
export const GET_DATA_CUSTOMER_SAVE = CONTEXT + '/cd/sys/user/save';//保存资源
export const GET_DATA_CUSTOMER_SEARCH = CONTEXT + '/cd/sys/user/search';//查询资源
export const GET_DATA_CUSTOMER_DEL = CONTEXT + '/cd/sys/user/delById';//删除资源
//用户管理-列表-选择角色
export const GET_DATA_CUSTOMER_ALL = CONTEXT + '/cd/sys/role/getAll';//所有的
export const GET_DATA_CUSTOMER_ISEXIST = CONTEXT + '/cd/sys/userrole/getByUserId';//存在的
export const GET_DATA_CUSTOMER_SAVEUSER = CONTEXT + '/cd/sys/userrole/save';//保存角色

export const GET_DATA_CUSTOMER_PEOPLE_ALL = CONTEXT + '/cd/sys/user/getAll';//所有的
export const GET_DATA_CUSTOMER_PEOPLE_ISEXIST = CONTEXT + '/cd/sys/user/getExist';//存在的
export const GET_DATA_CUSTOMER_SAVEPEOPLE = CONTEXT + '/cd/sys/user/saveUser';//保存用户
//角色管理-列表-选择组织机构
export const GET_DATA_CUSTOMER_PORWER = CONTEXT + '/cd/sys/userorg/getByUserId';//所有的
//系统参数管理-列表
export const GET_DATA_PARAMETER_GET = CONTEXT + '/cd/urmp/param/get';//获取修改角色信息
export const GET_DATA_PARAMETER_SAVE = CONTEXT +'/cd/urmp/param/save';//保存资源
export const GET_DATA_PARAMETER_SEARCH = CONTEXT + '/cd/urmp/param/search';//查询资源
export const GET_DATA_PARAMETER_DEL = CONTEXT + '/cd/urmp/param/del';//删除资源
//系统日志管理-列表
export const GET_DATA_LOG_GET = CONTEXT +'/cd/urmp/Log/get';//获取修改角色信息
//export const GET_DATA_LOG_SAVE = CONTEXT + '/cd/urmp/Log/save';//保存资源
export const GET_DATA_LOG_SEARCH = CONTEXT +'/cd/urmp/Log/search';//查询资源
export const GET_DATA_LOG_TYPE = CONTEXT + '/cd/urmp/dict/childrenList?fparentId=1';//操作类型

//应用管理-列表
export const GET_DATA_APPLY_GET = CONTEXT + '/cd/urmp/sys/get';//获取修改角色信息
export const GET_DATA_APPLY_SAVE = CONTEXT +'/cd/urmp/sys/save';//保存资源
export const GET_DATA_APPLY_SEARCH = CONTEXT + '/cd/urmp/sys/search';//查询资源
export const GET_DATA_APPLY_DEL = CONTEXT + '/cd/urmp/sys/del';//删除资源
export const GET_DATA_APPLY_TREE = CONTEXT + '/cd/urmp/sys/fsysList';//树列表  参数fparentId
export const GET_DATA_APPLY_PARENT = CONTEXT + '/cd/urmp/sys/findAll';//父级下拉框

//字典管理-列表
export const DICT_TREE_GET = CONTEXT + '/cd/urmp/dict/childrenList';//获取字典树
export const DICT_TABLE_GET = CONTEXT +'/cd/urmp/dict/childList';//获取列表数据
export const DICT_FORM_SAVE = CONTEXT + '/cd/urmp/dict/save';//查询资源
export const DICT_FORM_SELECT_GET = CONTEXT + '/cd/urmp/dict/findAll';//删除资源
export const DICT_FORM_GET = CONTEXT + '/cd/urmp/dict/get';//获取节点详情
export const DICT_ISENABLE = CONTEXT + '/cd/urmp/dict/isEnable';//启用组织机构
//动态获取菜单
export const MENU_DATA_LIST = CONTEXT + '/api/smp/getResByUserId';//获取节点详情
export const DICT_SMPALL_BTN = CONTEXT + '/api/getRoleBtn';//控制按钮权限