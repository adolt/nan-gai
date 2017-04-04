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
  </el-menu>
</template>

<script>
  export default {
    data() {
      return {
        activeIndex: '1'
      };
    }
  };
</script>

<style scoped>
  a {
    text-decoration: none;
  }
</style>
