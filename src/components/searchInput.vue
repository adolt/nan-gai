<template>
  <div>
    搜索：
    <el-input placeholder="请输入关键字" size="large" icon="search" v-model="keywords" :on-icon-click="handleIconClick">
    </el-input>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        keywords: ''
      };
    },
    methods: {
      handleIconClick(ev) {
        console.log(ev);
      }
    }
  };
</script>

<style scoped>
  .el-input {
    width: 20%;
    margin-bottom: 10px
  }

  .el-button {
    margin-right: 20px;
  }
</style>
