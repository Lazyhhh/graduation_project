<template>
  <div>
    <Header :name="name" />
    <router-view/>
  </div>
</template>
<script>
  import Header from './header'
  export default {
    data () {
      return {
        name: ''
      }
    },
    components: {
      Header
    },
    created: function () {
      let name = this.$store.getters.currentUser.name;
      this.name = name;
    }
  }
</script>
<style>
  
</style>