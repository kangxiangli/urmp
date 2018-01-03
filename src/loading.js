/**
 * 页面加载插件
 * zhaojl
 * 2017-12-18
 */
var Loading = {};
Loading.install = function (Vue, options) {
    /**
     * 启动加载页面
     */
    Vue.prototype.loading = function(){
        this.fullscreenLoading = true;
    };
    /**
     * 关闭加载页面
     */
    Vue.prototype.loadClose = function(){
        this.fullscreenLoading = false;
    };
}
module.exports = Loading;