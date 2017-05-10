<template>
  <el-table :data="tableData" stripe style="width: 100%">
    <el-table-column prop="hipeName" label="姓名">
    </el-table-column>
    <el-table-column prop="hipeJob" label="求职岗位">
    </el-table-column>
    <el-table-column prop="hipeTel" label="电话">
    </el-table-column>
    <el-table-column prop="hipeTime" label="日期">
    </el-table-column>
    <el-table-column prop="hipeId" label="操作">
      <template scope="scope">
        <el-button @click="editIt(scope.$index)" type="text">修改</el-button>
        <el-button @click="remove(scope.$index)" type="text">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  import bus from '../../bus';
  export default {
    props: ['data'],
    methods: {
      editIt(index) {
        bus.$emit('editIt', index);
      },
      remove(index) {
        bus.$emit('remove', index);
      }
    },
    computed: {
      tableData() {
        return [].concat(this.data);
      }
    }
  };
</script>
