<template>
	<!--children拥有子集-->
  <el-submenu :index="item.furl" v-if="item.children && item.children.length>0">
    <template slot="title"><i :class="item.ficon"></i><span>{{item.fname}}</span></template>
    <template v-for="child in item.children">
      <sub-menu v-if="child.children && child.children.length>0" :param="child"></sub-menu>
      <el-menu-item :index="child.furl" v-else><i :class="child.ficon"></i><span>{{child.fname}}</span></el-menu-item>
    </template>
  </el-submenu>
  <!--没有子集-->
  <el-menu-item :index="item.furl" v-else><i :class="item.ficon"></i><span>{{item.fname}}</span></el-menu-item>
</template>
<script>
  import subMenu from "./subMenu.vue"

  export default {
    name: 'subMenu',
    props: ['param'],
    data: function () {
      return {item: this.param}
    },
    components: {
      subMenu
    }
  }
</script>
<style>
  .el-menu .fa {
    margin-right: 10px;
  }
</style>
