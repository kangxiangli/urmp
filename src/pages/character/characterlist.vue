<style >
	.dialog_content .box .box-body{
		height: 500px !important;
		overflow-x: hidden;
		overflow-y: scroll;
	}
	
	/*.my_dalog_box {
		width: 800px !important;
	}
	
	.my_dalog_box .box .box-body {
		height: 500px !important;
		overflow-x: hidden;
		overflow-y: scroll;
	}*/
</style>
<template>
	<imp-panel>
		<div slot="header" style="width: 100%;">
			<el-row :gutter="24" style="width: 100%; margin-bottom: 10px;">
				<el-col :span="7">
					<!--状态-->
					<span>状态</span>
					<el-select style="width: 210px;" clearable filterable v-model="svalue" placeholder="请选择">
						<el-option v-for="item in soptions" :label="item.slabel" :value="item.svalue">
						</el-option>
					</el-select>

				</el-col>
				<!--编号和名称-->
				<el-col :span="7">
					<span>编号和名称</span>
					<input style="width: 210px;" type="text" placeholder="请输入编号/名称" v-model="searchKey" class="el-input__inner">

				</el-col>
				<!--搜索-->
				<el-col :span="3">
					<el-button type="info" icon="search" @click="btnCheck()">查询</el-button>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					 <el-tooltip class="item" effect="light" content="新增" placement="top-end">
						<el-button size="small" v-show="addch1"  type="success" @click="add"><i class="el-icon-plus"></i>
						</el-button>
   					 </el-tooltip>
					<el-tooltip class="item"  effect="light" content="删除" placement="top-end">
						<el-button size="small" v-show="delect1"  type="danger" @click="del()"><i class="el-icon-delete"></i>
						</el-button>
					</el-tooltip>
					<!--<el-button size="small" type="warning" @click="chooseUser()">选择用户
					</el-button>-->
				</el-col>
			</el-row>
		</div>
		<div slot="body">
			<el-table :stripe="true" :data="tableData.rows" border ref="multipleTable" style="width: 100%" v-loading="listLoading" @selection-change="handleSelectionChange">
				<el-table-column prop="id" type="selection" width="45">
				</el-table-column>
				<el-table-column prop="fid" v-if="false" label="ID">
				</el-table-column>
				<el-table-column prop="fcode" label="编码">
				</el-table-column>
				<el-table-column prop="fname" label="应用名称">
				</el-table-column>
				<el-table-column class-name="status-col" prop="fstate" label="状态" :formatter="stateFormat">
					 <template scope="scope">
			          <el-tag :type="scope.row.fstate | statusFilter">{{scope.row.fstate == 0 ? "启用" : "禁用"}}</el-tag>
			        </template>
				</el-table-column>
				<!--<el-table-column prop="fdefault"  label="是否默认" :formatter="fdefault">
				</el-table-column>-->
				<el-table-column prop="fdesc"  label="描述" >
				</el-table-column>
				<el-table-column label="操作" width="245">
					<template scope="scope">
						<el-tooltip class="item" effect="light" content="修改" placement="top-end">
							<el-button size="small" v-show="modify1" type="info" @click="modify(scope.$index, scope.row)"><i class="iconfont icon-xiugai"></i></el-button>
						</el-tooltip>
						<el-tooltip class="item"  effect="light" content="选择用户" placement="top-end">
							<el-button size="small" v-show="chooseUser1" type="warning" @click="chooseUser(scope.$index, scope.row)"><i class="iconfont icon-add-user"></i></el-button>
						</el-tooltip>
						<el-tooltip class="item" effect="light" content="选择权限" placement="top-end">
							<el-button size="small" v-show="choosePower1" type="warning" @click="choosePower(scope.$index, scope.row)"><i class="iconfont icon-setting-permissions"></i></el-button>
						</el-tooltip>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="tableData.pagination.pageNo" :page-sizes="[5, 10, 20]" :page-size="tableData.pagination.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="tableData.pagination.total">
			</el-pagination>
			<!--增加、修改-->
			<el-dialog custom-class="dialog_content1" title="保存" top="5%" v-model="dialogFormVisible" :visible.sync="dialogFormVisible" size="small">
				<addApp ref="form"></addApp>
				<span slot="footer" class="dialog-footer">
            <el-button @click="cancel()">取 消</el-button>
            <el-button type="primary" @click="save()">保存</el-button>
          </span>
			</el-dialog>
			<!--选择用户-->
			<el-dialog custom-class="dialog_content1" title="选择用户"  top="5%" :visible.sync="dialogFormVisible2" >
				<addUser ref="form" :fids="fids"></addUser>
				<span slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible2 = false">取 消</el-button>
            <el-button type="primary" @click="saveUser()">保存</el-button>
          </span>
			</el-dialog>
				<!--选择权限-->
			<el-dialog custom-class="dialog_content" title="选择权限" top="5%" :visible.sync="dialogFormVisible3" >
				<add-Power ref="form1" :fids1="fids1"></add-Power>
				<span slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible3 = false">取 消</el-button>
            <el-button type="primary" @click="saveRes()">保存</el-button>
          </span>
			</el-dialog>
		</div>
	</imp-panel>
</template>
<script>
	import Vue from "vue";
	import panel from "../../components/panel.vue"
	import * as api from "../../api"
	import addApp from "../../components/addApp"//新增
	import addUser from "../../components/addUser"//选择用户
	import addPower from "../../components/addPower";//选择权限
	import Element from "element-ui";
	import auth from '../../auth';
	export default {
		components: {
			'imp-panel': panel,
			addApp,
			addUser,
			'add-Power':addPower
		},
		data() {
			return {
				fcodeD:[],
				addch1:false,
				delect1:false,
				modify1:false,
				chooseUser1:false,
				choosePower1:false,
				soptions: [{ //状态
					svalue: '',
					slabel: "请输入"
				},{ //状态
					svalue: '0',
					slabel: "启用"
				}, {
					svalue: '1',
					slabel: "禁用"
				}],
				svalue: '',
				isShow: true,
				fids:[],
				fids1:[],
				currentRow: [],
				dialogFormVisible: false,
				dialogFormVisible2: false,
				dialogFormVisible3:false,
				listLoading: false,
				searchKey: '',
				tableData: {
					pagination: {
						total: 0,
						pageNo: 1,
						pageSize: 10,
						parentId: 0
					},
					rows: []
				}
			}
		},
		methods: {
			
			add() {
				let _this = this;
				_this.dialogFormVisible = true;
				if(_this.$refs.form==undefined){
					
				}else{
							_this.$refs.form.form.fid = "";
							_this.$refs.form.form.fname = "";
							_this.$refs.form.form.fcode = "";
//							_this.$refs.form.form.fseq ="";
							_this.$refs.form.form.ftime ="";
//							_this.$refs.form.form.fdefault = "";
							_this.$refs.form.form.fdesc = "";
							_this.$refs.form.form.fstate = "";
//							_this.$refs.form.form.fuserId = "";
				}
				
			},
			cancel() {
				let _this = this;
				_this.dialogFormVisible = false;
				
				_this.$refs.form.$refs.form.resetFields();
			},
			modify(index, row) {//修改
				let _this = this;
				_this.dialogFormVisible = true;
				this.loading();
				this.$http.get(auth.getServerUrl()+api.GET_DATA_CHARACTER_GET + "?roleId=" + row.fid)
					.then(res => {
						this.loadClose();
						if(res.data.success == true) {
							var d = res.data.data;
							_this.$refs.form.form.fid = d.fid;
							_this.$refs.form.form.fname = d.fname;
							_this.$refs.form.form.fcode = d.fcode;
//							_this.$refs.form.form.fseq = d.fseq;
							_this.$refs.form.form.ftime = d.ftime;
//							_this.$refs.form.form.fdefault = d.fdefault;
							_this.$refs.form.form.fdesc = d.fdesc;
							_this.$refs.form.form.fstate = d.fstate;
//							_this.$refs.form.form.fuserId = d.fuserId;
						} else {
								_this.dialogFormVisible = false;
						}

					})
			},
			save() {//保存
				let _this = this;
				_this.forms = _this.$refs.form.form;
				_this.$refs.form.$refs.form.validate((valid) => {
					if(!valid) {
						Element.MessageBox({
							type: "error",
							message: "请正确填写信息",
							title: "温馨提示"
						});
					} else {
						this.saveForm(api.GET_DATA_CHARACTER_SAVE,_this.forms);
					}
				});
			},
			saveUser() {//保存用户
				
					 this.$refs.form.form.many = this.$refs.form.value3;
					 debugger
				this.savePeople1(auth.getServerUrl(),api.GET_DATA_CHARACTER_SAVEUSER,"dialogFormVisible2",this.$refs.form.form);
				
				
			},
			saveRes() {//保存权限
				
				 this.$refs.form1.form.resId=this.$refs.form1.$refs.tree9.getCheckedKeys();
				  this.savePeople1(auth.getServerUrl(),api.GET_DATA_CHARACTER_SAVERES,"dialogFormVisible3",this.$refs.form1.form)

			},
			del() { //删除
				let fids = this.currentRow.join(',');
				this.delete(api.GET_DATA_CHARACTER_DEL,fids);
			},
			chooseUser(index,row) { //选择用户
				this.fids=row.fid;
				this.dialogFormVisible2 = true;
			},
			choosePower(index,row) { //选择权限
				this.fids1=row.fid;
				this.dialogFormVisible3 = true;
			},
			
			handleSelectionChange(val) { //取消选择触发
				this.currentRow = val.map(i => i.fid);
			},
			handleSizeChange(val) {
				this.tableData.pagination.pageSize = val;
				this.loadData(this.searchKey);
			},
			handleCurrentChange(val) {
				this.tableData.pagination.pageNo = val;
				this.loadData(this.searchKey);
			},
			btnCheck() {
				this.loadData(this.searchKey, this.svalue)
			},
			loadData(str,fstate) {
				this.listLoading = true;
				str = (str == undefined) ? "" : str;
				fstate = (fstate == undefined) ? "" : fstate;
				this.loadTable(api.GET_DATA_CHARACTER_SEARCH,"fname=" + str + "&fstate=" + fstate);
			},
		},
		created() {
			this.loadData();
				let userFids=window.localStorage.getItem("userFids");
			this.handRoleBtn(auth.getServerUrl(),api.DICT_SMPALL_BTN,"/character/characterlist",userFids,this.fcodeD);
		}
	}
</script>
<style>
	.el-pagination {
		float: right;
		margin-top: 15px;
	}
</style>