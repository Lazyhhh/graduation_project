<template>
  <div class="row">
    <div v-for="hotel,index in hotels" class="hotel col-sm-3 col-md-3" @click="goDetail(hotel)">
      <div :class="'mr'">
        <div class="pic">
          <img :src="hotel.src">
          <div class="bag-opa"></div>
        </div>
        <div class="fraction">{{ hotel.score }}分</div>
        <div class="info">
          <div class="prize"></div>
          <p>{{ hotel.title }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        hotels: [{
          title: '标准单床房',
          src: '../../static/hotels/1.jpeg',
          score: 8.4,
          type: '0',
          room_type: '0',
          price: 118
        }, {
          title: '标准大床房',
          src: '../../static/hotels/2.jpeg',
          score: 9.0,
          type: '0',
          room_type: '1',
          price: 148
        }, {
          title: '商务大床房',
          src: '../../static/hotels/3.jpeg',
          score: 8.2,
          type: '0',
          room_type: '2',
          price: 148
        }, {
          title: '豪华大床房',
          src: '../../static/hotels/4.jpeg',
          score: 8.5,
          type: '0',
          room_type: '3',
          price: 148
        }, {
          title: '标准双床房',
          src: '../../static/hotels/1.jpeg',
          score: 8.4,
          type: '1',
          room_type: '0',
          price: 148
        }, {
          title: '标准双大床房',
          src: '../../static/hotels/2.jpeg',
          score: 9.0,
          type: '1',
          room_type: '1',
          price: 148
        }, {
          title: '商务双大床房',
          src: '../../static/hotels/3.jpeg',
          score: 8.2,
          type: '1',
          room_type: '2',
          price: 148
        }, {
          title: '豪华双大床房',
          src: '../../static/hotels/4.jpeg',
          score: 8.5,
          type: '1',
          room_type: '3',
          price: 148
        }]
      }
    },
    methods: {
      goDetail(hotel){
        this.$router.push({
          name: 'detail', 
          params: {
            hotel
          }
        })
      }
    }
  }
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
}

.hotel {
  margin-bottom: 10px;
}

.pic {
  width: 100%;
  cursor: pointer;
}

.row {
  margin-top: 15px;
}

.mr {
  margin-right: 10px;
}

.pic img {
    width: 100%;
    height: 100%;
}

.fraction {
    width: 55px;
    height: 25px;
    font-size: 18px;
    color: #FFF;
    background: rgba(0,0,0,0.5);
    position: absolute;
    left: 13px;
    top: 13px;
    text-align: center;
    line-height: 25px;
    border-radius: 4px;
    z-index: 5;
}

.info {
    position: absolute;
    z-index: 3;
    left: 13px;
    bottom: 13px;
    width: 220px;
    margin-top: -30px;
    color: #FFF;
    text-align: left;
}

.info p {
    text-shadow: 2px 2px 2px rgba(0,0,0,0.8);
    font-size: 14px;
}

.info p.eng {
    font-size: 12px;
}
</style>  