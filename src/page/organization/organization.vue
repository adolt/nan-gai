<template>
  <div>
    <el-tabs type="border-card">
      <el-tab-pane label="公司部门">
        <department></department>
      </el-tab-pane>
      <el-tab-pane label="工资组成">
        <wage></wage>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import department from './children/departments';
  import wage from './children/wage';
  
  export default {
    components: {
      department,
      wage
    }
  };
</script>
