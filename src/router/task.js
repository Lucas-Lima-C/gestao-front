import Crud from '../components/Task/Crud'

let routes = {
    path: '/tasks',
    component: resolve => require(['../components/layout/App'], resolve),
    children: [
        {
            path: '/tasks/:operation?/:id?',
            name: 'Tarefas',
            component: Crud
        },
    ]
};


export default routes
