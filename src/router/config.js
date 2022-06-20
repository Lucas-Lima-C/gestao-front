import Config from '../components/Config'

let routes = {
    path: '/config',
    component: resolve => require(['../components/layout/App'], resolve),
    children: [
      {
          path: '/config',
          name: 'Config',
          component: Config
      },
    ]
}

export default routes
