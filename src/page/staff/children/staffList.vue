<template>
  <div>
    <div class="search">
      搜索：
      <el-input placeholder="请输入关键字" size="large" icon="search" v-model="keyword" :on-icon-click="findBy">
      </el-input>
      <el-button @click="addOne" style="float: right;" type="primary">新增</el-button>
    </div>
    <staffInfoTbl :data="tableData" type="staff"></staffInfoTbl>
    <el-pagination v-if="showPage" layout="prev, pager, next" :total="50" @current-change="loadPage">
    </el-pagination>
  
    <el-dialog :title="operation" v-model="visible">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="姓名" :label-width="formLabelWidth" prop="staffName">
          <el-input v-model="form.staffName" auto-complete="off"></el-input>
        </el-form-item>
        <!--<el-form-item label="工号" :label-width="formLabelWidth">
          <el-input v-model="form.staffNum" auto-complete="off"></el-input>
        </el-form-item>-->
        <el-form-item label="电话" :label-width="formLabelWidth" prop="staffTel">
          <el-input v-model="form.staffTel" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系地址" :label-width="formLabelWidth" prop="staffAddr">
          <el-input v-model="form.staffAddr" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="所属部门" :label-width="formLabelWidth">
          <orgSelect :organization="form.staffOrga + '-' + form.staffJob + '-' + form.staffCondi"></orgSelect>
        </el-form-item>
        <el-form-item label="银行名称" :label-width="formLabelWidth" prop="staffBank">
          <el-select v-model="form.staffBank" placeholder="账户银行">
            <el-option label="中国农业银行" value="中国农业银行"></el-option>
            <el-option label="中国工商银行" value="中国工商银行"></el-option>
            <el-option label="中国建设银行" value="中国建设银行"></el-option>
            <el-option label="中国邮政储蓄银行" value="中国邮政储蓄银行"></el-option>
            <el-option label="中国银行" value="中国银行"></el-option>
            <el-option label="招商银行" value="招商银行"></el-option>
            <el-option label="兴业银行" value="兴业银行"></el-option>
            <el-option label="交通银行" value="交通银行"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="银行卡号" :label-width="formLabelWidth" prop="staffBanu">
          <el-input v-model="form.staffBanu" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="status === 'add' ? add() : update()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import staffInfoTbl from '../../../components/staffInfoTbl';
  import orgSelect from '../../../components/orgSelect';
  import axios from 'axios';
  import bus from '../../bus';
  
  export default {
    components: {
      staffInfoTbl,
      orgSelect
    },
    created() {
      axios.defaults.baseURL = 'http://localhost:8080';
      axios.defaults.headers.common['Access-Control-Allow-Origin'] = 'http://localhost:3000';
      this.loadPage(1);
      bus.$on('editStaff', this.editIt);
      bus.$on('removeStaff', this.remove);
      bus.$on('orgSelected', this.orgSelected);
    },
  
    data() {
      return {
        tableData: [],
        keyword: '',
        showPage: true,
        visible: false,
        operation: '',
        form: {
          staffName: '',
          staffNum: '',
          staffTel: '',
          staffAddr: '',
          staffOrga: '',
          staffJob: '',
          staffCondi: '',
          staffBank: '',
          staffBanu: ''
        },
        rules: {
          staffName: [{ required: true, message: '请输入员工姓名', trigger: 'blur' }],
          staffTel: [{ required: true, message: '请输入员工电话', trigger: 'blur' }],
          staffAddr: [{ required: true, message: '请输入员工地址', trigger: 'blur' }],
          staffBank: [{ required: true, message: '请输入工资银行', trigger: 'blur' }],
          staffBanu: [{ required: true, message: '请输入银行卡号', trigger: 'blur' }]
        },
        formLabelWidth: '120px'
      };
    },
  
    methods: {
      orgSelected() {
        console.log(bus.fullOrg + '.....');
        [this.form.staffOrga, this.form.staffJob, this.form.staffCondi] = bus.fullOrg.split('-');
      },
      addOne() {
        this.status = 'add';
        this.modal('new');
      },
      editIt(index) {
        this.status = 'edit';
        this.editIndex = index;
        this.modal('edit', index);
      },
      findBy() {
        if (this.keyword === '') {
          this.loadPage(1);
          return;
        }
        axios.get('/staff/findBy/' + this.keyword)
          .then((res) => {
            this.tableData = res.data;
          })
          .catch((err) => {
            if (err) this.$message.error('网络错误');
          });
      },
      modal(type, index) {
        this.operation = type === 'new' ? '新增求职者' : '求职者资料编辑';
        this.visible = true;
        if (type === 'edit') {
          this.form = Object.assign({}, this.tableData[index]);
          bus.editedStaffInfo = Object.assign({}, this.form);
          bus.$emit('editStaffInfo');
        } else {
          this.form = {
            staffName: '',
            staffNum: '',
            staffTel: '',
            staffAddr: '',
            staffOrga: '',
            staffJob: '',
            staffCondi: '',
            staffBank: '',
            staffBanu: ''
          };
        }
      },
      add() {
        this.visible = false;
        axios.post('/staff/add', this.form)
          .then((res) => {
            console.log(res.data);
            this.form = {};
            this.tableData.unshift(res.data);
            this.$message.success('添加招聘岗位成功');
          })
          .catch((err) => {
            if (err) this.$message.error('网络错误');
          });
      },
      update() {
        this.visible = false;
        axios.put('/staff/update', this.form)
          .then((res) => {
            if (res.status === 200) {
              this.$message.success('修改崗位成功');
              Object.assign(this.tableData[this.editIndex], this.form);
              this.form = {};
            }
          })
          .catch((err) => {
            if (err) this.$message.error('网络错误');
          });
      },
      remove(index) {
        let id = this.tableData[index].staffNum;
        axios.delete(`/staff/delete/${id}`)
          .then((res) => {
            if (res.status === 200) {
              this.tableData.splice(index, 1);
              this.$message.success('删除成功');
            }
          })
          .catch((err) => {
            if (err) this.$message.error('网络错误');
          });
      },
      loadPage(i) {
        let page = i - 1;
        console.log(page);
        axios.get('/staff/find/' + page)
          .then((res) => {
            console.log(res.data);
            this.tableData = res.data;
          })
          .catch((err) => {
            if (err) this.$message.error('网络错误');
          });
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
  
  .search>.el-input {
    width: 20%;
    margin-bottom: 10px
  }
  
  .search>.el-button {
    margin-right: 20px;
  }
</style>
