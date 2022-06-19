<template>
  <div class="">
    <!-- Login -->
    <div class="container-fluid">
      <div class="row vh-100">
        <div class="col-lg-4 login d-none d-lg-block">
        </div>
        <div class="col-lg-8 col-md-12 align-self-center">
          <div class="row justify-content-center">
            <div class="col-lg-6 col-md-8 col-sm-12">
              <div class="card">
                <div class="card-body">
                  <img
                    src="../assets/images/logo.png"
                    class="logo"
                    alt="Logo"
                  />
                  <div class="accordion" id="loginAcc">
                    <div
                      class="collapse show"
                      v-if="showLoginForm"
                      data-parent="#loginAcc"
                    >
                      <div class="input-effect">
                        <label for="user">E-mail</label>
                        <input
                          class="effect"
                          type="text"
                          id="user"
                          placeholder=""
                          required
                          autocomplete="off"
                          v-model="email"
                        />

                        <span class="focus-border"></span>
                      </div>
                      <div class="input-effect">
                        <label for="password">Senha</label>
                        <input
                          class="effect"
                          type="password"
                          id="password"
                          placeholder=""
                          required
                          v-model="password"
                          @keyup.enter="login"
                        />

                        <span class="focus-border"></span>
                        <button type="button" class="reveal" @click="reveal">
                          <i class="far fa-eye"></i>
                        </button>
                        <small id="forget" class="form-text float-right">
                          <a
                            href="#forgetPass"
                            aria-expanded="false"
                            @click="forgetForm"
                            >Esqueci minha senha</a
                          >
                        </small>
                      </div>
                      <div class="custom-control custom-switch">
                        <input
                          type="checkbox"
                          class="custom-control-input"
                          id="remember"
                        />
                        <label class="custom-control-label" for="remember">
                          Lembrar Senha
                        </label>
                      </div>
                      <button class="btn btn-submit" @click="login">
                        <span>Entrar</span>
                      </button>
                    </div>
                    <div
                      v-if="showForgetPass"
                      data-parent="#loginAcc"
                    >
                      <div class="input-effect">
                        <label for="mail">Email Cadastrado</label>
                        <input
                          class="effect"
                          type="email"
                          id="mail"
                          placeholder=""
                          required
                          autocomplete="off"
                          v-model="forgot.email"
                        />
                        <span class="focus-border"></span>
                      </div>
                      <button @click="forgotPasswor" class="btn btn-resend">
                        <span>Enviar</span>
                      </button>
                      <small id="forget" class="form-text float-right">
                        <a
                          @click="loginForm"
                          href="#loginForm"
                          data-toggle="collapse"
                          aria-expanded="false"
                          aria-controls="loginForm"
                          >Voltar</a
                        >
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showLoginForm: true,
      showForgetPass: false,
      forgot: {
        email: "",
        password: "",
      },
      activatedCaps: false,
      email: "",
      password: "",
    };
  },
  methods: {
    forgetForm() {
      this.showLoginForm = false;
      this.showForgetPass = true;
    },
    loginForm() {
      this.showLoginForm = true;
      this.showForgetPass = false;
    },
    reveal() {
      var x = document.getElementById("password");
      if (x.type === "password") {
        x.type = "text";
      } else {
        x.type = "password";
      }
    },
    login() {
      const self = this;
      const api = this.$store.state.api + "login";

      axios
        .post(api, {
          email: self.email,
          password: self.password,
        })
        .then((response) => {
          self.$store.commit("auth", response.data.access_token);
          self.$router.push({ path: "/" });
        })
        .catch((error) => {
          self.$message("Erro", error.response.data, "error");
        });
    },
    keymonitor() {
      if (event.getModifierState && event.getModifierState("CapsLock")) {
        this.activatedCaps = true;
      } else {
        this.activatedCaps = false;
      }
    },
    forgotPasswor() {
      const self = this;
      const api = this.$store.state.api + "user/recovery";

      axios
        .post(api, {
          email: self.forgot.email,
        })
        .then((response) => {
          //$("#modalSenha").modal("hide");
          // self.$message(
            // "Sucesso",
            // "Um e-mail foi enviado com as instruções necessárias",
            // "success"
          // );
        })
        .catch((error) => {
          //self.$message("Erro", error.response.data, "error");
        });
    },
  },
};
</script>

<style>
.btn-link {
  color: #191229;
}
.cursor {
  cursor: text !important;
}
.caps {
  color: white;
  font: bold;
  text-align: left;
  font-size: 15px;
}
</style>
