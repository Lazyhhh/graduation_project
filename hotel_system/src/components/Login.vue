<!--  -->
<template>
  <div class="login">
    <div class="login_box">
      <div class="login_header">
        <img style="width: 48px;height: 48px;" src="../assets/login/hotel_logo.png" alt>
      </div>
      <div class="login_text">Welcome To Hotel</div>
      <div class="login_content">
        <form action="#">
          <p>用户名</p>
          <input type="text" name="username" v-model="username">
          <p class="password" style="margin-top: 20px;float: left">密码</p>
          <p class="password forget" style="margin-top: 20px;float: right">忘记密码？</p>
          <input type="text" name="password" v-model="password">
          <input class="submit" type="submit" value="登录">
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  beforeCreate: function() {
    document.getElementsByTagName("body")[0].className = "add_bg";
  }
};
</script>
<style scoped>
.login {
  height: 670px;
  padding-top: 30px;
}

.add_bg {
  background-color: #eee;
}

.login_box {
  width: 300px;
  height: 500px;
  margin: 0 auto;
}

.login_header {
  padding: 10px;
  margin-bottom: 10px;
}

.login_text {
  font-size: 24px;
  font-weight: 300;
  margin-bottom: 10px;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial,
    sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;
}

.login_content {
  width: 266px;
  height: 200px;
  padding: 20px;
  text-align: left;
  border: 1px solid #d8dee2;
  border-radius: 5px;
  background-color: #fff;
}

.login_content p {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 8px;
}

.login_content input {
  width: 248px;
  border: 1px solid #d1d5da;
  min-height: 20px;
  box-shadow: inset 0 1px 2px rgba(27, 31, 35, 0.075);
  padding: 6px 8px;
  vertical-align: center;
  outline: none;
  line-height: 20px;
  border-radius: 3px;
}

.login_content .password {
  margin-top: 20px;
  float: left;
}

.login_content .forget {
  color: #0366d6;
}

.login_content .forget:hover {
  cursor: pointer;
  text-decoration: underline;
  opacity: 0.8;
}

input:focus {
  box-shadow: 0 0 4px rgb(31, 125, 219);
}

.login_content .submit {
  width: 100%;
  color: #fff;
  margin-top: 20px;
  background-color: #28a745;
  background-image: linear-gradient(-180deg, #34d058, #28a745 90%);
  border: 1px solid rgba(27, 31, 35, 0.2);
}

.login_content .submit:hover {
  cursor: pointer;
  border: 1px solid rgba(27, 31, 35, 0.5);
  background-image: linear-gradient(-180deg, #0cbd35, #23923d 90%);
}
</style>