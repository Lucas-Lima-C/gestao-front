<template>
  <div class="card content-crud">
    <div class="ibox animated fadeInRightBig" v-if="!$route.params.operation">
      <div class="ibox-title" style="padding: 16px">
        <h3>
          {{ crudName }}
          <router-link
            :to="endPoint + 'add'"
            class="btn btn-add"
            v-show="enableAdd"
            style="float: right; margin-top: -5px"
            >{{ newText }}</router-link
          >
        </h3>
      </div>
      <div class="ibox-content">
        <v-server-table
          ref="table"
          :tableData="tableData"
          :name="table"
          :url="url"
          :columns="columns"
          :options="options"
        >
          <div slot="actions" slot-scope="props">
            <button
              v-show="enableView"
              data-toggle="tooltip"
              title="Consultar"
              class="btn btn-crud view"
              @click="view(props.row.id)"
            >
              <i
                class="fas fa-eye"
                data-toggle="tooltip"
                title="Visualizar"
              ></i>
            </button>
            <button
              v-show="enableEdit"
              data-toggle="tooltip"
              title="Editar"
              type="button"
              class="btn btn-crud edit"
              @click="edit(props.row.id)"
            >
              <i
                class="fas fa-pencil-alt"
                data-toggle="tooltip"
                title="Editar"
              ></i>
            </button>
            <button
              v-show="enableDelete"
              data-toggle="tooltip"
              title="Deletar"
              type="button"
              class="btn btn-crud delete"
              @click="destroy(props, props.row, props.index)"
            >
              <i
                class="far fa-trash-alt"
                data-toggle="tooltip"
                title="Excluir"
              ></i>
            </button>
          </div>
          <div slot="photo" slot-scope="props">
            <img v-if="props.row.photo" :src="props.row.photo" alt class="photo" />
            <img v-if="!props.row.photo" src="../../assets/images/profile.png" alt class="photo" />
          </div>
        </v-server-table>
      </div>
    </div>

    <BaseForm :dataForm="dataForm" />
  </div>
</template>

<script>
import { Pagination } from "vue-pagination-2";
import BaseForm from "./BaseForm";

export default {
  data: function () {
    return {
      // records: [],
      // pages: [],
      tableData: [],
      // model: [],
    };
  },
  props: {
    crudName: String,
    newText: String,
    table: String,
    columns: Array,
    options: Object,
    endPoint: String,
    enableAdd: Boolean,
    enableEdit: Boolean,
    enableDelete: Boolean,
    enableView: Boolean,
    dataForm: Object,
  },
  computed: {
    url() {
      return (
        this.$store.getters.api + this.endPoint + (this.with ? this.with : "")
      );
    },
  },
  methods: {
    edit(id) {
      this.$router.push({
        path: this.endPoint + "edit/" + id,
      });
    },
    view(id) {
      this.$router.push({
        path: this.endPoint + "view/" + id,
      });
    },
    destroy(props, row, index) {
      const self = this;

      swal({
        title: "Deseja deletar o registro?",
        text: "Essa operação não pode ser desfeita",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Sim, deletar!",
        showLoaderOnConfirm: true,
        buttons: {
          catch: {
            text: "Não",
            value: "cancel",
            className: "btn-danger",
          },
          confirm: {
            text: "Sim",
            value: "confirm",
          },
        },
      }).then((value) => {
        switch (value) {
          case "cancel":
            swal("Cancelado", "O registro não foi excluido!", "info");
            break;

          case "confirm":
            self.$http
              .delete(this.url + row.id, {
                id: row.id,
              })
              .then((response) => {
                self.$refs.table.tableData.splice(index - 1, 1);
                swal("Sucesso", "Registro excluído com sucesso!", "success");
              });
            break;
        }
      });
    },
  },
  components: {
    Pagination,
    BaseForm,
  },
};
</script>

<style scoped>
.photo {
  max-height: 90px;
  max-width: 90px;
}
</style>
