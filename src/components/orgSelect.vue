<template>
  <div>
    <el-select v-model="orgValue" placeholder="请选择" @change="select()">
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

export default {
  props: ['organization'],
  data() {
    return {
      org: [{
        value: '技术部'
      }, {
        value: '后勤部'
      }, {
        value: '人力资源部'
      }, {
        value: '市场部'
      }, {
        value: '业务部'
      }],
      job: [{
        value: '产品经理'
      }, {
        value: 'Java开发工程师'
      }, {
        value: 'Web开发工程师'
      }, {
        value: '开发经理'
      }, {
        value: '项目经理'
      }],
      time: [{
        value: '正式'
      }, {
        value: '实习期'
      }],
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
    select() {
      if (this.orgValue && this.jobValue && this.timeValue) {
        console.log(this.fullOrg);
        bus.fullOrg = this.fullOrg;
        bus.$emit('orgSelected');
      }
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
  }
};
</script>
