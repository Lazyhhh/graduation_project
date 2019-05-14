<template>
  <div>
    <ul class="comment">
      <li v-for="comment in comments">
        <img class="comment-img" :src="comment.img_src">
        <div class="right-div">
          <div class="title">{{ comment.title }}</div>
          <div class="desc">{{ comment.desc }}</div>
          <div class="footer">
            <i class="el-icon-location"></i>
            <span>{{ comment.addr }}，by </span>
            <span class="author">{{ comment.author }}</span>
            <i class="el-icon-time"></i>
            <span>{{ comment.date }}</span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        comments: []
      }
    },
    mounted(){
      this.$Axios.post('/api/comment/getComment', {})
      .then(res => {
        this.comments = res.data
      }).catch(err => {
        console.log(err);
      })
    }
  }
</script>
<style>
  .right-div {
    position: relative;
    float: left;
    height: 150px;
    margin-left: 20px;
    flex: 1;
  }
  .comment-img {
    float: left;
    width: 220px;
    height: 150px;
  }
  .comment {
    list-style: none;
  }
  .comment li {
    height: 150px;
    margin-bottom: 30px;
    display: flex;
  }

  .comment .title {
    font-size: 18px;
    color: #333;
    margin-bottom: 10px;
  }

  .comment .desc {
    font-size: 14px;
    color: #666;
    max-height: 80px;
    overflow: auto;
  }

  .footer {
    position: absolute;
    bottom: 0;
    left: 0;
    color: #666;
    font-size: 14px;
  }

  .footer i {
    font-size: 16px;
    color: #aaa;
  }

  .author {
    color: #ff9d00;
  }


</style>