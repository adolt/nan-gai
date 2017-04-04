<template>
  <el-table :data="tableData" stripe style="width: 100%">
    <el-table-column prop="name" label="姓名">
    </el-table-column>
    <el-table-column prop="job" label="职位">
    </el-table-column>
    <el-table-column prop="phone" label="电话">
    </el-table-column>
    <el-table-column prop="date" label="日期">
    </el-table-column>
    <el-table-column prop="date" label="操作">
      <template scope="scope">
        <el-button @click="modal" type="text">修改</el-button>
        <el-button @click="modal" type="text">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    props: ['data'],
    data() {
      return {
        tableData: [].concat(this.data)
      };
    },
    methods: {
      modal() {
        this.$emit('modal');
      }
    }
  };
</script>
