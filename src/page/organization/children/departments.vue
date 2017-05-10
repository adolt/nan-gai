<template>
  <div>
    <departmentCard v-for="depart in departments" key="depart.name" :depart="depart">
      <el-button @click="modal('edit', $event)" style="float: right;" type="primary">修改</el-button>
    </departmentCard>
    <pagination></pagination>
    <el-dialog :title="operation" v-model="visible">
      <el-form :model="form">
        <el-form-item label="部门" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="部门岗位" :label-width="formLabelWidth" v-for="(job, index) in form.jobs" key="job">
          <el-input :value="job" auto-complete="off">
            <el-button slot="append" type="danger" icon="delete" size="small" @click="form.jobs.splice(index, 1)"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth">
          <el-button type="success" icon="plus" @click="form.jobs.push('')">新增</el-button>
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
  import searchInput from '../../../components/searchInput';
  import pagination from '../../../components/pagination';
  import departmentCard from './departmentCard';
  
  export default {
    components: {
      searchInput,
      pagination,
      departmentCard
    },
  
    data() {
      return {
        departments: [{
          name: '技术部',
          jobs: ['JAJA工程师', 'JAJA工程师', 'JAJA工程师', 'JAJA工程师', 'JAJA工程师']
        }, {
          name: '后勤部',
          jobs: ['保安', '保安', '保安', '保安']
        }, {
          name: '市场部',
          jobs: ['总监', '总监', '总监', '总监', '总监', '总监']
        }, {
          name: '业务部',
          jobs: ['产品经理', '产品经理', '产品经理', '产品经理', '产品经理']
        }],
        visible: false,
        operation: '',
        formLabelWidth: '120px',
        form: {
          name: '技术部',
          jobs: ['JAJA工程师', 'JAJA工程师', 'JAJA工程师', 'JAJA工程师', 'JAJA工程师']
        }
      };
    },
  
    methods: {
      modal(type) {
        console.log(type);
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
