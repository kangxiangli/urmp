

<template>
	<imp-panel>
				<el-input placeholder="输入关键字进行过滤" v-model="filterText">
				</el-input>
				<el-tree :data="treeData" :check-strictly="true" @check-change="handleCheckChange"  show-checkbox="" default-expand-all="" node-key="id" ref="tree9" highlight-current :props="defaultProps">
				</el-tree>
	</imp-panel>
</template>
<script>
	import Vue from "vue";
	import Element from "element-ui";
	import addApply from "./addApply";
	import merge from "element-ui/src/utils/merge";
	import panel from "./panel.vue"
	import * as api from "../api"
	import auth from "../auth";
	export default {
		components: {
			"imp-panel": panel,
			"addApply": addApply
		},
			props: {
			fids1: {
				type: String
			},
		},
		data() {
			return {
				
				filterText: "",
				treeData: [],
				defaultProps: {
					id:"id",
					children: "children",
					label: "label"
				},
				allData:[],
				selData:[],
				form: {
					resId:"",
					roleId:""
				},
				store: "",
				value: "",
				parentId: "",
				currentRow: [],
			
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
			fids1(){
				this.loadNode();
			},
			filterText(val) {
				this.$refs.tree9.filter(val);
			}
		},
		methods: {
			 handleCheckChange(data, checked, indeterminate) {
//     		 console.log(data, checked, indeterminate);
     		 },
			getSelNode(){
				//获取选中节点
				 this.form.resId=this.$refs.tree9.getCheckedKeys(false);
			},
			
			filterNode(value, data) {
				if(!value) return true;
				return data.label.indexOf(value) !== -1;
			},
			getChild(data){
				/**@augments 子节点 */
				let _this=this;
				let res=this.allData;
				let arr=[];
				for(let i=0;i<_this.allData.length;i++){
					if(res[i].fparentId==data){
						let obj = {}
						obj.id =res[i].fid;
						obj.label =res[i].fname;
						obj.children=this.getChild(obj.id);
						arr.push(obj);
						
					}
				}
				return arr;
			},
			loadNode() {//TREE
				this.parentId = "";  
				let _this=this;
				this.form.roleId=this.fids1;
				this.$http.get(auth.getServerUrl() + api.GET_DATA_CHARACTER_PORWER + "?roleId=" + this.fids1)
					.then(res => {
							if(res.data.success == true){
								 var _this=this;
								var d = JSON.parse(res.data.data).all;
								_this.allData=d;
								_this.selData=JSON.parse(res.data.data).sel;
								_this.treeData=[];
								for(let i = 0; i < d.length; i++) {
									if(d[i].fparentId==""){
										let obj = {
											id:"",
											label:""
										};
										obj.id = d[i].fid;
										obj.label = d[i].fname;
										obj.children=_this.getChild(d[i].fid);
										_this.treeData.push(obj);
									}
								}
//							 window.setTimeout(function(){
//								 	_this.setCheckedKeys();
//								 },0);
								 _this.$nextTick(() =>{
								    _this.setCheckedKeys();
								})
																
							}else{
								Element.MessageBox({
								type: "error",
								message: res.data.msg,
								title: "温馨提醒"
							});
							}
							
					});
			},
			 setCheckedKeys() {
				 let selRes=[];
				
				 let len=this.selData.length;
				 for(let i=0;i<len;i++){
					selRes.push(this.selData[i].fid);
				 }
        		this.$refs.tree9.setCheckedKeys(selRes);
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
	          </span>
				)
			},

		},
		created() {
			this.loadNode();
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