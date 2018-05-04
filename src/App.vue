<template>
    <el-container id="app">
      <el-header>
        <img src="/static/img/icon-144.png">
          <span>MusicFM Operations Management System</span><!-- <br><span class="green" style="font-size: 16px;margin-left: 80px;margin-top: 5px;margin-bottom: 5px;"><a href="">warning：本系统所有时间取决于你的计算机系统时区时间，设置和查看时间时请自己换算与日本时区的时间差。<br>实在不会就把你计算机系统时间设成日本时间，就不会错了！(凯平说：由于时区原因导致配错时间值, 研发一律不负责!)</a> --></span>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu :default-active="activeIndex" class="el-menu-vertical-demo" :router="true" :unique-opened="true">
            <el-submenu index="songList">
              <template slot="title"><i class="el-icon-menu"></i>歌单管理</template>
              <el-menu-item index="/allList">全部歌单</el-menu-item>
              <el-menu-item index="/ranking">排行榜</el-menu-item>
              <el-menu-item index="/recommend">每日推荐</el-menu-item>
              <el-menu-item index="/latest">最新歌曲</el-menu-item>
              <el-menu-item index="/mfm_track">全部歌曲</el-menu-item>
              <el-menu-item index="/search_keywords">搜索热词</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
</template>

<style lang="css">
@import "./styles/common.css";
@import "./styles/glow.css";
</style>

<script>
  export default {
    data() {
      return {
        activeIndex: '/allList'
      }
    },
    created: function() {
      console.log(this.$router.history.current.path)
      if(sessionStorage.getItem('username')) {
        this.activeIndex = this.$router.history.current.path
      }else {
        var hrefs = 'http://' + location.host + '/#/login';
        window.open(hrefs, '_self');
      }
    }
  }
</script>
