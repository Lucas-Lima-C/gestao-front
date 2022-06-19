<template>
    <div>
        <base-crud
                crudName="Usuários"
                newText="Novo Usuário"
                :table="userTable"
                :columns="columns"
                :options="options"
                :endPoint='endPoint'
                :enableAdd="true"
                :enableEdit="true"
                :enableDelete="true"
                :enableView="true"
                :dataForm="dataForm"
        >
        </base-crud>
    </div>
</template>

<script>
    import BaseCrud from '../Base/BaseCrud'

    export default {
        data: function () {
            return {
                userTable: 'userTable',
                users: [],
                pages: [],
                url: '',
                columns: ['id', 'photo', 'name', 'email', 'actions'],
                tableData: ['id', 'name', 'photo', 'name', 'email'],
                options: {
                    sortable: ['id', 'name'],
                    pagination: {chunk: 10, dropdown: false, nav: 'scroll' },
                    perPage: 10,
                    perPageValues: [10,25,50,100],
                    headings: {
                        'id': 'ID',
                        'photo' : 'Foto',
                        'name' : 'Nome',
                        'email' : 'E-mail',
                        'actions' : 'Ações'
                    }
                },
                endPoint: 'users/',

                dataForm: {
                  title: {
                    add: 'Novo Usuário',
                    edit: 'Editar Usuário',
                    view: 'Visualizar Usuário',
                    icon: 'fa fa-user-circle'
                  },
                  button: {
                    back: '/users'
                  },
                  url: {
                    model: 'users'
                  },
                  messages: {
                    success: {
                      add: 'Usuário cadastrado com sucesso!',
                      edit: 'Usuário alterado com sucesso!'
                    }
                  },
                  fields: [
                    {
                      name: 'name',
                      model: 'name',
                      label: 'Nome',
                      type: 'text',
                      isRequired: {
                        add: true,
                        edit: false,
                      },
                      placeholder: 'Digite o nome do usuário',
                      class: '',
                      length: "12|6|3",
                      offset: null
                    },
                    {
                      name: 'email',
                      model: 'email',
                      label: 'Email do Usuário',
                      type: 'email',
                      isRequired: {
                        add: true,
                        edit: false,
                      },
                      placeholder: 'Digite o e-mail do usuário',
                      class: '',
                      length: "4",
                      offset: null
                    },
                    {
                      name: 'password',
                      model: 'password',
                      label: 'Senha',
                      type: 'password',
                      isRequired: {
                        add: true,
                        edit: false,
                      },
                      placeholder: '***********',
                      class: '',
                      length: "4",
                      offset: null
                    },
                    {
                      name: 'photo',
                      model: 'photo',
                      label: 'Foto',
                      type: 'file',
                      isRequired: {
                        add: true,
                        edit: false,
                      },
                      placeholder: '',
                      class: '',
                      length: "12",
                      offset: null
                    },
                  ]
                }
            }
        },
        components: {
            BaseCrud
        }
    }
</script>

<style scoped>
    .VuePagination {
        text-align: center;
    }
</style>
