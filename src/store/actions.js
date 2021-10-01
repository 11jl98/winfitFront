import * as MutationsType from './mutations-types'

export default {
    registerAgrotoxicos({commit}, agrotoxico){
        return commit(MutationsType.REGISTER_AGROTOXICO, agrotoxico)
    },

    registerCultura({commit}, cultura){
        return commit(MutationsType.REGISTER_CULTURA, cultura)
    },

    registerDiagnostico({commit}, diagnostico){
        return commit(MutationsType.REGISTER_DIAGNOSTICO, diagnostico)
    },

    registerDadosTecnicos({commit}, dadosTecnico){
        return commit(MutationsType.REGISTER_DADOSTECNICOS, dadosTecnico)
    },

    registerIdReceituario({commit}, idReceituario){
        return commit(MutationsType.ID_RECEITUARIO, idReceituario)
    }
}