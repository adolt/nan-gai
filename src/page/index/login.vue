<template>
  <div class="content">
    <img src="./logo.png" alt="南盖" style="width: 20%;padding-top: 2%;">
    <p>最称手的人力资源管理系统</p>
    <div class="loginForm" @keypress.enter="loginBtnClick">
      <el-form :model="form" :rules="rules" ref="loginForm">
        <el-form-item label="账号" :required="true" prop="userId">
          <el-input v-model="form.userId" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :required="true" prop="userPassword">
          <el-input type="password" v-model="form.userPassword" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="!!waiting" :disabled="!!waiting" @click="loginBtnClick">登陆</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import bus from '../bus';
import axios from 'axios';
import router from '../../router/router';
export default {
  data() {
    return {
      waiting: false,
      form: {
        userId: '',
        userPassword: ''
      },
      rules: {
        userId: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        userPassword: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    loginBtnClick() {
      this.$refs['loginForm'].validate((valid) => {
        if (valid) {
          this.waiting = true;
          this.login();
        } else {
          return false;
        }
      });
    },
    login() {
      axios.post('/user/login', this.form)
        .then((res) => {
          if (res.data !== -1) {
            this.$message.success('登陆成功, 欢迎  ' + res.data);
            bus.user = res.data;
            if (this.form.userId === '1') {
              bus.super = true;
            }
            console.log('xx');
            sessionStorage.setItem('user', res.data);
            router.push('hire');
          } else {
            this.$message.error('用户名或密码错误');
          }
        })
        .catch((err) => {
          if (err) {
            this.$message.error('网络错误！');
          }
        });
      // axios.post('/login', this.form)
      //   .then((res) => {
      //     if (res.data.error === 0) {
      //       this.$message.success('登陆成功')
      //       state.token = res.data.token
      //       axios.defaults.headers.common['x-access-token'] = res.data.token
      //       router.push('/dashboard')
      //     } else if (res.data.error === 2) {
      //       this.$message.error('登陆失败，用户名或密码不正确')
      //     }
      //     this.waiting = false
      //   })
      //   .catch((err) => {
      //     if (err) {
      //       console.log(err)
      //       this.$message.error('网络错误')
      //       this.waiting = false
      //     }
      //   })
    }
  },
  created() {
    axios.defaults.baseURL = 'http://localhost:8080';
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = 'http://localhost:3000';
  }
};
</script>

<style>
div.content {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
}

div.loginForm {
  display: inline-flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  width: 18%;
  min-width: 250px;
  min-height: 250px;
  padding: 30px 15px;
  border: 1px solid #eaeefb;
  border-radius: 5px;
  box-shadow: 0 0 8px 0 rgba(232, 237, 250, .6), 0 2px 4px 0 rgba(232, 237, 250, .5);
}

form.el-form {
  padding: 10px;
  min-width: 200px;
}
</style>
