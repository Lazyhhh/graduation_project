<!--  -->
<template>
  <div class="header">
    <div class="header_left">维纳斯酒店</div>
    <div class="header_right" v-if="!isLogin">
      请先<span class="login_span">登录</span>，
      <el-dropdown>
        <span class="el-dropdown-link">
          个人中心
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>购物车</el-dropdown-item>
          <el-dropdown-item>帮助</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLogin: false
    };
  }
};
</script>
<style scoped>
.header {
  height: 30px;
  line-height: 30px;
  padding: 0 120px;
  background-color: #ccc;
}

.header .header_left {
  height: 100%;
  float: left;
  width: 120px;
  background: url("../assets/header/header_logo.png") no-repeat center left;
  background-size: 20px 20px;
  padding-left: 5px;
}

.header .header_right {
  height: 100%;
  float: right;
  width: 250px;
  font-size: 14px;
}

.header_right .login_span {
  color: #0094ff;
}

.header_right .login_span:hover {
  cursor: pointer;
  text-decoration: underline;
}

.el-dropdown-link {
  cursor: pointer;
}
</style>