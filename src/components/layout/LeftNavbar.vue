<template>
<div style="border-left: solid 1px red">
    <div class="nav-header">
    <div class="deznav">
      <div class="deznav-scroll">
        <div class="main-profile" v-if="$store.getters.user">
          <div class="image-bx">
            <img v-if="!userImage" src="../../assets/images/profile.png" alt="" />
            <img v-if="userImage" :src="userImage" alt="" />
            <a href="javascript:void(0);"></a>
          </div>
          <h5 class="name">
            <span class="font-w400">Olá,</span> <b>{{ $store.getters.user.name }}</b>
          </h5>
          <p style="padding-left:62px; color:grey" class="email">{{ $store.getters.user.email }}</p>
        </div>
        <hr style="margin-left:10px; margin-top:-10px"/>
        <ul class="metismenu" id="menu">
          <li class="">
            <a href="/" class="has-arrow ai-icon">
              <i class="flaticon-381-user"></i>
              <span class="nav-text">Home</span>
            </a>
          </li>
          <li class="">
            <a href="/users" class="has-arrow ai-icon">
              <i class="flaticon-381-user"></i>
              <span class="nav-text">Usuários </span>
            </a>
          </li>
          <li
            :class="{
              'active-menu mm-active': $route.path == '/tasks',
            }"
          >
            <router-link to="/tasks" class="has-arrow ai-icon">
              <i class="flaticon-044-file"></i>
              <span class="nav-text">Tarefas</span>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
		</div>  

    </div>
</template>

<script>
import HeaderBar from "./HeaderNavbar.vue";
export default {
  data() {
    return {
      userImage: '',
    }
  },
  watch: {
    '$store.getters.user.photo': function (val) {
      self = this;
      if (this.$store.getters.user.photo) {
        self.userImage = this.$store.getters.user.photo
      }
      else {
        self.userImage = null
      }
    }
  },
  methods: {
    logout: function () {
      this.$store.dispatch("logout");
    },
  },
  components: {
    HeaderBar,
  },
};
</script>