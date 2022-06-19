import Login from '../components/Login'

let routes = {
    path: '/login',
    component: resolve => require(['../components/layout/Login'], resolve),
    children: [
      {
          path: '/login',
          name: 'Login',
          component: Login
      },
    ]
}

export default routes
