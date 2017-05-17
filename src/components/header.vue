<template>
  <el-menu theme="dark" :default-active="activeIndex" :router="true" class="el-menu-demo" mode="horizontal">
    <el-menu-item index="/hire">招聘管理
    </el-menu-item>
    <el-menu-item index="/salary">工资管理
    </el-menu-item>
    <el-menu-item index="/staff">员工档案管理
    </el-menu-item>
    <el-menu-item index="/organization">组织规划管理
    </el-menu-item>
    <span class="welcome" v-if="!!bus.user">欢迎,&nbsp;&nbsp;&nbsp;&nbsp;{{ bus.user }}</span>
    <el-menu-item index="/hire" @click="logout">注销</el-menu-item>
  </el-menu>
</template>

<script>
import bus from '../page/bus';
export default {
  data() {
    return {
      activeIndex: '/hire',
      bus: bus
    };
  },
  methods: {
    logout() {
      this.bus.user = '';
      sessionStorage.setItem('user', '');
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
.el-menu-item:last-child {
  color: red;
  position: fixed;
  right: 10px;
}
</style>
