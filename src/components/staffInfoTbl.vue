<template>
  <el-table :data="tableData" border style="width: 100%">
    <el-table-column prop="name" label="姓名">
    </el-table-column>
    <el-table-column prop="code" label="编号">
    </el-table-column>
    <el-table-column prop="org" label="组织">
    </el-table-column>
    <el-table-column prop="tel" label="电话">
    </el-table-column>
    <el-table-column label="操作">
      <template scope="scope">
          <el-button @click="showDetail('view')" type="text">查看</el-button>
          <el-button @click="showDetail('edit')" type="text">编辑</el-button>
</template>
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    props: ['data'],
    methods: {
      showDetail(type) {
        console.log(type);
        if (type === 'view') {
          this.$emit('view');
        } else {
          this.$emit('edit');
        }
      }
    },
    data() {
      return {
        tableData: [].concat(this.data)
      };
    }
  };
</script>
