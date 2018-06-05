import Vue from 'vue'
import Router from 'vue-router'

//用户相关
import recommend from '@/components/songList/recommend'
import latest from '@/components/songList/latest'
import ranking from '@/components/songList/ranking'
import allList from '@/components/songList/allList'
import mfm_track from '@/components/songList/mfm_track'
import search_keywords from '@/components/songList/search_keywords'
import HotSinger from '@/components/songList/HotSinger'


import login from '@/components/login'


Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', redirect: '/login'},
    {path: '/login', component: login},
    {path: '/recommend', component: recommend},
    {path: '/latest', component: latest},
    {path: '/ranking', component: ranking},
    {path: '/allList', component: allList},
    {path: '/mfm_track', component: mfm_track},
    {path: '/search_keywords', component: search_keywords},
    {path: '/HotSinger', component: HotSinger},
  ]
})
