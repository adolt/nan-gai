<template>
  <div>
    <el-select v-model="orgValue" placeholder="请选择">
      <el-option v-for="item in org" :label="item.value" :value="item.value" :key="item.value">
      </el-option>
    </el-select>
    <el-select v-model="jobValue" placeholder="请选择">
      <el-option v-for="item in job" :label="item.value" :value="item.value" :key="item.value">
      </el-option>
    </el-select>
    <el-select v-model="timeValue" placeholder="请选择" @select="select()">
      <el-option v-for="item in time" :label="item.value" :value="item.value" :key="item.value">
      </el-option>
    </el-select>
  </div>
</template>

<script>
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
    computed: {
      fullOrg() {
        return `${this.orgValue}-${this.jobValue}-${this.timeValue}`;
      },
      splitOrg() {
        if (this.organization) {
          let arr = this.organization.split('-');
          [this.orgValue, this.jobValue, this.timeValue] = arr;
        }
      }
    },
    methods: {
      select() {
        alert(this.fullOrg);
      }
    }
  };
</script>
