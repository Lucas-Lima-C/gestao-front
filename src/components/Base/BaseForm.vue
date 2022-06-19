<template>
  <div class="ibox animated fadeInRightBig" v-if="$route.params.operation">
    <div class="ibox-title" v-if="dataForm.title">
      <h3>{{ dataForm.title[$route.params.operation] || '' }}</h3>
    </div>
    <form @submit.prevent="save">
      <div class="ibox-content">
          <div class="row">
            <v-col :length="field.length || '12'" :offset="field.offset || null" v-for="(field, index) in dataForm.fields" :key="index">
              <label :for="field.name"><span v-if="isRequired(field)" class="required">*</span> {{ field.label }}:</label>
              <!-- Input do tipo text, number, tel -->
              <input v-if="$route.params.operation != 'view' && field.type != 'file'" :type="field.type" :class="'form-control ' + (field.class || '')" :id="field.name" :name="field.name" v-model="model[field.model]" :placeholder="field.placeholder || ''"  :required="isRequired(field)">
              <!-- Input do tipo file -->
              <input v-if="$route.params.operation != 'view' && field.type == 'file'" :type="field.type" :class="'form-control ' + (field.class || '')" :id="field.name" :name="field.name" :required="isRequired(field)">
              <!-- Somente visualização -->
              <span v-if="$route.params.operation == 'view' && field.type != 'file'" :class="'block ' + (field.class || '') " >{{ model[field.model] }}</span>
              <!-- Somente visualização para arquivos do tipo file -->
              <a v-if="$route.params.operation == 'view' && field.type == 'file'" :href="model[field.model]" :class="'block ' + (field.class || '') " target="_blank">Clique para abrir</a>
            </v-col>
          </div>
      </div>
      <div class="ibox-footer">
          <div class="pull-right">
              <router-link :to="dataForm.button.back" class="btn btn-info">
                  <i class="fa fa-arrow-left"></i> Voltar
              </router-link>
              <button type="submit" class="btn btn-success" v-if="$route.params.operation != 'view'">
                  Salvar <i class="fa fa-save"></i>
              </button>
          </div>
          <p v-if="hasRequired"><span class="required">*</span> Campos Obrigatórios</p>
          <div class="clearfix"></div>
      </div>
    </form>
  </div>
</template>

<script>
    import vCol from '../Utils/vCol'

    export default {
        props: {
          dataForm: Object,
        },
        components: {
          vCol
        },
        data() {
            return {
              model: {},
              errors: undefined
            }
        },
        watch: {
          '$route.params.id': function (val) {
            if (this.$route.params.id) {
              this.getModel()
            }
            else {
              this.model = {}
            }
          }
        },
        mounted() {
          if (this.$route.params.id) {
              this.getModel()
            }
            else {
              this.model = {}
            }
        },
        computed: {
          hasRequired: function () {

            let fields = this.dataForm.fields
            for(let i in fields) {

              if (this.isRequired(fields[i])) {
                return true;
              }
            }
            return false
          }
        },
        methods: {
          isRequired: function(field) {
            if (this.$route.params.operation == 'view') {
              return false
            }
            return field.isRequired ? field.isRequired[this.$route.params.operation] : true;
          },
          getModel: function() {
            let self = this;
            let id   = self.$route.params.id;
            let api  = self.$store.state.api + self.dataForm.url.model +'/' + id;

            self.$http.get(api)
                .then((response) => {
                    self.model = response.data.data[0];

                    let fields = this.dataForm.fields
                    for(let i in fields) {
                      if (fields[i].type == 'password') {
                        delete self.model[fields[i].model]
                      }
                    }
                })
                .catch((error) => {
                    self.errors = error.response.data;
                    self.$message(null, self.errors, 'error');
                });
          },
          save: function () {
            let id = this.$route.params.id ? '/' + this.$route.params.id : '';
            const api = this.$store.state.api + this.dataForm.url.model + id;
            const self = this;

            const operation = self.$route.params.operation;

            let form = new FormData();
            for (var field in self.dataForm.fields) {
              let dataField = self.dataForm.fields[field];
              if (dataField.type == 'file') {
                let fileUpload = document.getElementById(dataField.name);
                form.append(dataField.model, (fileUpload.files[0]) ? fileUpload.files[0] : null);
              }
              else {
                if (self.model[dataField.model]) {
                  form.set(dataField.model, self.model[dataField.model]);
                }
              }
            }

            if (operation == 'edit') {
              form.append('_method', 'PUT');
            }

            self.$http.post(api, form)
                .then((response) => {
                    self.$message('Sucesso', self.dataForm.messages.success[operation], 'success');
                    this.$router.push('/users');
                })
                .catch((error) => {
                    self.errors = error.response.data;

                    if(typeof self.errors === 'object'){
                        let html = '<ul>';
                        $.each(self.errors, function(key, value){
                            html += '<li>' + value[0] + '</li>';
                        });
                        html += '</ul>';
                        self.errors = html;
                    }

                    self.$message(null, self.errors, 'error');
                });
          }
        },
    }
</script>
