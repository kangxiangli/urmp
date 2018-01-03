<template>
	
  <aside class="main-sidebar animated" :class="{ showSlide: sidebar.show, hideSlide: !sidebar.show, expandSide:(!sidebar.collapsed||device.isMobile)}">
    <el-scrollbar tag="div" wrapClass="vue-scrollbar" v-if="(!sidebar.collapsed||device.isMobile)">
      <div class="sidebar">
        <el-menu :default-active="onRoutes"
                 :default-openeds="onRouteKeys"
                 class="el-menu-vertical-demo"
                 theme="dark" router :collapse="sidebar.collapsed&&!device.isMobile" @select="handleSelect">
          <template v-for="item in menuList">
            <sub-menu :param="item"></sub-menu>
          </template>
        </el-menu>
      </div>
    </el-scrollbar>
   
    <div class="sidebar" v-else>
      <el-menu :default-active="onRoutes"
               :default-openeds="onRouteKeys"
               class="el-menu-vertical-demo"
               theme="dark" router :collapse="sidebar.collapsed&&!device.isMobile" @select="handleSelect">
        <template v-for="item in menuList">
          <sub-menu :param="item"></sub-menu>
        </template>
      </el-menu>
    </div>
  </aside>
</template>
<script>
  import subMenu from "./subMenu.vue"
  import {mapGetters, mapActions, mapMutations} from 'vuex'
  import * as types from "../store/mutation-types"
  export default {
    props: {
      show: Boolean,
    },
    data() {
      return {}
    },
    components: {
      subMenu,
    },
    computed: {
      ...mapGetters({
        sidebar: 'sidebar',
        device:'device',
      }),
      onRoutes(){
        return this.$route.path;
      },
      onRouteKeys(){
        const getParentArray = (path, ms, kas = []) => {
          if (ms && ms.length > 0) {
            for (let k = 0, length = ms.length; k < length; k++) {
              if (path == ms[k].furl) {
                kas.push(ms[k].furl);
                break;
              }
              let i = kas.length;
              if (ms[k].children && ms[k].children.length > 0) {
                getParentArray(path, ms[k].children, kas);
              }
              if (i < kas.length) {
                kas.push(ms[k].furl);
              }
            }
          }
          return kas.reverse();
        }
        return getParentArray(this.$route.path, this.menuList);
      },
      // 使用对象展开运算符将 getters 混入 computed 对象中
      ...mapGetters([
        'menuList'
      ])
    },
    mounted () {
      let route = this.$route
//      console.log(route)
//      if (route.name) {
//        this.shouldExpandMatchItem(route)
//      }
    },
    created: function () {
      this.load();
    },
    methods: {
      handleSelect() {
        if(this.device.isMobile){
          this.toggleSidebarShow(false);
        }
      },
      ...mapMutations({
        toggleSidebarShow: types.TOGGLE_SIDEBAR_SHOW,
      }),
      ...mapActions({
        load: 'loadMenuList' // 映射 this.load() 为 this.$store.dispatch('loadMenuList')
      })
    }
  }
</script>
<style>

  .showSlide {
    animation-duration: .2s;
    animation-name: slideInLeft;
  }

  .hideSlide {
    animation-duration: .2s;
    animation-name: slideOutLeft;
  }

  .main-sidebar {
     background-color: #265679;
    position: fixed;
    top: 50px;
    left: 0;
    bottom: 0;
    height: calc(100vh - 50px);
    width: 44px;
    z-index: 810;
    -webkit-transition: -webkit-transform 0.3s ease-in-out, width 0.3s ease-in-out;
    -moz-transition: -moz-transform 0.3s ease-in-out, width 0.3s ease-in-out;
    -o-transition: -o-transform 0.3s ease-in-out, width 0.3s ease-in-out;
    transition: transform 0.3s ease-in-out, width 0.3s ease-in-out;
  }

  .expandSide {
    width: 230px;
  }

  .el-menu-vertical-demo .el-submenu .el-menu-item {
    height: 45px;
    line-height: 45px;
  }

  .el-menu-vertical-demo .el-menu-item, .el-menu-vertical-demo .el-submenu__title {
    height: 45px;
    line-height: 45px;
  }

  .main-sidebar .el-menu--collapse {
    width: 44px;
  }

  .main-sidebar .el-menu--collapse>.el-menu-item, .el-menu--collapse>.el-submenu>.el-submenu__title {
    padding-left: 13px !important;
  }

  .vue-scrollbar{
      background-color: #265679 !important;
    height: calc(100vh - 50px)
  }

  .main-sidebar .el-scrollbar__bar.is-vertical{
    display: none;
  }

  .sidebar{
    min-height: 450px;
  }
.el-menu--dark .el-menu-item:hover, .el-menu--dark .el-submenu__title:hover{
	    background-color: #1b4a6d !important;
}
.el-menu--dark {
    background-color: #265679 !important;
}
.el-menu--horizontal.el-menu--dark .el-submenu .el-menu-item.is-active, .el-menu-item.is-active{
	color: #fff !important;
	 background-color: rgba(0,0,0,0.2) !important;
}
.el-menu--dark .el-submenu .el-menu {
    background-color:#1b3c56 !important;
}
.sidebar .el-menu{
	  background-color: #265679 !important;
}
.el-menu-item:focus, .el-menu-item:hover,.el-submenu__title:hover{
	 background-color: rgba(0,0,0,0.1) !important;
}
.el-submenu__title .el-menu{
	background-color: rgba(0,0,0,0.2) !important;
}
.menubar .el-submenu.is-active {
background-color: red !important;
}
.el-menu-item,.el-submenu__title,.el-submenu__title i,.el-menu-item i{
	color:rgba(255,255,255,0.7) !important;
}
.el-submenu.is-active .el-submenu__title{
	background-color: rgba(0,0,0,0.3) !important;
}
</style>
