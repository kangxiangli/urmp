<template>
	<imp-panel>
		<el-transfer class="myTransfer" v-model="value3" :filterable="true"
			 :left-default-checked="[1,2,3,4]" 
			 :right-default-checked="[1]"
			  :render-content="renderFunc"
			   :titles="['未选择', '已选择']" 
			   :button-texts="['左边', '右边']"
			    :footer-format="{
      noChecked: '${total}',
      hasChecked: '${checked}/${total}'
    }" @change="handleChange" :data="data">
			<!--<el-button class="transfer-footer" slot="left-footer" size="small">操作</el-button>
			<el-button class="transfer-footer" slot="right-footer" size="small">操作</el-button>-->
		</el-transfer>

	</imp-panel>
</template>
<script>
	import panel from "./panel.vue"
	import * as api from "../api"
	import auth from "../auth"
	export default {
		components: {
			'imp-panel': panel
		},
		props: {
			fids: {
//				type: Array
			},
		},
		data() {
			return {
//              fids: [],
				data: [],
				value3: [],
				renderFunc(h, option) {
					return <span>{ option.label }</span>;
				}
			};
		},

		watch: {
			fids() {
				this.loadLeft();
			}
		},
		created() {
			this.loadLeft();
		},
		methods: {
			handleChange(value, direction, movedKeys) { //总共的值  方向  本次的值
//				console.log(value, direction, movedKeys);
			},
			loadLeft() { //所有的
				
				this.data=[];
				this.$http.get(auth.getServerUrl() + api.GET_DATA_CHARACTER_ALL)
					.then(res => {
						if(res.data.success == true) {
							var item = res.data.data
							for(let i = 0; i < item.length; i++) {
								this.data.push({
									key: item[i].fid ,
									label: `用户 ${ item[i].floginName }`,
								});
							
							}
							
							this.value3=[];
							this.loadRigth();//已经选择
						} 

					}).catch((error) => {

						console.log(error)
					});
			},
			loadRigth() { //存在
				this.$http.get(auth.getServerUrl() + api.ORG_USER_GET_EXIT + "?orgId=" + this.fids)
					.then(res => {
						if(res.data.success == true) {
							var item = res.data.data;
							for(let i = 0; i <= item.length; i++) {
								this.value3.push(item[i].fid );
							}
						}

					}).catch((error) => {
						console.log(error)
					});
			},
		}
	}
</script>