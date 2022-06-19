<template>
    <div>
        <div class="panel animated fadeInRightBig">
            <div class="panel-heading">
                <div class="panel-title">
                    <span class="title">
                        <b>Novo Usuário</b>
                        <i class="fa fa-user-circle" style="float:right;margin-top:6px;font-size:21px;"></i>

                        <hr>
                    </span>
                </div>
            </div>
            <div class="panel-body">
                <form id="form">
                    <div class="row">
                        <div class="col-md-4">
                            <label for="name"><span class="required">*</span> Nome:</label>
                            <input type="text" class="form-control" name="name" v-model="users.name" id="name" placeholder="Nome do usuário">
                        </div>
                        <div class="col-md-4">
                            <label for="email"><span class="required">*</span> Email do Usuário</label>
                            <input type="email" class="form-control" name="email" v-model="users.email" id="email" placeholder="xxxxxxxx">
                        </div>
                        <div class="col-md-4">
                            <label for="password"><span class="required">*</span> Senha</label>
                            <input type="password" name="password" class="form-control" id="password" placeholder="***********" v-model="users.password">
                        </div>
                    </div>

                    <hr class="m-t-md m-b-md">

                    <div class="row">
                        <div class="col-md-12">
                            <input type="file" name="photo" id="photo">
                        </div>
                    </div>

                    <hr>

                    <div class="block text-right">
                        <router-link to="/users" class="btn btn-info">
                            <i class="fa fa-arrow-left"></i> Voltar
                        </router-link>
                        <a class="btn btn-success" @click="save">
                            Salvar <i class="fa fa-save"></i>
                        </a>
                    </div>
                    <div class="row">
                        <div class="col-md-4">
                          <p><span class="required">*</span> Campos Obrigatórios</p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                users: {
                    name: '',
                    email: '',
                    password: '',
                    email: '',
                    photo: ''
                },

                errors: undefined
            }
        },
        computed: {},
        methods: {
            save: function () {
                const api = this.$store.state.api + 'users';
                const self = this;

                let form  = new FormData();
                let photo = document.getElementById('photo');

                form.append('name', self.users.name);
                form.append('email', self.users.email);
                form.append('email', self.users.email);
                form.append('password', self.users.password);
                form.append('photo', (photo.files[0]) ? photo.files[0] : null);


                self.$http.post(api, form)
                    .then((response) => {
                        self.users = response.data.data;
                        self.tableData = self.users;


                        self.$message('Sucesso', `Usuário cadastrado com sucesso`, 'success');

                        self.users = {

                            name: '',
                            email: '',
                            password: '',
                            photo: ''

                        };
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
        mounted: function(){

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
