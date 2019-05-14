<template>
  <div>
    <AdminHeader></AdminHeader>
    <router-view></router-view>
  </div>
</template>
<script>
  import AdminHeader from './admin_header'
  export default {
    data () {
      return {

      }
    },
    components: {
      AdminHeader
    }
  }
</script>
<style>
  
</style>