import Vue from 'vue'
import Router from 'vue-router'
const index = () =>import(/*webpackChunkName:"index"*/ '@/modules/index.vue');
const indexTabel = () =>import(/*webpackChunkName:"index"*/ '@/modules/index-table.vue');
const indexTree = () =>import(/*webpackChunkName:"index"*/ '@/modules/index-tree.vue');
const echart = () =>import(/*webpackChunkName:"index"*/ '@/modules/echart.vue');
Vue.use(Router);
const svg = () =>import(/*webpackChunkName:"index"*/ '@/modules/svg.vue');
const createform = () =>import(/*webpackChunkName:"index"*/ '@/modules/create_form.vue');
const parent_son = () =>import(/*webpackChunkName:"index"*/ '@/modules/parent_son.vue');
Vue.use(Router)
const routes = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    component: index,
    children: [
      {
        path: '',
        component: indexTabel,
      },{
        path: '/indexTree',
        component: indexTree,
      },{
        path:'/createform',
        component:createform
      },{
        path:'/parent_son',
        component:parent_son
      }

    ]
  }
]
export default new Router({
  routes
})