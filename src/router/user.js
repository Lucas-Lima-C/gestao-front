import Crud from '../components/User/Crud'
import Add from '../components/User/Add'
import View from '../components/User/View'
import Edit from '../components/User/Edit'

let routes = {
    path: '/users',
    component: resolve => require(['../components/layout/App'], resolve),
    children: [
        {
            path: '/users/add',
            name: 'Novo Usuário',
            component: Add
        },
        {
            path: '/users/edit/:id?',
            name: 'Editar Usuário',
            component: Edit
        },
        {
            path: '/users/view/:id?',
            name: 'Visualizar Usuário',
            component: View
        },
        {
            path: '/users',
            name: 'Usuários',
            component: Crud
        },
    ]
};


export default routes
