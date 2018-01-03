<template>
	<imp-panel>
		<div slot="header" style="width: 100%;">
	<el-row :gutter="24">
		<el-col :xs="3" :sm="6" :md="2" :lg="3">
			<div class="grid-content bg-purple">状态</div>
		</el-col>
		<el-col :xs="4" :sm="6" :md="6" :lg="4">
			<div class="grid-content bg-purple-light"> 
				<input  type="text" placeholder="请输入编号/名称" v-model="searchKey" class="el-input__inner">
			</div>
		</el-col>
		<el-col :xs="4" :sm="6" :md="2" :lg="3">
			<div class="grid-content bg-purple">应用应用</div>
		</el-col>
		<el-col :xs="8" :sm="6" :md="6" :lg="4">
			<div class="grid-content bg-purple-light">
				<input  type="text" placeholder="用户名称/应用名称" v-model="searchKey" class="el-input__inner">
			</div>
		</el-col>
		<el-col :xs="3" :sm="6" :md="2" :lg="3">
		<div class="grid-content bg-purple">开始时间</div>
	</el-col>
	<el-col :xs="4" :sm="6" :md="6" :lg="4">
		<div class="grid-content bg-purple-light">
			<el-date-picker  v-model="pvalue1" type="date" placeholder="选择日期" :picker-options="pickerOptions0">
						</el-date-picker></div>
	</el-col>
	<el-col :xs="4" :sm="6" :md="2" :lg="3">
		<div class="grid-content bg-purple">开始时间</div>
	</el-col>
	<el-col :xs="8" :sm="6" :md="6" :lg="4">
		<div class="grid-content bg-purple-light">
			<el-date-picker  v-model="pvalue1" type="date" placeholder="选择日期" :picker-options="pickerOptions0"></el-date-picker></div>
	</el-col>
	</el-row>

<!--<el-row :gutter="12">
	<el-col :span= "4" :offset="4" :xs="3" :sm="6" :md="2" :lg="1">
		<div class="grid-content bg-purple">开始时间</div>
	</el-col>
	<el-col :xs="4" :sm="6" :md="6" :lg="4">
		<div class="grid-content bg-purple-light">
			<el-date-picker style="width: 210px;" v-model="pvalue1" type="date" placeholder="选择日期" :picker-options="pickerOptions0"></el-date-picker></div>
	</el-col>
	<el-col :xs="4" :sm="6" :md="2" :lg="1">
		<div class="grid-content bg-purple">开始时间</div>
	</el-col>
	<el-col :xs="8" :sm="6" :md="6" :lg="4">
		<div class="grid-content bg-purple-light"><el-date-picker style="width: 210px;" v-model="pvalue1" type="date" placeholder="选择日期" :picker-options="pickerOptions0">
						</el-date-picker></div>
	</el-col>
</el-row>-->
	</div>
	</imp-panel>
</template>
<script>
 import panel from "../components/panel.vue";
  export default{
   	'imp-panel': panel
  }
</script>

<style>
	.el-col {
		border-radius: 4px;
	}
	
	.bg-purple-dark {
		background: #99a9bf;
	}
	
	.bg-purple {
		background: #d3dce6;
	}
	
	.bg-purple-light {
		background: #e5e9f2;
	}
	
	.grid-content {
		border-radius: 4px;
		min-height: 36px;
	}
</style>