<template>
  <div class="hotel">
    <div class="top">
      <h3 class="title">酒店</h3>
      <form class="form" action="">
        <input type="text" placeholder="出行目的地">
        <el-date-picker
        v-model="startDate"
        class="date"
        type="date"
        placeholder="选择入住日">
      </el-date-picker>
      <el-date-picker
      v-model="endDate"
      class="date"
      type="date"
      placeholder="选择离店日">
    </el-date-picker>
    <span class="search-btn" style="flex: 1"></span>
  </form>
    </div>
    <div class="bottom">
      <h3>热门地区酒店推荐</h3>
      <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal"
      background-color="#fff"
      text-color="#333"
      active-text-color="#ff8a00">
      <router-link class="router-link" tag="el-menu-item" index="1" to="/hotel/sz">深圳</router-link>
    </el-menu>
    <router-view></router-view>
  </div>
</div>
</template>
<script>
  export default {
    data () {
      return {
        startDate: '',
        endDate: '',
        activeIndex: '1',
        activeIndex2: '1'
      }
    }
  }
</script>
<style scoped>

.hotel {
  padding: 50px 180px;
}

.hotel .title {
  color: #333;
  margin-bottom: 50px;
}

.form {
  display: flex;
}

.form .date {
  flex: 1;
  margin-right: 6px;
}

.form input {
  width: 306px;
  height: 40px;
  border: 1px solid #d8d8d8;
  border-radius: 4px;
  font-size: 14px;
  color: #666;
  line-height: 28px;
  padding: 6px 0 6px 12px;
  box-shadow: 0 0 5px #fff;
  outline: 0;
  transition: box-shadow .25s linear 0s;
  -webkit-transition: box-shadow .25s linear 0s;
  margin-bottom: 10px;
  margin-right: 6px;
  flex: 3;
}

.form input:focus {
  border: 1px solid #ffa200;
  box-shadow: 0 0 5px #ffa200;
  outline: 0;
  transition: box-shadow .25s linear 0s;
  -webkit-transition: box-shadow .25s linear 0s;
}

.form .search-btn {
  width: 180px;
  height: 40px;
  background: url(../assets/search.png) no-repeat;
  -webkit-background-size: 24px 24px;
  background-size: 24px 24px;
  background-position: center center;
  background-color: #ff9d00;
  border-radius: 5px;
  cursor: pointer;
}

.form .search-btn:hover {
  opacity: .8;
}

.desc {
  display: flex;
  margin-top: 70px;
}

.desc .desc_title {
  font-size: 18px;
  color: #666;
  line-height: 18px;
  font-weight: normal;
}

.desc .content {
  font-size: 14px;
  color: #666;
  margin-top: 5px;
}

.desc span {
  display: block;
  padding-left: 50px;
}

.desc-item {
  flex: 1;
}

.desc-item::before {
  content: "";
  position: absolute;
  width: 44px;
  height: 42px;
  background: url(../assets/hotel-sprites.png) no-repeat;
}

.desc-item.one::before {
  background-position: 4px 0;
}

.desc-item.two::before {
  background-position: -40px 0;
}

.desc-item.three::before {
  background-position: -86px 0;
}

.bottom {
  text-align: center;
}

.bottom .router-link {
  width: 160px;
  font-size: 18px
}

.bottom .router-link:hover {
  background-color: #fff!important;
}

.bottom .router-link-active {
    color: #ff8a00!important;
    border-bottom: 3px solid #ff8a00!important;
    margin-bottom: -2px;
}

</style>

<style>
.form .el-input--prefix .el-input__inner:focus {
  border: 1px solid #ffa200!important;
  box-shadow: 0 0 5px #ffa200!important;
  outline: 0;
  transition: box-shadow .25s linear 0s!important;
  -webkit-transition: box-shadow .25s linear 0s!important;
}

.form .el-input__icon {
  height: 80%;
}
</style>