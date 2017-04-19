<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>{{name}}</span>
      <slot></slot>
    </div>
    <div class="description">
      <b>部门岗位：</b>
      <el-tag type="primary" v-for="item in items" key="item">
        {{item}}
      </el-tag>
    </div>
  </el-card>
</template>

<script>
  export default {
    props: ['depart'],
  
    data() {
      return {
        items: [].concat(this.depart.jobs),
        name: this.depart.name
      };
    }
  };
</script>

<style scoped>
  .el-card {
    margin-bottom: 10px;
  }

  span.el-tag {
    margin: 0px 5px;
  }
</style>
