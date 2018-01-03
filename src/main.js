// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import 'eventsource-polyfill'
import Vue from "vue";
import Vuex from "vuex";
import frame from "./frame.vue";

// import NProgress from "vue-nprogress";
import { sync } from "vuex-router-sync";
import store from "./store";
import axios from "axios";
import filters from "./filters";
import VueProgressBar from "vue-progressbar";
import { TOGGLE_SIDEBAR } from "./store/mutation-types";
import VueLazyload from "vue-lazyload";
import auth from "./auth";
import Element from "element-ui";
import "element-ui/lib/theme-default/index.css";
import ImpPanel from "./components/panel.vue";
import Loading from "./loading";
import Util from "./util";
//import locale from 'element-ui/lib/locale/lang/en'

import VueRouter from "vue-router";
import routeConfig from "./router"
Vue.use(Element);
Vue.use(Loading);
Vue.use(Util);

let item = window.localStorage.getItem('ELEMENT_LANGUAGE')
if(item == null) {
	window.localStorage.setItem('ELEMENT_LANGUAGE', "zh");
	window.location.reload()
}
// or with options
Vue.use(VueLazyload, {
	preLoad: 1.3, //预加载高度
	attempt: 1 //尝试次数
})

function getBaseUrl(url) {
	var reg = /^((\w+):\/\/([^\/:]*)(?::(\d+))?)(.*)/;
	reg.exec(url);
	return RegExp.$1;
}

// axios.defaults.baseURL = 'https://www.baidu.com';
axios.defaults.baseURL = getBaseUrl(window.location.href);
axios.defaults.headers.common['Authorization'] = auth.getUid();
//axios.defaults.headers.common['authSid'] = auth.getSid();
Vue.prototype.$http = axios
Vue.axios = axios

//加载路由中间件
Vue.use(VueRouter)
// const options = { 
//   latencyThreshold: 200, // Number of ms before progressbar starts showing, default: 100,
//   router: true, // Show progressbar when navigating routes, default: true
//   http: true // Show progressbar when doing Vue.http and Vue.axios default: true
// };
// Vue.use(NProgress, options)

Vue.component(ImpPanel.name, ImpPanel); //全局注册

const options = {
	color: '#eeeeee',
	failedColor: '#874b4b',
	thickness: '2px',
	transition: {
		speed: '0.2s',
		opacity: '0.6s'
	},
	autoRevert: true,
	location: 'top',
	inverse: false
}

Vue.use(VueProgressBar, options)

//定义路由
const router = new VueRouter({
	routes: routeConfig,
	//mode: 'history'
})
sync(store, router)
const {state} = store
router.beforeEach((route, redirect, next) => {
	if(state.device.isMobile && state.sidebar.opened) {
		store.commit(TOGGLE_SIDEBAR, false)
	}
	if(!auth.loggedIn() && route.path !== '/login') {
		next({
			path: '/login',
			query: {
				redirect: route.fullPath
			}
		})
	} else {
		next()
	}
})
// 添加请求拦截器
axios.interceptors.request.use(function(config) {
	// alert(window.sessionStorage.getItem("Authorization"));
	// 在发送请求之前做些什么
	config.headers.Authorization = auth.getUid();
	return config;
}, function(error) {
	// 对请求错误做些什么
	return Promise.reject(error);
});
axios.interceptors.response.use(
	response => {
    if (response.data && response.data.code||response.data.success==false) {
      if (response.data.code === '2001') {
//    		Element.MessageBox({type:"error",message:response.data.msg,title:"温馨提示"});
        auth.logout()
         	router.push({path: '/login'})
      }else if(response.data.code === '2003'){
     
      	Element.MessageBox({type:"error",message:response.data.msg,title:"温馨提示"});
      	 auth.logout()
      	  	router.push({path: '/login'})
      }else if(response.data.code === '2004'){

      	Element.MessageBox({type:"error",message:response.data.msg,title:"温馨提示"});
      	 auth.logout();
      	 router.push({path: '/login'})
      }else if(response.data.code === '2005'){
      	Element.MessageBox({type:"error",message:response.data.msg,title:"温馨提示"});
      	 auth.logout()
      	 router.push({path: '/login'})
      }else{
        Element.MessageBox({type:"error",message:response.data.msg,title:"温馨提示"});
      }
    }
		return response;
	},
	error => {
		if(error.response) {
			//全局ajax错误信息提示
			// Element.MessageBox({type:"error",message:error.response.data,title:"温馨提示"});
		}
		return Promise.reject(error);
	});

// const nprogress = new NProgress({parent: '.nprogress-container'})

Object.keys(filters).forEach(key => {
	Vue.filter(key, filters[key])
})

Vue.prototype.getBtnS=function(arr){//获取按钮
			for(let i = 0; i < arr.length; i++) {
				let arrs=arr[i];
				if(arrs){
					this[arrs]=true;
				}
				
			}
			
			 },
Vue.prototype.handRoleBtn = function(getUrl, url, param1,param2,arr) { //按钮权限
	arr = (arr == undefined) ? "fcodeD" : arr;
	this.$http.get(getUrl + url + "?roleUrl=" + param1+"&userId="+param2)
		.then(res => {
			if(res.data.success = true) {
				var ary = res.data.data;
			for(let i = 0; i < ary.length; i++) {
					arr.push(ary[i].fcode);
				}
				this.getBtnS(arr);
			
			}
		}).catch((error) => {
			console.log(error);
		});
},
new Vue({
	//加載組件下的文件
	store,
	// nprogress,
	router,
	el: "#root",
	render: h => h(frame),

})