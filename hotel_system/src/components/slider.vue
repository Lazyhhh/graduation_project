<template>
  <div id="carousel-example-generic" class="carousel slide" data-ride="carousel">
    <!-- Indicators -->
    <ol class="carousel-indicators">
      <li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>
      <li data-target="#carousel-example-generic" data-slide-to="1"></li>
      <li data-target="#carousel-example-generic" data-slide-to="2"></li>
    </ol>

    <!-- Wrapper for slides -->
    <div class="carousel-inner" role="listbox">
      <div class="item active">
        <img src="../assets/1.jpeg" alt="...">
        <div class="carousel-caption">
        </div>
      </div>
      <div class="item">
        <img src="../assets/2.jpeg" alt="...">
        <div class="carousel-caption">
        </div>
      </div>
      <div class="item">
        <img src="../assets/3.jpeg" alt="...">
        <div class="carousel-caption">
        </div>
      </div>
    </div>

    <!-- Controls -->
    <a class="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">
      <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
      <span class="sr-only">Previous</span>
    </a>
    <a class="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">
      <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
      <span class="sr-only">Next</span>
    </a>

    <div class="search-box">
      <form action="">
        <div class="search-radio">
          <el-radio v-model="radio" label="1">全部</el-radio>
          <el-radio v-model="radio" label="2">酒店</el-radio>
          <el-radio v-model="radio" label="3">目的地</el-radio>
        </div>
        <div class="all_form">
          <el-input placeholder="请输入关键字" v-model="input5" v-if="radio !== '2'" class="input-with-select">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </div>
        <div class="hotel_form" v-if="radio === '2'">
          <el-input class="area" v-model="input" placeholder="请输入国家、地区、城市" style="padding-right: 0"></el-input>
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
          <el-button class="search-btn" icon="el-icon-search"></el-button>
        </div>
      </form>
    </div>

  </div>
</template>
<script>
  export default {
    data () {
      return {
        radio: '1',
        input5: '',
        startDate: '',
        input: '',
        endDate: ''
      }
    },
    mounted(){
      $('.carousel').carousel({
        interval: 5000
      })
    }
  }
</script>
<style scoped>
.slide {
  height: 450px;
}

.search-box label {
  color: #fff;
  font-size: 14px;
}

.search-box input:focus {
  background-color: red;
}

.search-box {
  position: absolute;
  top: 300px;
  left: 50%;
  margin-left: -289px;
  width: 578px;
  height: 90px;
  background-color: rgba(0,0,0,.6);
  border-radius: 4px;
  padding: 10px;
}

.search-box .search-radio {
  margin-bottom: 5px;
}

.hotel_form {
  position: relative;
}

.hotel_form .search-btn {
  position: absolute;
  top: 0;
  right: 0;
}

.hotel_form .area {
  width: 210px;
}

.hotel_form .date {
  width: 140px;
}

</style>

<style>
.search-box .el-radio__input.is-checked+.el-radio__label {
  color: #ff9d00;
}

.search-box .el-radio__input.is-checked .el-radio__inner {
  border-color: #ff9d00;
  background: #ff9d00;
}

.hotel_home .el-input__inner {
  padding-right: 0;
}
</style>