<template>
  <div
    class="mt-5"
    id="divContainer"
    style="display: flex; justify-content: space-between"
  >
    <div
      class="row ml-2"
      id="menuReceita"
      style="height: 600px; background: #f6f6f6"
    >
      <div class="col-12 mt-4" id="containerMenu">
        <div class="list-group" id="list-tab" role="tablist">
          <b-button
            block
            class="shadow"
            id="btnDadosCadastrais"
            v-b-toggle.accordion-dadosEstoque
            >Dados Cadastrais
             <b-icon-cart-check class="ml-1 float-right"></b-icon-cart-check>
          </b-button>
          <div class="mobile-active">
            <!-- <DadosCadastrais
              :dadosPesquisaMobile="dadosPesquisaMobile"
              @dadosResponsavel="dadosResponsavelTecnico = $event"
            /> -->
          </div>

         
          <b-button
            block
            v-b-toggle.accordion-pesquisaEstoque
            class="shadow mt-2"
            id="btnReceita"
            >Pesquisa <b-icon-search class="float-right"></b-icon-search
          ></b-button>
          <div class="mobile-active">
            <!-- <Pesquisa
              :reloadPesquisa="reloadPesquisa"
              @resposavelEditMobile="dadosPesquisaMobile = $event"
            /> -->
          </div>
        </div>
      </div>
    </div>

    <div
      class="accordion col-sm-10 mobile-disabled"
      id="receita"
      role="tablist"
    >
    <Estoque :dadosEstoque="dadosEstoque"/>
    <Pesquisa @dadosEstoque="dadosEstoque = $event"/>
      <!-- <Cliente /> -->
      <!-- <DadosCadastrais
        :dadosPesquisa="dadosPesquisa"
        @dadosResponsavel="dadosResponsavelTecnico = $event"
        :dadosPesquisaMobile="dadosPesquisaMobile"
      />
      <DadosTecnicos
        @reloadPesquisa="reloadPesquisa = !reloadPesquisa"
        :dadosResponsavelTecnico="dadosResponsavelTecnico"
        :dadosPesquisa="dadosPesquisa"
        :dadosPesquisaMobile="dadosPesquisaMobile"
      />
      <Pesquisa
        :reloadPesquisa="reloadPesquisa"
        @resposavelEdit="dadosPesquisa = $event"
        @resposavelEditMobile="dadosPesquisaMobile = $event"
      /> -->
    </div>
  </div>
</template>

<script>
import Estoque from '../../components/Estoque/Estoque.vue'
import Pesquisa from '../../components/Estoque/Pesquisa.vue'
export default {
components:{
    Estoque,
    Pesquisa
},

data(){
  return {
    dadosEstoque: {}
  }
}
}
</script>

<style scoped>
#btnDadosCadastrais {
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

#btnReceita {
  background-color: #038c5a;
  border: none !important;
  transition: 1s;
}
#btnReceita:hover {
  background-color: #004526 !important;
}

#btnReceita:focus {
  background-color: #004526 !important;
}

.card {
  border: 0px solid #ffff !important;
}

#menuReceita {
  width: 18% !important;
  transition: 0.3s;
  height: auto !important;
  padding-bottom: 30%;
}

@media (max-width: 962px) {
  #containerMenu {
    padding: 0 !important;
  }
  #menuReceita {
    margin-bottom: 100px;
    padding-bottom: 20px !important;
    width: 100% !important;
    height: auto !important;
    margin-left: 0px !important;
    transition: 0.3s;
  }

  #divContainer {
    display: flex;
    flex-direction: column;
  }
  #receita {
    width: 100% !important;
  }

  .card {
    border-radius: 10px;
  }
  .mobile-disabled {
    display: none !important;
  }
}

@media (min-width: 956px) {
  .mobile-disabled {
    display: block !important;
  }
  .mobile-active {
    display: none !important;
  }
}

@media (min-width: 1120px) {
  div #receita {
    max-width: 80% !important;
  }
}
</style>