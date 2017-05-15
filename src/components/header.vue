<template>
  <el-menu theme="dark" :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
    <el-menu-item index="1">
      <router-link to="/hire">招聘管理</router-link>
    </el-menu-item>
    <el-menu-item index="2">
      <router-link to="/salary">工资管理</router-link>
    </el-menu-item>
    <el-menu-item index="3">
      <router-link to="/staff">员工档案管理</router-link>
    </el-menu-item>
    <el-menu-item index="4">
      <router-link to="/organization">组织规划管理</router-link>
    </el-menu-item>
    <span class="welcome" v-if="!!bus.user">欢迎,&nbsp;&nbsp;&nbsp;&nbsp;{{ bus.user }}</span>
  </el-menu>
</template>

<script>
import bus from '../page/bus';
export default {
  data() {
    return {
      activeIndex: '1',
      bus: bus
    };
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
  right: 50px;
  color: white;
}
</style>
