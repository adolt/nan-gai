<template>
  <div>
    <div class="search">
      搜索：
      <el-input placeholder="请输入关键字" size="large" icon="search" v-model="keyword" :on-icon-click="findBy">
      </el-input>
      <el-button @click="addOne" style="float: right;" type="primary">新增</el-button>
    </div>
    <staffInfoTbl :data="tableData"></staffInfoTbl>
    <el-pagination v-if="showPage" layout="prev, pager, next" :total="50" @current-change="loadPage">
    </el-pagination>
  
    <el-dialog :title="operation" v-model="visible">
      <el-form :model="form">
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="form.staffName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="工号" :label-width="formLabelWidth">
          <el-input v-model="form.staffNum" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="form.staffTel" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系地址" :label-width="formLabelWidth">
          <el-input v-model="form.staffAddr" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="所属部门" :label-width="formLabelWidth">
          <orgSelect organization="form.staffOrga" :selected="orgSelected"></orgSelect>
        </el-form-item>
        <el-form-item label="银行名称" :label-width="formLabelWidth">
          <el-input v-model="form.staffBank" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="银行卡号" :label-width="formLabelWidth">
          <el-input v-model="form.staffBanu" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
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
        formLabelWidth: '120px'
      };
    },
  
    methods: {
      orgSelected() {
        console.log(bus.fullOrg);
        [this.form.staffOrga, this.form.staffJob, this.staffCondi] = bus.fullOrg.split('-');
      },
      addOne() {
        this.status = 'add';
        this.modal('new');
      },
      editIt(index) {
        console.log(index);
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
            console.log(res.data);
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
