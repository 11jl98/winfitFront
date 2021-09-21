<template>
    <div
    class="mt-5"
    id="divContainer"
    style="display: flex; justify-content: space-between"
  >
    <div
      class="row ml-2"
      id="menuReceita"
      style="border-radius: 10px; height: 600px; background: #f6f6f6"
    >
      <div class="col-12 mt-4">
        <div class="list-group" id="list-tab" role="tablist">
          <b-button block class="shadow" id="btnDadosCadastrais" v-b-toggle.accordion-responsavel
            >Dados Cadastrais
            <b-icon-person-lines-fill class="float-right"></b-icon-person-lines-fill>
          </b-button>
          <b-button
            block
            id="btnDadosResponsavel"
            v-b-toggle.accordion-dadosTecnicos
            class="shadow teste2"
            style=""
            >Dados do Responsavel
            <b-icon-person-badge class="float-right"></b-icon-person-badge
          ></b-button>
          <b-button block v-b-toggle.accordion-pesquisa class="shadow" id="btnReceita"
            >Pesquisa
            <b-icon-search class="float-right"></b-icon-search
          ></b-button>
         
        </div>
      </div>
    </div>

    <div class="accordion col-sm-10" id="receita" role="tablist">
      <!-- <Cliente /> -->
      <DadosCadastrais :dadosPesquisa="dadosPesquisa" @dadosResponsavel="dadosResponsavelTecnico = $event"/>
      <DadosTecnicos @reloadPesquisa="reloadPesquisa = !reloadPesquisa" :dadosResponsavelTecnico="dadosResponsavelTecnico" :dadosPesquisa="dadosPesquisa" />
      <Pesquisa :reloadPesquisa="reloadPesquisa" @resposavelEdit="dadosPesquisa = $event" />

     
    </div>
  </div>
</template>

<script>
import DadosCadastrais from '../../components/ResponsavelTecnico/DadosCadastrais.vue'
import DadosTecnicos from '../../components/ResponsavelTecnico/DadosTecnicos.vue'
import Pesquisa from '../../components/ResponsavelTecnico/Pesquisa.vue'
export default {
  data(){
    return {
      reloadPesquisa: false,
      dadosPesquisa: {},
      dadosResponsavelTecnico: {}
    }
  },
components:{
  DadosCadastrais,
  DadosTecnicos,
  Pesquisa
}
}
</script>

<style>
#btnDadosCadastrais{
  background-color: #038c5a;
  border: none !important;
  transition: 1s;
}

#btnDadosCadastrais:hover {
  background-color: #004526 !important;
}

#btnDadosCadastrais:focus {
  background-color: #004526 !important;
}

#btnDadosResponsavel {
  background-color: #038c5a;
  border: none !important;
  transition: 1s;
}
#btnDadosResponsavel:hover {
  background-color: #004526 !important;
}

#btnDadosResponsavel:focus {
  background-color: #004526 !important;
}
</style>