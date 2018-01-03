
<template>
  <imp-panel>
		    <el-form  ref="form" :model="form" :rules="rules" label-width="180px">
		    	<el-form-item label="id" style="display: none;">
		        <el-input v-model="form.fid" style="width:70%"></el-input>
		      </el-form-item>
		      <el-form-item label="用户名称" prop="fname">
		        <el-input v-model="form.fname" style="width:70%"></el-input>
		      </el-form-item>
          <el-form-item label="简称" prop="fshortName">
		        <el-input v-model="form.fshortName" style="width:70%"></el-input>
		      </el-form-item>
          
          <el-form-item label="父Id" prop="fparentId">
                <el-select class="select" v-model="form.fparentId" filterable  style="width:70%" placeholder="请选择">
               <el-option
                v-for="item in fparentIds"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
		      </el-form-item>
          <el-form-item  label="编码" prop="fcode">
		        <el-input v-model="form.fcode"  style="width:70%"></el-input>
		      </el-form-item>
          
          <el-form-item  label="状态" prop="fstate">
                <el-select class="select" v-model="form.fstate" style="width:70%" placeholder="请选择">
               <el-option
                v-for="item in options"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
		      </el-form-item>
          <el-form-item  label="地址">
		        <el-input v-model="form.faddress"  style="width:70%"></el-input>
		      </el-form-item>
           <el-form-item  label="描述" >
		        <el-input  type="textarea" v-model="form.fdesc"  style="width:80%"></el-input>
		      </el-form-item>
		    </el-form>
		  </imp-panel>
</template>
<script>
import panel from "./panel.vue";
import Element from "element-ui";
import Vue from "vue";


export default {
  components: {
    "imp-panel": panel
  },
  data() {
    let validatefname = (rule, value, callback) => {
      //应用名称
      //用户名正则，4到16位（字母，数字，下划线，减号）
      let reg = /^[0-9a-zA-Z\u4e00-\u9fa5_]{3,100}$/;
      if (!reg.test(value)) {
        callback(new Error("应用名称可为3-100位,汉字、数字、字母（大小写）、下划线"));
      } else {
        callback();
      }
    };
    let validatefshortName = (rule, value, callback) => {
      //简称
      let reg = /^[0-9a-zA-Z\u4e00-\u9fa5_]{3,30}$/;
      if (!reg.test(value)) {
        callback(new Error("简称可为3-30位,汉字、数字、字母（大小写）、下划线"));
      } else {
        callback();
      }
    };

    return {
      options: [
        {
          value: "1",
          label: "禁用"
        },
        {
          value: "0",
          label: "启用"
        }
      ],
      form: {
        fid: "",
        fcode: "",
        furl: "",
        fname: "",
        fparentId: "",
        ficon: "",
        fstate: "",
        ftype: ""
      },
      rules: {
        fname: [
          {
            required: true,
            message: "请输入机构名称",
            trigger: "blur"
          },
          {
            validator: validatefname,
            trigger: "blur"
          }
        ],
        fshortName: [
          {
            required: true,
            message: "请输机构简称",
            trigger: "blur"
          },
          {
            validator: validatefshortName,
            trigger: "blur"
          }
        ],
        fparentId: [
          {
            required: true,
            message: "请选择"
          }
        ],
        fcode: [
          {
            required: true,
            message: "请输入编码",
            trigger: "blur"
          }
        ],
        fstate: [
          {
            required: true,
            message: "请输入"
          }
        ]
      },
      fparentIds: [],
      selectValue: ""
    };
  },
  props: [],
  created() {
  },
 
  methods: {}
};
</script>
