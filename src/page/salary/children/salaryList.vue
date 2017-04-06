<template>
  <div>
    <searchInput></searchInput>
    <staffInfoTbl :data="staffInfo" @showDetail="showDetail()"></staffInfoTbl>
    <pagination></pagination>
  </div>
</template>

<script>
  import staffInfoTbl from '../../../components/staffInfoTbl';
  import searchInput from '../../../components/searchInput';
  import pagination from '../../../components/pagination';
  
  export default {
    components: {
      staffInfoTbl,
      searchInput,
      pagination
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
        }]
      };
    },
  
    methods: {
      showDetail() {
        console.log('showDetail');
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
