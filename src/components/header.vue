<template>
  <div>
    <el-menu theme="dark" :default-active="activeIndex" :router="true" class="el-menu-demo" mode="horizontal">
      <el-menu-item index="/hire">招聘管理
      </el-menu-item>
      <el-menu-item index="/salary">工资管理
      </el-menu-item>
      <el-menu-item index="/staff">员工档案管理
      </el-menu-item>
      <el-menu-item index="/organization">组织规划管理
      </el-menu-item>
      <el-menu-item class="assign" v-if="admin" @click="assign">分配账号
      </el-menu-item>
      <span class="welcome" v-if="!!user">欢迎,&nbsp;&nbsp;&nbsp;&nbsp;{{ user }}</span>
      <el-menu-item @click="logout">注销</el-menu-item>
    </el-menu>
  
    <el-dialog title="分配账号" size="tiny" :visible.sync="visible">
      <el-form :model="form" :rules="rules" ref="loginForm">
        <el-form-item label="账号" prop="userId">
          <el-input v-model="form.userId" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="userPassword">
          <el-input type="password" v-model="form.userPassword" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="success" @click="this.visible = false;">取 消</el-button>
        <el-button type="primary" @click="signup()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import bus from '../page/bus';
import axios from 'axios';
import router from '../router/router';
export default {
  data() {
    return {
      activeIndex: '/hire',
      bus: bus,
      admin: false,
      visible: false,
      user: '',
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
    console.log(bus.super);
    this.admin = !!bus.super;
    this.user = bus.user;
  },
  beforeUpdate() {
    this.admin = !!bus.super;
    this.user = bus.user;
  },
  methods: {
    assign() {
      this.visible = true;
      this.form = {
        userId: '',
        userPassword: ''
      };
    },
    logout() {
      this.bus.user = '';
      if (this.bus.super) {
        this.bus.super = false;
      }
      sessionStorage.setItem('user', '');
      this.$message.success('注销成功！');
      router.push('login');

    },
    signup() {
      axios.post('/user/signup', this.form)
        .then((res) => {
          if (res.data === 1) {
            this.$message.success('注册成功！');
            this.visible = false;
          }
        })
        .catch((err) => {
          if (err) {
            this.$message.error('网络错误！');
          }
        });
    }
  }
};
</script>

<style scoped>
a {
  text-decoration: none;
}

.welcome {
  display: inline-block;
  position: absolute;
  top: 20px;
  right: 80px;
  color: white;
}

.assign {
  color: #13CE66;
}

.el-menu-item:last-child {
  color: red;
  position: fixed;
  right: 10px;
}
</style>
