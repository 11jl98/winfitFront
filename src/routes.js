import Vue from 'vue'
import Router from 'vue-router'
import Receita from '../src/Pages/Receita/Page-Receita.vue'
import Cliente from '../src/Pages/Cliente/Page-Cliente.vue'
import Fornecedor from '../src/Pages/Fornecedor/Page-Fornecedor.vue'
import Responsavel from '../src/Pages/ResponsavelTecnico/Page-Responsavel.vue'
import Estoque from '../src/Pages/Estoque/Page-Estoque.vue'
import ModeloReceita from '../src/components/ModeloReceita/ModeloPadrao.vue'


Vue.use(Router)
const routes = [
    {
        path: '/Receita',
        component: Receita
    },

    {
        path: '/Cliente',
        component: Cliente
    },

    {
        path: '/Fornecedor',
        component: Fornecedor
    },

    {
        path: '/Responsavel',
        component: Responsavel
    },

    {
        path: '/Estoque',
        component: Estoque
    }, 

    {
        path: '/ModeloPadrao/:idReceita',
        component: ModeloReceita
    }
]

const router = new Router({
    mode: 'history',
    routes
})

export default router;