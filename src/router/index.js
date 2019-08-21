import Vue from 'vue'
import Router from 'vue-router'
const index = () =>import(/*webpackChunkName:"index"*/ '@/modules/index.vue');
const indexTabel = () =>import(/*webpackChunkName:"index"*/ '@/modules/index-table.vue');
const indexTree = () =>import(/*webpackChunkName:"index"*/ '@/modules/index-tree.vue');
const echart = () =>import(/*webpackChunkName:"index"*/ '@/modules/echart.vue');
Vue.use(Router);
const svg = () =>import(/*webpackChunkName:"index"*/ '@/modules/svg.vue');
Vue.use(Router)
const routes = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    component: index,
    children: [{
      path: '',
      component: svg,
    }, {
      path: '/indexTree',
      component: indexTree,
    }]
  }
]
export default new Router({
  routes
})