<template>
  <imp-panel  >
    <el-form ref="form" :model="form" label-width="180px">
      <el-form-item  label="旧密码">
        <el-input v-model="form.oldPwd" type="password"></el-input>
      </el-form-item>
      <el-form-item label="新密码">
        <el-input v-model="form.newPwd" type="password"></el-input>
      </el-form-item>
      <el-form-item label="重复新密码">
        <el-input v-model="form.newPwd2" type="password"></el-input>
      </el-form-item>
      <el-form-item>
      </el-form-item>
    </el-form>
  </imp-panel>
</template>
<script>
	  import Vue from "vue";
//import VueI18n from 'vue-i18n'
//import * as api from "../api"
//import en from '../resources/en';
//import zh from '../resources/zh';
//Vue.use(VueI18n)
//const messages={
//	en:JSON.parse(JSON.stringify(en)),
//zh:JSON.parse(JSON.stringify(zh))
//}
//const i18n = new VueI18n({
//	 locale:window.localStorage.getItem('ELEMENT_LANGUAGE'),    // 语言标识
//	messages
//})
  export  default{
    data(){
      return {
        form: {
          oldPwd: '',
          newPwd: '',
          newPwd2: ''
        }
      }
    },
//  i18n,
    methods: {
      onSubmit(){
//      if (this.newPwd !== this.newPwd2) {
//        this.$message({type: "error", message: "两次输入密码不一致"});
//        return;
//      }
//      this.$http.post(api.CHANGE_PWD, this.form)
//        .then(res => {
//        this.$message("修改成功");
//    })
      }
    }
  }
</script>
