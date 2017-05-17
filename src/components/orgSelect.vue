<template>
  <div>
    <el-select v-model="orgValue" placeholder="请选择" @change="select('org')">
      <el-option v-for="item in org" :label="item.value" :value="item.value" :key="item.value">
      </el-option>
    </el-select>
    <el-select v-model="jobValue" placeholder="请选择" @change="select()">
      <el-option v-for="item in job" :label="item.value" :value="item.value" :key="item.value">
      </el-option>
    </el-select>
    <el-select v-model="timeValue" placeholder="请选择" @change="select()">
      <el-option v-for="item in time" :label="item.value" :value="item.value" :key="item.value">
      </el-option>
    </el-select>
  </div>
</template>

<script>
import bus from '../page/bus';
import axios from 'axios';

export default {
  props: ['organization'],
  data() {
    return {
      // org: [{
      //   value: '技术部'
      // }, {
      //   value: '后勤部'
      // }, {
      //   value: '人力资源部'
      // }, {
      //   value: '市场部'
      // }, {
      //   value: '业务部'
      // }],
      org: [],
      // job: [{
      //   value: '产品经理'
      // }, {
      //   value: 'Java开发工程师'
      // }, {
      //   value: 'Web开发工程师'
      // }, {
      //   value: '开发经理'
      // }, {
      //   value: '项目经理'
      // }],
      job: [],
      time: [{
        value: '正式'
      }, {
        value: '试用期'
      }, {
        value: '实习期'
      }, {
        value: '临时工'
      }],
      tableData: [],
      orgValue: '',
      jobValue: '',
      timeValue: ''
    };
  },
  wacth: {
    organization(val) {
      console.log('xxx');
      if (val) {
        let arr = this.organization.split('-');
        [this.orgValue, this.jobValue, this.timeValue] = arr;
      }
    }
  },
  computed: {
    fullOrg() {
      return `${this.orgValue}-${this.jobValue}-${this.timeValue}`;
    }
  },
  methods: {
    select(type) {
      if (type === 'org') {
        this.job = [];
        this.tableData.forEach((cur) => {
          if (cur.orga.organName === this.orgValue) {
            cur.orgJobs.forEach((c) => {
              this.job.push({ value: c.jobName });
            });
          }
        });
      }
      if (this.orgValue && this.jobValue && this.timeValue) {
        console.log(this.fullOrg, '---');
        bus.fullOrg = this.fullOrg;
        bus.$emit('orgSelected');
      }
    },
    loadPage(i) {
      let page = i - 1;
      console.log(page);
      this.org = [];
      this.job = [];
      axios.get('/organ/find/' + page)
        .then((res) => {
          console.log(res.data);
          this.tableData = res.data.map((cur) => {
            let [organId, organName] = cur.orga.slice(14, -1).split(', ');
            organId = organId.split('=')[1];
            organName = organName.split('=')[1];
            cur.orga = {
              organId,
              organName
            };
            this.org.push({ value: organName });
            cur.orgJobs.forEach((c) => {
              this.job.push({ value: c.jobName });
            });
            return cur;
          });
          // this.tableData = res.data;
        })
        .catch((err) => {
          if (err) this.$message.error('网络错误');
        });
    }
  },
  created() {
    bus.$on('editStaffInfo', () => {
      let that = this;
      if (bus.editedStaffInfo) {
        that.orgValue = bus.editedStaffInfo.staffOrga;
        that.jobValue = bus.editedStaffInfo.staffJob;
        that.timeValue = bus.editedStaffInfo.staffCondi;
      }
    });
    this.loadPage(1);
  }
};
</script>
