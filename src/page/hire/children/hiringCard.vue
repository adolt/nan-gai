<template>
  <div>
    <el-card class="box-card" v-popover:popover>
      <div slot="header" class="clearfix">
        <span>{{title}}</span>
        <el-popover ref="promot" placement="top" width="100" v-model="promotVis">
          <p>确定删除吗？</p>
          <div style="text-align: right; margin: 0">
            <el-button size="mini" type="text" @click="promotVis = false">取消</el-button>
            <el-button type="primary" size="mini" @click="remove">确定</el-button>
          </div>
        </el-popover>
        <el-button style="float: right;" type="primary" v-popover:promot>删除</el-button>
        <el-button @click="edit" style="float: right;" type="primary">修改</el-button>
      </div>
      <div class="description">
        {{description}}
      </div>
      <el-popover ref="popover" placement="top-start" :title="title" width="500" trigger="hover" :content="description">
      </el-popover>
    </el-card>
  
  </div>
</template>

<script>
  export default {
    data() {
      return {
        promotVis: false
      };
    },
    props: ['title', 'description'],
    methods: {
      edit() {
        this.$emit('edit');
      },
      remove() {
        this.promotVis = false;
        this.$emit('remove');
      }
    }
  };
</script>

<style scoped>
  .el-card {
    margin-bottom: 10px;
  }
  
  .el-button+.el-button {
    margin-left: 10px;
    margin-right: 5px;
  }
</style>
