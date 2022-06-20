import Crud from '../components/Task/Crud'
import Add from '../components/Task/Add'
import View from '../components/Task/View'
import Edit from '../components/Task/Edit'

let routes = {
    path: '/tasks',
    component: resolve => require(['../components/layout/App'], resolve),
    children: [
        {
            path: '/tasks/add',
            name: 'Nova Tarefa',
            component: Add
        },
        {
            path: '/tasks/edit/:id?',
            name: 'Editar Tarefa',
            component: Edit
        },
        {
            path: '/tasks/view/:id?',
            name: 'Visualizar Tarefa',
            component: View
        },
        {
            path: '/tasks',
            name: 'Tarefas',
            component: Crud
        },
    ]
};


export default routes
