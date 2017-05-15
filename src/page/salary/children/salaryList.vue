<template>
  <div>
    <staffInfoTbl :data="tableData" type="salary"></staffInfoTbl>
    <el-pagination layout="prev, pager, next" :total="50" @current-change="loadPage">
    </el-pagination>
  
    <el-dialog :title="operation" v-model="visible">
      <el-form :inline="true" :model="formInline" :rules="rules" ref="formInline">
        <h4>个人信息</h4>
        <el-form-item label="姓名">
          <el-input v-model="formInline.staff.staffName" :disabled="true" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item label="账户银行">
          <el-select v-model="formInline.staff.staffBank" placeholder="账户银行">
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
        <el-form-item label="工号">
          <el-input v-model="formInline.staff.staffNum" :disabled="true" placeholder="工号"></el-input>
        </el-form-item>
        <el-form-item label="账号">
          <el-input v-model="formInline.staff.staffBanu" placeholder="账号"></el-input>
        </el-form-item>
        <h4>工资信息</h4>
        <el-form-item label="基本工资" prop="staffSala.salaryBase">
          <el-input v-model="formInline.staffSala.salaryBase" placeholder="基本工资"></el-input>
        </el-form-item>
        <el-form-item label="岗位工资" prop="staffSala.salaryJob">
          <el-input v-model="formInline.staffSala.salaryJob" placeholder="岗位工资"></el-input>
        </el-form-item>
        <el-form-item label="绩效工资" prop="staffSala.salaryPerf">
          <el-input v-model="formInline.staffSala.salaryPerf" placeholder="绩效工资"></el-input>
        </el-form-item>
        <el-form-item label="奖励补贴" prop="staffSala.salaryRewa">
          <el-input v-model="formInline.staffSala.salaryRewa" placeholder="奖励补贴"></el-input>
        </el-form-item>
        <el-form-item label="满勤奖" prop="staffSala.salaryFull">
          <el-input v-model="formInline.staffSala.salaryFull" placeholder="满勤奖"></el-input>
        </el-form-item>
        <el-form-item label="养老保险" prop="staffSala.salaryOld">
          <el-input v-model="formInline.staffSala.salaryOld" placeholder="养老保险"></el-input>
        </el-form-item>
        <el-form-item label="失业保险" prop="staffSala.salaryUnem">
          <el-input v-model="formInline.staffSala.salaryUnem" placeholder="失业保险"></el-input>
        </el-form-item>
        <el-form-item label="生育保险" prop="staffSala.salaryBorn">
          <el-input v-model="formInline.staffSala.salaryBorn" placeholder="生育保险"></el-input>
        </el-form-item>
        <el-form-item label="医疗保险" prop="staffSala.salaryHosp">
          <el-input v-model="formInline.staffSala.salaryHosp" placeholder="医疗保险"></el-input>
        </el-form-item>
        <el-form-item label="工伤保险" prop="staffSala.salaryHurt">
          <el-input v-model="formInline.staffSala.salaryHurt" placeholder="工伤保险"></el-input>
        </el-form-item>
        <el-form-item label="住房公积金" prop="staffSala.salaryRoom">
          <el-input v-model="formInline.staffSala.salaryRoom" placeholder="住房公积金"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="update">确 定</el-button>
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
    bus.$on('editSalary', this.editIt);
    bus.$on('removeSalary', this.remove);
  },
  data() {
    return {
      data: [],
      tableData: [],
      visible: false,
      operation: '',
      editIndex: '',
      formInline: {
        staff: {
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
        staffSala: {

        }
      },
      rules: {
        salaryBase: [{ required: true, message: 'xxx', trigger: 'blur' }],
        salaryJob: [{ required: true, type: 'number', trigger: 'blur' }],
        salaryPerf: [{ required: true, type: 'number', trigger: 'blur' }],
        salaryRewa: [{ required: true, type: 'number', trigger: 'blur' }],
        salaryFull: [{ required: true, type: 'number', trigger: 'blur' }],
        salaryOld: [{ required: true, type: 'number', trigger: 'blur' }],
        salaryUnem: [{ required: true, type: 'number', trigger: 'blur' }],
        salaryBorn: [{ required: true, type: 'number', trigger: 'blur' }],
        salaryHosp: [{ required: true, type: 'number', trigger: 'blur' }],
        salaryHurt: [{ required: true, type: 'number', trigger: 'blur' }],
        salaryRoom: [{ required: true, type: 'number', trigger: 'blur' }]
      }
    };
  },

  methods: {
    editIt(index) {
      this.status = 'edit';
      this.editIndex = index;
      this.modal('edit', index);
    },
    modal(type, index) {
      this.operation = type === 'edit' ? '修改员工工资' : '';
      this.visible = true;
      if (type === 'edit') {
        this.formInline = Object.assign({}, this.data[index]);
      }
    },
    loadPage(i) {
      let page = i - 1;
      console.log(page);
      axios.get('/staffSala/find/' + page)
        .then((res) => {
          console.log(res.data);
          let staffArray = [];
          res.data.map((cur) => {
            let staffStr = cur.staff.split('[')[1].slice(0, -1).split(', ');
            let staffObj = {};
            staffStr.forEach((cur) => {
              let [key, value] = cur.split('=');
              staffObj[key] = value;
            });
            cur.staff = staffObj;
            cur.staffSala = cur.staffSala[0];
            staffArray.push(staffObj);
            return cur;
          });
          // res.data.staffSala = res.data.staffSala[0];
          console.log(res.data);
          this.data = res.data;
          this.tableData = staffArray;
        })
        .catch((err) => {
          if (err) this.$message.error('网络错误');
        });
    },
    update() {
      this.visible = false;
      this.formInline.staffSala.staffNum = this.formInline.staff.staffNum;
      axios.put('/staffSala/update', this.formInline.staffSala)
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            this.$message.success('修改员工工资信息成功');
          }
          // this.tableData[0].orga.organId = res.organId;
          // this.form.orgJobs = this.form.orgJobs.map((cur) => {
          //   cur.organId = res.data.organId;
          //   return cur;
          // });
          // return axios.post('/job/add', this.form.orgJobs);
          // console.log(res.data);
          // this.form = {};
          // this.tableData.unshift(res.data);
          // this.$message.success('添加公司部门成功');
        })
        .catch((err) => {
          if (err) this.$message.error('网络错误');
        });
    },
    remove() {
      this.$message.info('请至"员工档案管理"进行操作！');
      return;
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

div.cell>.el-button:last-of-type {
  display: none;
}
</style>
