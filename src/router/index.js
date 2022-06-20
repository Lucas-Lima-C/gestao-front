import Vue from 'vue'
import Router from 'vue-router'

import { store } from '../main.js'

import Home from './home'
import Login from './login'
import User from './user'
import Task from './task'
import Config from './config'


Vue.use(Router);

const router = new Router({
    mode: 'history',
    linkActiveClass: "active",
    hashbang: false,
    routes: [
        Login,
        Home,
        User,
        Task,
        Config,
    ]
});

router.beforeEach((to, from, next) => {
    const authenticated = localStorage.getItem('token');

    if (!authenticated && to.path.toString() != '/login') {
        next('/login');

        return true;
    }

    if (authenticated && to.path.toString() == '/login') {
        next('/');

        return true;
    }

    next();
});

router.afterEach((to, from) => {
    let _name = to.name;
    let _route = to.fullPath;

    if (_name === 'Home') {
        _name = '';
        _route = '';
    }
});

router.onError(error =>{    

    if (/loading chunk \d* failed./i.test(error.message) && navigator.onLine) {
        window.location.reload()
    }

}); // onError

export default router
