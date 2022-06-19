<template>
  <div id="app">
    <div class="wrapper">
      <header-navbar></header-navbar>
      <left-navbar></left-navbar>
      <div id="content" class="content">
        <div class="main-content">
          <router-view></router-view>
        </div>
      </div>
    </div>
   </div>
</template>

<script>
    import HeaderNavbar from './HeaderNavbar'
    import LeftNavbar from './LeftNavbar'
    export default {
        name: "app",
        data: () => ({
            drawer: null,
            authenticated: false
        }),
        props: {
            source: String
        },
        mounted () {
            this.authenticated = this.$store.getters.authenticated
        },
        components: {
            HeaderNavbar, LeftNavbar
        }
    }
</script>

<style>
    #wrapper{
        margin-top: 82px;
    }
    .wrapper {
      display: flex;
      width: 100%;
    }
</style>

