<template>
    <div>
      <header id="header">
      <div class="row">
      <a href="#" style="padding-left:85px;padding-top:5px" class="col-8">
				<img src="../../assets/images/logo-white.png" style="height:40px;width:130px;">
			</a>
        <div class="col-md-4">
          <div style="padding-top:10px;padding-right:20px" class="dropdown">
            <button class="btn btn-profile dropdown-toggle" type="button" id="dropdownProfile" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              {{ $store.getters.user.name }}
            </button>
            <div style="width:120px; cursor:pointer" class="dropdown-menu" aria-labelledby="dropdownProfile">
              <a class="dropdown-item clickable" @click="logout()"><i class="fas fa-sign-out-alt"></i>Sair</a>
            </div>
          </div>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  methods: {
    logout: function() {
      let self = this;
      let api = this.$store.state.api + "logout";

      self.$http
        .post(api)
        .then(response => {
          localStorage.removeItem("token");
          self.$router.push({ path: "/login" });
        })
        .catch(error => {
          this.errors = error.response.data.errors;
          this.$message("Erro", "Erro ao realizar logout", "error");
        });
    }
  }
};
</script>

<style>
</style>
