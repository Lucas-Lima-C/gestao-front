import Vue from 'vue'
import Router from 'vue-router'

import { store } from '../main.js'

import Home from './home'
import Login from './login'
import User from './user'

Vue.use(Router);

const router = new Router({
    mode: 'history',
    linkActiveClass: "active",
    hashbang: false,
    routes: [
        Login,
        Home,
        User,
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

export default router
