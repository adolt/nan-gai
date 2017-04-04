<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>{{title}}</span>
      <slot></slot>
    </div>
    <div class="description">
      {{description}}
    </div>
  </el-card>
</template>

<script>
  export default {
    props: ['title', 'description']
  };
</script>

<style scoped>
  
  .el-card {
    margin-bottom: 10px;
  }
</style>
