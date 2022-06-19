<template>
  <div>
    <div class="main-content">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">
              <div class="card-title">Visualizar Perfil</div>
            </div>
            <div class="card-body">
              <div class="user-img">
                <img v-if="!users.photo" src="../../assets/images/profile.png" class="photo" />
                <img v-if="users.photo" :src="users.photo" class="photo" />
              </div>
              <div class="profile_user form-group">
                <h3 class="user_name_max" style="text-align: center">
                  {{ users.name }}
                </h3>
                <hr />
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
                          type="text"
                          class="form-control"
                          v-model="users.name"
                          placeholder
                          disabled
                        />
                      </div>
                      <div class="form-group col-md-6">
                        <label for="inputEmail4">
                          <span class="required">*</span> Email:
                        </label>
                        <input
                          disabled
                          autocomplete="off"
                          class="form-control"
                          id="userEmail"
                          placeholder=""
                          type="text"
                          v-model="users.email"
                        />
                      </div>
                    </div>
                    <hr />
                    <div class="block text-right">
                      <router-link to="/users" class="btn btn-back">
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
      users: {
        name: "",
        email: "",
        photo: "",
      },
      errors: undefined,
    };
  },
  computed: {},
  methods: {
    getUsers: function () {
      let self = this;
      let id = self.$route.params.id;
      let api =
        self.$store.state.api +
        "users/" + id 

      self.$http
        .get(api)
        .then((response) => {
          self.users = response.data.data[0];
        })
        .catch((error) => {
          self.errors = error.response.data;
          self.$message(null, self.errors, "error");
        });
    },
  },
  mounted: function () {
    let self = this;
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
  width: 250px;
  height: 198px;
}
.btn-user:hover,
.btn-user[aria-expanded="true"] {
  background: linear-gradient(to right, #000, #666);
  color: #fff !important ;
}
.photo {
  display: block;
  margin-left: auto;
  margin-right: auto;
  border-radius: 10px;
  height: 200px;
  object-fit: cover;
}
</style>