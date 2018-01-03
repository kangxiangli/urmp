<template>
	<imp-panel>
		<el-form  :model="form" :rules="rules" ref="form" label-width="180px" class="demo-form">
			<el-form-item label="id" style="display: none;">
				<el-input v-model="form.fid" style="width:70%"></el-input>
			</el-form-item>
			<el-form-item label="编码" prop="fcode">
				<el-input v-model="form.fcode" style="width:70%"></el-input>
			</el-form-item>
			<el-form-item label="值" prop="fvalue">
				<el-input v-model="form.fvalue" style="width:70%"></el-input>
			</el-form-item>
			 <el-form-item label="父节点">
                <el-select class="select" v-model="form.fparentId" filterable  style="width:70%" placeholder="请选择">
               <el-option
                v-for="item in toptions"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
		      </el-form-item>
		      <el-form-item label="状态" prop="fstate"  >
				<el-radio v-model="form.fstate" label="1">禁用 </el-radio>
				<el-radio v-model="form.fstate" label="0">启用 </el-radio>
			</el-form-item>
			 
		</el-form>

	</imp-panel>
</template>
<script>
import panel from "./panel.vue";
import * as api from "../api";
import auth from "../auth";
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
    let validatefurl = (rule, value, callback) => {
      //网址
      let reg = /(ht|f)tp(s?)\:\/\/[0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*(:(0-9)*)*(\/?)([a-zA-Z0-9\-\.\?\,\'\/\\\+&amp;%\$#_]*)?/;
      if (!reg.test(value)) {
        callback(new Error("URL有误，请重新填写!"));
      } else {
        callback();
      }
    };
    let validatefcode = (rule, value, callback) => {
      //编码
      let reg = /^\d+$/;
      if (!reg.test(value)) {
        callback(new Error("编码为正整数，请重新填写!"));
      } else {
        callback();
      }
    };
    return {
      toptions: [
        {
          //父id
          value: "",
          label: "请选择"
        }
      ],
      form: {
        fid: "",
        fvalue: "",
        fcode: "",
        fstate: "",
        fparentId: ""
      },
      fparentIds: [],
      rules: {
        fvalue: [
          {
            required: true,
            message: "请输入值",
            trigger: "blur"
          },
          {
            validator: validatefname,
            trigger: "blur"
          }
        ],

        fcode: [
          {
            required: true,
            message: "请输入编码",
            trigger: "blur"
          },
          {
            validator: validatefcode,
            trigger: "blur"
          }
        ],

        fparentId: [
          {
            required: true,
            message: "请选择",
            trigger: "blur"
          }
        ],
        fstate: [
          {
            required: true,
            message: "请选择",
            trigger: "blur"
          }
        ],
        fsubStatus: [
          {
            required: true,
            message: "请选择",
            trigger: "blur"
          }
        ]
      }
    };
  },
  props: [],
  watch: {},
  created() {
    // 			debugger;
    // this.handParentId(auth.getServerUrl() ,api.GET_DATA_APPLY_PARENT,data.id,this.toptions);
  },
  methods: {
	
    get(url) {
      let _this = this;
      this.$http
        .get(url)
        .then(res => {
          if (res.data.success === true) {
            var d = res.data.data;
            _this.form.fid = d.fid;
            _this.form.fcode = d.fcode;
            _this.form.fparentId = d.fparentId;
            _this.form.fvalue = d.fvalue;
            _this.form.fstate = d.fstate;
          } else {
         
          }
        })
        .catch((Error) => {
         console.log(Error)
        });
    },
    getSelectData(url) {
      let _this = this;
      //   this.form.parentId=this.$parent.parentId;
      this.$http
        .get(url)
        .then(res => {
          if (res.data.success === true) {
            var d = res.data;
            // _this.$refs.form.form.fparentId = data.id;
            let arr = [];
            for (let i = 0; i < d.data.length; i++) {
              let arrC = {
                value: "",
                label: ""
              };
              arrC.value = d.data[i].fid;
              arrC.label = d.data[i].fvalue;
              arr.push(arrC);
            }
            _this.toptions = arr;
          } else {
          
          }
        })
        .catch((Error) => {
          console.log(Error)
        });
	},
  },
  updated:function(){
	  
  },
  mounted () {
	 
  }
};
</script>