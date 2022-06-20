<template>
  <div>
  <div class="card content-crud" style="margin-top:16px; padding:10px">
    <div class="ibox animated fadeInRightBig">
      <div class="ibox-title" style="padding-left: 5px">
        <h3>
          Configurações
        </h3>
        <hr/>
      </div>
        <div class="row">
          <div class="col-md-12">
              <div class="form-row">
                <div class="form-group col-md-6">
                  <label for="Name">
                    <span class="required"></span> Envio de e-mail referente a notificações para o usuário:
                  </label>
                    <v-select 
                    v-model="userInSelectId"
                    :label="'name'" 
                    :options="users"
                    :clearable="false"
                    :reduce="(option) => option.id"
                    @input="save()" 
                    >
                    </v-select>
                </div>
              </div>
          </div>
        </div>
    </div>
    </div>
  </div>
</template>

<script>
import vSelect from "vue-select";
export default {
  data() {
    return {
        users: [],
        userInSelectId: '',
    };
  },
  methods: {
    getUsers() {
      const self = this;
      const api = self.$store.state.api + "users";

      self.$http
        .get(api)
        .then((response) => {
          self.users = response.data.data;
        })
        .catch((error) => {
          self.$message("Erro", error.response.data, "error");
        });
    },
    getMailReceiver(){
      const self = this;
      const api = self.$store.state.api + "mailReceivers";

      self.$http
        .get(api)
        .then((response) => {
          self.userInSelectId = response.data.data[0].user_id;
        })
        .catch((error) => {
          self.$message("Erro", error.response.data, "error");
        });
    },
    save() {
        const self = this;
        const api = self.$store.getters.api + 'mailReceivers/change/' + self.userInSelectId;

        axios.post(api)
        .then(x => {
          self.$message('Sucesso', 'Recebedor de e-mail alterado com sucesso', 'success')
        })
        .catch((error) => {
          self.$message("Erro", error.response.data, "error");
        });
    },
  },
  mounted() {
    this.getUsers();
    this.getMailReceiver();
  },
  components: {
    vSelect
  }
};
</script>
<style>
.line{
width: 100%;
color: grey;
height: 47px;
border-bottom: 1px solid lightblue;
position: absolute;
}

</style>
