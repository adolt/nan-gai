<template>
  <el-table :data="tableData" border style="width: 100%">
    <el-table-column prop="staffName" label="姓名">
    </el-table-column>
    <el-table-column prop="staffNum" label="工号">
    </el-table-column>
    <el-table-column prop="staffOrga" label="部门">
    </el-table-column>
    <el-table-column prop="staffTel" label="电话">
    </el-table-column>
    <el-table-column label="操作">
      <template scope="scope">
        <el-button @click="editIt(scope.$index)" type="text">查看</el-button>
        <el-button @click="remove(scope.$index)" type="text">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import bus from '../page/bus';
export default {
  props: ['data', 'type'],
  methods: {
    editIt(index) {
      if (this.type === 'staff') {
        bus.$emit('editStaff', index);
      } else {
        bus.$emit('editSalary', index);
      }
    },
    remove(index) {
      if (this.type === 'staff') {
        bus.$emit('removeStaff', index);
        console.log('removeStaff');
      } else {
        console.log('removeSalary');
        bus.$emit('removeSalary', index);
      }
    }
  },
  computed: {
    tableData() {
      return [].concat(this.data);
    }
  }
};
</script>
