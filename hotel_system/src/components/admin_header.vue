<template>
  <div class="header-box">
    <div class="header">
      <div class="logo">维 纳 斯</div>
      <div class="nav">
        <router-link class="router-link" to="/admin/index">首页</router-link>
        <router-link class="router-link" to="/admin/order">订单管理</router-link>
        <router-link class="router-link" to="/admin/message">留言管理</router-link>
        <router-link class="router-link" to="/admin/user">用户管理</router-link>
        <router-link class="router-link" to="/admin/room">客房管理</router-link>
      </div>
      <div class="right-box">
        <span v-if="!isLogin" class="login" @click="goLogin()">登录</span>
        <span v-if="!isLogin" class="split"></span>
        <span v-if="!isLogin" class="register">注册</span>
        <span v-if="isLogin">{{ name }}，欢迎您</span>
        <span v-if="isLogin" class="split"></span>
        <span v-if="isLogin" @click="logout()">退出登录</span>
      </div>
    </div>
    <div class="shadow"></div>
  </div>
</template>
<script>
  export default {
    props: ['name'],
    data () {
      return {
        
      }
    },
    methods: {
      goLogin(){
        this.$router.push('/login');
      }, 
      logout: function () {
        this.$store.dispatch('logout');
      }
    },
    components: {
    },
    computed: {
      isLogin(){
        return this.$store.state.isLogin
      }
    }
  }
</script>
<style scoped>
  .header-box {
    line-height: 58px;
    background-color: #fff;
    position: relative;
  }

  .header {
    line-height: 58px;
    margin: 0 180px;
    overflow: hidden;
  }

  .logo {
    float: left;
    font-size: 24px;
    position: relative;
    margin-left: 45px;
    color: #333;
  }

  .logo::before {
    content: "";
    display: inline-block;
    width: 40px;
    height: 40px;
    background: url(../assets/logo_b.png) no-repeat left center;
    -webkit-background-size: 40px 40px;
    background-size: 40px 40px;
    position: absolute;
    top: 7px;
    left: -43px;
  }

  .shadow {
    position: absolute;
    left: 0;
    bottom: -2px;
    right: 0;
    width: 100%;
    height: 2px;
    border-top: 1px solid #d6d6d6;
    background-color: rgba(0,0,0,.06);
    overflow: hidden;
  }

  .nav {
    float: left;
    margin-left: 50px;
  }

  .nav .router-link {
    display: inline-block;
    padding: 0 16px;
    text-decoration: none;
    color: #333;
    font-size: 14px;
    box-sizing: border-box;
  }

  .router-link-active {
    background-color: #ff9d00;
    color: #fff!important;
    border: none!important;
  }

  .nav .router-link:hover {
    color: #ff9d00;
    /*border-bottom: 3px solid #ff9d00;*/
    outline: 0;
  }

  .right-box {
    float: right;
  }

  .right-box span {
    color: #ff8a00;
    font-size: 14px;
    cursor: pointer;
  }

  .right-box span:hover {
    text-decoration: underline;
  }

  .right-box .split {
    display: inline-block;
    margin: 0 4px;
    width: 1px;
    height: 14px;
    background-color: #c9c9c9;
    overflow: hidden;
    vertical-align: -2px;
  }
</style>