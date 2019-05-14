<template>
  <div>
    <div v-if="!isShow" class="detail">
      <h1 class="title">维纳斯五星级酒店</h1>
      <form>
        <span>请选择入住日期：</span>
        <div class="block">
          <el-date-picker
            v-model="date"
            type="daterange"
            :editable="false"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :onPick="getRoomCount()">
          </el-date-picker>
        </div>
      </form>
      <p>{{ src_hotel.title }}<span class="count" v-if="isSelectDate">（剩余: {{ count }}）</span></p>
      <p class="addr">地址：广东省中山市长命水大道号<span class="score"><span class="score_num">{{ src_hotel.score }}</span>分</span></p>
      <div class="hotel_img">
        <img class="big_img" src="../../static/hotels/5.jpeg" alt="">
        <ul class="small_img_ul">
          <li v-for="img in imgs">
            <img :src="img.src" alt="房间详情图片">
          </li>
        </ul>
      </div>
      <button @click="booking()">立即预订</button>
      <div class="base_info">
        <span style="font-size: 16px">基本信息&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        入住时间：<span class="time">14:00-00:00</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        离店时间：<span class="time">12:00</span>之前
      </div>
      <div class="main_facilities"></div>
    </div>
    <div v-if="isShow" class="jumbotron">
      <p>您尚未选择房型，请选择房型后再来查看房间详情</p>
      <p><a @click="goHotel()" class="btn btn-primary btn-lg" href="#" role="button">选择房型</a></p>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        date: '',
        isSelectDate: false,
        src_hotel: {},
        count: 0,
        imgs: [{
          src: '../../static/hotels/6.jpeg'
        }, {
          src: '../../static/hotels/7.jpeg'
        }, {
          src: '../../static/hotels/8.jpeg'
        }, {
          src: '../../static/hotels/9.jpeg'
        }, {
          src: '../../static/hotels/10.jpeg'
        }, {
          src: '../../static/hotels/11.jpeg'
        }]
      }
    },
    methods: {
      goHotel(){
        this.$router.push('/hotel')
      },
      getRoomCount(){
        if (this.date) {
          let date = this.dateFormat(this.date[0]);
          let { type, room_type } = this.src_hotel;
          this.$Axios.post('/api/order/getRoomCount', {
            date,
            type,
            room_type
          })
          .then(res => {
            this.isSelectDate = true;
            this.count = res.data.count;
          })
          .catch(err => {
            console.log(err);
          })
        }
      },
      dateFormat(date){
        let month = date.getMonth() + 1;
        let day = parseInt(date.getDate());
        month = month < 10 ? `0${month}` : month;
        day = day < 10 ? `0${day}` : day;
        return `${date.getFullYear()}-${month}-${day}`;
      },
      booking(){
        if (this.date) {
          let start_date = this.date[0];
          let end_date = this.date[1];
          let now_date = new Date();
  
          if (start_date.getFullYear() < now_date.getFullYear()) {
            this.$alert('请选择正确的年份', '提示', {
              confirmButtonText: '确定'
            });
            return;
          } else if (start_date.getFullYear() === now_date.getFullYear() && start_date.getMonth() < now_date.getMonth()) {
            this.$alert('请选择正确的月份', '提示', {
              confirmButtonText: '确定'
            });
            return;
          } else if (start_date.getMonth() === now_date.getMonth() && start_date.getDate() < now_date.getDate()) {
            this.$alert('请选择正确的日期', '提示', {
              confirmButtonText: '确定'
            });
            return;
          }
  
          if (start_date && end_date) {
            this.$alert(`
            <p>您的姓名：${this.$store.getters.currentUser.name}</p>
            <p>您的手机号码：${this.$store.getters.currentUser.tel}</p>
            <p>您的身份证号：${this.$store.getters.currentUser.idcard}</p>
            <p>入住日期：${this.dateFormat(start_date)}</p>
            <p>退房日期：${this.dateFormat(end_date)}</p>`, '确认预订', {
              dangerouslyUseHTMLString: true,
              showCancelButton: true,
              callback: (btn) => {
                if (btn === 'confirm') {
                  this.$Axios.post('/api/order/createOrder', {
                    username: this.$store.getters.currentUser.name,
                    idcard: this.$store.getters.currentUser.idcard,
                    account: this.currentUser.account,
                    type: this.src_hotel.type,
                    room_type: this.src_hotel.room_type,
                    start_date: this.dateFormat(start_date),
                    end_date: this.dateFormat(end_date),
                    price: this.src_hotel.price
                  }).then(res => {
                    this.$message({
                      message: res.data,
                      type: 'success'
                    });
                    this.$router.push('/order');
                  })
                }
              }
            });
          } else {
            this.$alert('请先选择入住日期和离店日期', '提示', {
              confirmButtonText: '确定'
            });
          }
        } else {
          this.$message({
            message: '请先选择入住日期',
            type: 'error'
          })
        }
      }
    },
    computed: {
      isShow(){
        return JSON.stringify(this.src_hotel) == '{}'
      },
      currentUser(){
        return this.$store.getters.currentUser;
      }
    },
    created: function(){
      let hotelInfo = this.$route.params.hotel;
      for(let key in hotelInfo) {
        if(hotelInfo.hasOwnProperty(key)) {
          this.src_hotel[key] = hotelInfo[key];
        }
      }
    }
  }
</script>
<style scoped>
  .detail {
    position: relative;
    padding: 50px 180px;
  }

  .count {
    font-weight: bold;
    color: red;
  }

  .time {
    font-size: 18px;
    font-weight: normal;
    vertical-align: bottom;
  }

  .base_info {
    height: 80px;
    line-height: 80px;
    border-bottom: 1px solid #ccc;
    margin-top: 20px;
  }

  .addr {
    position: relative;
  }

  .score_num {
    font-size: 30px;
    font-style: normal;
    color: #ff8a00;
  }


  .detail button {
    width: 100px;
    height: 30px;
    border: 0;
    background-color: #ff9d00;
    border-radius: 5px;
    text-align: center;
    line-height: 30px;
    color: #fff;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    margin-top: 15px;
    position: absolute;
    right: 180px;
    bottom: 10px;
  }

  .detail button:hover {
    opacity: .9;
  }

  .score {
    position: absolute;
    top: -20px;
    right: 10px;
    z-index: 20;
  }

  .detail .title {
    font-size: 24px;
    color: #333;
    line-height: 30px;
  }

  img {
    cursor: pointer;
  }

  .big_img {
    width: 650px;
    height: 380px;
  }

  .small_img_ul {
    float: right;
    list-style: none;
    overflow: hidden;
    width: 335px;
  }

  .small_img_ul li {
    float: left;
    width: 150px;
    height: 120px;
    margin-bottom: 10px;
  }

  .small_img_ul li:nth-child(2n+1) {
    margin-left: 9px;
    margin-right: 10px;
  }

  .small_img_ul li:nth-child(2n) {
    float: right;
  }

  .small_img_ul li img {
    width: 150px;
    height: 120px;
    border-radius: 5px;
  }

  .jumbotron {
    background-color: #fff;
  }

  .jumbotron h1,
  .jumbotron p {
    text-align: center;
    color: #ff8a00;
  }

  .jumbotron p {
    color: red;
  }

  .el-range-editor.el-input__inner {
    margin: 10px 0;
    width: 400px;
  }
</style>