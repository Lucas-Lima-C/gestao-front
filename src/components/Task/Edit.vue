<template>
  <div>
    <div class="main-content">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">
              <div class="card-title">Editar Tarefa</div>
            </div>
            <div class="card-body">
              <hr />
              <br />
              <div class="row">
                <div class="col-md-12">
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
                          v-model="task.title"
                          placeholder=""
                        />
                      </div>
                      <div class="form-group col-md-6 text-center" style="justify-content: center; display: grid;">
                        <label for="password">
                          <span class="required">*</span> Data de Conclusão:
                        </label>
                          <VueCtkDateTimePicker
                            style="width:100%"
                            color="#1194d0"
                            :only-date="true"
                            :no-header="true"
                            :no-button-now="true"
                            :auto-close="true"
                            label="Selecione a data"
                            :min-date="nowDate"
                            formatted="LL"
                            v-model="task.date_of_conclusion"
                          ></VueCtkDateTimePicker>
                      </div>
                    </div>
                    <div class="form-row text-center">
                      <div class="form-group col-md-12">
                        <label for="inputEmail4">
                          <span class="required"></span> Status:
                        </label>
                        <h4>
                        <span
                          class="badge"
                          :class="[task.status == 'Concluido' ? 'pastel-green' : task.status == 'Pendente' ? 'pastel-yellow' : 'pastel-red']"
                        >{{task.status == 'Concluido' ? 'Concluído' : task.status == 'Pendente' ? 'Pendente' : 'Atrasado'}}</span>
                        </h4>
                      </div>
                    </div>
                    <div v-if="task.status != 'Concluido'" class="form-row text-center">
                      <div class="form-group col-md-12">
                        <input
                            id="finishTask"
                            type="checkbox"
                            class="cool-input"
                            v-model="finishTask"
                        />
                        <label for="finishTask">Concluir Tarefa</label>
                      </div>
                    </div>
                    <hr />
                    <span class="required_fields">
                      <span class="required">*</span>
                      <strong>Campos obrigatórios</strong>
                    </span>
                    <div class="block text-right" style="cursor: pointer">
                      <a class="btn btn-add" @click="save">
                        Salvar
                        <i class="fa fa-save"></i>
                      </a>
                      <router-link to="/tasks" class="btn btn-back float-left">
                        <i class="fa fa-arrow-left"></i> Voltar
                      </router-link>
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
      nowDate: moment().format("YYYY-MM-DD"),
      previewImage: null,
      finishTask: false,
      task: {
        title: "",
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

      fd.append("title", self.task.title);
      fd.append("date_of_conclusion", self.task.date_of_conclusion);
      if(this.finishTask == true){
        fd.append("status", 'Concluido');
      }

      fd.append("_method", "PUT");

      return fd;
    },
    save: function () {
      const self = this;
      let api = self.$store.state.api + "tasks/" + self.task.id;

      let fd = self.makeFormData();

      self.$http
        .post(api, fd)
        .then((response) => {
          self.$message(
            "Sucesso",
            `Tarefa editada com sucesso`,
            "success"
          );
          this.$router.push("/tasks");
        })
        .catch((error) => {
          self.$message(null, error.response.data, "error");
        });
    },
    getTask: function (id) {
      const self = this;
      const api = self.$store.state.api + "tasks/" + id;

      self.$http
        .get(api)
        .then((response) => {
          self.task = response.data.data[0];
        })
        .catch((error) => {
          self.$message(null, error.response.data, "error");
        });
    },
  },
  mounted: function () {
    const self = this;

    let id = self.$route.params.id;
    if (id) {
      self.getTask(id);
    }
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

.cool-input:not(:checked), 
.cool-input:checked {
  position: absolute;
  left: -9999%;
}

.cool-input + label {
  display: inline-block;
  padding: 6px;
  cursor: pointer;
  background-color: white;
  border-radius: .25rem;
  color: #707070;
  font-size: 14px;
  font-weight: bold;
  transition: box-shadow .4s;
  border: 2px solid green
}

.cool-input:checked + label {
  color:white;
  box-shadow: inset 0 0 0 50px green;
  }

</style>