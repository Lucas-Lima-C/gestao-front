<template>
    <div>
        <div class="panel animated fadeInRightBig">
            <div class="panel-heading">
                <div class="panel-title">
                    <span class="title">
                        <b>Editar Usuário</b>

                        <i class="fa fa-user-circle" style="float:right;margin-top:6px;font-size:21px;"></i>

                        <hr>
                    </span>
                </div>
            </div>
            <div class="panel-body">
                <form id="form" v-if="users">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="text-center m-b-lg">
                                <img :src="users.photo" width="160px">
                            </div>
                        </div>
                    </div>
                    <br>
                    <div class="row">
                        <div class="col-md-4">
                            <label for="name">Nome do Usuário</label>
                            <input type="text" class="form-control" name="name" v-model="users.name" id="name" placeholder="Seu nome aqui">
                        </div>
                        <div class="col-md-4">
                            <label for="email">E-mail do Usuário</label>
                            <input type="email" class="form-control" name="email" v-model="users.email" id="email" placeholder="xxxxxxxx" disabled>
                        </div>

                        <div class="col-md-4">
                            <label for="password">Senha</label>
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
                    photo: '',
                },

                errors: undefined
            }
        },
        computed: {},
        methods: {
            save: function () {
                const id   = this.$route.params.id;
                const api  = this.$store.state.api + 'users/' + id;
                const self = this;

                let form  = {};
                let photo = document.getElementById('photo');

                form['name']     = self.users.name;
                form['email']    = self.users.email;
                form['email'] = self.users.email;
                form['password'] = self.users.password;
                form['photo'] = self.users.photo;

                if(photo.files[0]){
                    this.updateImage();
                }


                self.$http.put(api, form)
                    .then((response) => {
                        self.$message('Sucesso', `Usuário atualizado com sucesso`, 'success');
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
            },
            getUser: function(){
                let self = this;
                let id   = self.$route.params.id;
                let api  = self.$store.state.api + 'users/' + id;

                self.$http.get(api)
                    .then((response) => {
                        self.users = response.data.data[0];
                    })
                    .catch((error) => {
                        self.errors = error.response.data;
                        self.$message(null, self.errors, 'error');
                    });
            },
            updateImage: function(){
                const self = this;
                const api  = self.$store.state.api + 'users/image/update/' + self.$route.params.id;

                let form = new FormData();
                form.append('photo', document.getElementById('photo').files[0]);

                self.$http.post(api, form)
                    .then((response) => {
                        // Do nothing
                    })
                    .catch((error) => {
                        self.errors = error.response.data;
                        self.$message(null, self.errors, 'error');
                    });
            }
        },
        mounted: function(){
            this.getUser();
        }
    }
</script>
<style>
</style>
