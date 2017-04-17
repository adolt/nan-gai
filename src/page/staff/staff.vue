<template>
  <div>
    <el-tabs type="border-card">
      <el-tab-pane label="员工档案管理">
        <staffList></staffList>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import staffList from './children/staffList';
  
  export default {
    components: {
      staffList
    }
  };
</script>
