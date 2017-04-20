<template>
  <div>
    <searchInput>
      <el-button @click="add()" style="float: right;" type="primary">新增</el-button>
    </searchInput>
    <staffInfoTbl :data="staffInfo" @edit="edit()" @view="view()"></staffInfoTbl>
    <pagination></pagination>
  
    <el-dialog :title="operation" v-model="visible">
      <el-form :model="form">
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="编号" :label-width="formLabelWidth">
          <el-input v-model="form.code" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="form.mail" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="form.tel" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系地址" :label-width="formLabelWidth">
          <el-input v-model="form.address" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="所属部门" :label-width="formLabelWidth">
          <orgSelect organization="form.org"></orgSelect>
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
  import staffInfoTbl from '../../../components/staffInfoTbl';
  import searchInput from '../../../components/searchInput';
  import pagination from '../../../components/pagination';
  import orgSelect from '../../../components/orgSelect';
  
  export default {
    components: {
      staffInfoTbl,
      searchInput,
      pagination,
      orgSelect
    },
  
    data() {
      return {
        staffInfo: [{
          name: '王小虎',
          code: '89757',
          org: 'FE DEP.',
          tel: '15061126729'
        }, {
          name: '王小虎',
          code: '89757',
          org: 'FE DEP.',
          tel: '15061126729'
        }, {
          name: '王小虎',
          code: '89757',
          org: 'FE DEP.',
          tel: '15061126729'
        }, {
          name: '王小虎',
          code: '89757',
          org: 'FE DEP.',
          tel: '15061126729'
        }],
        visible: false,
        operation: '',
        form: {
          name: '',
          code: '',
          mail: '',
          tel: '',
          address: '',
          org: ''
        },
        formLabelWidth: '120px'
      };
    },
  
    methods: {
      add() {
        this.operation = '新增';
        this.visible = true;
        this.form = {
          name: '',
          code: '',
          mail: '',
          tel: '',
          address: '',
          org: ''
        };
      },
      view() {
        this.operation = '查看';
        this.visible = true;
        this.form = {
          'name': '王小虎',
          'code': '89757',
          'mail': 'sherryslin@163.com',
          'tel': '15061126729',
          'address': '江苏省常州市新北区',
          'org': '技术部-产品经理-正式'
        };
      },
      edit() {
        this.operation = '编辑';
        this.visible = true;
        this.form = {
          'name': '王小虎',
          'code': '89757',
          'mail': 'sherryslin@163.com',
          'tel': '15061126729',
          'address': '江苏省常州市新北区',
          'org': '技术部-产品经理-正式'
        };
      }
    }
  };
</script>

<style scoped>
  .el-button+.el-button {
    margin-left: 10px;
    margin-right: 5px;
    margin-bottom: 6px;
  }
</style>
