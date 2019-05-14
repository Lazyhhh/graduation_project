<template>
  <div class="content">
    <div class="left"></div>
    <div class="right">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        background-color="#fff"
        text-color="#333"
        active-text-color="#ff8a00">
        <router-link class="router-link" tag="el-menu-item" index="1" to="/index/comment">评论中心</router-link>
        <router-link class="router-link" tag="el-menu-item" index="2" to="/index/message">留言中心</router-link>
      </el-menu>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        activeIndex: '1'
      }
    }
  }
</script>
<style scoped>
  * {
    padding: 0;
    margin: 0;
  }

  .content {
    padding: 0 180px;
    display: flex;
    margin-top: 20px;
  }

  .left {
    flex: 1;
    margin-right: 10px;
    height: 30px;
  }

  .right {
    flex: 3;
    height: 30px;
  }

  .right .router-link {
    width: 160px;
    font-size: 18px;
    text-align: center;
    background-color: #fff!important;
  }

  .right .router-link:hover {
    background-color: #fff!important;
  }

  .right .router-link-active {
    color: #ff8a00!important;
    border-bottom: 3px solid #ff8a00!important;
    margin-bottom: -2px;
  }

  .el-menu.el-menu--horizontal {
    margin-bottom: 20px!important;
  }
</style>