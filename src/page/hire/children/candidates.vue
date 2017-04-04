<template>
  <div>
    <searchInput>
      <el-button @click="modal('new', $event)" style="float: right;" type="primary">新增</el-button>
    </searchInput>
    <candidateCard :data="tableData" @modal="modal('edit', $event)">
    </candidateCard>
    <pagination></pagination>
    <el-dialog :title="operation" v-model="visible">
      <el-form :model="form">
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" :label-width="formLabelWidth">
          <el-input v-model="form.phone" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="form.mail" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="意向岗位" :label-width="formLabelWidth">
          <el-input v-model="form.job" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="面试时间" :label-width="formLabelWidth">
          <timepicker></timepicker>
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
  import candidateCard from './candidateCard';
  import searchInput from '../../../components/searchInput';
  import pagination from '../../../components/pagination';
  import timepicker from '../../../components/timepicker';
  export default {
    components: {
      searchInput,
      pagination,
      candidateCard,
      timepicker
    },
    data() {
      return {
        visible: false,
        operation: '',
        form: {
          name: '',
          phone: '',
          mail: '',
          job: '',
          date: ''
        },
        formLabelWidth: '120px',
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          job: '产品经理',
          phone: '15061126729'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          job: '产品经理',
          phone: '15061126729'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          job: '产品经理',
          phone: '15061126729'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          job: '产品经理',
          phone: '15061126729'
        }]
      };
    },
    methods: {
      modal(type) {
        this.operation = type === 'new' ? '新增求职者' : '求职者资料编辑';
        this.visible = true;
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
