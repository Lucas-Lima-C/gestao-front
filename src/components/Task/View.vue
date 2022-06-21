<template>
  <div>
    <div class="main-content">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">
              <div class="card-title">Visualizar Tarefa</div>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-md-12">
                  <form action>
                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <label for="userName">
                          <span class="required"></span> Nome:
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="task.name"
                          placeholder
                          disabled
                        />
                      </div>
                      <div class="form-group col-md-6">
                        <label>
                          <span class="required"></span> Data de Conclusão:
                        </label>
                        <input
                          disabled
                          autocomplete="off"
                          class="form-control"
                          placeholder=""
                          type="text"
                          v-model="task.date_of_conclusion"
                        />
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
                    <hr />
                    <div class="block text-right">
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
      task: {
        name: "",
        status: "",
        date_of_conclusion: "",
      },
    };
  },
  methods: {
    getTask: function () {
      let self = this;
      let id = self.$route.params.id;
      let api =
        self.$store.state.api +
        "tasks/" + id 

      self.$http
        .get(api)
        .then((response) => {
          self.task = response.data.data[0];
          self.task.date_of_conclusion = moment(self.task.date_of_conclusion).format("DD/MM/YYYY")
        })
        .catch((error) => {
          self.$message(null, error.response.data, "error");
        });
    },
  },
  mounted: function () {
    let self = this;
    let id = self.$route.params.id;

    if (id) {
      self.getTask(id);
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