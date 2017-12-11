<template lang="html">
    <div class="login">
      <img src="/static/img/icon-144.png" class="logo">
      <p class="login_tips">MusicFM<br>Operations Management System</p>
      <div class="login_input">
        <el-input placeholder="请输入内容" size="large" v-model="user">
          <template slot="prepend">账号：</template>
        </el-input>
      </div>
      <div class="login_input">
        <el-input type="password" placeholder="请输入内容" size="large" v-model="pw">
          <template slot="prepend">密码：</template>
        </el-input>
      </div>
      <div class="login_input">
        <el-button type="primary" size="large" @click="login()">登&nbsp;&nbsp;&nbsp;&nbsp;录</el-button>
      </div>
    </div>
</template>

<style type="text/css" scoped>
  .login_input {
    width: 300px;
    margin: 0 auto;
  }
  .logo {
    margin: 20vh auto 0;
    width: 128px;
    display: block;
    margin-bottom: 10px;
  }
  .login_input {
    
    margin-bottom: 20px;
  }
  .login_input button {
    width: 100%;
  }
  .login_tips {
    color: #fff;
    text-align: center;
    margin-bottom: 30px;
    font-size: 50px;
    font-family: 'Iceland';
    font-weight: 600;
  }
  .el-dialog__body {
    background: #48576a !important;
  }
</style>

<script>
  export default {
    data() {
      return {
        user: '',
        pw: '',
      }
    },
    methods: {
      login() {
        var self = this;
        if((self.user == 'music') && (self.pw == 'musicFM')) {
          var hrefs = 'http://' + location.host + '/#/allList';
          window.open(hrefs, '_self');
          sessionStorage.setItem('username', 'music');
        }else {
          self.$message.error('账号和密码不匹配');
        }
      }
    },
    created: function() {
      if(sessionStorage.getItem('username')) {
        var hrefs = 'http://' + location.host + '/#/allList';
        window.open(hrefs, '_self');
      }
    }
  }
</script>
