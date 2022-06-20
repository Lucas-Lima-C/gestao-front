<template>
  <div>
    <div class="row mt-3">
      <div class="col-md-12">
        <base-crud
          :ref="'tasksCrud'"
          crudName="Tarefas"
          newText="Nova Tarefa"
          :table="table"
          :columns="columns"
          :options="options"
          :endPoint="endPoint"
          :enableAdd="true"
          :enableEdit="true"
          :enableDelete="true"
          :enableView="true"
          :extra="extra"
          :dataForm="dataForm"
          @finishTask="finishTask"
        >
        </base-crud>
      </div>
    </div>
  </div>
</template>

<script>
import BaseCrud from "../Base/BaseCrud";

export default {
  data: function () {
    return {
      table: "tasksTable",
      showMessageImport: false,
      pages: [],
      url: "",
      columns: [
        "id",
        "title",
        "status",
        "date_of_conclusion",
        "actions",
      ],
      tableData: ["id", "title", "status", "date_of_conclusion"],
      extra: [
        {
          id: 1,
          label: "",
          class: "btn btn-crud edit",
          title: "Concluir Tarefa",
          name: "finishTask",
          icon: "fas fa-check",
        },
      ],
        options: {
        cellClasses:{
          id: [
            {
                class:'adjustWidth',
                condition: row => true
            }
          ]
        },
        filterByColumn: true,
        debounce: 1000,
        filterable: ["id", "title", "status", "date_of_conclusion"],
        pagination: { chunk: 10, dropdown: false, nav: "scroll" },
        perPage: 10,
        perPageValues: [10, 25, 50, 100],
        headings: {
          id: "ID",
          title: "Nome",
          status: "Status",
          date_of_conclusion: "Data de Conclusão",
          actions: "Ações",
        },
        texts: {
          filterBy: "Filtrar",
          defaultOption: "Selecione",
        },
        listColumns: {
        },
        templates: {
          date_of_conclusion(h, row, index) {
            return moment(row.date_of_conclusion).format("DD/MM/YYYY");
          },
        },
        requestFunction: function (data) {
          let requestData = {};

          let query = this.$parent.$parent.query(data.query);
          requestData.params = data;
          requestData.params.query = "";
          requestData.params.with = "";

          return this.$http.get(this.url + "?" + query, requestData).catch(
            function (e) {
              this.dispatch("error", e);
            }.bind(this)
          );
        },
      },
      endPoint: "tasks/",
      dataForm: {},
    };
  },
  components: {
    BaseCrud,
  },
  methods: {
    finishTask(props) {
      $("#page_loader").show();
      const self = this;
      const api =
        self.$store.state.api +
        "tasks/finishTask/" + props.row.id;
      self.$http
        .post(api)
        .then((response) => {
          self.$message("Sucesso", "Tarefa concluída com sucesso", "success");
          self.$refs.tasksCrud.$refs.table.refresh();
          $("#page_loader").hide();
        })
        .catch((error) => {
          self.$message("Erro", error.response.data, "error");
          $("#page_loader").hide();
        });
    },
    makeFormData: function () {
      const self = this;
      let fd = new FormData();

      let fileImport = document.getElementById("fileImport");

      fd.append("fileImport", fileImport.files[0] ? fileImport.files[0] : "");

      return fd;
    },
    query: function (query) {
      let columns = {
        id: "id",
        title: "title",
        status: "status",
        date_of_conclusion: "date_of_conclusion",
      };
      let filters = "";
      $.each(query, function (index, value) {
        filters += columns[index] + "=" + value + "&";
      });
      return filters;
    },
    openInput() {
      document.getElementById("fileImport").click();
    },
  },
};
</script>

<style scoped>
.VuePagination {
  text-align: center;
}
</style>