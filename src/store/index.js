require('../bootstrap');

import env from '../config/env';
import router from  '../router/index'

const baseURL = env.baseURL;
const normalURL = env.normalURL;

const store = {
    state: {
        user: {
            name: '',
            photo: '',
            email: '',
            id: 0
        },
        authenticated: false,
        token: '',
        api: baseURL,
        url: normalURL,
    },
    getters: {
        token: state => {
            return state.token;
        },
        authenticated: state => {
            if (state.token == null || state.token == 'null') {
                return false;
            }

            return state.authenticated;
        },
        logo: state => {
            return state.logo;
        },
        user: state => {
            return state.user;
        },
        api: state => {
            return state.api;
        },
        url: state => {
            return state.url;
        },
    },
    mutations: {
        auth(state, token) {
            
            if (token != null && token != undefined) {
                state.authenticated = true;
                state.token = token;

                localStorage.clear();
                localStorage.setItem('token', token);
                
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + token ;
                this.commit('profileUpdate');
            }
        },
        profileUpdate(state) {
            axios.post(state.api + 'me', {
                token: state.token
            })
                .then(response => {
                    state.user.id = response.data.id;
                    state.user.name = response.data.name;
                    state.user.email = response.data.email;
                    state.user.photo = response.data.photo;
                })
                .catch(error => {
                    localStorage.clear();

                    router.push('/login');
                });
        },
    },
    actions: {
        initialize(context) {
            const token = localStorage.getItem('token');

            context.commit('auth', token);
        }
    }
};

export default store;
