<template>
	<imp-panel>
		<el-row slot="body" style="margin-bottom: 20px;" :gutter="24">
			<el-col :span="8" :xs="24" :sm="24" :md="12" :lg="8" style="margin-bottom: 20px;">
				<el-input placeholder="输入检索字段" v-model="filterText">
				</el-input>
				<el-tree :data="treeData" :props="defaultProps" node-key="id" :highlight-current="true" :expand-on-click-node="false" :render-content="renderContent" :filter-node-method="filterNode" :load="loadNode" ref="tree2" lazy @node-click="getNode">
				</el-tree>
			</el-col>
			<el-col :span="16" :xs="12" :sm="16" :md="16" :lg="16">
				<el-card class="box-card">
					<div class="text item">
						<h3 class="box-title" slot="header" style="width: 100%;">
				      <el-row style="width: 100%;">
                        <el-col :span="12">
					<el-tooltip class="item" effect="light" content="启用" placement="top-end">
                    <el-button  size="small" v-show="dictEnable" type="success" @click="isEnable('0')"><i class="iconfont icon-qiyong"></i> 
                    </el-button>
                  </el-tooltip> 
                  <el-tooltip class="item" effect="light" content="停用" placement="top-end">
                    <el-button  size="small" v-show="dictDisenable" type="danger" @click="isEnable('1')"><i class="iconfont icon-tingyong"></i> 
                    </el-button>
                  </el-tooltip> 
       						 </el-col>
				        <el-col :span="12">
				          <div class="el-input" style="width: 200px; float: right;">
				            <i class="el-input__icon el-icon-search" @click="search($event)"></i>
				            <input type="text" placeholder="输入搜索" v-model="searchKey" @keyup.enter="search($event)" class="el-input__inner">
				          </div>
				        </el-col>
				      </el-row>
				    </h3>
					<div slot="body">
							<el-table :stripe="true" :data="tableData.rows" border ref="multipleTable" style="width: 100%" v-loading="listLoading" @selection-change="handleSelectionChange">
								<el-table-column prop="id" type="selection" width="45">
				            	</el-table-column>
				            	<el-table-column v-if="isShow" prop="fid" label="ID">
								</el-table-column>
                                <el-table-column prop="fcode" label="编码">
								</el-table-column>
                            	<el-table-column prop="fvalue" label="值">
								</el-table-column>
								<!--<el-table-column prop="fstate" label="状态" :formatter="stateFormat" >
								</el-table-column>-->
								<el-table-column class-name="status-col" prop="fstate" label="状态" :formatter="stateFormat">
									 <template scope="scope">
							          <el-tag :type="scope.row.fstate | statusFilter">{{scope.row.fstate == 0 ? "启用" : "禁用"}}</el-tag>
							        </template>
								</el-table-column>
                            
							</el-table>
							<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="tableData.pagination.pageNo" :page-sizes="[5, 10, 20]" :page-size="tableData.pagination.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="tableData.pagination.total">
							</el-pagination>
							<el-dialog title="新增/修改字典" v-model="dialogFormVisible" top="5%" size="small">
								<add-Dict ref="form"></add-Dict>
								<span slot="footer" class="dialog-footer">
									<el-button @click="dialogFormVisible = false">取 消</el-button>
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
//import selectTree from "../../components/selectTree.vue";
import addDict from "../../components/addDict";
//import treeter from "../../components/treeter";
import merge from "element-ui/src/utils/merge";
import * as api from "../../api";
import auth from "../../auth";

export default {
  components: {
    "imp-panel": panel,
    "add-Dict": addDict
  },
  data() {
    return {
     fcodeD:[],
     isShow:false,
	sysAdd3: false,
	sysModify3: false,
	sysDel3: false,
	dictEnable: false,
	dictDisenable: false,
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
  
  methods: {
    save() {
      var _this = this;
      _this.forms = _this.$refs.form.form;
	  this.saveRevise(auth.getServerUrl(), api.DICT_FORM_SAVE, _this.forms);
    },
    search(target) {
      this.loadData(this.searchKey);
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },

    handleSelectionChange(val) {
      //取消选择触发
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
    loadNode(node, resolve) {
      //TREE
      let id = node.data.length == 0 ? "" : node.data.id;
      this.parentId = id;
      this.$http
        .get(auth.getServerUrl() + api.DICT_TREE_GET + "?fparentId=" + id)
        .then(res => {
          var d = res.data.data;
          var data1 = [];

          for (let i = 0; i < d.length; i++) {
            let obj = {
              id: "",
              label: "",
              children: []
            };
            obj.id = d[i].fid;
            obj.label = d[i].fvalue;
            data1.push(obj);
          }
          return resolve(data1);
        });
    },
    append(store, data) {
      this.dialogFormVisible = true;
      let _this = this;
      _this.$refs.form.form.fid = "";
      _this.$refs.form.form.fcode = "";
      _this.$refs.form.form.fname = "";
      _this.$refs.form.form.fshortName = "";
      _this.$refs.form.form.fvalue = "";
      _this.$refs.form.form.fstate = "";
      _this.$refs.form.getSelectData(auth.getServerUrl() + api.DICT_FORM_SELECT_GET + "?fid=" + data.id);
    },
    modify(store, data) {
      this.dialogFormVisible = true;
      let _this = this;
      //获取select数据
      _this.$refs.form.getSelectData(auth.getServerUrl() + api.DICT_FORM_SELECT_GET + "?fid=" + data.id);
      //获取修改回显数据
      _this.$refs.form.get(auth.getServerUrl() + api.DICT_FORM_GET + "?fid=" + data.id);
    },
    isEnable(flag) {
      let fids = this.currentRow.join(",");
        let str = "";
      if (flag == "0") {
        str = "是否启用";
      } else {
        str = "是否禁用";
      }
      this.$confirm(str, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.loading();
        this.$http
          .get(
            auth.getServerUrl() +
              api.DICT_ISENABLE +
              "?orgIds=" +
              fids +
              "&flag=" +
              flag
          )
          .then(res => {
            this.loadClose();
            if (res.data.success === true) {
              this.$message({
                type: "success",
                message: res.data.msg
              });
              this.loadData();
            } else {
//            Element.MessageBox({
//              type: "error",
//              message: res.data.msg,
//              title: "温馨提示"
//            });
            }
          })
          .catch((error) => {
              console.log(error)
          });
      });
    },
    remove(store, data) {
      this.$confirm("是否删除","提示", {
        confirmButtonText: "确定",
        cancelButtonText:"取消",
        type: "warning"
      }).then(() => {
        this.loading();
        this.$http
          .get(auth.getServerUrl() + api.ORG_DEL + "?orgIds=" + data.id)
          .then(res => {
             this.loadClose();
            if (res.data.success === true) {
              this.$message({
                type: "success",
                message: res.data.msg
              });
              store.remove(data);
               this.loadData();
            } else {
              Element.MessageBox({
                type: "error",
                message: res.data.msg,
                 title: "温馨提示"
              });
            }
          })
          .catch((error) => {
      console.log(error)
          });
      });
    },

    renderContent(h, { node, data, store }) {
      return (
        <span>
          <span>
            <span> {node.label} </span>
          </span>
          <span style="float: right; margin-right: 20px">
            <el-tooltip class="item" effect="light" content="新增" placement="top-end">
	           		<el-button size="mini" v-show={this.sysAdd3} on-click={() => this.append(store, data)} type="success"><i class="iconfont el-icon-plus"></i></el-button>
				</el-tooltip>
				<el-tooltip class="item" effect="light" content="修改" placement="top-end">
					<el-button size="mini" v-show={this.sysModify3} on-click={() => this.modify(store, data)} type="warning"><i class="iconfont el-icon-edit"></i> </el-button>
				</el-tooltip>
				<el-tooltip class="item" effect="light" content="删除" placement="top-end">
			   		<el-button size="mini" v-show={this.sysDel3} on-click={() => this.remove(store, data)} type="danger"><i class="iconfont el-icon-delete"></i></el-button>
			 	</el-tooltip> 
          </span>
        </span>
      );
    },

    handleNodeClick(data) {
      // this.loadTreeData(data.id);
    },
    getNode(node) {
      this.parentId = node.id;
      let str = "";
      this.loadData(str);
    },
    loadData(str) {
      //菜单对应的列表及初始化表格
      this.listLoading = true;
      str = str == undefined ? "" : str;
      this.loadTable(api.DICT_TABLE_GET,"fparentId=" +  this.parentId + "&search=" + str);
      	
    }
  },
  created() {
  	let userFids=window.localStorage.getItem("userFids");
	this.handRoleBtn(auth.getServerUrl(),api.DICT_SMPALL_BTN,"/books/bookslist",userFids,this.fcodeD);
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