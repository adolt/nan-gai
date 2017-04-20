<template>
  <div>
    <searchInput>
      <el-button @click="modal('new')" style="float: right;" type="primary">新增</el-button>
    </searchInput>
    <hiringCard title="新媒体运营专员" description="1-3年工作经历，有独立负责至少一次参与量超过10w+的互联网营销活动.......">
      <el-button @click="visible = false" style="float: right;" type="primary">删除</el-button>
      <el-button @click="modal('edit', $event)" style="float: right;" type="primary">修改</el-button>
    </hiringCard>
    <hiringCard title="新媒体运营专员" description="1-3年工作经历，有独立负责至少一次参与量超过10w+的互联网营销活动.......">
      <el-button @click="visible = false" style="float: right;" type="primary">删除</el-button>
      <el-button @click="modal('edit', $event)" style="float: right;" type="primary">修改</el-button>
    </hiringCard>
    <hiringCard title="新媒体运营专员" description="1-3年工作经历，有独立负责至少一次参与量超过10w+的互联网营销活动.......">
      <el-button @click="visible = false" style="float: right;" type="primary">删除</el-button>
      <el-button @click="modal('edit', $event)" style="float: right;" type="primary">修改</el-button>
    </hiringCard>
    <hiringCard title="新媒体运营专员" description="1-3年工作经历，有独立负责至少一次参与量超过10w+的互联网营销活动.......">
      <el-button @click="visible = false" style="float: right;" type="primary">删除</el-button>
      <el-button @click="modal('edit', $event)" style="float: right;" type="primary">修改</el-button>
    </hiringCard>
    <hiringCard title="新媒体运营专员" description="1-3年工作经历，有独立负责至少一次参与量超过10w+的互联网营销活动.......">
      <el-button @click="visible = false" style="float: right;" type="primary">删除</el-button>
      <el-button @click="modal('edit', $event)" style="float: right;" type="primary">修改</el-button>
    </hiringCard>
    <pagination></pagination>
    <el-dialog :title="operation" v-model="visible">
      <el-form :model="form">
        <el-form-item label="职位名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="薪资范围" :label-width="formLabelWidth">
          <el-input v-model="form.range" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="详细描述" :label-width="formLabelWidth">
          <el-input v-model="form.detail" type="textarea" :rows="3" placeholder="请输入描述内容"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="visible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import hiringCard from './hiringCard';
  import searchInput from '../../../components/searchInput';
  import pagination from '../../../components/pagination';
  
  export default {
    data() {
      return {
        visible: false,
        operation: '',
        form: {
          name: '',
          range: '',
          detail: ''
        },
        formLabelWidth: '120px'
      };
    },
    components: {
      hiringCard,
      searchInput,
      pagination
    },
    methods: {
      modal(type) {
        this.operation = type === 'new' ? '新增在招岗位' : '编辑在招岗位';
        this.visible = true;
        if (type === 'edit') {
          this.form = {
            name: '新媒体运营专员',
            range: '10k',
            detail: '1-3年工作经历，有独立负责至少一次参与量超过10w+的互联网营销活动.......'
          };
        } else {
          this.form = {
            name: '',
            range: '',
            detail: ''
          };
        }
      }
    }
  };
</script>

<style scoped>
  .el-button+.el-button {
    margin-left: 10px;
    margin-right: 5px;
  }
</style>
