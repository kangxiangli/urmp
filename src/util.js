/**
 * 工具插件
 * zhaojl
 * 2017-12-18
 */
var Util = {};
Util.install = function (Vue, options) {
    /**
     * 获取服务器地址
     */
  Vue.prototype.getServerUrl = function () {
    return window.sessionStorage.getItem('serverUrl');
  };
  /**
   * 加载表格数据
   * @param {*} url 接口地址 
   * @param {*} param 请求参数
   */
  Vue.prototype.loadTable = function (url, param) {
    this.listLoading = true;
    let _this=this;
    this.$http.get(this.getServerUrl() + url + "?" + param + "&rows=" + this.tableData.pagination.pageSize + "&page=" + this.tableData.pagination.pageNo)
      .then(res => {
        if (res.data.success == true) {
            _this.listLoading = false; //关闭loading
            let d = res.data;
            _this.tableData.rows = d.data.content;
            _this.tableData.pagination.total = d.data.totalElements;
        } else {
            _this.listLoading = false; //关闭loading
        }

      }).catch((error) => {
        _this.listLoading = false; //关闭loading
        console.log(error)
      });

  };
/*定义在全局 
过滤filter
*/
Vue.filter('statusFilter', function(fstate) {
     const statusMap = {
	       	  0: 'success',
      		 1: 'warning'
	      }
	      return statusMap[fstate]
});

  Vue.prototype.stateFormat = function (row) {
    return row.fstate == 0 ? "启用" : "禁用";

  };
  Vue.prototype.defaultFormat = function (row) {
    return row.fdefault == 0 ? "是" : "否";

  };

  Vue.prototype.saveForm = function (url,form) {//保存
      this.loading();
    let _this=this;
	this.$http.post(this.getServerUrl()+url,form)
		.then(res => {
            this.loadClose();
			if(res.data.success == true) {
				_this.dialogFormVisible = false; //关闭弹出层
				_this.$message(res.data.msg);
                _this.loadData();
            }else{
				_this.dialogFormVisible = true;
            }        
    })
		
};
Vue.prototype.delete = function (url,ids) {
    if(ids == "") {
        this.$message("请选择数据");
        return false;
    }
    this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(() => {
        this.loading();
        this.$http.get(this.getServerUrl() + url + "?ids=" + ids)
            .then(res => {
                this.loadClose();
                if(res.data.success == true) {
                    this.$message({
                        type: 'success',
                        message: res.data.msg
                    });
                    this.loadData();
                }
            }).catch((Error) => {
                console.log(Error)
            });
    })
      
};
			
  /**
   * 获取下拉框数据
   * @param {*} url 
   * @param {*} param 
   */
//   Vue.prototype.getSelectData = function (url) {
//     let _this=this;
//     this.$http.get(this.getServerUrl() + url )
//     .then(res => {
//         if(res.data.success === true) {
//             debugger;
//             var d = res.data;
//             _this.$refs.form.form.fparentId = data.id;
//             let arr = [];
            
//             for(let i = 0; i < d.data.length; i++) {
//                 let arrC = {
//                     value: "",
//                     label: ""
//                 };
                
//                 arrC.value = d.data[i].fid;
//                 arrC.label = d.data[i].fname;
//                 arr.push(arrC);
//             }

//             _this.$refs.form.fparentIds = arr;
//         } else {
//             Element.MessageBox({
//                 type: "error",
//                 message: res.data.msg,
//                 title:"温馨提醒"
//             });
//         }
//     })
//     .catch((err) => {
//         console.log(err);
//     });
//   };
//vue挂载格式化时间
Vue.prototype.meFormat = function(obj) {
	var date = new Date(obj);
	var y = 1900 + date.getYear();
	var m = "0" + (date.getMonth() + 1);
	var d = "0" + date.getDate();
	return y + "-" + m.substring(m.length - 2, m.length) + "-" + d.substring(d.length - 2, d.length);
}
Vue.prototype.handParentId=function(getUrl,url,param,opt) { 
		opt = (opt == undefined) ? "toptions" : opt;
	this.$http.get(getUrl + url + "?fid=" + param)
		.then(res => {
			if(res.data.success = true) {
				var ary = res.data.data;
				for(let i = 0; i < ary.length; i++) {
					let obj = {
						fvalue: "",
						fcode:""
					};
					obj.value = ary[i].fid;                                   
					obj.label = ary[i].fname;
					opt.push(obj);
				}
//				this.$refs.form.fparentIds = opt;
			}else{
				Element.MessageBox({type:"error",message:res.data.msg,title:"温馨提示"});
			}
		}).catch((error) => {
			console.log(error)
		});
},


Vue.prototype.loadTree=function(getUrl,url,id,resolve) { //tree
	
	this.$http.get(getUrl + url +"?fparentId="+id)
		.then(res => {
			if(res.data.success = true) {
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
//						return resolve(data1);
			}
		}).catch((error) => {
			console.log(error)
		});
},
   Vue.prototype.deletes = function(getUrl,url, ids) { //删除
   	debugger
   		if(ids == "") {
   			this.$message("请选择数据");
   			return false;
   		}
   		this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
   			confirmButtonText: '确定',
   			cancelButtonText: '取消',
   			type: 'warning'
   		}).then(() => {
   			this.loading();
   			this.$http.get(getUrl + url + "?fids=" + ids)
   				.then(res => {
   					 	debugger
   					this.loadClose();
   					if(res.data.success == true) {
   						this.$message({
   							type: 'success',
   							message: res.data.msg
   						});
   						this.loadData();
   					}
   				}).catch((Error) => {
   					console.log(Error)
   				});
   		})
   	}
	Vue.prototype.lookDetails=function(fids,) {//查看详情
		const h = this.$createElement;
		this.$msgbox({
			title: "查看详情",
			closeOnClickModal: true,
			customClass: "my_dalog_box",
			message: h('p', null, [
				h('detail', {
					props: {
						fids: fids
					}
				}, []),

			]),
			showCancelButton: true,
			confirmButtonText: "确定",
			cancelButtonText: "取消",
			beforeClose: (action, instance, done) => {
				if(action === 'confirm') {
					instance.confirmButtonLoading = true;
					instance.confirmButtonText = "执行中...";
					setTimeout(() => {
						done();
						setTimeout(() => {
							instance.confirmButtonLoading = false;
						}, 300);
					}, 1500);
				} else {
					done();
				}
			},
			callback: (action, instance) => {
			},
		}).then(action => {
			this.$message({
				type: 'info',
				message: 'message' + action
			});
		});
	},
Vue.prototype.saveRevise=function(getUrl, url,obj) { //保存修改
	this.$refs.form.$refs.form.validate((valid) => {
		if(!valid) {
			Element.MessageBox({
				type: "error",
				message: "请正确填写信息",
				title: "温馨提示"
			});
		} else {
			this.loading();
			this.$http.post(getUrl+url, obj)
				.then(res => {
					this.loadClose();
					if(res.data.success == true) {
						this.dialogFormVisible = false; //关闭弹出层
						this.$message(res.data.msg);
						// this.loadNode();
						this.loadData();
					} else {
						this.dialogFormVisible = true;
					}
				})
		}
	});
},
Vue.prototype.saveRole=function(getUrl, url,obj,userIds,fids) {//保存角色
				let _this = this;
				var  userIds = _this.$refs.form.value3;
						this.$http.post(getUrl+url, obj+"?userIds=" + userIds+"&roleId="+fids )//userIds当前数据的fid roleId 已经选择的id
							.then(res => {
								if(res.data.success == true) {
									_this.dialogFormVisible2 = false; //关闭弹出层
									_this.$message(res.data.msg);
									_this.loadData();
								}else{
										_this.dialogFormVisible2 = false;
								}
							})
			},
Vue.prototype.savePeople1 = function(getUrl, url,blon,obj) { //保存用户
	let _this = this;
	this.$http.post(getUrl + url,obj) //userIds当前数据的fid roleId 已经选择的id
		.then(res => {
			if(res.data.success == true) {
				this[blon] = false; //关闭弹出层
				_this.$message(res.data.msg);
				_this.loadData();
			} else {
				this[blon] = false; //关闭弹出层
			}
		})

},
Vue.prototype.dataGet = function(getUrl, url,store, id) { //父id
	this.$http.get(getUrl+url+"?fid=" +id)
		.then(res => {
			debugger
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
					title: "温馨提醒"
				});
			}
		}).catch((err) => {
			console.log(err);
		});
}


}
module.exports = Util;
