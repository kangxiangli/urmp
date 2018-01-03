<template lang="html">
	<div class="login_body">
		<el-row v-loading.fullscreen.lock="fullscreenLoading" element-loading-text="拼命加载中。。。">
			<el-col :span="8" :offset="8">
				<div class="nav_logo">
					<img class="nav_logo_img" src="../../static/img/nav_logo.png" alt="" />
					<!--<div class="nav_logo_img"></div>-->
					<span class="nav_logo_span">URMP</span>
				</div>

				<div class="login">
					<div class="login-form">
						<div class="card-block">

							<h1>登录</h1>
							<p class="text-muted">用户名/密码</p>

							<div class="input-group m-b-1">
								<span class="input-group-addon"><i class="fa fa-user"></i></span>
								<input type="text" class="form-control" placeholder="用户名" v-model="form.floginName">
							</div>
							<div class="input-group m-b-2">
								<span class="input-group-addon"><i class="fa fa-lock"></i></span>
								<input type="password" class="form-control" placeholder="密码" v-model="form.fpassword" @keyup.enter="login">
							</div>
							<!-- <el-button type="button" class="btn btn-link" @click="register_btn" style="float:right; cursor: pointer; position: relative;z-index: 99;">  注册</el-button> -->
							<div class="row">
								<el-row>
									<el-col :span="12" style="width: 100%;text-align: center;">
										<el-button type="primary" class="btn login_btn_box btn-primary p-x-2" @click="login">登录</el-button>
									</el-col>

									<!--<el-button type="button" class="btn btn-link forgot" style="float:right;">忘记密码?</el-button>-->

								</el-row>
							</div>
						</div>
					</div>
					<!--<div class="login-register">
          <div class="card-block">
            <h2>注册</h2>
            <p></p>
            <el-button type="info" class="btn btn-primary active m-t-1" @click="register_btn"> 马上注册</el-button>
          </div>
        </div>-->
				</div>
			</el-col>
		</el-row>
	</div>

</template>
<script>
	import * as types from '../store/mutation-types';
	import * as api from "../api";
	import auth from '../auth';
	import Element from "element-ui";
	import { mapGetters, mapActions, mapMutations } from 'vuex';
	export default {
		name: 'login',
		data() {
			return {
				fullscreenLoading: false,
				form: {
					floginName: 'admin',
					fpassword: 'admin'
				}
			}
		},
		components: {},
		created() { //dom还未生成
			this.getServerUrl();
		},
		mounted() {

		},
		methods: {
//			...mapMutations({
//				setUserInfo: types.SET_USER_INFO,
//			}),
			...mapActions({
				loadMenuList: 'loadMenuList', // 映射 this.load() 为 this.$store.dispatch('loadMenuList')
				getServerUrl: 'getServerUrl'
			}),
		

			login() {
				this.fullscreenLoading = true;
				var redirectUrl = '/index';
				if(this.$route.query && this.$route.query != null && this.$route.query.redirect && this.$route.query.redirect != null) {
					redirectUrl = this.$route.query.redirect;
				}
				this.$http.post(auth.getServerUrl() + api.LOGIN, this.form).then(res => {
					if(res.data.success == true) {
							this.fullscreenLoading = false;
							var Authorization = res.data.data;
							auth.login(res.data.data);
							this.$router.push({
								path: "/index"
							});
					

					} else {
						this.fullscreenLoading = false;
					}
					 let userFids=window.localStorage.getItem("userFids");
					if(userFids==null||userFids==undefined){
//						debugger
//						this.$route.go(0)
	this.getUser();//获取用户名
//						 let userFids=window.localStorage.getItem("userFids");
					}
					this.loadMenuList();//加载菜单项
				})
			},

			register_btn() {
				this.$router.push({
					path: '/register'
				}) //跳转注册页
			}
		}
	}
</script>

<style scoped>
	html {
		background-color: none !important;
	}
	
	.login_body {
		width: 100%;
		height: 100%;
		overflow: hidden;
		background: url(../../static/img/login-bg.png) no-repeat;
		background-size: cover;
	}
	
	.login_btn_box {
		width: 80px;
	}
	
	.login {
		margin-top: 160px;
		width: 100%;
		border: 1px solid #cfd8dc;
		margin-right: auto !important;
		margin-left: auto !important;
		display: table;
		table-layout: fixed;
	}
	
	.nav_logo {
		min-width: 360px;
		position: relative;
		top: 140px;
		left: 0px;
		min-width: 360px;
	}
	
	.nav_logo_img {
		vertical-align: middle;
		width: 13%;
		/*display: inline-block;
	background: url(../../static/img/nav_logo.png) no-repeat;
		background-size: cover;*/
	}
	
	.nav_logo_span {
		min-width: 300px;
		width: 70%;
		min-width: 300px;
		word-spacing: 5px;
		padding: 0px 10px;
		vertical-align: bottom;
		letter-spacing: 5px;
		font-size: 30px;
		font-weight: 800;
		display: inline-block;
		color: #fff;
	}
	
	.login .el-button {
		border-radius: 0;
	}
	
	.login .el-button.forgot,
	.login .el-button.forgot:hover {
		border: none;
	}
	
	.login .login-form {
		background-color: #FFFFFF;
		display: inline-block;
		width: 60%;
		display: table-cell;
		padding: 10px 30px;
	}
	
	.login .login-form .card-block {
		margin: 35px;
	}
	
	.login .login-form .card-block p {
		margin: 15px 0;
	}
	
	.input-group {
		width: 100%;
		display: table;
		border-collapse: separate;
		margin-bottom: 20px !important;
	}
	
	.input-group,
	.input-group-btn,
	.input-group-btn>.btn,
	.navbar {
		position: relative;
	}
	
	.input-group-addon:not(:last-child) {
		border-right: 0;
	}
	
	.input-group-addon,
	.input-group-btn {
		min-width: 40px;
		white-space: nowrap;
		vertical-align: middle;
		width: 1%;
	}
	
	.btn-link:focus,
	.btn-link:hover {
		color: #167495;
		text-decoration: underline;
		background-color: transparent;
	}
	
	.btn-link,
	.btn-link:active,
	.btn-link:focus,
	.btn-link:hover {
		border-color: transparent;
	}
	
	.btn.focus,
	.btn:focus,
	.btn:hover {
		text-decoration: none;
	}
	
	.input-group-addon {
		padding: .5rem .75rem;
		margin-bottom: 0;
		font-size: 1.2rem !important;
		font-weight: 400;
		line-height: 1.75rem;
		color: #607d8b;
		text-align: center;
		background-color: #cfd8dc;
		border: 1px solid rgba(0, 0, 0, .15);
	}
	
	.input-group .form-control,
	.input-group-addon,
	.input-group-btn {
		display: table-cell;
	}
	
	.input-group .form-control {
		position: relative;
		z-index: 2;
		float: left;
		width: 100%;
		margin-bottom: 0;
		font-size: 1.2rem !important;
	}
	
	.form-control {
		width: 100%;
		padding: .5rem .75rem;
		font-size: .875rem;
		line-height: 1.75rem;
		color: #607d8b;
		background-color: #fff;
		background-image: none;
		background-clip: padding-box;
		border: 1px solid rgba(0, 0, 0, .15);
		transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
	}
	
	.login .login-form .card-block .row {
		display: block;
		margin: 15px 0;
	}
	
	.login .login-register {
		display: table-cell;
		background-color: #20a8d8;
		width: 40%;
		color: #fff;
	}
	
	.login .login-register .card-block {
		text-align: center !important;
		margin: 30px;
	}
	
	.login .login-register .card-block p {
		text-align: left !important;
		margin: 15px 0;
		height: 100px;
	}
</style>