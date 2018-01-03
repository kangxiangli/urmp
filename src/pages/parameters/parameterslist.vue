
<template>
	<imp-panel>
		<div slot="header" style="width: 100%;">
			<el-row :gutter="24" style="width: 100%; margin-bottom: 10px;">
				<el-col :span="7">
					<!--状态-->
					<span>状态</span>
					<el-select style="width: 210px;" v-model="svalue" clearable filterable placeholder="请选择">
						<el-option v-for="item in soptions" :label="item.slabel" :value="item.svalue">
						</el-option>
					</el-select>

				</el-col>
				<!--编号和名称-->
				<el-col :span="7">
					<span>编号和值</span>
					<input style="width: 210px;" type="text" placeholder="请输入编号/值" v-model="searchKey" class="el-input__inner">

				</el-col>
				<!--搜索-->
				<el-col :span="3">
					<el-button type="info" icon="search" @click="btnCheck()">查询</el-button>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					 <el-tooltip class="item" effect="light" content="新增" placement="top-end">
						<el-button size="small" v-show="addPar" type="success" @click="add()"><i class="el-icon-plus"></i>
						</el-button>
   					 </el-tooltip>
					<el-tooltip class="item" effect="light" content="删除" placement="top-end">
						<el-button size="small" v-show="delPar" type="danger" @click="del()" v-loading.fullscreen.lock="fullscreenLoading"><i class="el-icon-delete"></i>
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
				<el-table-column prop="fcode"  label="编码">
				</el-table-column>
				<el-table-column prop="fvalue"  label="值">
				</el-table-column>
				<!--<el-table-column prop="fstate" label="状态" :formatter="stateFormat">
				</el-table-column>-->
				<el-table-column class-name="status-col" prop="fstate" label="状态" :formatter="stateFormat">
					<template scope="scope">
						<el-tag :type="scope.row.fstate | statusFilter">{{scope.row.fstate == 0 ? "启用" : "禁用"}}</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="fseq" label="顺序">
				</el-table-column>
				
				<el-table-column label="操作" >
					<template scope="scope">
						<el-tooltip class="item" effect="light" content="修改" placement="top-end">
							<el-button size="small" v-show="modifyPar" type="info" @click="modify(scope.$index, scope.row)"><i class="iconfont icon-xiugai"></i></el-button>
   					 	</el-tooltip>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="tableData.pagination.pageNo" :page-sizes="[5, 10, 20]" :page-size="tableData.pagination.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="tableData.pagination.total">
			</el-pagination>
			<!--增加、修改-->
			<el-dialog custom-class="dialog_content1" title="保存" v-model="dialogFormVisible" :visible.sync="dialogFormVisible" >
				<addParamer ref="form"></addParamer>
				<span slot="footer" class="dialog-footer">
            <el-button @click="cancel()">取 消</el-button>
            <el-button type="primary" @click="save()">保存</el-button>
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
import addParamer from "../../components/addParamer"
export default {
components: {
	'imp-panel': panel,
addParamer,
},
data() {
		return {
			fcodeD: [],
			modifyPar: false,
			addPar: false,
			delPar: false,
			soptions: [{ //状态
					svalue: '',
					slabel: "请输入"
				},
				{ //状态
					svalue: '0',
					slabel: "启用"
				}, {
					svalue: '1',
					slabel: "禁用"
				}
			],
			svalue: "",
			isShow: true,
			fids: [],
			currentRow: [],
			dialogFormVisible: false,
			dialogFormVisible2: false,
			fullscreenLoading: false,
			listLoading: false,
			searchKey:"",
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

  methods: {
    add() {
      let _this = this;
      _this.dialogFormVisible = true;
      if (_this.$refs.form == undefined) {
      } else {
        _this.$refs.form.form.fid = "";
        _this.$refs.form.form.fcode = "";
        _this.$refs.form.form.fvalue = "";
        _this.$refs.form.form.fseq = "";
        _this.$refs.form.form.fstate = "";
      }
    },
    cancel() {
      let _this = this;
      _this.dialogFormVisible = false;
      _this.$refs.form.$refs.form.resetFields();
    },
    modify(index, row) {
      //修改
      let _this = this;
      _this.dialogFormVisible = true;
      this.loading();
      this.$http
        .get(this.getServerUrl() + api.GET_DATA_PARAMETER_GET + "?fid=" + row.fid)
        .then(res => {
          this.loadClose();
          if (res.data.success == true) {
            var d = res.data.data;
            _this.$refs.form.form.fid = d.fid;
            _this.$refs.form.form.fcode = d.fcode;
            _this.$refs.form.form.fvalue = d.fvalue;
            _this.$refs.form.form.fseq = d.fseq;
            _this.$refs.form.form.fstate = d.fstate;
          } else {
            _this.dialogFormVisible = false;
          }
        });
    },
    save() {
      //保存
      let _this = this;
      _this.forms = _this.$refs.form.form;
      this.saveForm(api.GET_DATA_PARAMETER_SAVE, _this.forms);
    },

    del() {
      //删除
      let fids = this.currentRow.join(",");
      this.delete(api.GET_DATA_PARAMETER_DEL, fids);
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
    btnCheck() {
      //搜索
      this.loadData(this.searchKey, this.svalue);
    },
    loadData(str, timeStar, timeEnd, fstate) {
      str = str == undefined ? "" : str;
      fstate = fstate == undefined ? "" : fstate;
      this.loadTable(api.GET_DATA_PARAMETER_SEARCH,"fvalue=" + str + "&fstate=" + fstate);
    }
  },
  created() {
    this.loadData();
    let userFids=window.localStorage.getItem("userFids");
	this.handRoleBtn(auth.getServerUrl(),api.DICT_SMPALL_BTN,"/parameters/parameterslist",userFids,this.fcodeD);
  }
};

</script>
<style>
.el-pagination {
  float: right;
  margin-top: 15px;
}
</style>