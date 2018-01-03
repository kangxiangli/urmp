<template>
	<imp-panel>

		<el-row slot="body" style="margin-bottom: 20px;" :gutter="24">
			<el-col :span="8" :xs="24" :sm="24" :md="12" :lg="8" style="margin-bottom: 20px;">
				<el-input placeholder="输入关键字进行过滤" v-model="filterText">
				</el-input>
				<el-tree :data="treeData" lazy :props="defaultProps" node-key="id" :highlight-current="true" :expand-on-click-node="true" :render-content="renderContent" :filter-node-method="filterNode" :load="loadNode" ref="tree2"  @node-expand="getNode">
				</el-tree>
			</el-col>
			<el-col :span="16" :xs="12" :sm="16" :md="16" :lg="16">
				<el-card class="box-card">
					<div class="text item">
						<h3 class="box-title" slot="header" style="width: 100%;">
				      <el-row style="width: 100%;">
				        <el-col :span="24">
				          <div class="el-input" style="width: 200px; float: right;">
				            <i class="el-input__icon el-icon-search" @click="search($event)"></i>
				            <input type="text" placeholder="名称" v-model="searchKey" @keyup.enter="search($event)" class="el-input__inner">
				          </div>
				        </el-col>
				      </el-row>
				    </h3>
						<div slot="body">
							<el-table :stripe="true" :data="tableData.rows" border ref="multipleTable" style="width: 100%" v-loading="listLoading" @selection-change="handleSelectionChange">
								<el-table-column prop="fcode" label="编码">
								</el-table-column>
								<el-table-column prop="fname" label="名称">
								</el-table-column>
								<el-table-column prop="furl" label="网址" >
								</el-table-column>
								<el-table-column prop="fparentId" label="父节点">
								</el-table-column>
							</el-table>
							<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="tableData.pagination.pageNo" :page-sizes="[5, 10, 20]" :page-size="tableData.pagination.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="tableData.pagination.total">
							</el-pagination>
							<!--增加、修改-->
							<el-dialog custom-class="dialog_content1" title="保存" v-model="dialogFormVisible" :visible.sync="dialogFormVisible" >
								<addApply ref="form" :parentId="parentId"></addApply>
								<span slot="footer" class="dialog-footer">
				            <el-button @click="cancel()">取 消</el-button>
				            <el-button type="primary" @click="save()">保存</el-button>
				          </span>
							</el-dialog>
						</div>
					</div>
				</el-card>
			</el-col>
		</el-row>
	</imp-panel>
</template>
<script>
	import Vue from "vue";
	import panel from "../../components/panel.vue";
	import Element from "element-ui";
	import addApply from "../../components/addApply";
	import merge from "element-ui/src/utils/merge";
	import * as api from "../../api";
	import auth from "../../auth";
	export default {
		components: {
			"imp-panel": panel,
			"addApply": addApply
		},
		data() {
			return {
				fcodeD:[],
				sysAdd2: false,
				sysModify2: false,
				sysDel2: false,
				data1:[],
				filterText: "",
				treeData: [],
				defaultProps: {
					children: "children",
					label: "label"
				},
				forms: {},
				store: "",
				value: "",
				parentId: "",
				currentRow: [],
				dialogFormVisible: false,
				dialogLoading: false,
				roleTree: [],
				listLoading: false,
				searchKey: "",
				tableData: {
					pagination: {
						total: 0,
						pageNo: 1,
						pageSize: 10,
						parentId: 0
					},
					rows: []
				}
			};
		},
		watch: {
			filterText(val) {
				this.$refs.tree2.filter(val);
			}
		},
//		i18n,
		methods: {
			handParent(getUrl, url) {//父节点
				this.$http.get(getUrl + url)
					.then(res => {
						if(res.data.success = true) {
							var ary = res.data.data;
							for(let i = 0; i < ary.length; i++) {
								let obj = {
									fvalue: "",
									fcode: ""
								};
								obj.value = ary[i].fid;
								obj.label = ary[i].fname;
								 this.$refs.form.toptions.push(obj);
							}
							//				this.$refs.form.fparentIds = opt;
						} else {
							Element.MessageBox({
								type: "error",
								message: res.data.msg,
								title: "温馨提示"
							});
						}
					}).catch((error) => {
						console.log(error)
					});
			},
			cancel() {//取消
				let _this = this;
				_this.dialogFormVisible = false;
				_this.$refs.form.$refs.form.resetFields();
			},
			save() {//保存
				let _this = this;
				_this.forms = _this.$refs.form.form;
				this.$refs.form.$refs.form.validate((valid) => {
				if(!valid) {
					Element.MessageBox({
						type: "error",
						message: "请正确填写信息",
						title: "温馨提示"
					});
				} else {
					this.loading();
					this.$http.post(auth.getServerUrl()+api.GET_DATA_APPLY_SAVE, _this.forms)
						.then(res => {
							this.loadClose();
							if(res.data.success) {
								this.dialogFormVisible = false; //关闭弹出层
								this.$message(res.data.msg);
								if(this.parentId==""){
									this.loadNode1(window.nodes,window.resolves);
								}else{
									this.loadNode(window.nodes,window.resolves);
								}
								
							} else {
								this.dialogFormVisible = true;
							}
						})
				}
			});
			},
			search(target) {
				this.loadData(this.searchKey);
			},
			filterNode(value, data) {
				if(!value) return true;
				return data.label.indexOf(value) !== -1;
			},
			handleSelectionChange() {},
			handleSizeChange(val) {
				this.tableData.pagination.pageSize = val;
				this.loadData(this.searchKey);
			},
			handleCurrentChange(val) {
				this.tableData.pagination.pageNo = val;
				this.loadData(this.searchKey);
			},
			loadNode(node, resolve) {//TREE
				window.nodes = node;
				window.resolves=resolve;
				let ids = (node == undefined||node.data == undefined ||node.data.length==0)? "" : (node.data.id==undefined)?"":node.data.id;
				this.parentId = ids;  
				this.$http.get(auth.getServerUrl() + api.GET_DATA_APPLY_TREE + "?fparentId=" + ids)
					.then(res => {
							if(res.data.success == true){
								var d = res.data.data;
//								 this.treeData=[];
									 this.data1=[];
								for(let i = 0; i < d.length; i++) {
									let obj = {
										id: "",
										label: "",
										children: []
									};
									obj.id = d[i].fid;
									obj.label = d[i].fname;
									this.data1.push(obj);
//									 this.treeData.push(obj)
								}
							}else{
								Element.MessageBox({
								type: "error",
								message: res.data.msg,
								title: "温馨提醒"
							});
							}
						return resolve(this.data1);
					});
			},
			loadNode1(node, resolve) {//TREE
				let ids = "";
				this.parentId = ids;  
				this.$http.get(auth.getServerUrl() + api.GET_DATA_APPLY_TREE + "?fparentId=" + ids)
					.then(res => {
							if(res.data.success == true){
								var d = res.data.data;
								 this.data1=[];
								for(let i = 0; i < d.length; i++) {
									let obj = {
										id: "",
										label: "",
										children: []
									};
									obj.id = d[i].fid;
									obj.label = d[i].fname;
									 this.data1.push(obj)
								}
							}else{
								Element.MessageBox({
								type: "error",
								message: res.data.msg,
								title: "温馨提醒"
							});
							}
						return resolve(this.data1);
					});
				
			

			},
			append(store, data) {//新增
				let _this = this;
				_this.dialogFormVisible = true;
				if(_this.$refs.form==undefined){
					
				}else{
				_this.$refs.form.form.fid = "";
				_this.$refs.form.form.fcode = "";
				_this.$refs.form.form.fname = "";
				_this.$refs.form.form.furl = "";
				_this.$refs.form.form.fdesc = "";
				_this.$refs.form.form.fseq = "";
				_this.$refs.form.form.fstatus = "";
				
				}
				this.handParent(auth.getServerUrl(), api.GET_DATA_APPLY_PARENT);//加载父节点

			},
			modify(store, data) {//修改
				this.dialogFormVisible = true;
					this.loading();
				let _this = this;
				this.handParent(auth.getServerUrl(), api.GET_DATA_APPLY_PARENT);//加載父節點
				this.$http.get(auth.getServerUrl() + api.GET_DATA_APPLY_GET + "?fid=" + data.id)
					.then(res => {
						if(res.data.success === true) {
					this.loadClose();
							var d = res.data.data;
							_this.$refs.form.form.fid = d.fid;
							_this.$refs.form.form.fcode = d.fcode;
							_this.$refs.form.form.fparentId = d.fparentId;
							_this.$refs.form.form.fname = d.fname;
							_this.$refs.form.form.fstatus = d.fstatus;
							_this.$refs.form.form.fseq = d.fseq;
							_this.$refs.form.form.furl = d.furl;
							_this.$refs.form.form.fdesc = d.fdesc;
							
						} else {
							this.loadClose();
							Element.MessageBox({
								type: "error",
								message: res.data.msg,
								title: "温馨提醒"
							});
						}
					})
					.catch((err) => {
						console.log(err);
						
					});
			},
			remove(store, data) {//删除

				this.$confirm("是否删除", "提示", {
					confirmButtonText: "确定",
					cancelButtonText:"取消",
					type: "warning"
				}).then(() => {
					this.$http
						.get(auth.getServerUrl() + api.GET_DATA_APPLY_DEL + "?id=" + data.id)
						.then(res => {
							if(res.data.success === true) {
								this.$message({
									type: "success",
									message: res.data.msg
								});
								store.remove(data);
							} else {
								Element.MessageBox({
									type: "error",
									message: res.data.msg,
									title: "温馨提醒"
								});
							}
						})
						.catch((err) => {
							console.log(err);
						});
				});
			},
			renderContent(h, {//渲染tree
				node,
				data,
				store
			}) {
				return(
					<span>
	          <span>
	            <span> {node.label} </span>
	          </span>
	          <span style="float: right; margin-right: 20px;position: relative;z-index: 999;">
	            <el-tooltip class="item" effect="light" content="新增" placement="top-end">
	           		<el-button size="mini" v-show={this.sysAdd2} on-click={() => this.append(store, data)} type="success"><i class="iconfont el-icon-plus"></i></el-button>
				</el-tooltip>
				<el-tooltip class="item" effect="light" content="修改" placement="top-end">
					<el-button size="mini" v-show={this.sysModify2} on-click={() => this.modify(store, data)} type="warning"><i class="iconfont el-icon-edit"></i> </el-button>
				</el-tooltip>
				<el-tooltip class="item" effect="light" content="删除" placement="top-end">
			   		<el-button size="mini" v-show={this.sysDel2} on-click={() => this.remove(store, data)} type="danger"><i class="iconfont el-icon-delete"></i></el-button>
			 	</el-tooltip> 
	          </span></span>
				)
			},

			handleNodeClick(data) {
				// this.loadTreeData(data.id);
			},
			getNode(node) {//点击加载节点数据
				
				this.parentId = node.id;
				let str = "";
				this.loadData(str);
			},
			loadData(str) {//菜单对应的列表
				//初始化表格
				this.listLoading = true;
				str = str == undefined ? "" : str;
				this.loadTable(api.GET_DATA_APPLY_SEARCH,"fparentId=" +  this.parentId + "&fname=" + str);
			}
		},
		created() {
			let userFids=window.localStorage.getItem("userFids");
			 this.handRoleBtn(auth.getServerUrl(),api.DICT_SMPALL_BTN,"/apply/applylist",userFids,this.fcodeD);
//			 console.log(this.fcodeD)
		}
	};
</script>

<style>
	.clearfix:before,
	.clearfix:after {
		display: table;
		content: "";
	}
	
	.clearfix:after {
		clear: both;
	}
</style>