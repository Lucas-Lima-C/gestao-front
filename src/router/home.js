import Home from '../components/Home'

let routes = {
    path: '/',
    component: resolve => require(['../components/layout/App'], resolve),
    children: [
      {
          path: '/',
          name: 'Home',
          component: Home
      },
    ]
}

export default routes
