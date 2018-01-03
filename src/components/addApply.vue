<template>
	<imp-panel>
		<el-form :model="form" :rules="rules" ref="form" label-width="180px" class="demo-form">
			<el-form-item label="id" style="display: none;">
				<el-input v-model="form.fid" style="width:70%"></el-input>
			</el-form-item>
			<el-form-item label="编码" prop="fcode">
				<el-input v-model="form.fcode" style="width:70%"></el-input>
			</el-form-item>
			<el-form-item label="名称" prop="fname">
				<el-input v-model="form.fname" style="width:70%"></el-input>
			</el-form-item>

			<el-form-item label="顺序" prop="fseq">
				<el-input v-model="form.fseq" style="width:70%"></el-input>
			</el-form-item>
			<el-form-item label="网址" prop="furl">
				<el-input v-model="form.furl" style="width:70%"></el-input>
			</el-form-item>
			<el-form-item label="父节点">
				<el-select class="select" v-model="form.fparentId" filterable style="width:70%" placeholder="请选择">
					<el-option v-for="item in toptions" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="状态" prop="fstatus">
				<el-radio v-model="form.fstatus" label="1">禁用 </el-radio>
				<el-radio v-model="form.fstatus" label="0">启用 </el-radio>
			</el-form-item>
			<!--<el-form-item label="审核状态" prop="fsubStatus"  >
				<el-radio v-model="form.fsubStatus" label="1">未审核 </el-radio>
				<el-radio v-model="form.fsubStatus" label="0">已审核 </el-radio>
			</el-form-item>-->
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
	import auth from '../auth';
	export default {
		components: {
			'imp-panel': panel
		},
		data() {
			let validatefname = (rule, value, callback) => { //应用名称
				//用户名正则，4到16位（字母，数字，下划线，减号）
				let reg = /^[0-9a-zA-Z\u4e00-\u9fa5_]{3,100}$/;
				if(!reg.test(value)) {
					callback(new Error('应用名称可为3-100位,汉字、数字、字母（大小写）、下划线'))

				} else {
					callback()
				}
			};
			let validatefurl = (rule, value, callback) => {
				//网址
				let reg = /(ht|f)tp(s?)\:\/\/[0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*(:(0-9)*)*(\/?)([a-zA-Z0-9\-\.\?\,\'\/\\\+&amp;%\$#_]*)?/;
				if(!reg.test(value)) {
					callback(new Error('URL有误，请重新填写!'))

				} else {
					callback()
				}
			};
			let validatefcode = (rule, value, callback) => {
				//编码
				let reg = /^\d+$/;
				if(!reg.test(value)) {
					callback(new Error('输入非数字，请重新填写!'))

				} else {
					callback()
				}
			};
			return {
				toptions: [{ //父id
					value: '',
					label: "请选择"
				}],
				form: {
					fid: "",
					fname: "",
					fcode: "",
					fseq: "",
					furl: "",
					fdesc: "",
					fstatus: "",
					fparentId: "",

				},
//				fparentIds: [],
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
					furl: [{
							required: true,
							message: '请输入网址',
							trigger: 'blur'
						},
						{
							validator: validatefurl,
							trigger: 'blur'
						}
					],
					fcode: [{
							required: true,
							message: '请输入编码',
							trigger: 'blur'
						},
						{
							validator: validatefcode,
							trigger: 'blur'
						}
					],
					fseq: [{
						required: true,
						message: '请输入顺序',
					},
						{
						validator: validatefcode,
							trigger: 'blur'
						}],
					fdesc: [{
						required: true,
						message: '请输入描述',
						trigger: 'blur'
					}],
					fparentId: [{
						required: true,
						message: '请选择',
						trigger: 'blur'
					}],
					fstatus: [{
						required: true,
						message: '请选择',
						trigger: 'blur'
					}],

				}

			}
		},
		props: [],
		watch: {
			
		},
		created() {
//			this.handParent(auth.getServerUrl(), api.GET_DATA_APPLY_PARENT, this.toptions);
		},
		methods: {
//			handParent() {
//				this.$http.get(getUrl + url)
//					.then(res => {
//						debugger
//						if(res.data.success = true) {
//							var ary = res.data.data;
//							for(let i = 0; i < ary.length; i++) {
//								let obj = {
//									fvalue: "",
//									fcode: ""
//								};
//								obj.value = ary[i].fid;
//								obj.label = ary[i].fname;
//								opt.push(obj);
//							}
//							//				this.$refs.form.fparentIds = opt;
//						} else {
//							Element.MessageBox({
//								type: "error",
//								message: res.data.msg,
//								title: "温馨提示"
//							});
//						}
//					}).catch((error) => {
//						console.log(error)
//					});
//			},
		}
	}
</script>