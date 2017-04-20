<template>
  <div>
    <searchInput></searchInput>
    <staffInfoTbl :data="staffInfo" @edit="edit()" @view="view()"></staffInfoTbl>
    <pagination></pagination>
  
    <el-dialog :title="operation" v-model="visible">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <h4>个人信息</h4>
        <el-form-item label="姓名">
          <el-input v-model="formInline.user" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item label="账户银行">
          <el-select v-model="formInline.region" placeholder="账户银行">
            <el-option label="中国银行" value="shanghai"></el-option>
            <el-option label="招商银行" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="工号">
          <el-input v-model="formInline.code" placeholder="工号"></el-input>
        </el-form-item>
        <el-form-item label="账号">
          <el-input v-model="formInline.code2" placeholder="账号"></el-input>
        </el-form-item>
        <h4>岗位信息</h4>
        <orgSelect :organization="formInline.org"></orgSelect>
        <h4>工资信息</h4>
        <el-form-item label="工资信息:">
          <el-checkbox-group v-model="formInline.type">
            <el-checkbox label="基本工资"></el-checkbox>
            <el-checkbox label="岗位工资"></el-checkbox>
            <el-checkbox label="绩效工资"></el-checkbox>
            <el-checkbox label="奖励补贴"></el-checkbox>
            <el-checkbox label="满勤奖"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="社会保障:">
          <el-checkbox-group v-model="formInline.type2">
            <el-checkbox label="养老保险"></el-checkbox>
            <el-checkbox label="失业保险"></el-checkbox>
            <el-checkbox label="生育保险"></el-checkbox>
            <el-checkbox label="医疗保险"></el-checkbox>
            <el-checkbox label="工伤保险"></el-checkbox>
          </el-checkbox-group>
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
        formInline: {
          user: '王小虎',
          region: '中国银行',
          code: '89757',
          code2: '6555212930482',
          type: ['基本工资', '岗位工资'],
          type2: ['养老保险', '医疗保险'],
          org: '技术部-产品经理-正式'
        }
      };
    },
  
    methods: {
      view() {
        this.operation = '查看';
        this.visible = true;
      },
      edit() {
        this.operation = '编辑';
        this.visible = true;
      },
      onSubmit() {
        console.log('submit!');
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
