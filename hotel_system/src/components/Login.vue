<template>
  <div class="login">
    <div class="banner"></div>
    <div class="logo"></div>
    <div class="form">
      <form>
        <input v-model="account" type="text" placeholder="您的邮箱/手机号" required>
        <input v-model="password" type="password" placeholder="您的密码" required>
        <div style="height: 22px">
          <span class="forget" @click="dialogVisible = true;">忘记密码</span>
        </div>
        <Drag @pass="isPass = true;"></Drag>
        <button @click="login()">登 录</button>
        <div class="register">还没有账号？<router-link class="router-link" to="/register">马上注册</router-link></div>
      </form>
    </div>
    <el-dialog class="change_password" @close="clearData" width="30%" title="身份验证" :visible.sync="dialogVisible">
      <el-form size="small" label-width="100px" label-position="left">
        <template>
          <el-form-item label="您的账号">
            <el-input v-model="fgp_account"></el-input>
          </el-form-item>
          <el-form-item label="您的手机号">
            <el-input v-model="fgp_tel"></el-input>
          </el-form-item>
          <el-form-item label="您的身份证号">
            <el-input v-model="fgp_idcard"></el-input>
          </el-form-item>
          <el-button size="mini" @click="confirmInfo()">下一步</el-button>
        </template>
      </el-form>
    </el-dialog>
    <el-dialog class="change_password" @close="clearFields()" width="30%" title="设置密码" :visible.sync="dialogVisible2">
      <el-form label-position="left" :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="80px" class="demo-ruleForm">
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
        </el-form-item>
        <el-button size="mini" @click="submitForm('ruleForm2')">确定</el-button>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
  import Drag from './drag.vue';
  import { Loading } from 'element-ui';
  export default {
    data () {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm2.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        account: '',
        password: '',
        isPass: false,
        dialogVisible: false,
        dialogVisible2: false,
        active: 0,
        fgp_account: '',
        fgp_tel: '',
        fgp_idcard: '',
        isShow: true,
        ruleForm2: {
          pass: '',
          checkPass: ''
        },
        rules2: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ]
        }
      }
    },
    components: {
      Drag
    },
    methods: {
      next() {
        if (this.active++ > 2) this.active = 0;
      },
      clearFields(){
        this.fgp_account = '';
        this.fgp_tel = '';
        this.fgp_idcard = '';
        this.$refs.ruleForm2.resetFields();
      },
      clearData(){
        this.isShow = true;
      },
      async confirmInfo(){
        let loading = Loading.service({
          target: '.change_password',
          text: '正在验证身份，请稍后...',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        let res = await this.$Axios.post('/api/login/getAccount', {
          account: this.fgp_account,
          tel: this.fgp_tel,
          idcard: this.fgp_idcard
        });
        this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
          loading.close();
        });
        if (!res.data.is_pass) {
          this.$alert(res.data.msg, '错误', {
            type: 'error'
          })
        } else {
          this.dialogVisible = false;
          this.dialogVisible2 = true;
        }
      },
      login(){
        if (this.account === 'admin' && this.password === 'admin') {
          this.$router.push('/admin/index');
        } else {
          if (this.isPass) {
            this.$Axios.post(`/api/register/getAccount`, {
              account: this.account,
              password: this.password
            })
            .then(res => {
              let userInfo = res.data[0];
              if (this.password == res.data[0].password) {
                this.$message({
                  message: '登录成功',
                  type: 'success'
                });
                this.$store.dispatch('login');
                this.$store.dispatch('initUser', userInfo);
                this.$router.push({name: 'index'});
              } else {
                this.$message.error('抱歉，密码错误，请重新输入');
              }
            })
            .catch(error => {
              console.log(error);
            })
          } else {
            this.$message({
              message: '请先滑动滑块验证',
              type: 'error'
            });
          }
        }
      },
      submitForm(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$Axios.post('/api/user/changePassword', {
              account: this.fgp_account,
              password: this.ruleForm2.pass
            }).then(res => {
              this.$message({
                type: 'success',
                message: res.data
              });
              this.dialogVisible2 = false;
            })
          } else {
            this.$message({
              type: 'error',
              message: '输入有误，请重新输入！'
            })
          }
        });
      }
    }
  }
</script>
<style lang="css" scoped>
  .login {
    height: 100%;
    position: relative;
  }
  .banner {
    height: 100%;
    background: url(../assets/banner.jpg) no-repeat;
  }

  .form {
    width: 350px;
    height: 260px;
    border: 1px solid #0094ff;
    margin: 0 auto;
    position: absolute;
    top: 200px;
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

  .form .forget {
    display: block;
    float: right;
    font-size: 12px;
    color: #ffa800;
    text-decoration: none;
    margin-right: 6px;
    font-weight: 550;
    cursor: pointer;
  }

  .form .forget:hover {
    text-decoration: underline;
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
    margin-top: 15px;
  }

  .form button:hover {
    opacity: .9;
  }

  .login .logo {
    width: 75px;
    height: 90px;
    position: absolute;
    top: 130px;
    left: 50%;
    background: url(../assets/logo_w.png) no-repeat;
    -webkit-background-size: 50px 50px;
    background-size: 50px 50px;
    margin: 0 auto;
    margin-left: -26.5px;
  }

  .register {
    position: absolute;
    bottom: -50px;
    left: 50%;
    width: 140px;
    margin-left: -70px;
    background-color: #000;
    border-radius: 15px;
    background-color: rgba(0,0,0,.4);
    text-align: center;
    font-size: 12px;
    color: #fff;
    padding: 4px 0;
    text-shadow: 1px 1px 1px rgba(0,0,0,.4);
  }

  .register .router-link {
    color: #ffa800;
    margin-left: 6px;
  }

</style>