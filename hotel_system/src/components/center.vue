<template>
  <div class="center">
    <el-tabs :tab-position="tabPosition" style="height: 200px;">
      <el-tab-pane label="个人信息">
        <el-form label-width="80px">
          <el-form-item label="姓名">
            <el-input disabled v-model="currentUser.name"></el-input>
          </el-form-item>
          <el-form-item label="身份证">
            <el-input disabled v-model="currentUser.idcard"></el-input>
          </el-form-item>
          <el-form-item label="手机号码">
            <el-input disabled v-model="currentUser.tel"></el-input>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="账号安全">
        密码：<span @click="dialogVisible = true" class="fix-password">修改密码</span>
      </el-tab-pane>
    </el-tabs>
    <el-dialog class="change_password" @close="clearFields()" width="30%" title="修改密码" :visible.sync="dialogVisible"> 
      <el-form label-position="left" :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="80px" class="demo-ruleForm">
        <el-form-item label="原密码">
          <el-input type="password" v-model="ruleForm2.src_pass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="pass">
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
        tabPosition: 'left',
        dialogVisible: false,
        ruleForm2: {
          pass: '',
          checkPass: '',
          src_pass: ''
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
    methods: {
      clearFields(){
        this.ruleForm2.src_pass = '';
        this.$refs.ruleForm2.resetFields();
      },
      submitForm(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$Axios.post('/api/user/changePassword', {
              src_pass: this.ruleForm2.src_pass,
              account: this.$store.getters.currentUser.account,
              password: this.ruleForm2.pass
            }).then(res => {
              if (res.data.flag) {
                this.$message({
                  type: 'success',
                  message: res.data.msg
                });
                this.dialogVisible = false;
              } else {
                this.$message({
                  type: 'error',
                  message: res.data.msg
                });
              }
            })
          } else {
            this.$message({
              type: 'error',
              message: '输入有误，请重新输入！'
            })
          }
        });
      }
    },
    computed: {
      currentUser(){
        return this.$store.getters.currentUser
      }
    }
  }
</script>
<style scoped>
  .center {
    padding: 50px 180px;
  }

  .fix-password {
    color: #409EFF;
    cursor: pointer;
  }

  .fix-password:hover {
    text-decoration: underline;
  }
</style>