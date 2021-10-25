import * as MutationsTypes from './mutations-types'

export default {
    [MutationsTypes.REGISTER_AGROTOXICO](state, agrotoxico) {
        state.agrotoxicos = agrotoxico
    },

    [MutationsTypes.REGISTER_CULTURA](state, cultura){
        state.culturas = cultura
    },

    [MutationsTypes.REGISTER_DIAGNOSTICO](state, diagnostico){
        state.diagnosticos = diagnostico
    },

    [MutationsTypes.REGISTER_DADOSTECNICOS](state, dadosTecnicos){
        state.dadosTecnico = dadosTecnicos
    },

    [MutationsTypes.ID_RECEITUARIO](state, idReceituario){
        state.idReceituario = idReceituario
    },


    [MutationsTypes.ID_INFORTECNICA](state, idInfortecnica){
        state.idInfortecnica = idInfortecnica
    },
}