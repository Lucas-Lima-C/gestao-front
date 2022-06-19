<template>
    <div>
        <div class="panel animated fadeInRightBig">
            <div class="panel-heading">
                <div class="panel-title">
                    <div class="row">
                        <div class="col-md-12">
                            <span class="title">
                                <b>{{ users.role.name }}</b> - {{ users.name }}

                                <i class="fa fa-user-circle" style="float:right;margin-top:6px;font-size:21px;"></i>
                            </span>

                            <hr class="m-t-md">
                        </div>

                        <div class="col-md-2 text-right">
                            <div class="img-responsive">
                                <img :src="users.photo" width="160px">
                            </div>
                        </div>

                        <div class="col-md-4">
                            <div class="block" style="padding:5px 25px 25px 25px">
                                <span class="block">
                                    <b>E-mail:</b> {{ users.email }}
                                </span>

                                <span class="block m-t-sm">
                                    <b>Nome:</b> {{ users.name }}
                                </span>

                                <span class="block m-t-sm">
                                    <b>Cargo:</b> {{ users.role.name }}
                                </span>

                                <span class="block m-t-sm">
                                    <b>Turno:</b> {{ users.shift.name }}
                                </span>
                            </div>
                        </div>
                    </div>

                    <router-link to="/users" class="btn btn-info" style="float:right">
                        <i class="fa fa-arrow-left"></i> Voltar
                    </router-link>
                </div>
            </div>
            <div class="panel-body">
                <div></div>
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
                    registry: '',
                    photo: '',
                    shift_id: '',
                    role_id: ''
                },
                shifts: [],
                roles: [],
                errors: undefined
            }
        },
        computed: {},
        methods: {
            getUsers: function(){
                let self = this;
                let id   = self.$route.params.id;
                let api  = self.$store.state.api + 'users/' + id + '?with[]=role&with[]=shift';

                self.$http.get(api)
                    .then((response) => {
                        self.users = response.data.data[0];
                    })
                    .catch((error) => {
                        self.errors = error.response.data;
                        self.$message(null, self.errors, 'error');
                    });
            }
        },
        mounted: function(){
            this.getUsers();
        }
    }
</script>
