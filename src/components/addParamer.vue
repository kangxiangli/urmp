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
			<el-form-item label="状态" prop="fstate"  >
				<el-radio v-model="form.fstate" label="1">禁用 </el-radio>
				<el-radio v-model="form.fstate" label="0">启用 </el-radio>
			</el-form-item>
			<el-form-item label="顺序" prop="fseq">
				<el-input v-model="form.fseq" style="width:70%"></el-input>
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
			return {
				form: {
					fid: "",
					fvalue: "",
					fcode: "",
					fseq: "",
					fstate: "",
				},
				rules: {
					fvalue: [{
						required: true,
						message: '请输入值',
						trigger: 'blur'
					}],
					fcode: [{
						required: true,
						message: '请输入编码',
					}],
					fstate: [{
						required: true,
						message: '请选择',
					}],
					
					fseq: [{
						required: true,
						message: '请输入顺序',
					}]
					
					
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