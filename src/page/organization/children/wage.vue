<template>
  <div>
    <wageCard v-for="wage in wages" key="wage.name" :wage="wage"></wageCard>
    <pagination></pagination>
  </div>
</template>

<script>
  import searchInput from '../../../components/searchInput';
  import pagination from '../../../components/pagination';
  import wageCard from './wageCard';
  
  export default {
    components: {
      searchInput,
      pagination,
      wageCard
    },
  
    data() {
      return {
        visible: false,
        wages: [{
          name: '正式工资',
          salary: ['基本工资', '岗位工资', '绩效工资', '加班工资'],
          welfare: ['福利补贴', '满勤奖'],
          social: ['养老保险', '医疗保险', '生育险', '工伤险', '失业险', '住房公积金']
        }, {
          name: '试用期工资',
          salary: ['基本工资*0.8', '岗位工资*0.8', '绩效工资', '加班工资'],
          welfare: ['福利补贴', '满勤奖'],
          social: ['养老保险', '医疗保险', '生育险', '工伤险', '失业险', '住房公积金']
        }, {
          name: '实习工资',
          salary: ['基本工资'],
          welfare: ['福利补贴'],
          social: []
        }]
      };
    },
  
    methods: {
      modal(type) {
        this.visible = true;
        console.log(type);
      }
    }
  };
</script>
