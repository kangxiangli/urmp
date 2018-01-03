import NotFoundView from "../components/404.vue";
import login from "../pages/login.vue";
import app from "../App.vue";
import test from "../pages/test.vue";
//资源列表
import resourcelist from "../pages/resource/resourcelist.vue";
//角色列表
import characterlist from "../pages/character/characterlist.vue";
//用户管理
import customerlist from "../pages/customer/customerlist.vue";
//组织结构管理
import organizationlist from "../pages/organization/organizationlist.vue";
//应用管理
import applylist from "../pages/apply/applylist.vue";
//字典管理
import bookslist from "../pages/books/bookslist.vue";
//系统参数管理
import parameterslist from "../pages/parameters/parameterslist.vue";
//系统日志管理
import logbooklist from "../pages/logbook/logbooklist.vue";
// Routes
const routes = [
	//登录
	{
		path: '/',
		name: '',
		component: login,

	},
	{
		path: '/login',
		name: 'login',
		component: login,

	},

	{
		path: '/test',
		component: app,
		children: [{
			path: '*',
			component: test
		}]
	},
	{
		path: '',
		component: app,
		children: [{
				path: '/index',
				component: resourcelist,
				name: "首页"
			},
			//资源管理
			{
				path: '/resource/resourcelist',
				component: resourcelist,
				name: "资源列表"
			},
			{
				path: '/character/characterlist',
				component: characterlist,
				name: "角色列表"
			},
			{
				path: '/customer/customerlist',
				component: customerlist,
				name: "用户列表"
			},
			{
				path: '/organization/organizationlist',
				component: organizationlist,
				name: "组织机构列表"
			},
			{
				path: '/apply/applylist',
				component: applylist,
				name: "应用列表"
			},
			{
				path: '/books/bookslist',
				component: bookslist,
				name: "字典列表"
			},
			{
				path: '/parameters/parameterslist',
				component: parameterslist,
				name: "系统参数列表"
			},
			{
				path: '/logbook/logbooklist',
				component: logbooklist,
				name: "系统日志列表"
			}

		]
	},
	{
		path: '*',
		component: NotFoundView
	}
]

export default routes