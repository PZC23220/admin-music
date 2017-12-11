import Vue from 'vue'
import Router from 'vue-router'

//用户相关
import addList from '@/components/songList/addList'
import hotList from '@/components/songList/hotList'
import opularityList from '@/components/songList/opularityList'
import allList from '@/components/songList/allList'


import login from '@/components/login'


Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', redirect: '/login'},
    {path: '/login', component: login},
    {path: '/addList', component: addList},
    {path: '/hotList', component: hotList},
    {path: '/opularityList', component: opularityList},
    {path: '/allList', component: allList},
  ]
})