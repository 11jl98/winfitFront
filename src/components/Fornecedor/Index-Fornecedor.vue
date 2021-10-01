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
          <b-button block  ref="submitBtn" class="shadow" id="btnReceita" v-b-toggle.accordion-dadosCadastrais
            >Cadastro Fornecedor
            <b-icon-person-lines-fill
              class="float-right"
            ></b-icon-person-lines-fill>
          </b-button>
         
          <b-button block v-b-toggle.accordion-pesquisaFornecedor class="shadow" id="btnReceita"
            >Pesquisa <b-icon-search class="float-right"></b-icon-search
          ></b-button>
        </div>
      </div>
    </div>
    <div class="accordion col-sm-10" id="receita" role="tablist">
      <DadosCadastrais :limparForm="reloadDelete" :dadosFornecedor="dadosFornecedor" @atualizarPesquisa="reloadPesquisa = !reloadPesquisa"/>
      <!-- <Propriedade/> -->
      <Pesquisa @dadosFornecedor="dadosFornecedor = $event" :atualizarPesquisa="reloadPesquisa" @limparForm="reloadDelete = !reloadDelete" />
    </div>
  </div>
</template>

<script>
import DadosCadastrais from '../../components/Fornecedor/DadosCadastrais.vue'
// import Propriedade from '../../components/Cliente/Propriedade.vue'
import Pesquisa from '../../components/Fornecedor/Pesquisa.vue'

export default {
  data(){
    return{
      reloadPesquisa: false,
      reloadDelete: false,
      dadosFornecedor:{}
    }
  },
  mounted(){
    document.getElementById("btnReceita").focus()
  },
  components: {
    DadosCadastrais,
    // Propriedade,
    Pesquisa
  },
};
</script>

<style scoped >
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
}

@media (max-height: 696px) {
  #menuReceita{
    height: 500px!important;
  }
  #divContainer{
   
    margin-top: 1%!important;
  }
}

/* @media (max-width: 950px) {
  #menuReceita {
    width: 99% !important;
    height: 600px !important;
    margin-left: 2px!important;
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
} */


@media (min-width: 1120px) {
  div #receita {
    max-width: 80% !important;
  }
}
</style>