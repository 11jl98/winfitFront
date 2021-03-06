import Vue  from 'vue'
import Vuex  from 'vuex'
import actions from './actions'
import mutations from './mutations'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        agrotoxicos: [],
        culturas: [],
        diagnosticos: [],
        dadosTecnico: [],
        idReceituario: "",
        idInfortecnica: "",
    },
    actions,
    mutations
})

export default store;