<template>
	<imp-panel>
		<el-form style="margin-top: 35px;" :model="form" :rules="rules" ref="form" label-width="180px" class="demo-form">
			<el-form-item label="id" style="display: none;">
				<el-input v-model="form.fid" style="width:70%"></el-input>
			</el-form-item>
			<el-form-item label="编码" prop="fcode">
				<el-input v-model="form.fcode" style="width:70%"></el-input>
			</el-form-item>
			<el-form-item label="角色名称" prop="fname">
				<el-input v-model="form.fname" style="width:70%"></el-input>
			</el-form-item>
			<el-form-item label="状态" prop="fstate">
				<el-radio v-model="form.fstate" label="0">禁用 </el-radio>
				<el-radio v-model="form.fstate" label="1">启用 </el-radio>
			</el-form-item>
			<el-form-item label="描述" prop="fdesc" style="width:80%">
				<el-input type="textarea" v-model="form.fdesc"></el-input>
			</el-form-item>
			<!--<el-form-item label="是否默认" prop="fdefault">
				<el-radio v-model="form.fdefault" label="0">是 </el-radio>
				<el-radio v-model="form.fdefault" label="1">否 </el-radio>
			</el-form-item>-->
		
		</el-form>

	</imp-panel>
</template>
<script>
	import panel from "./panel.vue"
	import * as api from "../api"
	export default {
		components: {
			'imp-panel': panel
		},
		data() {
			      // 密码安全性要求
      let validatePass1 = (rule, value, callback) => {
        //用户名正则，4到16位（字母，数字，下划线，减号）
		let reg = /^[a-zA-Z0-9_-]{4,16}$/;
        if (!reg.test(value)) {
          callback(new Error('密码长度需4-16位，由字母，数字，下划线或减号组成'))

        } else {
          callback()
        }
      };
            let validatefname = (rule, value, callback) => {//应用名称
        //用户名正则，4到16位（字母，数字，下划线，减号）
		let reg = /^[0-9a-zA-Z\u4e00-\u9fa5_]{3,100}$/;
        if (!reg.test(value)) {
          callback(new Error('应用名称可为3-100位,汉字、数字、字母（大小写）、下划线'))

        } else {
          callback()
        }
      };
            let validatefshortName = (rule, value, callback) => {
        //用户名正则，4到16位（字母，数字，下划线，减号）
		let reg = /^[0-9a-zA-Z\u4e00-\u9fa5_]{3,30}$/;
        if (!reg.test(value)) {
          callback(new Error('简称可为3-30位,汉字、数字、字母（大小写）、下划线'))

        } else {
          callback()
        }
      };
			return {
				
				form: {
				fid: "",
                fcode: "",
                fname: "",
//              fseq: "",
//              fdefault: "",
                fdesc: "",
                fstate: "",
//              fuserId: ""
				},
				rules: {
					fname: [{
							required: true,
							message: '请输入角色名称',
							trigger: 'blur'
						},
						{
							validator: validatefname,
							trigger: 'blur'
						}
					],
					fcode: [{
							required: true,
							message: '请输入编码',
							trigger: 'blur'
						},
						{
//							validator: validatefshortName,
							trigger: 'blur'
						}
					],
//					fdefault: [{
//							required: true,
//							message: '请选择',
//					}],
					fdesc:[{
							required: true,
							message: '请输入描述',
							trigger: 'blur'
					}],
					fstate:[{
							required: true,
							message: '请选择',
					}],

				}

			}
		},
		props: [],
		watch: {

		},
		created() {

		},
		methods: {

		}
	}
</script>