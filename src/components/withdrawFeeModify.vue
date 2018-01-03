
<template>
  	  <imp-panel>
		    <el-form  ref="form" :model="form" label-width="180px">
		    	<el-form-item label="id" style="display: none;">
		        <el-input v-model="form.fid" style="width:300px"></el-input>
		      </el-form-item>
		      <el-form-item   label="等级">
		        <el-input v-model="form.flevel" :disabled="true" style="width:300px"></el-input>
		      </el-form-item>
          <el-form-item   label="手续费">
		        <el-input v-model="form.ffee"  style="width:300px"></el-input>
		      </el-form-item>

		    </el-form>
		  </imp-panel>
</template>
<script>
  import Vue from "vue";
  import panel from "./panel.vue"
  import * as api from "../api"
  import auth from "../auth"
	import Element from "element-ui";
  export default {
    components: {
      'imp-panel': panel
    },
    data(){
      return {

        form: {
         				fid: "",
                flevel: "",
                ffee:"",
                fversion:""
        },
        selectValue:""
      }
    },
     props:[],
    created(){
    },
   
    methods: {
    }
  }
</script>
