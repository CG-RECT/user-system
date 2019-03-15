import Vue from 'vue'
import Router from 'vue-router'
import SignUp from '../views/user/service/SignUp'

import ChartRing from '../views/user/service/ChartRing'
import cr from '../views/user/service/cr'
import ChartLine from '../views/user/service/ChartLine'
import table from '../views/user/service/table'
import  titleDiv from  '../views/user/service/TitleDiv'
import  zcpz from  '../views/user/service/zcpz'
import  zhyjzbx from  '../views/user/service/zhyjzbx'


Vue.use(Router)

export default new Router({
  // mode: 'history',
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'sign-up',
      component: SignUp
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.

      component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
      path: '/ring',
      name: 'Chart-Ring',
      component: ChartRing
    },
    {
      path: '/cr',
      name: 'cr',
      component: cr
    },
    {
      path: '/ChartLine',
      name: 'Chart-Line',
      component: ChartLine
    },
    {
      path: '/table',
      name: 'table',
      component: table
    },
    {
      path: '/titleDiv',
      name: 'title-Div',
      component: titleDiv
    },
    {
      path: '/zcpz',
      name: 'zcpz',
      component: zcpz
    },
    {
      path: '/zhyjzbx',
      name: 'zhyjzbx',
      component: zhyjzbx
    }
  ]
})
