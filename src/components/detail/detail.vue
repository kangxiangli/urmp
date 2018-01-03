
<template>
  <imp-panel >
  	<el-row :gutter="24">
  		 <el-col :span="12"><div class="grid-content ">登录名称：{{form.floginName}}</div></el-col>
  <el-col :span="12"><div class="grid-content ">用户名称：{{form.fname}}</div></el-col>
	</el-row>
	<el-row :gutter="24">
  <el-col :span="12"><div class="grid-content ">状态：{{form.fstate==0?"启用":"禁用"}}</div></el-col>
  <el-col :span="12"><div class="grid-content ">性别：{{form.fsex}}</div></el-col>
</el-row>
<el-row :gutter="24">
 <el-col :span="12"><div class="grid-content ">生日：{{form.fbirthday}}</div></el-col>
  <el-col :span="12"><div class="grid-content ">职位：{{form.fposition}}</div></el-col>
</el-row>
<el-row :gutter="24">
 <el-col :span="12"><div class="grid-content ">家庭电话：{{form.fhomePhone}}</div></el-col>
  <el-col :span="12"><div class="grid-content ">手机号：{{form.fmobile}}</div></el-col>
</el-row>
<el-row :gutter="24">
 <el-col :span="12"><div class="grid-content ">排序：{{form.fseq}}</div></el-col>
  <el-col :span="12"><div class="grid-content ">邮箱：{{form.femail}}</div></el-col>
</el-row>
<el-row :gutter="24">
 <el-col :span="24"><div class="grid-content ">地址：{{form.faddress}}</div></el-col>
</el-row>
<el-row :gutter="24">
  <el-col :span="24"><div class="grid-content ">描述：{{form.fdesc}}</div></el-col>
</el-row>
<el-row :gutter="24">
 <el-col :span="24"><div class="grid-content ">创建时间：{{form.ftime}}</div></el-col>
</el-row>
  </imp-panel>
</template>
<script>
	import Vue from "vue";

  import panel from "../panel.vue"
  import * as api from "../../api"
  import auth from "../../auth"

  export default {
    components: {
      'imp-panel': panel
    },
    data(){
      return {
        form: {
         				fid: "",
                floginName: "",
                fname: "",
//              fpassword: "",
                fsalt: "",
                fsex: "",
                fbirthday: "",
                fposition: "",
//              fofficePhone: "",
                fmobile: "",
                fhomePhone: "",
                femail: "",
                faddress: "",
                fseq: "",
                fstate: "",
                fdesc: "",
                fuserId: "",
                ftime: "",
//              certSalt: ""
        }
      }
    },
     props:['fids'],
    computed: {
    },
    watch:{
    	fids(){
      this.loadData();
    	}
    },
    created(){
    	 var _this=this;
      _this.loadData();
    },

    methods: {
      loadData(){
       var _this=this;
        var parme_fid= this.fids;
        	_this.$http.get(auth.getServerUrl()+api.GET_DATA_CUSTOMER_GET + "/" + parme_fid )                                                                            
       			 .then(res => {
       		if(res.data.success == true) {
                 var d=res.data;    
                  _this.form.floginName = d.data.floginName;  
                    _this.form.fname = d.data.fname; 
//                    _this.form.fpassword = d.data.fpassword;  
                        _this.form.fsalt = d.data.fsalt;  
                          _this.form.fsex = d.data.fsex;  
                            _this.form.fbirthday = d.data.fbirthday;  
                              _this.form.fposition = d.data.fposition;  
                                _this.form.femail = d.data.femail;  
                                  _this.form.faddress = d.data.faddress;
                                   _this.form.fseq = d.data.fseq;  
                                    _this.form.fdesc = d.data.fdesc;  
                                     _this.form.fstatus = d.data.fstatus;  
                                     _this.form.fpostRealValidate = d.data.fpostRealValidate;
                                      _this.form.fuserId = d.data.fuserId;
                                       _this.form.ftime = d.data.ftime;
                                        _this.form.certSalt = d.data.certSalt;
                                         _this.form.fmobile = d.data.fmobile;
                                        
                                        
                         
       		}else{
       			
       		}
                                                                                                                                  
            			                                                                                          
              			                                                                                                                       
            });  
            

      }
    }
  }
</script>
