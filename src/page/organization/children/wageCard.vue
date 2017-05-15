<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span><b>{{name}}</b></span>
      <slot></slot>
    </div>
    <div class="description">
      <b>工资组成：</b>
      <p><el-tag type="success" v-for="item in tags" key="item">
        {{item}}
      </el-tag></p>
    </div>
  </el-card>
</template>

<script>
  export default {
    props: ['wage'],
  
    data() {
      return {
        tags: [].concat(this.wage.tags),
        name: this.wage.name
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

