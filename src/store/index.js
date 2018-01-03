import Vue from "vue";
import Vuex from "vuex";
import * as types from "./mutation-types";
import defaultMenu from "./default-menu";
// import app from './modules/app'
// import menu from './modules/menu'
import * as api from "../api";
//import vuexI18n from 'vuex-i18n';
	import auth from '../auth'
Vue.use(Vuex)
//该store 实例会注册入到跟组件下的所有子组件，且子组件能通过 this.$store 访问到
//提前获取用户id  在获取菜单
Vue.prototype.getUser=function() {
				this.$http.get(auth.getServerUrl() + api.USER_NAME)
					.then(res => {
						debugger
						if(!res.data.data)return;
						if(res.data.success == true) {
							this.setUserInfo(res.data.data.floginName);
							window.localStorage.setItem("user-info", res.data.data.floginName);
							window.localStorage.setItem("userFids", "");
							window.localStorage.setItem("userFids", res.data.data.fid);
						
						}

					})

			}

let userFids=window.localStorage.getItem("userFids");
const store = new Vuex.Store({
  strict: true,  // process.env.NODE_ENV !== 'production', 直接修改state 抛出异常
  getters: {
    loading: state => state.loading,
    menuList: state => state.menuList,
    sidebar: state => state.sidebar,
   userInfo:state => state.userInfo,
    device:state => state.device,
    visitedViews:state=>state.visitedViews,
    serverUrl:state=>state.serverUrl,
		language:state=>state.language
  },
     modules: {
//   	 i18n: vuexI18n.store,
//     app,
//     menu
     },
  state: {
    loading: false,
    language: "zh",
    menuList: {},
    sidebar: {
      collapsed: false,
      show:true,
    },
    device: {
      isMobile: false
    },
    userInfo:{floginName:"佚名"},
     visitedViews: [],
     serverUrl:""
  },
  mutations: {
  	//更改Vuex 的store 中的状态的唯一方式就是提交 mutation Vuex 中的mutation非常类似于事件，每个 mutation 都有一个字符串的 事件类型 和回调函数。
    //只能同步的函数
    refreshVisitedViews(state){
    	state.visitedViews = state.visitedViews.slice(-5)//tab超过5个截取倒数第五个
    },
    [types.TOGGLE_DEVICE] (state, isMobile) {
      state.device.isMobile = isMobile
    },
    [types.TOGGLE_LOADING] (state) {
      state.loading = !state.loading
    },
    [types.LOAD_MENU] (state, menu) {
      state.menuList = menu;
    },
    [types.SET_SER_URL] (state, serverUrl) {//服务器地址
      state.serverUrl = serverUrl;
    },
    [types.SET_USER_INFO] (state, info) {
      state.userInfo.floginName = info;
    },

    [types.TOGGLE_SIDEBAR] (state, collapsed) {
      if (collapsed == null) collapsed = !state.sidebar.collapsed;
      state.sidebar.collapsed = collapsed;
    },
    [types.TOGGLE_SIDEBAR_SHOW] (state,show) {
      if (show == null) state.sidebar.show = !state.sidebar.show;
      else{
        state.sidebar.show = show;
      }
    },    


  }, 
  actions: {
  	//　Action 提交的是 mutation ,而不是直接变更状态。
    //异步的函数
    toggleLoading: ({commit}) => commit(types.TOGGLE_LOADING),

    loadMenuList: ({commit}) => {
      Vue.axios.get(auth.getServerUrl()+api.MENU_DATA_LIST+"?userId="+userFids+"&sysName="+1)
      .then(res => {//加载权限菜单项
      	if(res.data.success==true){//res.data.data.menu
        commit(types.LOAD_MENU,res.data.data);

      	}else{//默认菜单
        		commit(types.LOAD_MENU, defaultMenu)
      	}

      }).catch((error) => {//默认菜单
						commit(types.LOAD_MENU, defaultMenu)
						console.log(error)
					});
    },
    getServerUrl: ({commit}) => {
      //获取服务器地址
      Vue.axios.get(api.SERVERURL).then(res => {
          sessionStorage.setItem("serverUrl",res.data.serverUrl);
          // commit(types.SET_SER_URL, res.data.serverUrl);
      }).catch(
              //默认服务器地址
         exp => commit(types.GET_SER_URL,"http://localhost:8080")
      );
    },
    addVisitedViews({ commit,state }, view) {
    	if (state.visitedViews.some(v => v.path === view.path)) return
      state.visitedViews.push({ name: view.name, path: view.path })
    },
    delVisitedViews({ commit, state }, view) {
      return new Promise((resolve) => {
        let index
      for (const [i, v] of state.visitedViews.entries()) {
        if (v.path === view.path) {
          index = i
          break
        }
      }

      state.visitedViews.splice(index, 1)
        resolve([...state.visitedViews])
      })
    }
  }
})

export default store
