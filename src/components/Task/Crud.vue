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
      pages: [],
      url: "",
      columns: [
        "id",
        "name",
        "status",
        "date_of_conclusion",
        "actions",
      ],
      tableData: ["id", "name", "status", "date_of_conclusion"],
      extra: [
        {
          id: 1,
          label: "",
          class: "btn btn-crud edit",
          name: "Concluir Tarefa",
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
        sortIcon: {
            base : 'space_fas fas',
            is: 'fa-sort',
            up: 'fa-sort-amount-up',
            down: 'fa-sort-amount-down'
        },
        filterByColumn: true,
        debounce: 1000,
        filterable: ["id", "name", "date_of_conclusion"],
        sortable: ["id", "name", "date_of_conclusion"],
        pagination: { chunk: 10, dropdown: false, nav: "scroll" },
        perPage: 10,
        perPageValues: [10, 25, 50, 100],
        headings: {
          id: "ID",
          name: "Nome",
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
    };
  },
  components: {
    BaseCrud,
  },
  methods: {
    finishTask(props) {
      const self = this;
      const api =
        self.$store.state.api +
        "tasks/finishTask/" + props.row.id;
      self.$http
        .post(api)
        .then((response) => {
          self.$message("Sucesso", "Tarefa concluída com sucesso", "success");
          self.$refs.tasksCrud.$refs.table.refresh();
        })
        .catch((error) => {
          self.$message("Erro", error.response.data, "error");
        });
    },
    query: function (query) {
      let columns = {
        id: "id",
        name: "name",
        status: "status",
        date_of_conclusion: "date_of_conclusion",
      };
      let filters = "";
      $.each(query, function (index, value) {
        filters += columns[index] + "=" + value + "&";
      });
      return filters;
    },
  },
};
</script>

<style scoped>
.VuePagination {
  text-align: center;
}
</style>