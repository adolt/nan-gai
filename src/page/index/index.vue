<template>
  <div>
    <topNav></topNav>
    <router-view></router-view>
  </div>
</template>

<script>

  import topNav from '../../components/header';

  export default {
    components: {
      topNav
    }
  };
</script>
