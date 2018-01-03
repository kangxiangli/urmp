<template>
	<imp-panel>
		<el-row slot="body" style="margin-bottom: 20px;" :gutter="24">
			<el-col :span="8" :xs="24" :sm="24" :md="12" :lg="8" style="margin-bottom: 20px;">
				<el-input placeholder="输入关键字进行过滤" v-model="filterText">
				</el-input>
				<el-tree :data="treeData" :auto-expand-parent="true" :props="defaultProps" node-key="id" :highlight-current="true" :expand-on-click-node="true" :render-content="renderContent" :filter-node-method="filterNode" :load="loadNode" ref="tree2" lazy @node-click="getNode">
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
								<el-table-column prop="fname" label="资源名称">
								</el-table-column>
								<el-table-column prop="ficon" label="资源路径">
								</el-table-column>
								<el-table-column class-name="status-col" prop="fstate" label="状态" >
									 <template scope="scope">
							          <el-tag :type="scope.row.fstate | statusFilter">{{scope.row.fstate == 0 ? "启用" : "禁用"}}</el-tag>
							        </template>
								</el-table-column>
								<el-table-column prop="fcode" label="编码">
								</el-table-column>
							</el-table>
							<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="tableData.pagination.pageNo" :page-sizes="[5, 10, 20]" :page-size="tableData.pagination.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="tableData.pagination.total">
							</el-pagination>
							<el-dialog title="新增/修改资源" v-model="dialogVisible" size="small">
								<add-Res ref="form"></add-Res><span slot="footer" class="dialog-footer">
				          <el-button @click="dialogVisible = false">取消</el-button>
				          <el-button type="primary" @click="save">保存</el-button>
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
	import addResource from "../../components/addResource";
	import merge from "element-ui/src/utils/merge";
	import * as api from "../../api";
	import auth from "../../auth";

	export default {
		components: {
			"imp-panel": panel,
			"add-Res": addResource
		},
		data() {
			return {
				fcodeD:[],
				sysAdd1: false,
				sysModify1: false,
				sysDel1: false,
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
				dialogVisible: false,
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
			save() {
				var _this = this;
				_this.forms = _this.$refs.form.form;
				
				this.loading();
				this.$http
					.post(auth.getServerUrl() + api.RES_SAVE, _this.forms)
					.then(res => {
						this.loadClose();
						if(res.data.success == true) {
							this.loadData();
							this.$message(res.data.msg);
							this.dialogVisible = false; //关闭弹出层
						} else {
							this.dialogVisible = false; //关闭弹出层
							Element.MessageBox({
								type: "error",
								message: res.data.msg,
								title: "温馨提醒"
							});
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
				let id = node.data.length == 0 ? "" : node.data.id;
				this.parentId = id;
				this.$http
					.get(auth.getServerUrl() + api.RES_TREE_LIST_GET + "?fparentId=" + id)
					.then(res => {
						var d = res.data.data;
						var data1 = [];
						
						for(let i = 0; i < d.length; i++) {
							let obj = {
								id: "",
								label: "",
								children: []
							};
							obj.id = d[i].fid;
							obj.label = d[i].fname;
							data1.push(obj);
						}
						return resolve(data1);
					});
			},
			append(store, data) {
				this.dialogVisible = true;
				
				let _this = this;
				_this.$refs.form.form.fid = "";
				_this.$refs.form.form.fcode = "";
				// _this.$refs.form.form.fparentId=d.fparentId;
				_this.$refs.form.form.fvalue = "";
				_this.$refs.form.form.fstate = "";
				this.$http.get(this.getServerUrl() + api.RES_SEL_GET )
				.then(res => {
					if(res.data.success === true) {
					
						var d = res.data;
						_this.$refs.form.form.fparentId = data.id;
						let arr = [];
						
						for(let i = 0; i < d.data.length; i++) {
							let arrC = {
								value: "",
								label: ""
							};
							
							arrC.value = d.data[i].fid;
							arrC.label = d.data[i].fname;
							arr.push(arrC);
						}

						_this.$refs.form.fparentIds = arr;
					} else {
						Element.MessageBox({
							type: "error",
							message: res.data.msg,
							title:"温馨提醒"
						});
					}
				})
				.catch((err) => {
					console.log(err);
				});
			},
			modify(store, data) {
				this.dialogVisible = true;
				let _this = this;
			
				this.$http.get(this.getServerUrl() + api.RES_SEL_GET )
				.then(res => {
					if(res.data.success === true) {
					
						var d = res.data;
						
						let arr = [];
						
						for(let i = 0; i < d.data.length; i++) {
							let arrC = {
								value: "",
								label: ""
							};
							
							arrC.value = d.data[i].fid;
							arrC.label = d.data[i].fname;
							arr.push(arrC);
						}

						_this.$refs.form.fparentIds = arr;
					} else {
						Element.MessageBox({
							type: "error",
							message: res.data.msg,
							title:"温馨提醒"
						});
					}
				})
				.catch((err) => {
					console.log(err);
				});
				// this.getSelectData(api.GET_DATA_PARAMETER_SEARCH,"fvalue=" + str + "&fstate=" + status);
				this.$http
					.get(
						auth.getServerUrl() + api.RES_NODE_GET + "/" + data.id
					)
					.then(res => {
						if(res.data.success === true) {
							
							var d = res.data.data;
							_this.$refs.form.form.fid = d.fid;
							_this.$refs.form.form.fcode = d.fcode;
							_this.$refs.form.form.fparentId = d.fparentId;
							_this.$refs.form.form.fname = d.fname;
							_this.$refs.form.form.fstate = d.fstate;
							_this.$refs.form.form.ficon = d.ficon;
							_this.$refs.form.form.furl = d.furl;
							_this.$refs.form.form.ftype=parseInt(d.ftype);
						} else {
							Element.MessageBox({
								type: "error",
								message: res.data.msg,
								title:"温馨提醒"
							});
						}
					})
					.catch((err) => {
						console.log(err);
					});
			},
			remove(store, data) {
				this.$confirm("是否删除", "提示", {
					confirmButtonText: "确定",
					cancelButtonText: "取消",
					type: "warning"
				}).then(() => {
					this.$http
						.get(auth.getServerUrl() + api.RES_DEL + "?fid=" + data.id)
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
									title:"温馨提醒"
								});
							}
						})
						.catch((err) => {
							console.log(err);
						});
				});
			},

			renderContent(h, {
				node,
				data,
				store
			}) {
				return(
					<span>
	          <span>
	            <span> {node.label} </span>
	          </span>
			  <span style="float: right; margin-right: 20px; position: relative;z-index: 999;">
			  	<el-tooltip class="item" effect="light" content="新增" placement="top-end">
	           		<el-button size="mini" v-show={this.sysAdd1} on-click={() => this.append(store, data)} type="success"><i class="iconfont el-icon-plus"></i></el-button>
				</el-tooltip>
				<el-tooltip class="item" effect="light" content="修改" placement="top-end">
					<el-button size="mini" v-show={this.sysModify1} on-click={() => this.modify(store, data)} type="warning"><i class="iconfont el-icon-edit"></i> </el-button>
				</el-tooltip>
				<el-tooltip class="item" effect="light" content="删除" placement="top-end">
			   		<el-button size="mini" v-show={this.sysDel1} on-click={() => this.remove(store, data)} type="danger"><i class="iconfont el-icon-delete"></i></el-button>
			 	</el-tooltip> 
			  </span>
         </span>
				)
			},

			handleNodeClick(data) {
				// this.loadTreeData(data.id);
			},
			getNode(node) {
				this.parentId = node.id;
				let str = "";
				this.loadData(str);
			},
			loadData(str) {//菜单对应的列表
				//初始化表格
				this.listLoading = true;
				str = str == undefined ? "" : str;
				this.loadTable(api.RES_TABLE_LIST_GET,"fparentId=" + this.parentId + "&fname=" + str);
			}
		},
		created() {
			let userFids=window.localStorage.getItem("userFids");
			 this.handRoleBtn(auth.getServerUrl(),api.DICT_SMPALL_BTN,"/resource/resourcelist",userFids,this.fcodeD);
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