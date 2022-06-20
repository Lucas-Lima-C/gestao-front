<template>
  <div>
    <div class="main-content">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">
              <div class="card-title">Editar Perfil</div>
            </div>
            <div class="card-body">
              <div class="form-group">
                <img v-if="!users.photo" src="../../assets/images/profile.png" class="photo" />
                <img v-if="users.photo" :src="users.photo" class="photo" />
              </div>
              <div class="profile_user form-group">
                <h3 class="user_name_max">{{ users.name }}</h3>
                <hr class="hr" />
                <p style="text-align: center">{{ users.email }}</p>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <form action>
                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <label for="userName">
                          <span class="required">*</span> Nome:
                        </label>
                        <input
                          autocomplete="new-password"
                          type="text"
                          class="form-control"
                          v-model="users.name"
                          placeholder
                        />
                      </div>
                      <div class="form-group col-md-6">
                        <label for="inputEmail4">
                          <span class="required">*</span> Email:
                        </label>
                        <input
                          autocomplete="new-password"
                          class="form-control"
                          id="userEmail"
                          placeholder=""
                          type="text"
                          v-model="users.email"
                        />
                      </div>
                    </div>
                    <hr />

                    <div class="form-group">
                      <label for="userPic">Foto do Perfil</label>
                      <input
                        type="file"
                        id="userPic"
                        accept="image/*"
                        name="userPic"
                        @change="uploadImage"
                        placeholder
                      />
                    </div>
                    <span class="required_fields">
                      <span class="required">*</span>
                      <strong>Campos obrigatórios</strong>
                    </span>
                    <div class="block text-right">
                      <a class="btn btn-add" @click="save">
                        Salvar
                        <i class="fa fa-save"></i>
                      </a>
                      <router-link to="/users" class="btn btn-back float-left">
                        <i class="fa fa-arrow-left"></i> Voltar
                      </router-link>
                    </div>
                  </form>
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
  name: "imageUpload",
  data() {
    return {
      companies: [],
      departments: [],
      fieldTypes: {
        password: "text",
        password_confirm: "text",
      },
      users: {
        name: "",
        email: "",
        photo: "",
        new_password: "",
        password_confirmation: "",
      },
      activatedCaps: false,
      errors: undefined,
      disabled: true,

      previewImage: null,
    };
  },
  computed: {},
  methods: {
    makeFormData: function () {
      const self = this;
      let fd = new FormData();

      let photo = document.getElementById("userPic");

      fd.append("name", self.users.name);
      fd.append("email", self.users.email);
      fd.append("password", self.users.new_password);
      fd.append("password_confirmation", self.users.password_confirmation);

      fd.append("_method", "POST");

      fd.append("photo", photo.files[0] ? photo.files[0] : "");

      if (self.users.id) {
        fd.append("id", self.users.id);
        fd.append("_method", "PUT");
      }

      return fd;
    },
    save: function () {
      const self = this;
      let api = self.$store.state.api + "users";

      let fd = self.makeFormData();

      if (self.users.id) {
        api += "/" + self.users.id;
      }

      self.$http
        .post(api, fd)
        .then((response) => {
          self.$message(
            "Sucesso",
            `Informações guardadas com sucesso`,
            "success"
          );
          this.$router.push("/users");
        })
        .catch((error) => {
          self.$message(null, error.response.data, "error");
        });
    },
    keymonitor() {
      if (event.getModifierState && event.getModifierState("CapsLock")) {
        this.activatedCaps = true;
      } else {
        this.activatedCaps = false;
      }
    },
    comparePassword: function () {
      if (this.users.new_password != this.users.password_confirmation || null)
        return [];
    },
    getUsers: function (id) {
      const self = this;
      const api = self.$store.state.api + "users/" + id;

      self.$http
        .get(api)
        .then((response) => {
          self.users = response.data.data[0];
          self.users.password_confirmation = "";
        })
        .catch((error) => {
          self.$message(null, error.response.data, "error");
        });
    },
    hideModal() {
      this.$bvModal.hide("modal-1");
    },
    uploadImage(e) {
      const image = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = (e) => {
        this.previewImage = e.target.result;
        console.log(this.previewImage);
      };
    },
  },
  mounted: function () {
    const self = this;

    let id = self.$route.params.id;
    if (id) {
      self.getUsers(id);
    }
  },
};
</script>
<style scoped>
.uploading-image {
  display: flex;
  border-radius: 20px;
  width: 200px;
  height: 198px;
}
.profile_user {
  text-align: center;
}
.photo {
  display: block;
  margin-left: auto;
  margin-right: auto;
  border-radius: 10px;
  height: 200px;
  object-fit: cover;
}
/* .btn-put-pass:hover,
.btn-put-pass[aria-expanded="true"] {
  background: linear-gradient(to right, #000, #666);
  color: #fff !important ;
} */

/* Add a green text color and a checkmark when the requirements are right */
.valid {
  color: green;
}

.valid:before {
  position: relative;
  left: 0px;
  margin-right: 5px;
  content: "✔";
}

/* Add a red text color and an "x" when the requirements are wrong */
.invalid {
  color: red;
}

.invalid:before {
  position: relative;
  left: 0px;
  margin-right: 5px;
  content: "✖";
}
</style>