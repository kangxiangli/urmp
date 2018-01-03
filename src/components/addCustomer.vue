<template>
	<imp-panel>
		<el-form  :model="form" :rules="rules" ref="form" label-width="180px" class="demo-form">
			<el-form-item label="id" style="display: none;">
				<el-input v-model="form.fid" style="width:70%"></el-input>
			</el-form-item>
			<el-form-item label="用户名称" prop="floginName">
				<el-input v-model="form.floginName" style="width:70%"></el-input>
			</el-form-item>
			<el-form-item label="角色名称" prop="fname">
				<el-input v-model="form.fname" style="width:70%"></el-input>
			</el-form-item>
			<el-form-item label="状态" prop="fstate"  >
				<el-radio v-model="form.fstate" label="1">禁用 </el-radio>
				<el-radio v-model="form.fstate" label="0">启用 </el-radio>
			</el-form-item>
		
			<el-form-item label="性别" prop="fsex">
				<el-radio v-model="form.fsex" label="0">男 </el-radio>
				<el-radio v-model="form.fsex" label="1">女 </el-radio>
			</el-form-item>
			<el-form-item label="生日" prop="fbirthday">
				<el-input v-model="form.fbirthday" style="width:70%"></el-input>
			</el-form-item>
		
			<el-form-item label="手机" prop="fmobile">
				<el-input v-model="form.fmobile" style="width:70%"></el-input>
			</el-form-item>
			<el-form-item label="家庭电话" prop="fhomePhone">
				<el-input v-model="form.fhomePhone" style="width:70%"></el-input>
			</el-form-item>
			<el-form-item label="邮箱" prop="femail">
				<el-input v-model="form.femail" style="width:70%"></el-input>
			</el-form-item>
			<el-form-item label="地址" prop="faddress">
				<el-input v-model="form.faddress" style="width:70%"></el-input>
			</el-form-item>
			<el-form-item label="排序" prop="fseq">
				<el-input v-model="form.fseq" style="width:70%"></el-input>
			</el-form-item>
				<el-form-item label="描述" prop="fdesc" style="width:80%">
				<el-input type="textarea" v-model="form.fdesc"></el-input>
			</el-form-item>
			

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
				if(!reg.test(value)) {
					callback(new Error('密码长度需4-16位，由字母，数字，下划线或减号组成'))

				} else {
					callback()
				}
			};
			let validatefname = (rule, value, callback) => { //应用名称
				//用户名正则，4到16位（字母，数字，下划线，减号）
				let reg = /^[0-9a-zA-Z\u4e00-\u9fa5_]{3,100}$/;
				if(!reg.test(value)) {
					callback(new Error('应用名称可为3-100位,汉字、数字、字母（大小写）、下划线'))

				} else {
					callback()
				}
			};
			let validatefshortName = (rule, value, callback) => {
				//简称
				let reg = /^[0-9a-zA-Z\u4e00-\u9fa5_]{3,30}$/;
				if(!reg.test(value)) {
					callback(new Error('简称可为3-30位,汉字、数字、字母（大小写）、下划线'))

				} else {
					callback()
				}
			};
			let validfbirthday = (rule, value, callback) => {
				//时间格式
				let reg = /^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
				if(!reg.test(value)) {
					callback(new Error('日期格式不正确，正确格式为：2017-01-01'))

				} else {
					callback()
				}
			};
			
				let validfmobile = (rule, value, callback) => {//手机号正则
				let reg = /^[1][3,4,5,7,8][0-9]{9}$/;  
		        if (!reg.test(value)) {
		          callback(new Error('手机号码有误，请重填'))
		        } else {
		          callback()
		        }
		      };
		      	let validfhomePhone = (rule, value, callback) => {//固定电话
				let reg = /^0\d{2,3}-?\d{7,8}$/;  
		        if (!reg.test(value)) {
		          callback(new Error('电话号码有误，正确格式为：01088888888,010-88888888'))
		        } else {
		          callback()
		        }
		      };
		      let validfemail = (rule, value, callback) => {//固定邮箱
				let reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/ ;  
		        if (!reg.test(value)) {
		          callback(new Error('邮箱格式有误，不可以“_”或“-”开头或者结尾，包含特殊符号的'))
		        } else {
		          callback()
		        }
		      };
			
			return {
				form: {
					fid: "",
					floginName: "",
					fname: "",
//					fpassword: "",
					// fsalt: "",
					fsex: "",
					fbirthday: "",
//					fposition: "",
//					fofficePhone: "",
					fmobile: "",
					fhomePhone: "",
					femail: "",
					faddress: "",
					fseq: "",
					fstate: "",
					fdesc: "",
//					fuserId: "",
//					ftime: "",
//					certSalt: ""
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
					floginName: [{
							required: true,
							message: '请输用户名称',
							trigger: 'blur'
						},
						{
							//							validator: validatefshortName,
							trigger: 'blur'
						}
					],
					fsex: [{
						required: true,
						message: '请选择',
					}],
					fdesc: [{
						required: true,
						message: '请输入描述',
						trigger: 'blur'
					}],
					fbirthday: [{
							required: true,
							message: '请输入生日',
							trigger: 'blur'
						},
						{
						validator: validfbirthday,
							trigger: 'blur'
						}
					],
					fmobile: [{
							required: true,
							message: '请输入手机号',
							trigger: 'blur'
						},
						{
						validator: validfmobile,
							trigger: 'blur'
						}
					],
					fhomePhone: [{
							required: true,
							message: '请输入家庭电话',
							trigger: 'blur'
						},
						{
						validator: validfhomePhone,
							trigger: 'blur'
						}
					],
					femail: [{
							required: true,
							message: '请输入邮箱',
							trigger: 'blur'
						},
						{
						validator: validfemail,
							trigger: 'blur'
						}
					],
					faddress: [{
						required: true,
						message: '请输入地址',
					}],
					fstate: [{
						required: true,
						message: '请输入状态',
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
//statusForma: function(row, column) {
//				return this.fstate == 0 ? "启用" : "禁用";
//			},
		}
	}
</script>