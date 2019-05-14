<template>
  <div class="register">
    <div class="banner"></div>
    <div class="logo"></div>
    <div class="form">
      <form ref="form">
        <input v-model="name" type="text" placeholder="您的姓名" required>
        <input v-model="account" type="text" placeholder="您的账号" required>
        <input v-model="password" ref="password" type="password" minlength="6" placeholder="您的密码" required>
        <input v-model="confirm_psw" ref="" type="password" placeholder="确认密码" @blur="checkPassword()" required>
        <input v-model="tel" type="text" placeholder="您的手机号" @blur="checkForm('tel', 'phone_display')" required>
        <input v-model="idcard" type="text" placeholder="您的身份证号码" @blur="checkForm('idcard', 'idcard_display')" required>
        <Drag @pass="isPass = true;"></Drag>
        <button style="margin-top: 10px" @click="register()">注 册</button>
        <div v-show="password_display" class="error-tip el-icon-error">两次密码不一致，请重新输入</div>
        <div v-show="phone_display" class="error-tip el-icon-error">手机号码输入有误，请重新输入</div>
        <div v-show="idcard_display" class="error-tip el-icon-error">身份证号输入有误，请重新输入</div>
      </form>
    </div>
  </div>
</template>
<script>
  import Drag from './drag.vue';
  export default {
    data () {
      return {
        account: '',
        password: '',
        confirm_psw: '',
        tel: '',
        idcard: '',
        name: '',
        isPass: false,
        password_display: false,
        phone_display: false,
        idcard_display: false
      }
    },
    components: {
      Drag
    },
    computed: {
      isValid(){
        if (!this.account || !this.password || !this.tel || !this.idcard || !this.name) {
          return false;
        }
        return true;
      }
    },
    methods: {
      register(){
        let form = this.$refs.form;
        let data = new FormData();
        if (!this.isPass) {
          this.$message({
            message: '请先滑动滑块验证',
            type: 'error'
          });
          return;
        }
        if (this.isValid && !this.password_display && !this.phone_display && !this.idcard_display) {
          this.$Axios.post('/api/register/createAccount', {
          name: this.name,
          account: this.account,
          password: this.password,
          tel: this.tel,
          idcard: this.idcard
        })
        .then(res => {
          if (res.data.isExistence) {
            this.$message.error(`${res.data.message}`);
          } else {
            this.$message({
              message: '注册成功',
              type: 'success'
            });
            this.$router.push('/login')
          }
        })
        .catch(err => {
          console.log('注册失败');
        })
        } else {
          this.$message.error('请输入正确信息后再点击注册');
        }
      },
      checkForm(key, displayKey){
        let phoneReg = /^1[3|4|5|7|8]\d{9}$/;
        let IDCARDReg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        let formObj = {
          tel: phoneReg,
          idcard: IDCARDReg
        }
        if (this[key] !== '') {
          this[displayKey] = formObj[key].test(this[key]) ? false : true;
        }
      },
      checkPassword(){
        this.password_display = this.password === this.confirm_psw ? false : true;
      }
    }
  }
</script>
<style scoped>

.register {
  height: 100%;
  position: relative;
}

.banner {
  height: 100%;
  background: url(../assets/reg_banner.jpg) no-repeat;
}

.logo {
  width: 75px;
  height: 90px;
  position: absolute;
  top: 40px;
  left: 50%;
  background: url(../assets/logo_w.png) no-repeat;
  -webkit-background-size: 50px 50px;
  background-size: 50px 50px;
  margin: 0 auto;
  margin-left: -32.5px;
}

.form {
  width: 350px;
  height: auto;
  border: 1px solid #0094ff;
  margin: 0 auto;
  position: absolute;
  top: 100px;
  left: 50%;
  margin-left: -185px;
  border-radius: 10px;
  background-color: #fff;
  text-align: center;
  padding: 20px;
  padding-top: 30px;
}

.form input {
  width: 306px;
  height: 42px;
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
}

.form input:focus {
  border: 1px solid #ffa200;
  box-shadow: 0 0 5px #ffa200;
  outline: 0;
  transition: box-shadow .25s linear 0s;
  -webkit-transition: box-shadow .25s linear 0s;
}

.form button {
  width: 306px;
  height: 42px;
  border: 0;
  background-color: #ffa800;
  border-radius: 5px;
  text-align: center;
  line-height: 40px;
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  margin-bottom: 10px;
}

.form button:hover {
  opacity: .9;
}

.error-tip {
  color: red;
}
.el-icon-error::before {
  margin-right: 5px;
}
</style>