<template>
  <div>
    <el-tabs type="border-card">
      <el-tab-pane label="在招岗位">
        <hiring></hiring>
      </el-tab-pane>
      <el-tab-pane label="求职者管理">
        <candidates></candidates>
      </el-tab-pane>
    </el-tabs>
    <el-dialog title="请登录" size="tiny" :visible.sync="notlogin" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
      <el-form :model="form" :rules="rules" ref="loginForm">
        <el-form-item label="账号" prop="userId">
          <el-input v-model="form.userId" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="userPassword">
          <el-input type="password" v-model="form.userPassword" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="login">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import hiring from './children/hiring';
import candidates from './children/candidates';
import bus from '../bus';
import axios from 'axios';

export default {
  data() {
    return {
      notlogin: true,
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
  created() {
    axios.defaults.baseURL = 'http://localhost:8080';
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = 'http://localhost:3000';
    if (sessionStorage.getItem('user')) {
      this.notlogin = false;
    }
  },
  components: {
    hiring,
    candidates
  },
  methods: {
    login() {
      this.$refs['loginForm'].validate((valid) => {
        if (!valid) {
          this.$message.info('请输入登录名和密码!');
          return;
        }
        axios.post('/user/login', this.form)
          .then((res) => {
            if (res.data !== -1) {
              this.$message.success('登陆成功, 欢迎  ' + res.data);
              bus.user = res.data;
              sessionStorage.setItem('user', res.data);
              this.notlogin = false;
            } else {
              this.$message.error('用户名或密码错误');
            }
          })
          .catch((err) => {
            if (err) {
              this.$message.error('网络错误！');
            }
          });
      });
    }
  }
};
</script>
