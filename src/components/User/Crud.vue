<template>
  <div>
    <div class="row mt-3">
      <div class="col-md-12">
        <base-crud
          :ref="'usersCrud'"
          crudName="Usuários"
          newText="Novo Usuário"
          :table="table"
          :columns="columns"
          :options="options"
          :endPoint="endPoint"
          :enableAdd="true"
          :enableEdit="true"
          :enableDelete="true"
          :enableView="true"
          :dataForm="dataForm"
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
      table: "usersTable",
      showMessageImport: false,
      usersCrud: {},
      pages: [],
      url: "",
      columns: [
        "id",
        "photo",
        "name",
        "email",
        "actions",
      ],
      tableData: ["id", "photo", "name", "email",],
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
        filterable: ["id", "name", "email",],
        pagination: { chunk: 10, dropdown: false, nav: "scroll" },
        perPage: 10,
        perPageValues: [10, 25, 50, 100],
        headings: {
          id: "ID",
          photo: "Foto",
          name: "Nome",
          email: "E-mail",
          actions: "Ações",
        },

        texts: {
          filterBy: "Filtrar",
          defaultOption: "Selecione",
        },
        listColumns: {
        },
        templates: {
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
      endPoint: "users/",
      dataForm: {},
    };
  },
  components: {
    BaseCrud,
  },
  methods: {
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
        photo: "photo",
        name: "name",
        email: "email",
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
.uploading-image {
  display: flex;
  border-radius: 10px;
  width: 100px;
  height: 100px;
}
</style>