<template>
  <div>
    <topNav v-if="hasLogin"></topNav>
    <router-view></router-view>
  </div>
</template>

<script>

  import topNav from '../../components/header';

  export default {
    components: {
      topNav
    },
    data() {
      return {
        hasLogin: false
      };
    },
    created() {
      this.hasLogin = !!sessionStorage.getItem('user');
    },
    beforeUpdate() {
      this.hasLogin = !!sessionStorage.getItem('user');
    }
  };
</script>
