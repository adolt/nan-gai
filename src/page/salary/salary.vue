<template>
  <div>
    <el-tabs type="border-card">
      <el-tab-pane label="员工工资情况">
        <salaryList></salaryList>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import salaryList from './children/salaryList';
  
  export default {
    components: {
      salaryList
    }
  };
</script>
