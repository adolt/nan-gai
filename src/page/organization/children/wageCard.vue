<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span><b>{{name}}</b></span>
      <slot></slot>
    </div>
    <div class="description">
      工资组成：
      <p>工资：<el-tag type="primary" v-for="item in salary" key="item">
        {{item}}
      </el-tag></p>
      <p>福利：<el-tag type="success" v-for="item in welfare" key="item">
        {{item}}
      </el-tag></p>
      <p>社会保障：<el-tag type="warning" v-for="item in social" key="item">
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
        salary: [].concat(this.wage.salary),
        welfare: [].concat(this.wage.welfare),
        social: [].concat(this.wage.social),
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

