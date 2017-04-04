<template>
  <div>
    <el-tabs type="border-card">
      <el-tab-pane label="在招岗位">
        <hiring></hiring>
      </el-tab-pane>
      <el-tab-pane label="求职者管理">
        <candidates></candidates>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import hiring from './children/hiring';
  import candidates from './children/candidates';

  export default {
    components: {
      hiring,
      candidates
    }
  };
</script>
