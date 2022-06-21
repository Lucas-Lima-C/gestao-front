<template>
  <div>
    <div class="main-content">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">
              <div class="card-title">Adicionar Usuário</div>
            </div>
            <div class="card-body">
              <hr />
              <br />
              <div class="row">
                <div class="col-md-12">
                  <form action>
                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <label for="Name">
                          <span class="required">*</span> Nome:
                        </label>
                        <input
                          type="text"
                          id="Name"
                          class="form-control"
                          v-model="users.name"
                          placeholder=""
                        />
                      </div>
                      <div class="form-group col-md-6">
                        <label for="Email">
                          <span class="required">*</span> Email:
                        </label>
                        <input
                          class="form-control"
                          id="Email"
                          placeholder=""
                          type="text"
                          v-model="users.email"
                        />
                      </div>
                    </div>
                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <label for="password">
                          <span class="required">*</span> Senha:
                        </label>
                        <input
                          autocomplete="new-password"
                          type="password"
                          id="password"
                          class="form-control"
                          v-model="users.password"
                          placeholder=""
                        />
                      </div>
                    </div>
                    <hr />
                    <div class="form-group">
                      <label
                        v-if="previewImage"
                        class="photo-title"
                        for="userPic"
                      >
                        Foto do Perfil
                      </label>
                      <div class="user-img">
                        <img
                          v-if="previewImage"
                          :src="previewImage"
                          class="photo"
                        />
                        <img v-else class="photo" />
                      </div>
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
import BaseCrud from "../Base/BaseCrud";

export default {
  name: "imageUpload",
  data() {
    return {
      previewImage: null,
      users: {
        name: "",
        email: "",
        photo: "",
        password: "",
      },
      errors: undefined,
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
      fd.append("password", self.users.password);

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
    getUsers: function (id) {
      const self = this;
      const api = self.$store.state.api + "users/" + id;

      self.$http
        .get(api)
        .then((response) => {
          self.users = response.data.data[0];
        })
        .catch((error) => {
          self.$message(null, error.response.data, "error");
        });
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
  components: {
    BaseCrud,
  },
};
</script>
<style scoped>
.btn-user:hover,
.btn-user[aria-expanded="true"] {
  background: linear-gradient(to right, #000, #666);
  color: #fff !important ;
}
.photo-title {
  color: #000;
  font-size: 18px;
  display: block;
  margin-left: 5px;
  width: 18%;
}

.photo {
  display: block;
  margin-left: 5px;
  width: 18%;
  border-radius: 10px;
  max-width: 400px;
  max-height: 400px;
  object-fit: cover;
  height:150px; 
  width:150px;
}

</style>