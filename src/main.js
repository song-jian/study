import Vue from 'vue';
import App from './App';
import router from './router';
import baseApi from './common/baseapi';
import scroller from 'vue-scroller';
import ElementUI from 'element-ui';
import Extend from './utils/extend';
import 'element-ui/lib/theme-chalk/index.css';    // 默认主题
import "babel-polyfill";
Vue.use(ElementUI);
Vue.use(scroller);
console.log(Extend)
Vue.use(Extend)
// Vue.prototype._ = _;
window._ = Vue.prototype._;
window.$baseApi = baseApi;
new Vue({
    el:'#app',
    router,
    template:'<App/>',//模板即为<App/><App>
    components:{App}//注册组件
})