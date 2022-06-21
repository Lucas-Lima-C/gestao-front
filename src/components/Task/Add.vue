<template>
  <div>
    <div class="main-content">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">
              <div class="card-title">Adicionar Tarefa</div>
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
                          autocomplete="new-password"
                          type="text"
                          id="Name"
                          class="form-control"
                          v-model="task.name"
                          placeholder=""
                        />
                      </div>
                    </div>
                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <label for="password">
                          <span class="required">*</span> Data de Conclusão:
                        </label>
                        <div style="width:45%">
                          <VueCtkDateTimePicker
                            color="#1194d0"
                            :only-date="true"
                            :no-header="true"
                            :no-button-now="true"
                            :auto-close="true"
                            label="Selecione a data"
                            :min-date="nowDate"
                            formatted="LL"
                            format="YYYY-MM-DD"
                            v-model="task.date_of_conclusion"
                          ></VueCtkDateTimePicker>
                        </div>
                      </div>
                    </div>
                    <hr />
                    <span class="required_fields">
                      <span class="required">*</span>
                      <strong>Campos obrigatórios</strong>
                    </span>
                    <div class="block text-right">
                      <a class="btn btn-add" @click="save">
                        Salvar
                        <i class="fa fa-save"></i>
                      </a>
                      <router-link to="/tasks" class="btn btn-back float-left">
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
      nowDate: moment().format("YYYY-MM-DD"),
      previewImage: null,
      task: {
        name: "",
        date_of_conclusion: "",
      },
      errors: undefined,
    };
  },
  computed: {},
  methods: {
    makeFormData: function () {
      const self = this;
      let fd = new FormData();

      fd.append("name", self.task.name);
      fd.append("date_of_conclusion", self.task.date_of_conclusion);

      fd.append("_method", "POST");

      return fd;
    },
    save: function () {
      const self = this;
      let api = self.$store.state.api + "tasks";

      let fd = self.makeFormData();

      self.$http
        .post(api, fd)
        .then((response) => {
          self.$message(
            "Sucesso",
            `Tarefa criada com sucesso`,
            "success"
          );
          this.$router.push("/tasks");
        })
        .catch((error) => {
          self.$message(null, error.response.data, "error");
        });
    },
  },
};
</script>
<style scoped>
.profile_user {
  text-align: center;
}
.btn-user:hover,
.btn-user[aria-expanded="true"] {
  background: linear-gradient(to right, #000, #666);
  color: #fff !important ;
}
</style>