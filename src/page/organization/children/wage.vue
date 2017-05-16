<template>
  <div>
    <wageCard v-for="(wage, index) in wages" key="wage.id" :wage="wage">
      <el-button @click="editIt(index)" style="float: right;" type="primary">修改</el-button>
    </wageCard>
    <!--<el-pagination layout="prev, pager, next" :total="50" @current-change="loadPage">
      </el-pagination>-->
    <el-dialog title="修改工资组成" v-model="visible">
      <el-form :model="form">
        <el-form-item label="工资组成" :label-width="formLabelWidth">
          <el-checkbox v-model="form.salaryBase">基本工资</el-checkbox>
          <el-checkbox v-model="form.salaryJob">岗位工资</el-checkbox>
          <el-checkbox v-model="form.salaryPerf">绩效工资</el-checkbox>
          <el-checkbox v-model="form.salaryRewa">加班补贴</el-checkbox>
          <el-checkbox v-model="form.salaryFull">满勤奖</el-checkbox>
        </el-form-item>
        <el-form-item label="社会保险" :label-width="formLabelWidth">
          <el-checkbox v-model="form.salaryOld">养老保险</el-checkbox>
          <el-checkbox v-model="form.salaryHosp">医疗保险</el-checkbox>
          <el-checkbox v-model="form.salaryUnem">失业保险</el-checkbox>
          <el-checkbox v-model="form.salaryHurt">工伤险</el-checkbox>
          <el-checkbox v-model="form.salaryBorn">生育险</el-checkbox>
        </el-form-item>
        <el-form-item label="住房公积金" :label-width="formLabelWidth">
          <el-checkbox v-model="form.salaryRoom">住房公积金</el-checkbox>
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
import pagination from '../../../components/pagination';
import wageCard from './wageCard';
import axios from 'axios';

export default {
  components: {
    pagination,
    wageCard
  },
  created() {
    axios.defaults.baseURL = 'http://localhost:8080';
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = 'http://localhost:3000';
    this.loadPage(1);
  },
  data() {
    return {
      visible: false,
      editIndex: '',
      data: [],
      wages: [],
      form: {

      },
      formLabelWidth: '120px'
    };
  },
  methods: {
    editIt(index) {
      console.log(index);
      this.editIndex = index;
      this.modal('edit', index);
    },
    modal(type, index) {
      this.visible = true;
      this.form = Object.assign({}, this.data[index]);
      let keys = Object.keys(this.form);
      for (let i of keys) {
        if (i !== 'salaryId') {
          this.form[i] = !!this.form[i];
        }
      }
    },
    update() {
      this.visible = false;
      let keys = Object.keys(this.form);
      for (let i of keys) {
        if (i !== 'salaryId') {
          this.form[i] = +this.form[i];
        }
      }
      console.log('update', this.form);
      axios.put('/salary/update', this.form)
        .then((res) => {
          if (res.status === 200) {
            this.$message.success('修改工资组成成功');
            let keyArr = [];
            for (let key of Object.keys(this.form)) {
              if (this.form[key]) {
                if (key !== 'salaryId') {
                  keyArr.push(mapObj[key]);
                }
              }
            }
            for (let i of keyArr) {
              if (!this.wages[this.editIndex].tags.includes(i)) {
                this.wages[this.editIndex].tags.push(i);
              }
            }
            for (let j in this.wages[this.editIndex].tags) {
              if (!keyArr.includes(this.wages[this.editIndex].tags[j])) {
                this.wages[this.editIndex].tags.splice(j, 1);
              }
            }
            // console.log(keyArr);
            // this.wages[this.editIndex].tags = keyArr;
            console.log(this.editIndex, this.wages);
          }
        })
        .catch((err) => {
          if (err) this.$message.error('网络错误');
        });
    },
    loadPage(i) {
      this.wages = [];
      let page = i - 1;
      console.log(page);
      axios.get('/salary/find/' + page)
        .then((res) => {
          console.log(res.data);
          this.data = res.data;
          for (let i in res.data) {
            let keyArr = [];
            for (let key of Object.keys(res.data[i])) {
              if (res.data[i][key]) {
                if (key !== 'salaryId') {
                  keyArr.push(mapObj[key]);
                }
              }
            }
            console.log(keyArr);
            this.wages.push({
              id: res.data[i].salaryId,
              name: i === '0' ? '正式工资' : i === '1' ? '试用期工资' : i === '2' ? '实习期工资' : '临时工',
              tags: keyArr
            });
          }
        })
        .catch((err) => {
          if (err) this.$message.error('网络错误');
        });
    }
  }
};
const mapObj = {
  'salaryBase': '基本工资',
  'salaryJob': '岗位工资',
  'salaryPerf': '绩效工资',
  'salaryRewa': '加班补贴',
  'salaryFull': '满勤奖',
  'salaryOld': '养老保险',
  'salaryHosp': '医疗保险',
  'salaryUnem': '失业保险',
  'salaryHurt': '工伤险',
  'salaryBorn': '生育险',
  'salaryRoom': '住房公积金'
};
</script>
