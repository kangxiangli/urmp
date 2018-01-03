/**
 * Created by lanux on 2017/10/9.
 */
import axios from "axios";

// 适配vue-resource

const instance = axios.create(
axios.defaults.withCredentials=true
);

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么

    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

instance.interceptors.response.use(response => {

  return response.data;
}, err => {
  if (err.response) {
  
    axios.post('/v1/error', err.response);
    
    return Promise.reject(err.response.data);
  }
  return Promise.reject({code: 1024, message: err.message});
});


function plugin(Vue)
{
  if (plugin.installed) {
    return;
  }
  Vue.http = instance;
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin);
}

export default plugin;
