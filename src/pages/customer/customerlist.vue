
<template>
	<imp-panel>
		<div slot="header" style="width: 100%;">
			
			<el-row :gutter="24" style="width: 100%; margin-bottom: 10px;">
				<el-col :span="7">
					<!--状态-->
					<span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;状态</span>
					<el-select style="width: 210px;" v-model="svalue" clearable filterable placeholder="请选择">
						<el-option v-for="item in soptions" :label="item.slabel" :value="item.svalue">
						</el-option>
					</el-select>

				</el-col>
				<!--编号和名称-->
				<el-col :span="7">
					<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;应用</span>
					<input style="width: 210px;" type="text" placeholder="用户名称/应用名称" v-model="searchKey" class="el-input__inner">

				</el-col>
				
			</el-row>
			<el-row :gutter="24" style="margin-bottom:10px;">
				<!--开始时间-->
				<el-col :span="7">
					<div class="block">
						<span class="demonstration">开始时间</span>
						<el-date-picker style="width: 210px;" v-model="pvalue1" type="date" placeholder="选择日期" :picker-options="pickerOptions0">
						</el-date-picker>
					</div>
				</el-col>
				<!--结束时间-->
				<el-col :span="7">
					<div class="block">
						<span class="demonstration">结束时间</span>
						<el-date-picker style="width: 210px;" v-model="pvalue2" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions1">
						</el-date-picker>
					</div>
				</el-col>
				
				<!--搜索-->
				<el-col :span="3">
					<el-button type="info" icon="search" @click="btnCheck()">查询</el-button>
				</el-col>
			</el-row>
		
			<el-row>
				<el-col :span="12">
					 <el-tooltip class="item" effect="light" content="新增" placement="top-end">
						<el-button size="small" v-show="btnAddcu" type="success" @click="add"><i class="el-icon-plus"></i>
						</el-button>
   					 </el-tooltip>
					<el-tooltip class="item" effect="light" content="删除" placement="top-end">
						<el-button size="small"  v-show="btnDelete" type="danger" @click="del()"><i class="el-icon-delete"></i>
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
				<el-table-column prop="floginName" width="100" label="登录名称">
				</el-table-column>
				<el-table-column prop="fname" width="120" label="用户名称">
				</el-table-column>
				<el-table-column class-name="status-col" prop="fstate" label="状态" >
					 <template scope="scope">
			          <el-tag :type="scope.row.fstate | statusFilter">{{scope.row.fstate == 0 ? "启用" : "禁用"}}</el-tag>
			        </template>
				</el-table-column>
				<el-table-column prop="fuserId" width="150" label="创建者">
				</el-table-column>
				<el-table-column prop="ftime"  label="创建时间" >
				</el-table-column>
				<el-table-column label="操作" >
					<template scope="scope">
						<el-tooltip class="item" effect="light" content="详情" placement="top-end">
							<el-button size="small"  v-show="btnDetail" :fids="this.currentRow" @click="handleDetail(scope.row)"><i class="iconfont icon-xiangqing1"></i></el-button>
						</el-tooltip>
						<el-tooltip class="item" effect="light" content="修改" placement="top-end">
							<el-button size="small"  v-show="btnModify" type="info" @click="modify(scope.$index, scope.row)"><i class="iconfont icon-xiugai"></i></el-button>
   					 	</el-tooltip>
						<el-tooltip class="item" effect="light" content="选择角色" placement="top-end">
							<el-button size="small"  v-show="btnUser" type="warning" @click="chooseUser(scope.$index, scope.row)"><i class="iconfont icon-setting-role"></i></el-button>
						</el-tooltip>
						<el-tooltip class="item" effect="light" content="选择用户" placement="top-end">
							<el-button size="small"  v-show="btnPeople" type="warning" @click="choosePeople(scope.$index, scope.row)"><i class="iconfont icon-user"></i></el-button>
						</el-tooltip>
						<el-tooltip class="item" effect="light" content="选择组织机构" placement="top-end">
							<el-button size="small"  v-show="btnTeam" type="warning" @click="chooseTeam(scope.$index, scope.row)"><i class="iconfont icon-zuzhijigouerji"></i></el-button>
						</el-tooltip>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="tableData.pagination.pageNo" :page-sizes="[5, 10, 20]" :page-size="tableData.pagination.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="tableData.pagination.total">
			</el-pagination>
			<!--增加、修改-->
			<el-dialog custom-class="dialog_content" title="保存" top="5%" v-model="dialogFormVisible" :visible.sync="dialogFormVisible" >
				<addCustomer ref="form"></addCustomer>
				<span slot="footer" class="dialog-footer">
            <el-button @click="cancel()">取 消</el-button>
            <el-button type="primary" @click="save()">保存</el-button>
          </span>
			</el-dialog>
			<!--选择角色-->
			<el-dialog custom-class="dialog_content1" title="选择角色" top="5%" :visible.sync="dialogFormVisible2" >
				<choosePlay ref="form" :fids="fids"></choosePlay>
				<span slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible2 = false">取 消</el-button>
            <el-button type="primary" @click="saveUser()">保存</el-button>
          </span>
			</el-dialog>
				<!--选择组织机构-->
			<el-dialog custom-class="dialog_content" title="选择组织机构" top="5%" :visible.sync="dialogFormVisible3" >
				<addTeam ref="form1" :fids1="fids1"></addTeam>
				<span slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible3 = false">取 消</el-button>
            <el-button type="primary" @click="saveTeam()">保存</el-button>
          </span>
			</el-dialog>
				<!--选择用户-->
			<el-dialog custom-class="dialog_content1" title="选择用户" top="5%" :visible.sync="dialogFormVisible4" >
				<addPeople ref="form2" :fids2="fids2"></addPeople>
				<span slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible4 = false">取 消</el-button>
            <el-button type="primary" @click="savePeople()">保存</el-button>
          </span>
			</el-dialog>
		</div>
	</imp-panel>
</template>
<script>
	import Vue from "vue";
	import panel from "../../components/panel.vue"
	import * as api from "../../api"
	import auth from '../../auth';
	import addCustomer from "../../components/addCustomer"
	import choosePlay from "../../components/choosePlay"
	import addPeople from "../../components/addPeople"
	import addTeam from "../../components/addTeam"
	import Element from "element-ui";
	import detail from "../../components/detail/detail.vue";
	export default {
		components: {
			'imp-panel': panel,
			"detail": detail,
			addCustomer,
			choosePlay,
			addTeam,
			addPeople
		},
		data() {
			return {
				fcodeD:[],
				btnAddcu:false,
				btnDelete:false,
				btnDetail:false,
				btnModify:false,
				btnUser:false,
				btnPeople:false,
				btnTeam:false,
				soptions: [{ //状态
					svalue: '',
					slabel: "请选择"
				},{ //状态
					svalue: '0',
					slabel: "启用"
				}, {
					svalue: '1',
					slabel: "禁用"
				}],
				svalue: '',
				isShow: true,
				pickerOptions0: {
					disabledDate(time) {
						//          return time.getTime() < Date.now() - 8.64e7;
					},
				},
				pickerOptions1: {},
				pvalue1: '',
				pvalue2: '',
				fids:[],
				fids1:[],
				fids2:[],
				currentRow: [],
				dialogFormVisible: false,
				dialogFormVisible2: false,
				dialogFormVisible3: false,
				dialogFormVisible4: false,
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
			choosePeople(index,row) { //选择用户
				this.fids2=row.fid;
				this.dialogFormVisible4 = true;
			},
			chooseTeam(index,row) { //选择权限
				this.fids1=row.fid;
				this.dialogFormVisible3 = true;
			},
			savePeople() {//保存用户
				let _this = this;
				  _this.$refs.form2.form.many = _this.$refs.form2.value4;
				this.savePeople1(auth.getServerUrl(),api.GET_DATA_CUSTOMER_SAVEPEOPLE,"dialogFormVisible4",_this.$refs.form2.form);
//				this.savePeople(auth.getServerUrl(),api.GET_DATA_CUSTOMER_SAVERES,obj)
			},
			saveTeam() {//保存选择组织机构
				let _this = this;
			this.$refs.form1.form.many=this.$refs.form1.$refs.tree3.getCheckedKeys();
				 this.savePeople1(auth.getServerUrl(),api.GET_DATA_CUSTOMER_SAVERES,"dialogFormVisible3",this.$refs.form1.form)
			},
				handleDetail(row) {//详查看情
					var fids = row.fid;
					this.currentRow.push(fids)
					this.lookDetails(fids)
			},
			
			add() {//新增
				let _this = this;
				_this.dialogFormVisible = true;
				if(_this.$refs.form==undefined){
					
				}else{
							_this.$refs.form.form.fid = "";
							_this.$refs.form.form.fname = "";
							_this.$refs.form.form.floginName = "";
							_this.$refs.form.form.fseq ="";
							_this.$refs.form.form.ftime ="";
							_this.$refs.form.form.fpassword = "";
							_this.$refs.form.form.fdesc = "";
							_this.$refs.form.form.fstate = "";
							_this.$refs.form.form.fuserId = "";
							_this.$refs.form.form.fsex = "";
							_this.$refs.form.form.fbirthday = "";
							_this.$refs.form.form.fmobile = "";
				}
				
			},
			cancel() {//取消
				let _this = this;
				_this.dialogFormVisible = false;
				_this.$refs.form.$refs.form.resetFields();
			},
			modify(index, row) {//修改
				let _this = this;
				_this.dialogFormVisible = true;
				this.loading();
				this.$http.get(auth.getServerUrl()+api.GET_DATA_CUSTOMER_GET + "/" + row.fid)
					.then(res => {
						 this.loadClose();
						if(res.data.success == true) {
							var d = res.data.data;
							_this.$refs.form.form.fid = d.fid;
							_this.$refs.form.form.fname = d.fname;
							_this.$refs.form.form.floginName = d.floginName;
							_this.$refs.form.form.fseq = d.fseq;
							_this.$refs.form.form.fsex = d.fsex;
							_this.$refs.form.form.fbirthday = d.fbirthday;
							_this.$refs.form.form.fdesc = d.fdesc;
							_this.$refs.form.form.fstate = d.fstate;
							_this.$refs.form.form.femail = d.femail;
							_this.$refs.form.form.faddress = d.faddress;
							_this.$refs.form.form.ftime = d.ftime;
							_this.$refs.form.form.fhomePhone = d.fhomePhone;
							_this.$refs.form.form.fmobile = d.fmobile;
							
						} else {
								_this.dialogFormVisible = false;
						}

					})
			},
			save() {//保存
				let _this = this;
				_this.forms = _this.$refs.form.form;
				this.saveRevise(auth.getServerUrl(),api.GET_DATA_CUSTOMER_SAVE,_this.forms )

			},
			saveUser() {//保存角色
				let _this = this;
				  _this.$refs.form.form.many = _this.$refs.form.value3;
				
				this.savePeople1(auth.getServerUrl(),api.GET_DATA_CUSTOMER_SAVEUSER,"dialogFormVisible2",_this.$refs.form.form);
			},
			
			del() { //删除
				let fids = this.currentRow.join(',');
				this.deletes(auth.getServerUrl(),api.GET_DATA_CUSTOMER_DEL,fids)
			},
			chooseUser(index,row) { //选择用户
				this.fids=row.fid;
				this.dialogFormVisible2 = true;
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
				this.pvalue1 = this.pvalue1.valueOf()
				this.pvalue2 = this.pvalue2.valueOf()
				this.loadData(this.searchKey,  this.meFormat(this.pvalue1), this.meFormat(this.pvalue2),this.svalue)
			},
			btnCheck() { //搜索
				this.pvalue1 = this.pvalue1.valueOf()
				this.pvalue2 = this.pvalue2.valueOf()
				this.loadData(this.searchKey,  this.meFormat(this.pvalue1), this.meFormat(this.pvalue2),this.svalue)
			},
			loadData(str, timeStar, timeEnd,fstate) {
				this.listLoading = true;
				str = (str == undefined) ? "" : str;
				fstate = (fstate == undefined) ? "" : fstate;
				timeStar = (timeStar == "NaN-aN-aN" || timeStar == undefined) ? "" : timeStar;
				timeEnd = (timeEnd == "NaN-aN-aN" || timeEnd == undefined) ? "" : timeEnd;
				this.loadTable(api.GET_DATA_CUSTOMER_SEARCH,+ "floginName=" + str + "&fstate=" + fstate+"&endTime=" + timeEnd+"&ftime=" + timeStar);
			}
		},
		created() {
			this.loadData();
			let userFids=window.localStorage.getItem("userFids");
			this.handRoleBtn(auth.getServerUrl(),api.DICT_SMPALL_BTN,"/customer/customerlist",userFids,this.fcodeD);
		}
	}
</script>
<style>
	.el-pagination {
		float: right;
		margin-top: 15px;
	}
</style>