<template>
  <div>
    <wageCard v-for="(wage, index) in wages" key="wage.id" :wage="wage">
      <!--<el-button @click="editIt(index)" style="float: right;" type="primary">修改</el-button>-->
    </wageCard>
    <!--<el-pagination layout="prev, pager, next" :total="50" @current-change="loadPage">
    </el-pagination>-->
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
      wages: []
    };
  },
  methods: {
    editIt(index) {
      console.log(index);
      this.editIndex = index;
      this.modal('edit', index);
    },
    modal(type, index) {
      this.operation = type === 'new' ? '添加公司部门' : '编辑公司部门';
      this.visible = true;
      if (type === 'edit') {
        this.form = Object.assign({}, this.tableData[index]);
      } else {
        this.form = {
          orga: {
            organId: null,
            organName: ''
          },
          orgJobs: []
        };
      }
    },
    update() {
      this.visible = false;
      axios.put('/job/update', this.form.orgJobs)
        .then((res) => {
          if (res.status === 200) {
            this.$message.success('修改公司部门成功');
            Object.assign(this.tableData[this.editIndex], this.form);
            this.form = {
              orga: {
                organId: null,
                organName: ''
              },
              orgJobs: []
            };
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
