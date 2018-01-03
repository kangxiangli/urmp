
<template>
  <imp-panel>
		    <el-form  ref="form" :model="form" label-width="180px">
		    	<el-form-item label="id" style="display: none;">
		        <el-input v-model="form.fid" style="width:70%"></el-input>
		      </el-form-item>
		      <el-form-item label="用户名称">
		        <el-input v-model="form.fname" style="width:70%"></el-input>
		      </el-form-item>
          <el-form-item label="地址">
		        <el-input v-model="form.furl" style="width:70%"></el-input>
		      </el-form-item>
           <el-form-item label="图标">
		        <el-input v-model="form.ficon" style="width:70%"></el-input>
		      </el-form-item>
          <el-form-item label="父Id">
                <el-select class="select" v-model="form.fparentId" filterable  style="width:70%" placeholder="请选择">
               <el-option
                v-for="item in fparentIds"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
		      </el-form-item>
          <el-form-item  label="编码">
		        <el-input v-model="form.fcode"  style="width:70%"></el-input>
		      </el-form-item>
          <el-form-item  label="类型">
              <el-radio :label="1" v-model="form.ftype" >菜单</el-radio>
              <el-radio :label="2" v-model="form.ftype">按钮</el-radio>
              <el-radio :label="3" v-model="form.ftype">数据</el-radio>
		      </el-form-item>
          <el-form-item  label="状态">
                <el-select class="select" v-model="form.fstate" style="width:70%" placeholder="请选择">
               <el-option
                v-for="item in options"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
		      </el-form-item>
		    </el-form>
		  </imp-panel>
</template>
<script>
import panel from "./panel.vue"
import Element from "element-ui";
   import Vue from "vue";


export default {
  components: {
    "imp-panel": panel
  },
  data() {
    return {
      options: [
        {
          value: "1",
          label:"禁用"
        },
        {
          value: "0",
          label: "启用"
        }
      ],
      form: {
        fid: "",
        fcode: "",
        furl:"",
        fname:"",
        fparentId: "",
        ficon: "",
        fstate: "",
        ftype: "",
      },
      fparentIds: [],
      selectValue: ""
    };
  },
  props: [],
  created() {

  },
  methods: {
    
  }
};
</script>
