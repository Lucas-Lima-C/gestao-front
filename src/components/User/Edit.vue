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
                <img v-if="!user.photo" src="../../assets/images/profile.png" class="photo" />
                <img v-if="user.photo" :src="user.photo" class="photo" />
              </div>
              <div class="profile_user form-group">
                <h3 class="user_name_max">{{ user.name }}</h3>
                <p style="text-align: center">{{ user.email }}</p>
              </div>
              <hr class="hr" />
              <div class="row">
                <div class="col-md-12">
                  <form action>
                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <label for="userName">
                          <span class="required">*</span> Nome:
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="userForm.name"
                          placeholder
                        />
                      </div>
                      <div class="form-group col-md-6">
                        <label>
                          <span class="required">*</span> Email:
                        </label>
                        <input
                          class="form-control"
                          id="userEmail"
                          placeholder=""
                          type="text"
                          v-model="userForm.email"
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
                          class="photo-preview"
                        />
                        <img v-else class="photo-preview" />
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
export default {
  data() {
    return {
      user: {
        name: "",
        email: "",
        photo: "",
      },
      userForm:{
        name: "",
        email: "",
      },
      previewImage: null,
    };
  },
  methods: {
    makeFormData: function () {
      const self = this;
      let fd = new FormData();

      let photo = document.getElementById("userPic");

      fd.append("name", self.userForm.name);
      fd.append("email", self.userForm.email);

      fd.append("_method", "POST");

      fd.append("photo", photo.files[0] ? photo.files[0] : "");

      fd.append("id", self.user.id);
      fd.append("_method", "PUT");

      return fd;
    },
    save: function () {
      const self = this;
      let api = self.$store.state.api + "users/" + self.user.id;

      let fd = self.makeFormData();

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
    getUser: function (id) {
      const self = this;
      const api = self.$store.state.api + "users/" + id;

      self.$http
        .get(api)
        .then((response) => {
          self.user = response.data.data[0];
          self.userForm.name = self.user.name;
          self.userForm.email = self.user.email;
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
      };
    },
  },
  mounted: function () {
    const self = this;

    let id = self.$route.params.id;
    if (id) {
      self.getUser(id);
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
.valid {
  color: green;
}

.valid:before {
  position: relative;
  left: 0px;
  margin-right: 5px;
  content: "✔";
}

.invalid {
  color: red;
}

.invalid:before {
  position: relative;
  left: 0px;
  margin-right: 5px;
  content: "✖";
}
.photo-preview {
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