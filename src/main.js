import './bootstrap'

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import mainStore from './store'
import {VueTables, ServerTable, ClientTable, Event} from 'vue-tables-2';
import VueToastr from '@deveodk/vue-toastr'
import {Pagination} from 'vue-pagination-2';
import vueDebounce from 'vue-debounce'
import swal from "sweetalert";
import VueCtkDateTimePicker from 'vue-ctk-date-time-picker';
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css';


const translation = {
    count: 'Mostrando {from} de {to} até {count} de registros',
    filter: 'Pesquisar:',
    filterPlaceholder: 'Pesquisar',
    limit: 'Registros:',
    noResults: 'Nenhum registro encontrado',
    page: 'Página:',
}

const options = {
    requestFunction: function (data) {
        // data.token = this.$store.getters.token
        return axios.get(this.url, {
            params: data
        }).catch(function (e) {
            this.dispatch('error', e);
            router.push('/login')
        }.bind(this));
    },
    texts: translation,
    pagination: {chunk: 15, dropdown: false, nav: 'scroll'},
    perPage: 10,
    perPageValues: [10, 25, 50, 100]
}

Vue.config.productionTip = false
Vue.use(Vuex)
Vue.use(router)
Vue.use(ServerTable, options, true, 'bootstrap3', 'footerPagination')
Vue.use(VueToastr)
Vue.use(vueDebounce, {
    defaultTime: '2800ms'
})

Vue.component('VueCtkDateTimePicker', VueCtkDateTimePicker);

export const store = new Vuex.Store(mainStore);

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: {App},
    template: '<App/>',
    created() {
        this.$store.dispatch('initialize')
    },
});

import './assets/auxiliary/bootstrap/css/bootstrap.min.css'
import '@deveodk/vue-toastr/dist/@deveodk/vue-toastr.css';
import './assets/css/style.css'
import './assets/auxiliary/animate/animate.css'
import './assets/auxiliary/fontawesome/css/all.min.css'

window.moment = require('moment');
moment.locale('pt-br');

Vue.prototype.$http = window.axios;
Vue.prototype.$message = function (title, msg, type) {

    let newMsg = '';
    if (msg instanceof Object) {

        newMsg += "<ul>";
        for (var key in msg) {
            if (msg.hasOwnProperty(key)) {
                newMsg += "<li>";
                newMsg += msg[key];
                newMsg += "</li>";
            }
        }
        newMsg += "</ul>";

    } else newMsg = msg;

    this.$toastr('add',
        {
            title: title,
            msg: newMsg,
            clickClose: true,
            timeout: 4000,
            position: 'toast-top-right',
            type: type
        })
};
Vue.prototype.$errorMessage = function (error, customMessage) {

    if (customMessage == null || customMessage == undefined) {
      customMessage = 'Ocorreu um erro'
    }
  
    var errors = (error.response) ? error.response.data : customMessage;
  
    if (typeof errors === 'object') {
      var html = '<ul class="errors">';
  
      $.each(errors, function (key, value) {
        html += '<li>' + value[0] + '</li>';
      });
  
      html += '</ul>';
  
      errors = html;
    }
  
    if (errors != null) {
      this.$message(customMessage, errors, 'error');
    }
}