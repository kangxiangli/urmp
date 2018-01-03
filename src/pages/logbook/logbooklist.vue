
<template>
	<imp-panel>
		<div slot="header" style="width: 100%;">
			<el-row :gutter="24" style="width: 100%; margin-bottom: 10px;">
				<el-col :span="7">
					<!--操作类型-->
					<span>操作类型</span>
					<el-select style="width: 210px;" v-model="svalue" clearable filterable placeholder="请选择">
						<el-option v-for="item in soptions" :label="item.label" :value="item.value">
						</el-option>
					</el-select>

				</el-col>
				<!--编号和名称-->
				<el-col :span="7">
					<span>应用</span>
					<input style="width: 210px;" type="text" placeholder="所属模块/描述/用户名称" v-model="searchKey" class="el-input__inner">

				</el-col>
				
			</el-row>
	<el-row :gutter="24" style="margin-bottom:10px;">
				<!--开始时间-->
				<el-col :span="7">
					<div class="block">
						<span class="demonstration">开始时间</span>
						<el-date-picker style="width: 210px;" format="yyyy-MM-dd" v-model="pvalue1" type="date" placeholder="选择日期" :picker-options="pickerOptions0">
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
		</div>
		<div slot="body">
			<el-table :stripe="true" :data="tableData.rows" border ref="multipleTable" style="width: 100%" v-loading="listLoading" @selection-change="handleSelectionChange">
				<el-table-column prop="id" type="selection" width="45">
				</el-table-column>
				<el-table-column prop="fid" v-if="false" label="ID">
				</el-table-column>
				<el-table-column prop="ftype"  label="操作类型">
				</el-table-column>
				<el-table-column prop="fmodule"  label="所属模块">
				</el-table-column>
				<!--<el-table-column prop="fstate" label="状态" :formatter="stateFormat">
				</el-table-column>-->
					<el-table-column class-name="status-col" prop="ftype" label="状态" :formatter="stateFormat">
					<template scope="scope">
						<el-tag :type="scope.row.ftype | statusFilter">{{scope.row.ftype == 0 ? "正常" : "异常"}}</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="foperator"  label="操作人">
				</el-table-column>
				<el-table-column prop="fip"  label="ip地址">
				</el-table-column>
				<el-table-column prop="ftime"  label="时间">
				</el-table-column>
				<el-table-column prop="fdesc"  label="描述">
				</el-table-column>
				<!--<el-table-column label="操作" >
					<template scope="scope">
							<el-button size="small" :fids="this.currentRow" @click="handleDetail(scope.row)">查看详情</el-button>
					</template>
				</el-table-column>-->
			</el-table>
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="tableData.pagination.pageNo" :page-sizes="[5, 10, 20]" :page-size="tableData.pagination.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="tableData.pagination.total">
			</el-pagination>
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
					pickerOptions0: {
					disabledDate(time) {
						//          return time.getTime() < Date.now() - 8.64e7;
					},
				},
				pickerOptions1: {},
				pvalue1: '',
				pvalue2: '',
				soptions: [{ //状态
					value: '',
					label: "请选择"
				}],
				svalue: '',
				isShow: true,
				fids:[],
				currentRow: [],
				dialogFormVisible: false,
				dialogFormVisible2: false,
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
		  filters: {
    statusFilter(ftype) {
      const statusMap = {
        "": 'success',
        1: 'gray',
        0: 'danger'
      }
      return statusMap[ftype]
    }
  },
		methods: {
//			handleDetail(row) {
//					var fids = row.fid;
//					this.currentRow.push(fids)
//					this.lookDetails(fids)
//			},

			handleSelectionChange(val) { //取消选择触发
				this.currentRow = val.map(i => i.fid);
			},
			handleSizeChange(val) {
				this.tableData.pagination.pageSize = val;
				
			},
			handleCurrentChange(val) {
				this.tableData.pagination.pageNo = val;
				this.pvalue1 = this.pvalue1.valueOf()
				this.pvalue2 = this.pvalue2.valueOf()
				this.loadData(this.searchKey, this.meFormat(this.pvalue1), this.meFormat(this.pvalue2),this.svalue)
			},
			btnCheck() { //搜索
				this.pvalue1 = this.pvalue1.valueOf();
				this.pvalue2 = this.pvalue2.valueOf();
//				var timeStar = this.meFormat(this.pvalue1)
//				var timeStar = this.pvalue1;
//				var timeEnd = this.meFormat(this.pvalue2);
				this.loadData(this.searchKey, this.meFormat(this.pvalue1), this.meFormat(this.pvalue2),this.svalue)
			},
		
		loadData(str, timeStar, timeEnd,ftype) {
				ftype = (ftype == undefined) ? "" : ftype;
				str = (str == undefined) ? "" : str;
				timeStar = (timeStar == "NaN-aN-aN" || timeStar == undefined) ? "" : timeStar;
				timeEnd = (timeEnd == "NaN-aN-aN" || timeEnd == undefined) ? "" : timeEnd;
				this.loadTable(api.GET_DATA_LOG_SEARCH,"fcontent=" + str + "&ftype=" + ftype+ "&ftime=" + timeStar+ "&endTime=" + timeEnd);
			},
			
			getType() { 
			this.$http.get(auth.getServerUrl() +api.GET_DATA_LOG_TYPE)
				.then(res => {
					if(res.data.success = true) {
						var d = res.data.data;
								for(let i = 0; i < d.length; i++) {
									let obj = {
										value: "",
										label: "",
									};
									obj.value = d[i].fid;
									obj.label = d[i].fvalue;
									this.soptions.push(obj);
								}
		
					}
				}).catch((error) => {
					console.log(error)
				});
				},

		},
		created() {
			this.loadData();
			this.getType();//获取操作类型
		}
	}
</script>
<style>
	.el-pagination {
		float: right;
		margin-top: 15px;
	}
</style>